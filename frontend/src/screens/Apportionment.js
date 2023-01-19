import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Divider, Button } from "@rneui/themed";
import { useSelector } from "react-redux";
import { baseUrl } from "../utils/axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import SkeletonList from "../components/SkeletonList";
import ApportionmentList from "../components/ApportionmentList";
import Spinner from "react-native-loading-spinner-overlay";
import { Appbar } from "react-native-paper";

const Apportionment = ({ route, navigation }) => {
  const { oldWorkers, orderId, orderName } = route.params;
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const [newWorkers, setNewWorkers] = useState(oldWorkers);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    setIsChanged(JSON.stringify(newWorkers) !== JSON.stringify(oldWorkers));
  }, [newWorkers]);

  const {
    error,
    isLoading,
    data: allWorkers,
  } = useQuery(["workers"], async () => {
    const res = await baseUrl.get("/users?select=role _id firstname", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.users;
  });

  const queryClient = useQueryClient();

  const updateWorkersMutation = useMutation(
    async () => {
      setLoading(true);
      return await baseUrl.put(
        `/orders/${orderId}`,
        {
          workers: newWorkers,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["orders"]);
        setLoading(false);
        navigation.pop();
      },
      onError: (err) => {
        setLoading(false);
        console.log(err);
        alert(err);
      },
    }
  );

  return (
    <>
      <Appbar.Header elevated style={{ backgroundColor: "#fff" }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={orderName} />
      </Appbar.Header>
      <View style={{ flex: 1 }}>
        <Spinner visible={loading} />
        {!isLoading && !error ? (
          <View style={{ marginBottom: isChanged ? 60 : 0 }}>
            <FlatList
              contentContainerStyle={{
                height: "100%",
                backgroundColor: "#fff",
              }}
              data={allWorkers}
              keyExtractor={(item) => item._id}
              renderItem={({ item: worker }) => (
                <ApportionmentList
                  worker={worker}
                  newWorkers={newWorkers}
                  setNewWorkers={setNewWorkers}
                />
              )}
            />
            <Divider />
          </View>
        ) : isLoading ? (
          <SkeletonList />
        ) : (
          <Text>{`${error}`}</Text>
        )}
        {isChanged ? (
          <View
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              left: 0,
              backgroundColor: "#fff",
            }}
          >
            <Button
              title={"Хадгалах"}
              buttonStyle={{ margin: 10, height: 50 }}
              onPress={() => updateWorkersMutation.mutate()}
            />
          </View>
        ) : null}
      </View>
    </>
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

export default Apportionment;
