import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"
function useGetAllUsers(trigger, paginationFilters) {
  const ress = JSON.parse(localStorage.getItem("user"));
  let token = window.atob(ress.token);
  console.log(token);
  const [usersX, setUsers] = useState([]);
  console.log("🚀 ~ file: useGetAllUsers.js:9 ~ usersX:", usersX)
  const [countX, setCount] = useState([]);

  const getAllUsers = async () => {
    debugger;
    // let url = process.env.REACT_APP_BASE_URL + "user/allusers";
    // const {limit, limitSkip} = paginationFilters
    // try {
    //   const res = await fetch(`${url}?limit=${limit}&limitSkip=${limitSkip}`, {
    //     method: "GET",
    //     headers: {
    //       Accept: "application.json",
    //       "Content-Type": "application/json",
    //       Authorization: "JWT " + token,
    //     },
    //     // body: JSON.stringify({ token }),
    //   });
    //   const usersX = await res.json();
    //   console.log("🚀 ~ file: useGetAllUsers.js:24 ~ getAllUsers ~ users:", usersX)
    //   setUsers(usersX.users);
    //   setCount(usersX.count);
    // } catch (e) {
    //   console.log(e.message);
  // }
    const querySnapshot = await getDocs(collection(db, "#1234"));
    
    let arr = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      arr.push(doc.data());
      
    });
    setUsers([...arr]);
  };
  console.log("++++++++++++++++",usersX)
  useEffect(() => {
    getAllUsers();
  }, [trigger]);
  return {usersX, countX};
}

export default useGetAllUsers;
