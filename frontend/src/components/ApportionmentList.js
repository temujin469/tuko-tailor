import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import AvatarImage from "./AvatarImage";
import { CheckBox, Divider, useTheme } from "@rneui/themed";
import translateRole from "../utils/translateRole";
import { useSelector } from "react-redux";

const ApportionmentList = ({ worker, setNewWorkers, newWorkers }) => {
  const [checked, setChecked] = useState(newWorkers.includes(worker._id));
  const { theme } = useTheme();
  const { worker: currentWorker } = useSelector((state) => state.auth);

  const handleCheck = () => {
    if (checked) {
      setNewWorkers((prev) => {
        return prev?.filter((item) => item !== worker._id);
      });
    } else {
      setNewWorkers((prev) => {
        return [...prev, worker._id];
      });
    }
    setChecked(!checked);
  };

  const imutableWorker =
    worker?.role === "CEO" ||
    worker?.role === "COO" ||
    worker?.role === "MANAGER" ||
    worker._id === currentWorker._id;

  return (
    <TouchableOpacity>
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
            <Text style={{ fontSize: 14 }}>{translateRole(worker?.role)}</Text>
          </View>
          <CheckBox
            disabled={imutableWorker}
            checked={checked}
            checkedColor={
              imutableWorker ? theme.colors.disabled : theme.colors.primary
            }
            onPress={handleCheck}
          />
        </View>
      </View>
      <Divider />
    </TouchableOpacity>
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

export default ApportionmentList;
