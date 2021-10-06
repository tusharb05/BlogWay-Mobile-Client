import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { AuthContext } from "../App";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setLoginDetails, setLoggedIn } = useContext(AuthContext);

  const handleSubmit = () => {
    if (email !== "" && password !== "") {
      fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "logged in") {
            // console.log(data);
            const { username, email, password, _id, likedBlogsID } = data;
            setLoginDetails({ username, email, password, _id, likedBlogsID });
            setLoggedIn(true);
            navigation.navigate("Home");
          } else {
            // console.log(data);
            alert(data.status);
          }
        });
    }
  };

  return (
    <View style={{ marginTop: 100 }}>
      {/* <Text>{username}</Text> */}
      <Text style={styles.heading}>Log in!</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(val) => setEmail(val)}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={(val) => setPassword(val)}
        placeholder="Password"
      />
      <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
        <Text style={{ fontSize: 19, fontWeight: "550", color: "#fff" }}>
          Log me in!
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 45,
    margin: 12,
    borderWidth: 1,
    borderColor: "#5C7AEA",
    paddingLeft: 10,
    borderRadius: 10,
    fontSize: 18,
  },
  heading: {
    fontSize: 28,
    fontWeight: "700",
    marginHorizontal: "auto",
  },
  btn: {
    backgroundColor: "#5C7AEA",
    width: 150,
    marginHorizontal: "auto",
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 8,
    paddingBottom: 10,
    borderRadius: 10,
  },
});
