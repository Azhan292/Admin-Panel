import React, {useState, useEffect} from 'react'

const useAllInfluencer = (flag) => {
    const [users, setUsers] = useState([]);
    const ress = JSON.parse(localStorage.getItem("user"));
    let token = atob(ress.token);

    const getInfluencerData = async() => {
        try {
            let url = process.env.REACT_APP_BASE_URL + "influencer/allInfluencers";
            const res = await fetch(url, {
              method: "GET",
              headers: {
                Accept: "application.json",
                "Content-Type": "application/json",
                Authorization: "JWT " + token,
              },
              // body: JSON.stringify({ token }),
            });
  
            const is = await res.json();
            setUsers(is)   
        } catch (error) {
            console.log(error);
            return null
        }
    }

    useEffect(() => {
      
        getInfluencerData();
      }, [flag]);
  return users
}

export default useAllInfluencer