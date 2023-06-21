import React, { useEffect, useState } from "react";
import { allInfluencers } from "../APIs/DatabaseApis";
function useAllInfluencers(state) {
  const [users, setUsers] = useState([]);
  const ress = JSON.parse(localStorage.getItem("user"));
  let token = atob(ress.token);
  const getAllUsers = async () => {
    try {

      const influencers = await allInfluencers();
      setUsers(influencers);
    } catch (e) {
      console.log(e.message);
    }
  };
  useEffect(() => {
    return () => getAllUsers();
  }, [state]);
  return users;
}

export default useAllInfluencers;
