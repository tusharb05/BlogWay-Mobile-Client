import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Feather, AntDesign } from "react-native-vector-icons";
import { AuthContext } from "../App";

export default function blogDetailsScreen({ route, navigation }) {
  const { title, body, likeCount, commentCount, _id } = route.params.item;
  const { loginDetails } = useContext(AuthContext);

  const like = () => {};

  const unlike = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <View style={styles.bodyContainer}>
        <Text style={styles.bodyText}>{body}</Text>
      </View>
      <View style={styles.likeContainer}>
        {!loginDetails?.likedBlogsID?.includes(_id) ? (
          <TouchableOpacity style={{ justifyContent: "center" }} onPress={like}>
            <AntDesign name="like2" size={20} color="#F8F0DF" />
            {/* <Text>like</Text> */}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{ justifyContent: "center" }}
            onPress={unlike}
          >
            <AntDesign name="like1" size={20} color="#3DB2FF" />
          </TouchableOpacity>
        )}
        <Text style={{ color: "white", fontSize: 17 }}>{likeCount}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#212121",
    overflow: "scroll",
    paddingVertical: 10,
  },
  titleContainer: {
    // backgroundColor: "red",
    marginHorizontal: 10,
    marginTop: 30,
    marginBottom: 20,
    textAlign: "center",
  },
  titleText: {
    fontSize: 23,
    color: "white",
    fontWeight: "700",
  },
  bodyContainer: {
    marginHorizontal: 10,
    textAlign: "center",
  },
  bodyText: {
    fontSize: 20,
    color: "white",
  },
});
