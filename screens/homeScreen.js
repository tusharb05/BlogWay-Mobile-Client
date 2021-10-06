import React, { useEffect, useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { BlogContext, AuthContext } from "../App";
import Header from "../components/Header";
import SingleBlog from "../components/SingleBlog";

export default function homeScreen({ navigation }) {
  const { allBlogs, setAllBlogs, updated, setUpdated } =
    useContext(BlogContext);
  const { loginDetails, setLoginDetails, loggedIn, setLoggedIn } =
    useContext(AuthContext);
  // const [updated, setUpdated] = useState(false);
  const isFocussed = useIsFocused();

  const fetchData = () => {
    fetch("http://localhost:5000/api/blog/get/all")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setAllBlogs(data);
      });
    console.log("fetched data!");
  };

  const fetchUserData = () => {
    fetch("http://localhost:5000/api/user/get/data", {
      method: "POST",
      body: JSON.stringify({ userID: loginDetails._id }),
      headers: { "Content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.details);
        // console.log(data.details);
        setLoginDetails(data.details);
      });
  };

  useEffect(() => {
    // console.log("useEffect triggered");
    fetchData();
    if (loggedIn) {
      fetchUserData();
    }
    // console.log(loggedIn);
    // if (loggedIn) {
    // fetchUserData();
    // let temp = loginDetails.likedBlogsID
    // temp.push()
    // }
  }, [updated, isFocussed]);

  return (
    <View style={styles.homeContainer}>
      <Header navigation={navigation} />
      <View style={styles.allBlogsContainer}>
        <FlatList
          data={allBlogs}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            // <View style={styles.blog}>
            <SingleBlog
              item={item}
              loginDetails={loginDetails}
              loggedIn={loggedIn}
              updated={updated}
              setUpdated={setUpdated}
              setLoginDetails={setLoginDetails}
            />
            //   <View style={styles.blogHead}>
            //     {/* <Text style={styles.blogTitle}>{item.title}</Text> */}
            //     {item.title.length > 53 ? (
            //       <Text style={styles.blogTitle}>
            //         {item.title.substring(0, 53)}...
            //       </Text>
            //     ) : (
            //       <Text style={styles.blogTitle}>{item.title}</Text>
            //     )}

            //     <View style={styles.btns}>
            //       {loggedIn &&
            //         (!loginDetails.likedBlogsID.includes(item._id) ? (
            //           <TouchableOpacity>
            //             <AntDesign name="like2" size={20} color="#F8F0DF" />
            //             {/* <Text>like</Text> */}
            //           </TouchableOpacity>
            //         ) : (
            //           <TouchableOpacity>
            //             <AntDesign name="like1" size={20} color="#3DB2FF" />
            //           </TouchableOpacity>
            //         ))}
            //       {loginDetails._id === item.authorID && (
            //         <TouchableOpacity>
            //           <Feather name="trash-2" size={20} color="#FF2442" />
            //         </TouchableOpacity>
            //       )}
            //     </View>
            //   </View>
            //   {item.body.length > 120 ? (
            //     <Text style={styles.blogBody}>
            //       {item.body.substring(0, 120)}...
            //     </Text>
            //   ) : (
            //     <Text style={styles.blogBody}>{item.body}</Text>
            //   )}
            // </View>
          )}
        />
      </View>
      {/* <View style={styles.navContainerView}>
        <TabNavigation />
      </View> */}
      {/* <Text style={{ color: "white", marginTop: 60 }}>homeScreen</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: "#212121",
  },
  allBlogsContainer: {
    marginTop: 60,
    paddingHorizontal: 10,
  },
  navContainerView: {
    // backgroundCOlor: "red",
  },
  // blog: {
  //   backgroundColor: "#152D35",
  //   marginTop: 10,
  //   paddingHorizontal: 5,
  //   borderRadius: 7,
  // },
  // blogTitle: {
  //   color: "#fff",
  //   fontSize: 21,
  // },
  // blogBody: {
  //   color: "#eee",
  //   fontSize: 17,
  //   paddingTop: 1,
  //   paddingBottom: 10,
  //   paddingHorizontal: 10,
  // },
  // btns: {
  //   flexDirection: "row",
  //   width: 50,
  //   justifyContent: "space-between",
  // },
  // blogHead: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   borderBottomWidth: 1,
  //   borderBottomColor: "#eee",
  //   // borderStyle: "dotted",
  //   paddingVertical: 5,
  //   paddingHorizontal: 5,
  //   marginBottom: 10,
  // },
});
