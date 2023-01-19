import { View, Text, StyleSheet, ImageBackground } from "react-native";
import React from "react";
import translateRole from "../utils/translateRole";
import AvatarImage from "./AvatarImage";
import AntDesign from "@expo/vector-icons/AntDesign";

const ContactHeader = ({ role, name, navigation }) => {
  return (
    <View>
      <ImageBackground
        style={styles.navbar}
        imageStyle={styles.cover}
        source={require("../../assets/image/cover1.jpg")}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            maxWidth: "90%",
          }}
        >
          <AntDesign
            name="arrowleft"
            size={27}
            color="#fff"
            onPress={() => navigation.goBack()}
          />

          <View style={styles.textWrapper}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.role}>{`Албан тушаал:${translateRole(
              role
            )}`}</Text>
          </View>
          <AvatarImage role={role} size={70} />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    paddingTop: 50,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  cover: {
    resizeMode: "cover",
  },
  textWrapper: {
    flexDirection: "column",
  },
  role: {
    color: "white",
  },
  name: {
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default ContactHeader;
