import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import homeScreen from "./screens/homeScreen";
import loginScreen from "./screens/loginScreen";
import registerScreen from "./screens/registerScreen";
import defaultScreen from "./screens/defaultScreen";
import blogDetailsScreen from "./screens/blogDetailsScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const AuthContext = React.createContext();
export const BlogContext = React.createContext();

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginDetails, setLoginDetails] = useState({});
  const [allBlogs, setAllBlogs] = useState([]);
  const [likedBlogs, setLikedBlogs] = useState([]);
  const [composedBlogs, setComposedBlogs] = useState([]);
  const [updated, setUpdated] = useState(false);
  return (
    <NavigationContainer>
      <AuthContext.Provider
        value={{ loggedIn, setLoggedIn, loginDetails, setLoginDetails }}
      >
        <BlogContext.Provider
          value={{
            allBlogs,
            setAllBlogs,
            likedBlogs,
            setLikedBlogs,
            composedBlogs,
            setComposedBlogs,
            updated,
            setUpdated,
          }}
        >
          <Stack.Navigator>
            <Stack.Screen
              name="DefaultScreen"
              component={defaultScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Login" component={loginScreen} />
            <Stack.Screen name="Register" component={registerScreen} />
            <Stack.Screen
              name="Blog Details"
              component={blogDetailsScreen}
              options={{
                headerShown: true,
                headerStyle: {
                  backgroundColor: "#152D35",
                },
                headerTintColor: "#eee",
                headerTitleStyle: {
                  fontSize: 24,
                },
              }}
            />
          </Stack.Navigator>
        </BlogContext.Provider>
      </AuthContext.Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
