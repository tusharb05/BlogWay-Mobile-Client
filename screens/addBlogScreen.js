import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import { AuthContext } from "../App";

export default function addBlogScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const { loginDetails } = useContext(AuthContext);

  const compose = () => {
    fetch("http://localhost:5000/api/blog/create", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        body: body,
        author: loginDetails.username,
        authorID: loginDetails._id,
      }),
      headers: { "Content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setTitle("");
        setBody("");
        navigation.navigate("Home");
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.heading}>Compose Something Beautiful!</Text>

        <TextInput
          placeholder="Title"
          style={styles.blogTitle}
          value={title}
          onChangeText={(val) => setTitle(val)}
        />

        <TextInput
          placeholder="Body"
          style={styles.blogBody}
          value={body}
          onChangeText={(val) => setBody(val)}
          multiline={true}
        />

        <Pressable onPress={compose} style={styles.btn}>
          <Text style={styles.btnText}>Publish Blog</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#212121",
    paddingHorizontal: 10,
    paddingTop: 50,
    paddingBottom: 10,
    // backgroundColor: "#152D35",
  },
  formContainer: {
    // backgroundColor: "#152D35",
    flex: 1,
  },
  heading: {
    fontSize: 23,
    fontWeight: "600",
    color: "white",
    marginHorizontal: "auto",
  },
  blogTitle: {
    fontSize: 22,
    height: 50,
    borderWidth: 1,
    padding: 10,
    borderColor: "white",
    color: "white",
    marginTop: 35,
    borderRadius: 5,
  },
  blogBody: {
    fontSize: 20,
    height: 300,
    borderWidth: 1,
    padding: 10,
    borderColor: "white",
    color: "white",
    marginTop: 20,
    borderRadius: 5,
  },
  btn: {
    padding: 10,
    backgroundColor: "#eee",
    backgroundColor: "#FF2442",
    borderRadius: 10,
    marginTop: 13,
    marginHorizontal: "auto",
    width: "90%",
  },
  btnText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
    marginHorizontal: "auto",
  },
});
