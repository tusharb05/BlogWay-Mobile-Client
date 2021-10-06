export default function unlikeRequest(userID, blogID) {
  fetch("http://localhost:5000/api/blog/unlike", {
    method: "POST",
    body: JSON.stringify({ userID, blogID }),
    headers: { "Content-type": "application/json" },
  });
}
