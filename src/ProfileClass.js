import { useEffect ,useState } from "react";
import { Github_API_User, Github_UserName, options } from "../constants";
import ProfileUserClass from "./ProfileUserClass";

const Profile = () => {
  const [userInfo, setuserInfo] = useState({name : "",bio :""});

  useEffect(()=>{
    fetchUserInfo();
  },[])

  async function fetchUserInfo(){
    const response =await fetch(Github_API_User + Github_UserName , options);
    const json =await response.json();
    console.log(json);
    setuserInfo(json);
  }

  return (
    <>
      {userInfo === "" ? null : (
          <div className="profile-class-container">
            <div className="profile-container">
              <h1 className="profile-title">About Me</h1>
              <ProfileUserClass data={userInfo}/>
            </div>
          </div>
      )}
    </>
  )

}
export default Profile

