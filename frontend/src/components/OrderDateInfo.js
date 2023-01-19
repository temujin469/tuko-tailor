import { View, Text, StyleSheet } from "react-native";
import React from "react";
import moment from "moment";
import { useTheme } from "@rneui/themed";
import FontAwesome from "@expo/vector-icons/FontAwesome5";

const OrderDateInfo = ({ date1, date2, date3 }) => {
  const { theme } = useTheme();
  return (
    <View
      style={{ flexDirection: "row", justifyContent: "space-between", flex: 1 }}
    >
      <View>
        <Text style={styles.smallText}>Өгсөн</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <FontAwesome
            color={theme.colors.primary}
            size={14}
            name="calendar-day"
          />
          <Text style={{ paddingLeft: 5, fontSize: 12 }}>
            {moment(date1).format("MM.DD")}
          </Text>
        </View>
      </View>
      <View>
        <Text style={styles.smallText}>Примерка</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <FontAwesome color={theme.colors.primary} size={14} name="user-tie" />
          <Text style={{ paddingLeft: 5, fontSize: 12 }}>
            {moment(date2).format("MM.DD")}
          </Text>
        </View>
      </View>
      <View>
        <Text style={styles.smallText}>Авах</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <FontAwesome
            color={theme.colors.primary}
            size={14}
            name="calendar-check"
          />
          <Text style={{ paddingLeft: 5, fontSize: 12 }}>
            {moment(date3).format("MM.DD")}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  smallText: {
    color: "gray",
    paddingBottom: 3,
    fontSize: 10,
  },
});

export default OrderDateInfo;
