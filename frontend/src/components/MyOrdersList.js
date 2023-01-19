import { Divider } from "@rneui/themed";
import { useState } from "react";
import { FlatList, Text, View, RefreshControl } from "react-native";
import { useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { baseUrl } from "../utils/axios";
import ExpandableList from "./ExpandableList";
import SkeletonList from "./SkeletonList";

const MyOrdersList = ({ navigation }) => {
  const { token, worker } = useSelector((state) => state.auth);
  const [isRefreshing, setIsRefreshing] = useState(false);
  // uuriinhuu orderuudig awah
  const {
    error,
    isLoading,
    data: orders,
  } = useQuery(["orders", { my: true }], async () => {
    const res = await baseUrl.get(`/orders?worker=${worker._id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.orders;
  });

  const queryClient = useQueryClient();

  const refresh = () => {
    setIsRefreshing(true);
    queryClient.invalidateQueries(["orders", { my: true }]);
    setIsRefreshing(false);
  };

  return (
    <View>
      {!isLoading && error !== "" ? (
        <FlatList
          keyExtractor={(order) => order._id}
          data={orders}
          refreshControl={
            <RefreshControl onRefresh={refresh} refreshing={isRefreshing} />
          }
          ItemSeparatorComponent={<Divider />}
          renderItem={({ item: order }) => (
            <ExpandableList order={order} navigation={navigation} my />
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

export default MyOrdersList;
