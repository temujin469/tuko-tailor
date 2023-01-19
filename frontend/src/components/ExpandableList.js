import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import Collapsible from "react-native-collapsible";
import { Divider, useTheme, Button } from "@rneui/themed";
import FeatherIcon from "@expo/vector-icons/Feather";
import CollapsibleList from "./CollapsibleList";
import moment from "moment";
import MyCollapsibleList from "./MyCollapsibleList";

const ExpandableList = ({ order, navigation, my }) => {
  const { theme } = useTheme();
  const [collapsed, setCollapsed] = useState(true);

  const toggleExpanded = () => {
    setCollapsed(!collapsed);
  };

  const handleNavigateToOrder = (id) => {
    navigation.navigate("Order", { orderId: id });
  };

  // const isMyOrder = order.myStatus !== undefined || order.myStatus === null;

  return (
    <View>
      <TouchableOpacity onPress={toggleExpanded}>
        <View style={styles.header}>
          <View style={styles.hcol1}>
            <FeatherIcon
              name="chevron-right"
              color={collapsed ? "gray" : theme.colors.primary}
              size={25}
              style={!collapsed && styles.collapsedChev}
            />
            <View style={{ padding: 1 }} />
            <Button
              color={"third"}
              onPress={() => handleNavigateToOrder(order._id)}
            >
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
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: 62,
                }}
              >
                <Text style={styles.smallText}>Өгсөн</Text>
                <Text style={styles.smallText}>Авах</Text>
              </View>
              <Text style={{ fontSize: 12 }}>
                {`${moment(order.startDate).format("MM.DD")}-${moment(
                  order.takeDate
                ).format("MM.DD")}`}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
                width: 110,
              }}
            >
              <FeatherIcon name="check-circle" color={"green"} size={20} />
              <FeatherIcon name="phone-forwarded" color={"#222"} size={15} />
              <FeatherIcon name="user-check" color={"#222"} size={16} />
            </View>
          </View>
        </View>
        <Divider />
      </TouchableOpacity>

      {/* collapsile row */}
      <Collapsible collapsed={collapsed} align="center">
        {my ? (
          <MyCollapsibleList order={order} navigation={navigation} />
        ) : (
          <CollapsibleList order={order} />
        )}
      </Collapsible>
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
  },

  headerText: {
    color: "#000",
  },
  collapsedChev: {
    transform: [{ rotate: "90deg" }],
  },
  smallText: {
    color: "gray",
    paddingBottom: 3,
    fontSize: 10,
  },
});

export default ExpandableList;
