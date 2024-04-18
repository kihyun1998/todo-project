import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { logout } from "../functions/auth";

const CHECK_TIME = 5 * 60 * 1000;

export default function ExpiredChecker() {

  const refreshAccessToken = async() => {
      try {
        const res = await axios.get("/api/v1/user/refresh");
        sessionStorage.setItem("accessToken", res.data);
      } catch(err) {
        if (err.response.status === 401) {
          logout("세션이 만료되어 ");
        } else {console.log(err.response);}
      }
  }

  useEffect(()=>{
    const interval = setInterval(()=>{
      let accessToken = sessionStorage.getItem("accessToken")
      if (accessToken && (Date.now()+CHECK_TIME)/1000 >= jwtDecode(accessToken).exp) {
        refreshAccessToken();
      }
    }, CHECK_TIME)

    return() => clearInterval(interval); 
  }, [])

  return (<div style={{display:"none"}} />);
}