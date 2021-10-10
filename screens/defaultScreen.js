import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AuthContext } from "../App";
import homeScreen from "./homeScreen";
import likedBlogsScreen from "./likedBlogsScreen";
import addBlogScreen from "./addBlogScreen";

import { AntDesign, Ionicons } from "react-native-vector-icons";

const Tab = createBottomTabNavigator();

export default function defaultScreen() {
  const { loginDetails, loggedIn } = useContext(AuthContext);
  useEffect(() => {
    console.log("updated");
  }, [loggedIn]);
  // console.log(loginDetails);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "ios-home" : "ios-home-outline";
          } else if (route.name === "Liked Blogs") {
            iconName = focused ? "like1" : "like2";
          } else if (route.name === "Add Blog") {
            iconName = focused ? "create" : "create-outline";
          }

          if (iconName === "like1" || iconName === "like2") {
            return <AntDesign name={iconName} size={24} color="black" />;
          } else {
            return <Ionicons name={iconName} size={24} color="#152D35" />;
          }
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={homeScreen}
        options={{ header: () => null, title: "" }}
      />
      {loggedIn && (
        <Tab.Screen
          name="Liked Blogs"
          component={likedBlogsScreen}
          options={{ header: () => null, title: "" }}
        />
      )}
      {loggedIn && (
        <Tab.Screen
          name="Add Blog"
          component={addBlogScreen}
          options={{ header: () => null, title: "" }}
        />
      )}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
