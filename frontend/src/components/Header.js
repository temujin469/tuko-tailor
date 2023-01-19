import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSelector } from "react-redux";
import { Badge } from "@rneui/base";
import translateRole from "../utils/translateRole";
import AvatarImage from "./AvatarImage";
import { useQuery } from "react-query";
import { Skeleton } from "@rneui/themed";
import { getUserById } from "../api/user";

const Header = ({ navigation }) => {
  const { token, worker: currentWorker } = useSelector((state) => state.auth);

  const {
    data: worker,
    isLoading,
    error,
  } = useQuery(["currentWorker"], () =>
    getUserById({ id: currentWorker._id, token })
  );

  return (
    <View>
      <ImageBackground
        style={styles.navbar}
        imageStyle={styles.cover}
        source={require("../../assets/image/cover1.jpg")}
      >
        <View style={styles.left}>
          {isLoading ? (
            <Skeleton animation="wave" circle width={70} height={70} />
          ) : (
            <AvatarImage role={worker?.role} size={70} />
          )}

          <View style={styles.textWrapper}>
            {isLoading ? (
              <>
                <Skeleton animation="wave" width={100} height={15} />

                <Skeleton
                  animation="wave"
                  width={150}
                  height={20}
                  style={{ marginVertical: 2 }}
                />
                <Skeleton animation="wave" width={130} height={15} />
              </>
            ) : !isLoading && !error ? (
              <>
                <Text style={styles.topTitle}>Өдрийн мэнд ☀️ </Text>
                <Text style={styles.name}>{worker?.firstname}</Text>
                <Text style={styles.role}>{`Албан тушаал: ${translateRole(
                  worker?.role
                )}`}</Text>
              </>
            ) : (
              <Text>{error}</Text>
            )}
          </View>
        </View>

        <View style={styles.right}>
          <TouchableOpacity
            style={styles.notif}
            onPress={() => navigation.navigate("Notification")}
          >
            <Ionicons name="notifications-outline" size={30} />
            <View style={styles.badge}>
              <Badge status="warning" />
            </View>
          </TouchableOpacity>
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
    justifyContent: "space-between",
  },
  cover: {
    resizeMode: "cover",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  textWrapper: {
    marginLeft: 10,
    flexDirection: "column",
    justifyContent: "space-between",
    height: 70,
  },
  topTitle: {
    color: "white",
  },
  role: {
    color: "white",
  },
  name: {
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
  },
  notif: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    position: "relative",
  },
  badge: {
    right: 2,
    top: 2,
    position: "absolute",
  },
});

export default Header;
