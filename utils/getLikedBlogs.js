export default function (userID) {
  // const dataReturned = []
  fetch(`http://localhost:5000/api/blog/get/liked/${userID}`)
    .then((res) => res.json())
    .then((data) => data);
}
