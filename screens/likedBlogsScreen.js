import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import getLikedBlogs from "../utils/getLikedBlogs";
import SingleLikedBlog from "../components/SingleLikedBlog";
import { AuthContext, BlogContext } from "../App";

export default function likedBlogsScreen({ navigation }) {
  const { loginDetails } = useContext(AuthContext);
  const { updated, setUpdated, allBlogs } = useContext(BlogContext);
  const isFocused = useIsFocused();
  const [likedBlogs, setLikedBlogs] = useState([]);

  useEffect(() => {
    let temp = [];
    // console.log(loginDetails.likedBlogsID);
    // console.log("useFetch triggered from likedBlogScreen");
    allBlogs.map((blog) => {
      if (loginDetails.likedBlogsID.includes(blog._id)) {
        temp.push(blog);
      }
    }); //loginDetails is not updated
    // console.log("temp: ", temp);
    setLikedBlogs(temp);
  }, [updated, isFocused, loginDetails]);

  return (
    // <Text>likedBlogsScreen</Text>
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Liked Blogs</Text>
      </View>
      <FlatList
        data={likedBlogs}
        renderItem={({ item }) => (
          <SingleLikedBlog
            item={item}
            likedBlogs={likedBlogs}
            setLikedBlogs={setLikedBlogs}
          />
        )}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#212121",
  },
  header: {
    width: "100%",
    backgroundColor: "#112031",
    paddingTop: 30,
    paddingBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    color: "#eee",
    fontWeight: "600",
    fontSize: 30,
  },
});
