import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import getLikedBlogs from "../utils/getLikedBlogs";
import SingleLikedBlog from "../components/SingleLikedBlog";
import { AuthContext, BlogContext } from "../App";

export default function likedBlogsScreen({ navigation }) {
  const { loginDetails } = useContext(AuthContext);
  const { updated, setUpdated } = useContext(BlogContext);
  const isFocussed = useIsFocused();
  const [likedBlogs, setLikedBlogs] = useState([]);
  useEffect(() => {
    if (isFocussed == true) {
      fetch(`http://localhost:5000/api/blog/get/liked/${loginDetails._id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setLikedBlogs(data);
        });
    }
  }, [updated]);
  // console.log(navigation);
  // console.log(route);
  // const { loggedIn, loginDetails, setLoginDetails } = useContext(AuthContext);
  // const { allBlogs } = useContext(BlogContext);
  // const [likedBlogs, setLikedBlogs] = useState([]);
  // const isFocussed = useIsFocused();

  // useEffect(() => {
  //   // fetch(`http://localhost:5000/api/blog/get/liked/${route.params.user._id}`)
  //   //   .then((res) => res.json())
  //   //   .then((data) => setLikedBlogs(data));
  //   // console.log(likedBlogs);
  //   const temp = allBlogs.filter((x) =>
  //     loginDetails.likedBlogsID.includes(x._id)
  //   );
  //   // console.log("temp: ", temp);
  //   setLikedBlogs(temp.reverse());
  // }, [isFocussed, loginDetails]);

  return (
    // <Text>likedBlogsScreen</Text>
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Liked Blogs</Text>
      </View>
      <FlatList
        data={likedBlogs}
        renderItem={({ item }) => <SingleLikedBlog item={item} />}
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
