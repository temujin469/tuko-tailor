import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  RefreshControl,
} from "react-native";
import Header from "../components/Header";
import { useTheme } from "@rneui/themed";
import { Divider } from "@rneui/themed";
import { useQuery, useQueryClient } from "react-query";
import { baseUrl } from "../utils/axios";
import translateRole from "../utils/translateRole";
import AvatarImage from "../components/AvatarImage";
import { useSelector } from "react-redux";
import SkeletonList from "../components/SkeletonList";

const Contact = ({ navigation }) => {
  const { theme } = useTheme();
  const { token } = useSelector((state) => state.auth);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const {
    error,
    isLoading,
    data: workers,
  } = useQuery(["workers"], async () => {
    const res = await baseUrl.get("/users?select=role _id firstname", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.users;
  });

  const queryClient = useQueryClient();

  const refresh = () => {
    setIsRefreshing(true);
    queryClient.invalidateQueries("workers");
    setIsRefreshing(false);
  };

  return (
    <View>
      <Header navigation={navigation} />
      <View>
        {!isLoading && !error ? (
          <FlatList
            contentContainerStyle={{ height: "100%", backgroundColor: "#fff" }}
            refreshControl={
              <RefreshControl refreshing={isRefreshing} onRefresh={refresh} />
            }
            data={workers}
            ItemSeparatorComponent={<Divider />}
            keyExtractor={(item) => item._id}
            renderItem={({ item: worker }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ContactInfo", { workerId: worker._id })
                }
              >
                <View style={styles.header}>
                  <View style={styles.hcol1}>
                    <AvatarImage role={worker?.role} size={37} />
                    <View style={{ margin: 5 }} />
                    <View
                      style={{
                        flexDirection: "column",
                        flex: 1,
                      }}
                    >
                      <Text style={styles.smallText}>Нэр</Text>
                      <Text style={{ color: "#222" }}>
                        {worker?.firstname?.length < 13
                          ? worker.firstname
                          : `${worker.firstname?.slice(0, 13)}...`}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.hcol2}>
                    <View
                      style={{
                        flexDirection: "column",
                        flex: 1,
                      }}
                    >
                      <Text style={styles.smallText}>Албан тушаал</Text>
                      <Text style={{ fontSize: 14 }}>
                        {translateRole(worker?.role)}
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 12,
                        color: theme.colors.primary,
                        textDecorationLine: "underline",
                      }}
                    >
                      Дэлгэрэнгүй
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        ) : isLoading ? (
          <SkeletonList />
        ) : (
          <Text>{`${error}`}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    color: "black",
    backgroundColor: "#fff",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
  },

  hcol1: {
    width: 180,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
  },
  hcol2: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 10,
    alignItems: "center",
  },
  headerText: {
    color: "#000",
  },
  smallText: {
    color: "gray",
    paddingBottom: 3,
    fontSize: 10,
  },
});

export default Contact;
