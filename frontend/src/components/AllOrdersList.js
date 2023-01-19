import { Divider } from "@rneui/themed";
import { useState } from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";
import { useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { baseUrl } from "../utils/axios";
import ExpandableList from "./ExpandableList";
import SkeletonList from "./SkeletonList";

const AllOrdersList = ({ navigation }) => {
  const { token } = useSelector((state) => state.auth);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const {
    error,
    isLoading,
    data: orders,
  } = useQuery(["orders"], async () => {
    const res = await baseUrl.get("/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.orders;
  });

  const queryClient = useQueryClient();

  const refresh = () => {
    setIsRefreshing(true);
    queryClient.invalidateQueries(["orders"]);
    setIsRefreshing(false);
  };

  return (
    <View>
      {!isLoading && error !== "" ? (
        <FlatList
          data={orders}
          refreshControl={
            <RefreshControl onRefresh={refresh} refreshing={isRefreshing} />
          }
          ItemSeparatorComponent={<Divider />}
          keyExtractor={(order) => order._id}
          renderItem={({ item }) => (
            <ExpandableList order={item} navigation={navigation} />
          )}
        />
      ) : isLoading ? (
        <SkeletonList />
      ) : (
        <Text>{`${error}`}</Text>
      )}
    </View>
  );
};

export default AllOrdersList;
