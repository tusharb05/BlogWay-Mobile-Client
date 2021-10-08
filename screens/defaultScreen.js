import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AuthContext } from "../App";
import homeScreen from "./homeScreen";
import likedBlogsScreen from "./likedBlogsScreen";
import addBlogScreen from "./addBlogScreen";

const Tab = createBottomTabNavigator();

export default function defaultScreen() {
  const { loginDetails, loggedIn } = useContext(AuthContext);
  useEffect(() => {
    console.log("updated");
  }, [loggedIn]);
  // console.log(loginDetails);
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={homeScreen}
        options={{ header: () => null }}
      />
      {loggedIn && (
        <Tab.Screen
          name="Liked Blogs"
          component={likedBlogsScreen}
          options={{ header: () => null }}
        />
      )}
      {loggedIn && (
        <Tab.Screen
          name="Add Blog"
          component={addBlogScreen}
          options={{ header: () => null }}
        />
      )}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
