import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import DestinationItem from './DestinationItem';
import TransportationItem from './TransportationItem';

import { useEffect, useState } from 'react';
import {
  useDestinations,
  useIsLoading,
  placePairs_actions,
  usePlacePairsDispatch,
  usePlacePairs,
  useItinerary,
  getRoutes,
  postRoutes,
} from '../../../temp_data/trip_reducer';

export default function DayItineraryContent({
  rwdColumns,
  destinationsByDay,
  day,
}) {
  const [placePairs, setPlacePairs] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [routesLoaded, setRoutesLoaded] = useState(false);
  const isLoading = useIsLoading();
  const itinerary = useItinerary();
  const destinations = useDestinations();
  // const placePairs = usePlacePairs();
  // const placePairsDispatch = usePlacePairsDispatch();

  // 產生placePairs(起終點)陣列
  useEffect(() => {
    const genPlacePairs = () => {
      const newPlacePairs = [];
      destinations.forEach((_, day) => {
        newPlacePairs.push([]);
        destinations[day].forEach((_, order) => {
          if (order === destinations[day].length - 1) return;
          const placePair = {
            originId: destinations[day][order].id,
            destinationId: destinations[day][order + 1].id,
          };
          newPlacePairs[day].push(placePair);
        });
      });
      setPlacePairs(() => newPlacePairs);
    };

    genPlacePairs();
  }, [destinations]);

  // 取得景點的交通路線資訊
  useEffect(() => {
    const fetchRoutes = async () => {
      // setRoutesLoaded(() => false);
      const newRoutes = [];
      for (let i = 0; i < placePairs.length; i++) {
        newRoutes.push([]);
        for (let j = 0; j < placePairs[i].length; j++) {
          const itineraryId = itinerary.id;
          const originId = placePairs[i][j].originId;
          const destinationId = placePairs[i][j].destinationId;
          let route = await getRoutes(itineraryId, originId, destinationId);
          if (!route) {
            const reqBody = {
              itineraryId: itineraryId,
              transportationMode: 'walking', // 預設值walking
              originId: originId,
              destinationId: destinationId,
            };
            route = await postRoutes(reqBody);
          }
          newRoutes[i].push(route);
        }
      }
      setRoutes(() => newRoutes);
      // setRoutesLoaded(true);
      // return newRoutes;
    };

    // fetchRoutes(placePairs);
    // Promise.all([fetchRoutes()]).then(() => {
    //   setRoutesLoaded(true);
    // });
    if (placePairs.length > 0) {
      fetchRoutes().then(() => {
        setRoutesLoaded(() => true);
      });
    }
  }, [placePairs]);

  if (!destinationsByDay) {
    return (
      <Grid key={`empty-${day}`} container justifyContent="flex-end">
        <Grid item xs={rwdColumns[1]}>
          <Typography>請點擊按鈕添加景點</Typography>
        </Grid>
      </Grid>
    );
  }

  return destinationsByDay.map((_, order) => (
    <>
      {routesLoaded && order > 0 && (
        <ListItem key={`transport-${day}-${order}`} sx={{ padding: '1rem' }}>
          <TransportationItem
            rwdColumn={rwdColumns[1]}
            routes={routes}
            day={day}
            order={order}
          />
        </ListItem>
      )}
      <ListItem key={`destination-${day}-${order}`} sx={{ padding: 0 }}>
        <DestinationItem day={day} destination={destinationsByDay[order]} />
      </ListItem>
    </>
  ));
}
