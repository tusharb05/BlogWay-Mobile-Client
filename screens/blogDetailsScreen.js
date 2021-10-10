import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import { Feather, AntDesign, Ionicons } from "react-native-vector-icons";
import { AuthContext, BlogContext } from "../App";
import SingleComment from "../components/SingleComment";

export default function blogDetailsScreen({ route, navigation }) {
  const { title, body, likeCount, commentCount, _id, author } =
    route.params.item;
  const { updated, setUpdated } = useContext(BlogContext);
  const { loginDetails, loggedIn } = useContext(AuthContext);

  const [likeC, setLikeC] = useState(likeCount);
  const [comments, setComments] = useState([]);
  const [commentValue, setCommentValue] = useState("");
  const [comCount, setComCount] = useState(commentCount);

  useEffect(() => {
    fetch(`http://localhost:5000/api/blog/comment/get/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setComments(data.comments);
        // console.log(data);
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

  const handleSubmit = () => {
    fetch("http://localhost:5000/api/blog/comment/add", {
      method: "POST",
      body: JSON.stringify({
        authorID: loginDetails._id,
        blogID: _id,
        author: loginDetails.username,
        comment: commentValue,
      }),
      headers: { "Content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "updated") {
          setComCount(comCount + 1);
          setComments(data.comments);
          setCommentValue("");
        }
      });
  };
  // console.log("comments: ", comments);
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <View style={styles.bodyContainer}>
        <Text style={styles.bodyText}>{body}</Text>
      </View>

      <Text style={styles.authorName}>By {author}</Text>

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
        <Text style={styles.commentCountText}>{comCount} Comments</Text>

        <View style={styles.commentForm}>
          <TextInput
            value={commentValue}
            onChangeText={(val) => setCommentValue(val)}
            style={styles.commentInput}
            placeholder="Add a public comment..."
            selectionColor="black"
          />

          <TouchableOpacity
            style={styles.submitBtn}
            onPress={handleSubmit}
            disabled={loggedIn ? false : true}
          >
            <Text style={styles.submitBtnText}>Comment</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.comments}>
          {/* // <SingleComment commentDetails={item} setComments={setComments} /> */}
          <FlatList
            data={comments}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <SingleComment
                commentDetails={item}
                setComments={setComments}
                comments={comments}
                setComCount={setComCount}
                comCount={comCount}
              />
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
  commentInput: {
    height: 40,
    // marginVertical: 15,
    marginTop: 15,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderColor: "#eee",
    color: "#eee",
    fontSize: 19,
  },
  submitBtn: {
    // backgroundColor: "#FF2442",
    borderWidth: 1,
    borderColor: "#FF2442",
    width: "100%",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginHorizontal: "auto",
    // position: "relative",
    // left: 220,
    marginBottom: 20,
  },
  submitBtnText: {
    fontSize: 18,
    color: "white",
    marginHorizontal: "auto",
  },
  authorName: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
    marginHorizontal: "auto",
    marginTop: 13,
    marginBottom: 16,
  },
  commentCountText: {
    color: "white",
    fontSize: 18,
    marginTop: 10,
  },
});
