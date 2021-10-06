export default function makeLikeRequest(userID, blogID) {
  fetch("http://localhost:5000/api/blog/like", {
    method: "POST",
    body: JSON.stringify({
      userID: userID,
      blogID: blogID,
    }),
    headers: {
      "Content-type": "application/json",
    },
  });
}
