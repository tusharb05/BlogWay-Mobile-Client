import React, { useContext } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../App";

export default function Header({ navigation }) {
  const { loggedIn } = useContext(AuthContext);
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>Home</Text>
      {!loggedIn && (
        <View style={styles.headerBtns}>
          <Button
            title="Login"
            color="#77D970"
            onPress={() => navigation.push("Login")}
          />
          <Button
            title="Register"
            color="#FF2442"
            onPress={() => navigation.push("Register")}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    width: "100%",
    position: "absolute",
    top: 0,
    position: "fixed",
    backgroundColor: "#112031",
    flexDirection: "row",
    alignItems: "center",
  },
  headerBtns: {
    flexDirection: "row",
    height: 35,
    width: 140,
    justifyContent: "space-between",
    position: "absolute",
    right: 10,
    top: 14,
  },
  headerText: {
    color: "#fff",
    fontSize: 25,
    marginLeft: 15,
  },
});
