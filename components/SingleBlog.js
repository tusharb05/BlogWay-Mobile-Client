import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Feather, AntDesign } from "react-native-vector-icons";
import makeLikeRequest from "../utils/likeRequest";
import unlikeRequest from "../utils/unlikeRequest";

export default function SingleBlog(props) {
  const { item, loggedIn, loginDetails, updated, setUpdated, setLoginDetails } =
    props;
  const like = () => {
    makeLikeRequest(loginDetails?._id, item._id);
    if (loggedIn) {
      let arr = loginDetails.likedBlogsID;
      arr.push(item._id);
      setLoginDetails({ ...loginDetails, likedBlogsID: arr });
      setUpdated(!updated);
    }
  };

  const unlike = () => {
    unlikeRequest(loginDetails?._id, item._id);
    if (loggedIn) {
      console.log("likedBlogsID: ", loginDetails.likedBlogsID);
      let arr = loginDetails.likedBlogsID;
      let temp = arr.splice(arr.indexOf(item._id));
      // console.log(temp);
      // setLoginDetails({ ...loginDetails, likedBlogsID: temp });
      setUpdated(!updated);
    }
  };

  return (
    <View style={styles.blog}>
      <View style={styles.blogHead}>
        {/* <Text style={styles.blogTitle}>{item.title}</Text> */}
        {item.title.length > 53 ? (
          <Text style={styles.blogTitle}>{item.title.substring(0, 53)}...</Text>
        ) : (
          <Text style={styles.blogTitle}>{item.title}</Text>
        )}

        <View style={styles.btns}>
          {loggedIn &&
            (!loginDetails.likedBlogsID.includes(item._id) ? (
              <TouchableOpacity
                style={{ justifyContent: "center" }}
                onPress={like}
              >
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
            ))}
          {loginDetails._id === item.authorID && (
            <TouchableOpacity style={{ justifyContent: "center" }}>
              <Feather name="trash-2" size={20} color="#FF2442" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {item.body.length > 120 ? (
        <Text style={styles.blogBody}>{item.body.substring(0, 120)}...</Text>
      ) : (
        <Text style={styles.blogBody}>{item.body}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  blog: {
    backgroundColor: "#152D35",
    marginTop: 10,
    paddingHorizontal: 5,
    borderRadius: 7,
  },
  blogTitle: {
    color: "#fff",
    fontSize: 21,
  },
  blogBody: {
    color: "#eee",
    fontSize: 17,
    paddingTop: 1,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  btns: {
    flexDirection: "row",
    width: 50,
    justifyContent: "space-between",
  },
  blogHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginBottom: 10,
  },
});
