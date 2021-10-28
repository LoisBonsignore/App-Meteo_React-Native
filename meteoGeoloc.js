import { StatusBar } from "expo-status-bar";
import React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView, AsyncStorage } from "react-native";
import * as Location from 'expo-location';


function MeteoGeoloc() {
  const [data, setData] = useState([]);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  let lon = location?.coords?.longitude;
  let lat = location?.coords?.latitude;
  console.log("lonlat", lon, lat)

React.useEffect(() => {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=a1d0d77715b38560d17db0918cc3cee8&lang=FR`
  )
    .then((res) => {
      return res.json();
    })
    .then((resObject) => {
      setData(resObject);
      
    })
    .catch((err) => {
      console.error(err);
    });
}, [location]);

console.log("data", data)

useEffect(() => {
  (async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
   
  })();
}, []);


let text = 'Waiting..';
if (errorMsg) {
  text = errorMsg;
} else if (location) {
  text = JSON.stringify(location);
}

useEffect(() => {
  console.log("location", location?.coords?.latitude)
}, [location])

useEffect(() => {
  console.log("data2", data?.[0]?.main?.temp)
}, [data])


return (
  <SafeAreaView>   
    <View style = {{flex: 1, backgroundColor: "lightblue", alignItems: "center", justifyContent: "center"}}>
    <Text style = {{flex:1, fontSize: 25, margin: "auto"}}>L'appli Météo sur les 5 jours :</Text>
    <ScrollView style={styles.scrollView} >
    <View style={styles.container}>
      
      <Text>Ville de {data?.city?.name}, le {data?.list?.[0]?.dt_txt} </Text>
      <Image
        style={styles.logo}
        source={{
          uri: `http://openweathermap.org/img/wn/${data?.list?.[0]?.weather?.[0]?.icon}@2x.png`,
        }}
      />
      <Text>La température est de: {data?.list?.[0]?.main?.temp}°C</Text>
      <Text>Le vent souffle à: {data?.list?.[0]?.wind?.speed}m/s</Text>
    </View>

    <View style={styles.container}>
      
      <Text>Ville de {data?.city?.name}, le {data?.list?.[8]?.dt_txt}</Text>
      <Image
        style={styles.logo}
        source={{
          uri: `http://openweathermap.org/img/wn/${data?.list?.[8]?.weather?.[0]?.icon}@2x.png`,
        }}
      />
      <Text>La température est de: {data?.list?.[8]?.main?.temp}°C</Text>
      <Text>Le vent souffle à: {data?.list?.[8]?.wind?.speed}m/s</Text>
    </View>

    <View style={styles.container}>

      <Text>Ville de {data?.city?.name}, le {data?.list?.[16]?.dt_txt} </Text>
      <Image
        style={styles.logo}
        source={{
          uri: `http://openweathermap.org/img/wn/${data?.list?.[16]?.weather?.[0]?.icon}@2x.png`,
        }}
      />
      <Text>La température est de: {data?.list?.[16]?.main?.temp}°C</Text>
      <Text>Le vent souffle à: {data?.list?.[16]?.wind?.speed}m/s</Text>
    </View>

    <View style={styles.container}>

      <Text>Ville de {data?.city?.name}, le {data?.list?.[24]?.dt_txt} </Text>
      <Image
        style={styles.logo}
        source={{
          uri: `http://openweathermap.org/img/wn/${data?.list?.[24]?.weather?.[0]?.icon}@2x.png`,
        }}
      />
      <Text>La température est de: {data?.list?.[24]?.main?.temp}°C</Text>
      <Text>Le vent souffle à: {data?.list?.[24]?.wind?.speed}m/s</Text>
    </View>

    <View style={styles.container}>
 
      <Text>Ville de: {data?.city?.name}, le {data?.list?.[32]?.dt_txt} </Text>
      <Image
        style={styles.logo}
        source={{
          uri: `http://openweathermap.org/img/wn/${data?.list?.[32]?.weather?.[0]?.icon}@2x.png`,
        }}
      />
      <Text>La température est de: {data?.list?.[32]?.main?.temp}°C</Text>
      <Text>Le vent souffle à: {data?.list?.[32]?.wind?.speed}m/s</Text>
    </View>
    </ScrollView>
    </View> 
  </SafeAreaView>
);
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: "lightblue",
  alignItems: "center",
  justifyContent: "center",
  borderWidth: 4,
  borderColor: "#ffd45e",
  margin: 10,
  padding: 15
},
logo: {
  height: 100,
  width: 100,
  borderWidth: 4,
  borderColor: "lightblue",
  backgroundColor: "lightblue",
},
scrollView: {
  marginHorizontal: 20,
},
});

export default MeteoGeoloc;