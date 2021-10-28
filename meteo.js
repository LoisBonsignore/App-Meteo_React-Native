import React from "react";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TextInput,
  Pressable,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Meteo() {
  const [data, setData] = useState(null);
  const [city, setCity] = useState("");

  function getData() {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=a1d0d77715b38560d17db0918cc3cee8&lang=FR`
    )
      .then((res) => {
        return res.json();
      })
      .then((resObject) => {
        setData(resObject);
        console.log("resObject", resObject);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function getInput(city) {
    getData(city);
  }

  return (
    <View style={styles.container}>
      <Pressable></Pressable>
      <TextInput
        style={{ borderWidth: 2, borderColor: "black" }}
        value={city}
        onChangeText={(e) => setCity(e)}
        placeholder="Entre ta ville"
      />
      <Pressable
        style={styles.button}
        value={city}
        onPress={() => getInput(city)}
      >
        <Text>Valider</Text>
      </Pressable>
      <Image
        style={styles.logo}
        source={{
          uri: `http://openweathermap.org/img/wn/${data?.weather?.[0]?.icon}@2x.png`,
        }}
      />
      <Text>La température est de: {data?.main?.temp} °C</Text>
      <Text>Le vent souffle à: {data?.wind?.speed}m/s</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightblue",
  },
  logo: {
    height: 100,
    width: 100,
    borderWidth: 4,
    borderColor: "lightblue",
    backgroundColor: "lightblue",
  },
});
