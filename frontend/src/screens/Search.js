import React, { useEffect, useState } from "react";
import { Skeleton } from "@rneui/themed";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { Button, Divider, useTheme } from "@rneui/themed";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import { baseUrl } from "../utils/axios";
import { Searchbar } from "react-native-paper";

const Search = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const { token } = useSelector((state) => state.auth);
  const { theme } = useTheme();

  // const updateSearch = (search) => {
  //   setSearch(search);
  // };

  const handleNavigateToOrder = (id) => {
    navigation.navigate("Order", { orderId: id });
  };

  const {
    error,
    isLoading,
    data: orders,
  } = useQuery(["orders", { type: "filtered" }, search], async () => {
    const res = await baseUrl.get(`/orders?search=${search}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.orders;
  });

  // console.log("content", orders[0].name);
  return (
    <View style={{ backgroundColor: "#fff", marginTop: 30, flex: 1 }}>
      <View style={{ padding: 20 }}>
        <Searchbar
          placeholder="Захиалга хайх"
          onChangeText={(val) => setSearch(val)}
          value={search}
          style={{
            height: 50,
            backgroundColor: "#F2F2F2",
          }}
          placeholderTextColor="#808080"
        />
      </View>
      {!isLoading && !error ? (
        <>
          <Divider />

          <FlatList
            data={orders}
            // ItemSeparatorComponent={<Divider />}
            renderItem={({ item: order }) => (
              <TouchableOpacity key={order._id}>
                <View style={styles.header}>
                  <View style={styles.hcol1}>
                    <Button color={"third"}>
                      <Text style={{ color: "#222" }}>
                        {order.name.length < 12
                          ? order.name
                          : `${order.name.slice(0, 11)}..`}
                      </Text>
                    </Button>
                  </View>
                  <View style={styles.hcol2}>
                    <View
                      style={{
                        flexDirection: "column",
                        flex: 1,
                        // alignItems: "center",
                      }}
                    >
                      <Text style={styles.smallText}>Огноо</Text>
                      <Text style={{ fontSize: 13 }}>7.23-8.23</Text>
                    </View>

                    <Text
                      style={{
                        fontSize: 12,
                        color: theme.colors.primary,
                        textDecorationLine: "underline",
                      }}
                      onPress={() => handleNavigateToOrder(order._id)}
                    >
                      Дэлгэрэнгүй
                    </Text>
                  </View>
                </View>
                <Divider />
              </TouchableOpacity>
            )}
          />
        </>
      ) : isLoading ? (
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {Array(3)
            .fill(null)
            .map((_, i) => (
              <Skeleton
                key={i}
                style={{ marginTop: 10 }}
                animation="wave"
                width={"95%"}
                height={50}
              />
            ))}
        </View>
      ) : (
        <Text>{`${error}`}</Text>
      )}
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
  row: {
    flexDirection: "row",
    height: 60,
    alignItems: "center",
    justifyContent: "space-between",
  },

  hcol1: {
    width: 153,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
  },
  hcol2: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 20,
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

export default Search;
