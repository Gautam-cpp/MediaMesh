import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Home from "../screens/Home";
import Links from "../screens/Links";
import Tweets from "../screens/Tweets";
import Videos from "../screens/Videos";
import Profile from "../screens/Profile";
import { useAuth } from "../context/AuthContext";

const Tab = createBottomTabNavigator();

export default function AppNavigation() {
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 0,
          height: 60,
          paddingBottom: 6,
        },
        tabBarActiveTintColor: "#6C3DFF",
        tabBarInactiveTintColor: "gray",
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "";

          switch (route.name) {
            case "Home":
              iconName = focused ? "home" : "home-outline";
              break;
            case "Links":
              iconName = focused ? "link" : "link-outline";
              break;
            case "Tweets":
              iconName = focused ? "logo-twitter" : "logo-twitter";
              break;
            case "Videos":
              iconName = focused ? "play-circle" : "play-circle-outline";
              break;
            case "Profile":
              iconName = focused ? "person" : "person-outline";
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Links" component={Links} />
      <Tab.Screen name="Tweets" component={Tweets} />
      <Tab.Screen name="Videos" component={Videos} />
      <Tab.Screen name="Profile" component={Profile}  />
    </Tab.Navigator>
  );
}
