import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Divider } from "@rneui/themed";

const ListRow = ({ title, body }) => {
  return (
    <View>
      <View style={styles.row}>
        <View style={styles.col1}>
          <Text>{title}</Text>
        </View>
        <View style={styles.col2}>{body}</View>
      </View>
      <Divider />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    height: 60,
    alignItems: "center",
    justifyContent: "space-between",
  },

  col1: {
    width: 140,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 30,
  },
  col2: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 30,
  },
});

export default ListRow;
