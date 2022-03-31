import { StyleSheet, Text, View, Button, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import GoogleFit, { Scopes, BucketUnit } from 'react-native-google-fit'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useDispatch, useSelector } from 'react-redux';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import moment from 'moment';
const options = {
  startDate: "2022-03-29T00:00:17.971Z", // required
  endDate: new Date().toISOString(), // required
  bucketUnit: BucketUnit.DAY, // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
  bucketInterval: 1, // optional - default 1. 
}
const step = {
  date: new Date().toISOString(), // required ISO8601Timestamp
};
const Weight = {
  unit: "pound", // required; default 'kg'
  startDate: "2017-01-01T00:00:17.971Z", // required
  endDate: new Date().toISOString(), // required
  bucketUnit: BucketUnit.DAY, // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
  bucketInterval: 1, // optional - default 1. 
  ascending: false // optional; default false
};
const Height = {
  startDate: "2017-01-01T00:00:17.971Z", // required
  endDate: new Date().toISOString(), // required
};
export default function Dashboard() {
  const UserDetails = useSelector(state => state.auth.user)
  const [heartBeat, setHeartBeat] = useState({})
  const [height,setHeight]=useState(null)
  const [steps, setStep] = useState(null)
  const [isLogin, setIsLogin] = useState(false)
  const [weight,setWeight]=useState(null)
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
              setIsLogin(true)
              handleRate()
              handleStep()
              handleWeight()
              handleHeight()


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
  }, [])

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };

  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ],
    legend: ["Rainy Days"] // optional
  };

  const handleStep = async () => {
    let res = await GoogleFit.getDailySteps(new Date().toISOString())
    // res.map((item)=>{
    //   console.log('last',item.rawSteps)
    // })
    let data=res.slice(-1).pop()
    let count=data.rawSteps[0].steps
    console.log(count)
    setStep(count)
  }

  const handleRate = async () => {
    let res = await GoogleFit.getHeartRateSamples(options)
    let value=res.slice(-1).pop()
    console.log(value)
    setHeartBeat(value)
  }

  const handleWeight=async()=> {
    let res = await GoogleFit.getWeightSamples(Weight)
    let value=res.slice(-1).pop()
    setWeight(value.value)
  }
  const handleHeight=async()=>{
    let res= await GoogleFit.getHeightSamples(Height)
    let value=res.slice(-1).pop()
    setHeight(value.value)
  }
  
  return (
    <ScrollView style={{ flex: 1, padding: 15, backgroundColor: "#F8F6FE" }}>
      {heartBeat.length !== 0 && steps!==null && weight!==null &&
        <>
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "100%", marginRight: "4%", }}>
              <View style={{ backgroundColor: "white", elevation: 3, flexDirection: "row", padding: 10, borderRadius: 10 }}>
                <Image source={{ uri: UserDetails.avatarUrl }} style={{ width: 50, height: 50, borderRadius: 40 }} />
                <View style={{ paddingLeft: 7 }}>
                  <Text style={{ fontSize: 12, fontWeight: "500" }}>{UserDetails.displayName}</Text>
                  <Text style={{ fontSize: 12 }}>Height : {(height*100).toFixed()}</Text>
                  <Text style={{ fontSize: 12 }}>Weight : {weight / 2.2046}kg</Text>
                </View>
              </View> 
            </View>
          </View>
          <View style={{flexDirection:"row",marginTop: 10}}>
            <View style={{ backgroundColor: "white", elevation: 3, borderRadius: 10, alignItems: "center", paddingVertical: 10,width:"48%" }}>
              <AnimatedCircularProgress
                size={60}
                width={5}
                fill={((steps/4000)*100).toFixed()}
                tintColor="#4BC1BE"
                onAnimationComplete={() => console.log('onAnimationComplete')}
                backgroundColor="#3d5875"
              >
                {() => (<Text>{((steps/4000)*100).toFixed()}<Text>%</Text></Text>)}
              </AnimatedCircularProgress>
              <Text style={{ fontSize: 14 }}>Steps:{steps}</Text>
            </View>

            <View style={{ backgroundColor: "white", elevation: 3, borderRadius: 10, padding: 10,width:"48%",marginLeft:"2%"  }}>
              <View style={{ flexDirection: "row", width: "100%" }}>
                <Image source={require('../assets/images/heartRate.gif')} style={{ width: 50, height: 45, resizeMode: "stretch" }} />
                <View style={{ marginLeft: "auto" }}>
                  <Text style={{ fontSize: 20 }}>{heartBeat.value}</Text>
                  <Text style={{ fontSize: 10 }}>BPM</Text>
                </View>
              </View>
              <Text style={{ textAlign: "right", fontSize: 13 }}>{heartBeat.day} {moment(heartBeat.endDate).format('hh:mm A')}</Text>
            </View>

          </View>
        </>
      }
    </ScrollView>
  )
}

const styles = StyleSheet.create({})