import { StatusBar } from "expo-status-bar";
import React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import * as Location from 'expo-location';
import App from "./App";


export default function Home() {

    
  const [data, setData] = useState([]);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  let lon = location?.coords?.longitude;
  let lat = location?.coords?.latitude;
  console.log("pour photo", data)
 
  
  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=a1d0d77715b38560d17db0918cc3cee8&lang=FR`)
    
      .then((res) => {
       return res.json()
      })
      .then((json) => {
        setData(json.list)
        console.log("resObject", json.list)
        
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

    return(

        <View style={styles.container}>
            <Text style={styles.title}>Bienvenue sur votre app météo!</Text>
            <Image
        style={styles.logo}
        source={{
          uri: `http://openweathermap.org/img/wn/${data?.[0]?.weather?.[0]?.icon}@2x.png`}}
      />
        </View>
    )

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "lightblue",
        alignItems: 'center',
        justifyContent: 'top',
        
    },
    title: {
        fontSize: 30,
        margin: 40,
        
    },
    logo:{
        height: 200,
        width: 200,
    }
})

