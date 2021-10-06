import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import homeScreen from "./homeScreen";
import loginScreen from "./loginScreen";

const Tab = createBottomTabNavigator();

export default function defaultScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={homeScreen}
        options={{ header: () => null }}
      />
      {/* <Tab.Screen name="Login" component={loginScreen} /> */}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
