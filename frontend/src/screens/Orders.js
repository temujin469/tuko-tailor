import { View } from "react-native";
import React from "react";
import Header from "../components/Header";
import ActionButton from "../components/ActionButton";

import { useTheme } from "@rneui/themed";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MyOrdersList from "../components/MyOrdersList";
import AllOrdersList from "../components/AllOrdersList";
const Tab = createMaterialTopTabNavigator();

const Orders = ({ navigation }) => {
  const { theme } = useTheme();

  return (
    <View style={{ flex: 1, flexDirection: "column" }}>
      <Header navigation={navigation} />
      <View style={{ flex: 1 }}>
        <Tab.Navigator
          screenOptions={{
            tabBarLabelStyle: {
              fontSize: 14,
              textTransform: "none",
              paddingVertical: 3,
            },
            tabBarIndicatorStyle: {
              borderBottomWidth: 4,
              borderColor: theme.colors.primary,
            },
            tabBarItemStyle: { flex: 1 },
            tabBarStyle: { backgroundColor: "white" },
          }}
        >
          <Tab.Screen name="Миний захиалга" component={MyOrdersList} />
          <Tab.Screen name="Бүх захиалга" component={AllOrdersList} />
        </Tab.Navigator>
      </View>
      <ActionButton navigation={navigation} />
    </View>
  );
};

export default Orders;
