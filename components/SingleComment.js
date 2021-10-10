import React, { useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Feather, AntDesign } from "react-native-vector-icons";
import { AuthContext } from "../App";

export default function SingleComment(props) {
  const { _id, author, authorID, blogID, comment } = props.commentDetails;
  // console.log("props: ", props);
  const { loginDetails } = useContext(AuthContext);

  const handleDelete = () => {
    fetch("http://localhost:5000/api/blog/comment/delete", {
      method: "POST",
      body: JSON.stringify({ commentID: _id, blogID: blogID }),
      headers: { "Content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data: ", data);
        let temp = props.comments.filter((x) => x._id !== _id);
        props.setComments(temp);
        props.setComCount(props.comCount - 1);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.commentTitleContainer}>
        <Text style={styles.author}>{author}</Text>
        {authorID === loginDetails?._id && (
          <TouchableOpacity
            style={styles.deleteIconContainer}
            onPress={handleDelete}
          >
            <Feather name="trash-2" size={20} color="#FF2442" />
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.comment}>{comment}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginBottom: 10,
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
  commentTitleContainer: {
    // backgroundColor: "blue",
    flexDirection: "row",
  },
  deleteIconContainer: {
    marginLeft: 30,
    marginTop: 5,
  },
});
