import { StatusBar } from "expo-status-bar";
import React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import Geolocation from 'react-native-geolocation-service';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();
import MeteoGeoloc from "./meteoGeoloc";
import Home from "./Home";
import Meteo from "./meteo";

export default function App() {

  return(
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="MeteoGeoloc" component={MeteoGeoloc} />
        <Drawer.Screen name="Meteo" component={Meteo} />
      </Drawer.Navigator>
    </NavigationContainer>


  )
}

