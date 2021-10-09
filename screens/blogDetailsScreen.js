import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Feather, AntDesign } from "react-native-vector-icons";
import { AuthContext, BlogContext } from "../App";
import SingleComment from "../components/SingleComment";

export default function blogDetailsScreen({ route, navigation }) {
  const { title, body, likeCount, commentCount, _id } = route.params.item;
  const { updated, setUpdated } = useContext(BlogContext);
  const { loginDetails, loggedIn } = useContext(AuthContext);

  const [likeC, setLikeC] = useState(likeCount);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/blog/comment/get/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data);
        console.log(data);
      });
  }, [updated, loginDetails]);

  const like = () => {
    if (loggedIn) {
      fetch("http://localhost:5000/api/blog/like", {
        method: "POST",
        body: JSON.stringify({ userID: loginDetails._id, blogID: _id }),
        headers: { "Content-type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          setUpdated(!updated);
          setLikeC(likeC + 1);
        });
    } else {
      alert("Login first!");
    }
  };

  const unlike = () => {
    fetch("http://localhost:5000/api/blog/unlike", {
      method: "POST",
      body: JSON.stringify({ userID: loginDetails._id, blogID: _id }),
      headers: { "Content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log(data)
        setUpdated(!updated);
        setLikeC(likeC - 1);
      });
  };

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
        <Text style={{ color: "white", fontSize: 17 }}>{likeC}</Text>
      </View>

      <View style={styles.commentContainer}>
        <Text style={{ color: "white" }}>{commentCount} Comments</Text>
        <View style={styles.comments}>
          <FlatList
            data={comments}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <SingleComment commentDetails={item} setComments={setComments} />
            )}
          />
        </View>
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
  likeContainer: {
    // backgroundColor: "red",
    alignItems: "center",
    marginTop: 10,
  },
  commentContainer: {
    justifyContent: "center",
    // alignItems: "center",
    paddingHorizontal: 15,
  },
});
