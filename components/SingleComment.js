import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function SingleComment(props) {
  const { _id, author, authorID, blogID, comment } = props.commentDetails;
  console.log("props: ", props);
  return (
    <View style={styles.container}>
      <Text style={styles.author}>{author}</Text>
      <Text style={styles.comment}>{comment}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  author: {
    color: "#eee",
    fontWeight: "700",
    fontSize: 20,
  },
  comment: {
    color: "white",
    fontSize: 21,
  },
});
