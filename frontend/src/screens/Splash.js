import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { ActivityIndicator, View, StyleSheet, Image } from "react-native";
import { useDispatch } from "react-redux";
import { setWorker } from "../slices/authSlice";

const SplashScreen = ({ navigation }) => {
  const [animating, setAnimating] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setAnimating(true);
    setTimeout(() => {
      setAnimating(false);
      AsyncStorage.getItem("worker").then((currentWorker) => {
        if (!currentWorker) {
          navigation.replace("Auth");
        } else {
          dispatch(setWorker(JSON.parse(currentWorker)));
          navigation.replace("Main");
        }
      });
    }, 2500);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/image/splash.jpg")}
        style={{ width: "90%", resizeMode: "contain", margin: 30 }}
      />
      <ActivityIndicator
        animating={animating}
        color="#2F90FF"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  activityIndicator: {
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    flexDirection: "row",
  },
});
