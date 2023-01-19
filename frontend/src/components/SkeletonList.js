import { View } from "react-native";
import React from "react";
import { Skeleton } from "@rneui/themed";

const SkeletonList = ({ column }) => {
  return (
    <View
      style={{
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {Array(column || 3)
        .fill(null)
        .map((_, i) => (
          <View
            key={i}
            style={{
              flexDirection: "row",
              marginTop: 10,
              backgroundColor: "#E6E6E6",
              padding: 10,
              height: 50,
              marginHorizontal: 10,
              borderRadius: 5,
            }}
          >
            <Skeleton
              style={{ flex: 1, marginRight: 10, borderRadius: 5 }}
              animation="wave"
              width={"95%"}
              height={"100%"}
            />
            <Skeleton
              style={{ flex: 1, marginRight: 10, borderRadius: 5 }}
              animation="wave"
              width={"95%"}
              height={"100%"}
            />
            <Skeleton
              style={{ flex: 1, borderRadius: 5 }}
              animation="wave"
              width={"95%"}
              height={"100%"}
            />
          </View>
        ))}
    </View>
  );
};

export default SkeletonList;
