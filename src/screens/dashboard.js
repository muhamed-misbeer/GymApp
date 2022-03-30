import { StyleSheet, Text, View, Button } from 'react-native'
import React, { useEffect } from 'react'
import GoogleFit, { Scopes, BucketUnit } from 'react-native-google-fit'

const options = {
  startDate: "2022-03-26T00:00:17.971Z", // required
  endDate: new Date().toISOString(), // required
  bucketUnit: BucketUnit.DAY, // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
  bucketInterval: 1, // optional - default 1. 
}
export default function Dashboard() {
  useEffect(() => {

    const options = {
      scopes: [
        Scopes.FITNESS_ACTIVITY_READ,
        Scopes.FITNESS_ACTIVITY_WRITE,
        Scopes.FITNESS_BODY_READ,
        Scopes.FITNESS_BODY_WRITE,
        Scopes.FITNESS_BLOOD_PRESSURE_READ,
        Scopes.FITNESS_BLOOD_PRESSURE_WRITE,
        Scopes.FITNESS_BLOOD_GLUCOSE_READ,
        Scopes.FITNESS_BLOOD_GLUCOSE_WRITE,
        Scopes.FITNESS_NUTRITION_WRITE,
        Scopes.FITNESS_SLEEP_READ,
        Scopes.FITNESS_ACTIVITY_READ,
        Scopes.FITNESS_LOCATION_READ,
        Scopes.FITNESS_ACTIVITY_READ,
        Scopes.FITNESS_ACTIVITY_WRITE,
        Scopes.FITNESS_HEART_RATE_READ,
        Scopes.FITNESS_HEART_RATE_WRITE,
        Scopes.FITNESS_BLOOD_PRESSURE_READ,
        Scopes.FITNESS_BLOOD_PRESSURE_WRITE,
        Scopes.FITNESS_BLOOD_GLUCOSE_READ,
        Scopes.FITNESS_BLOOD_GLUCOSE_WRITE,
      ],
      
      
    };
    GoogleFit.checkIsAuthorized().then(() => {
      var authorized = GoogleFit.isAuthorized;
      console.log(authorized);
      if (authorized) {
        // if already authorized, fetch data
      } else {
        // Authentication if already not authorized for a particular device
        GoogleFit.authorize(options)
          .then(authResult => {
            if (authResult.success) {
              console.log('AUTH_SUCCESS');

              console.log(authResult)

              // if successfully authorized, fetch data
            } else {
              console.log('AUTH_DENIED ' + authResult.message);
            }
          })
          .catch(() => {
            dispatch('AUTH_ERROR');
          });
      }
    });

  })

  const handleRate = async () => {
    const res = await GoogleFit.getHeartRateSamples(options)
    console.log(res);
  }
  return (
    <View>
      <Text>Dashboard</Text>
      <Button title="heart" onPress={handleRate} />
    </View>
  )
}

const styles = StyleSheet.create({})