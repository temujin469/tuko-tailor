import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import screens
import LoginScreen from "../screens/Login";
import OrdersScreen from "../screens/Orders";
import SplashScreen from "../screens/Splash";
import AddOrderScreen from "../screens/AddOrder";
import OrderScreen from "../screens/Order";
import ContactInfoScreen from "../screens/ContactInfo";
import RegisterScreen from "../screens/Register";
import ContactScreen from "../screens/Contact";
import ProfileScreen from "../screens/Profile";
import SearchScreen from "../screens/Search";
import NotificationScreen from "../screens/Notification";
import { useSelector } from "react-redux";
import { useTheme } from "@rneui/themed";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ApportionmentScreen from "../screens/Apportionment";
// import { useEffect, useState } from "react";
// import { Dialog, Portal } from "react-native-paper";
// import { Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Home = ({ navigation, route }) => {
  const { theme } = useTheme();
  // const [visibleDailog, setVisibleDailog] = useState(false);
  // const successfulAddWorkers = route?.params?.success;
  // useEffect(() => {
  //   if (successfulAddWorkers === true) {
  //     return setVisibleDailog(true);
  //   } else {
  //     return;
  //   }
  // }, [route]);

  // const handleConfirm = () => {
  //   setVisibleDailog(false);
  // };

  return (
    <>
      {/* <Portal>
        <Dialog
          visible={visibleDailog}
          onDismiss={handleConfirm}
          style={{ backgroundColor: "#fff", borderRadius: 15 }}
        >
          <Dialog.Title>
            <Ionicons name="person-add" size={24} color="#80FF80" />
          </Dialog.Title>
          <Dialog.Content>
            <Text style={{ fontSize: 17 }}>Амжилттай хувиарлалаа</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleConfirm}>Дараах</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal> */}
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarLabelStyle: { color: "gray" },
          tabBarStyle: {
            height: 65,
            paddingTop: 9,
          },
          tabBarLabelStyle: { paddingBottom: 9 },
          tabBarHideOnKeyboard: true,
          tabBarIcon: ({ focused, color, size }) => {
            let iconsName;
            let rn = route.name;
            color = focused && theme.colors.primary;
            switch (rn) {
              case "Захиалга":
                iconsName = focused ? "home" : "home-outline";
                break;
              case "Хайлт":
                iconsName = focused ? "search" : "search-outline";
                break;

              case "Холбоо":
                iconsName = focused ? "people" : "people-outline";
                break;

              case "Профайл":
                iconsName = focused ? "person" : "person-outline";
                break;
            }

            return <Ionicons name={iconsName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name="Захиалга"
          component={OrdersScreen}
          options={{ headerShown: false }}
        />

        <Tab.Screen
          name="Хайлт"
          component={SearchScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name={"Холбоо"}
          component={ContactScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Профайл"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </>
  );
};

const MainScreens = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="AddOrder" component={AddOrderScreen} />

      <Stack.Screen name="Order" component={OrderScreen} />
      <Stack.Screen name="ContactInfo" component={ContactInfoScreen} />
      <Stack.Screen name="Notification" component={NotificationScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />

      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Apportionment" component={ApportionmentScreen} />
    </Stack.Navigator>
  );
};

const AuthScreen = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

function Navigation() {
  const { token: isAuth } = useSelector((state) => state.auth);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Splash"
      >
        <Stack.Screen name="Spalsh" component={SplashScreen} />
        {isAuth ? (
          <Stack.Screen name="Main" component={MainScreens} />
        ) : (
          <Stack.Screen name="Auth" component={AuthScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
