// import React, { useEffect, useState } from "react";
// function useGetAllInfluencerRequests(state) {
//   const ress = JSON.parse(localStorage.getItem("user"));
//   let token = window.atob(ress.token);
//   const [users, setUsers] = useState([]);

//   const getAllUsers = async () => {
//     let url =
//       process.env.REACT_APP_BASE_URL + "influencer/findInfluencersRequests";
//     // let url = "http://localhost:5000/" + "user/allusers";

//     try {
//       const res = await fetch(url, {
//         method: "GET",
//         headers: {
//           Accept: "application.json",
//           "Content-Type": "application/json",
//           Authorization: "JWT " + token,
//         },
//         // body: JSON.stringify({ token }),
//       });
//       const users = await res.json();
//       setUsers(users);
//     } catch (e) {
//       console.log(e.message);
//     }
//   };
//   useEffect(() => {
//     getAllUsers();
//   }, [state]);
//   return users;
// }

// export default useGetAllInfluencerRequests;
