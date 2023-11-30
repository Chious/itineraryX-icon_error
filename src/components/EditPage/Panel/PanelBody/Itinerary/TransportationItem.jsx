import { Grid, Stack, Typography } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import PedalBikeIcon from '@mui/icons-material/PedalBike';

// import { useEffect, useState } from 'react';
// import {
//   useDestinations,
//   useIsLoading,
//   placePairs_actions,
//   usePlacePairsDispatch,
//   usePlacePairs,
//   useItinerary,
//   getRoutes,
//   postRoutes,
// } from '../../../temp_data/trip_reducer';

const icons = {
  driving: <DirectionsCarIcon color="black" />,
  walking: <DirectionsWalkIcon color="black" />,
  bicycling: <PedalBikeIcon color="black" />,
};

export default function TransportationItem({ rwdColumn, routes, day, order }) {
  // const [routesLoaded, setRoutesLoaded] = useState(false);
  // const [routes, setRoutes] = useState([]);
  // const isLoading = useIsLoading();
  // const itinerary = useItinerary();
  // const destinations = useDestinations();
  // const placePairs = usePlacePairs();
  // const placePairsDispatch = usePlacePairsDispatch();

  // // 產生placePairs(起終點)陣列
  // useEffect(() => {
  //   placePairsDispatch({
  //     type: placePairs_actions.SET_PLACE_PAIRS,
  //     payload: destinations,
  //   });
  // }, [destinations]);

  // // 取得景點的交通路線資訊
  // useEffect(() => {
  //   const fetchRoutes = async () => {
  //     console.log(placePairs);
  //     setRoutesLoaded(false);
  //     const newRoutes = [];
  //     for (let i = 0; i < placePairs.length; i++) {
  //       newRoutes.push([]);
  //       for (let j = 0; j < placePairs[i].length; j++) {
  //         const itineraryId = itinerary.id;
  //         const originId = placePairs[i][j].originId;
  //         const destinationId = placePairs[i][j].destinationId;
  //         let route = await getRoutes(itineraryId, originId, destinationId);
  //         if (!route) {
  //           const reqBody = {
  //             itineraryId: itineraryId,
  //             transportationMode: 'walking', // 預設值walking
  //             originId: originId,
  //             destinationId: destinationId,
  //           };
  //           route = await postRoutes(reqBody);
  //         }
  //         newRoutes[i].push(route);
  //       }
  //     }
  //     setRoutes(() => newRoutes);
  //     // setRoutesLoaded(true);
  //     // return newRoutes;
  //   };

  //   // fetchRoutes(placePairs);
  //   Promise.all([fetchRoutes()]).then(() => {
  //     setRoutesLoaded(true);
  //   });
  // }, [placePairs]);

  return (
    <Grid container justifyContent="flex-end">
      <Grid item xs={rwdColumn}>
        <Stack direction="row" spacing={1}>
          {icons[routes[day - 1][order - 1].transportationMode]}
          {/* <DirectionsCarIcon color="black" /> */}
          <Typography>
            about {routes[day - 1][order - 1].durationText}
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  );
}
