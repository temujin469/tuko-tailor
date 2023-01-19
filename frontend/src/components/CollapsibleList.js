import { View } from "react-native";
import React, { useState } from "react";
import Status from "./Status";
import ListRow from "./ListRow";
import OrderDateInfo from "./OrderDateInfo";
import statusOfRole from "../utils/statusOfRole";
import { useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import OrderStatus from "./OrderStatus";
import { baseUrl } from "../utils/axios";
import Spinner from "react-native-loading-spinner-overlay";

const CollapsibleList = ({ order }) => {
  const { token, worker: currentWorker } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();

  const updateOrderStatusMutation = useMutation(
    async (newOrderStatus) => {
      return await baseUrl.put(
        `/orders/${order._id}`,
        {
          orderStatus: newOrderStatus,
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

  const workersRole = [
    // "ceo",
    // "coo",
    // "manager",
    // "designer",
    "esguurchin",
    "oydolchin",
    "hatgamalchin",
    "towchshilbe",
    "garchimeglel",
  ];

  const canUpdateOrderStatus =
    currentWorker?.role === "CEO" ||
    currentWorker?.role === "COO" ||
    currentWorker?.role === "MANAGER";

  return (
    <View
      style={{
        color: "black",
        flexDirection: "column",
        backgroundColor: "#EDF4F8",
      }}
    >
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

      {workersRole.map((role) => (
        <ListRow
          key={role}
          title={statusOfRole(role)}
          body={<Status oldStatus={order[role]?.status} disabled={true} />}
        />
      ))}
      {canUpdateOrderStatus && (
        <>
          <Spinner visible={loading} />
          <OrderStatus
            oldOrderStatus={order.orderStatus}
            onSubmit={(newStatus) => {
              setLoading(true);
              updateOrderStatusMutation.mutate(newStatus);
            }}
          />
        </>
      )}
    </View>
  );
};

export default CollapsibleList;
