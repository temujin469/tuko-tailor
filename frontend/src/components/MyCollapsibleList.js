import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Status from "./Status";
import { baseUrl } from "../utils/axios";
import { useMutation, useQueryClient } from "react-query";
import ListRow from "./ListRow";
import OrderDateInfo from "./OrderDateInfo";
import { useSelector } from "react-redux";
import statusOfRole from "../utils/statusOfRole";
import { AntDesign } from "@expo/vector-icons";
import { useTheme } from "@rneui/themed";
import Spinner from "react-native-loading-spinner-overlay";
import OrderOnoo from "./OrderOnoo";

const MyCollapsibleList = ({ order, navigation }) => {
  const { token, worker: currentWorker } = useSelector((state) => state.auth);
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);

  const [newOnoo, setNewOnoo] = useState(order.myOnoo || 0);
  const [newStatus, setNewStatus] = useState(order.myStatus);

  const canAddWorker =
    currentWorker?.role === "CEO" ||
    currentWorker?.role === "COO" ||
    currentWorker?.role === "ESGUURCHIN" ||
    currentWorker?.role === "MANAGER";

  // console.log(order.workers.map((w) => w._id));

  const queryClient = useQueryClient();

  const updateStatusMutation = useMutation(
    async () => {
      return await baseUrl.put(
        `/orders/${order._id}`,
        {
          [currentWorker.role.toLowerCase()]: {
            status: newStatus,
            onoo: newOnoo,
          },
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
      },

      onError: (err) => {
        alert(err);
        setLoading(false);
      },
    }
  );

  const handleUpdate = () => {
    setLoading(true);
    updateStatusMutation.mutate();
  };

  return (
    <View
      style={{
        color: "black",
        flexDirection: "column",
        backgroundColor: "#EDF4F8",
      }}
    >
      <Spinner visible={loading} />
      <ListRow
        title={"Огноо"}
        body={
          <OrderDateInfo
            date1={order.createdAt}
            date2={order.takeDate}
            date3={order.takeDate}
          />
        }
      />

      <ListRow
        title={statusOfRole(currentWorker?.role)}
        body={
          <Status
            newStatus={newStatus}
            setNewStatus={setNewStatus}
            role={currentWorker.role}
            oldStatus={order.myStatus}
            onSubmit={handleUpdate}
          />
        }
      />
      <ListRow
        title={"Оноо"}
        body={
          <OrderOnoo
            oldOnoo={order.myOnoo}
            newOnoo={newOnoo}
            setNewOnoo={setNewOnoo}
            onSubmit={handleUpdate}
          />
        }
      />
      {canAddWorker && (
        <ListRow
          title={"Хувиарлах"}
          body={
            <View style={{ justifyContent: "center" }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Apportionment", {
                    orderName: order.name,
                    oldWorkers: order.workers?.map((worker) => worker._id),
                    orderId: order._id,
                  })
                }
                style={{
                  borderRadius: 100,
                  borderStyle: "dashed",
                  borderColor: theme.colors.primary,
                  borderWidth: 2,
                  padding: 7,
                }}
              >
                <AntDesign name="adduser" size={20} color="black" />
              </TouchableOpacity>
            </View>
          }
        />
      )}
    </View>
  );
};

export default MyCollapsibleList;
