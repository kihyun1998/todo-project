import React from 'react';
import styles from "../ProfileInfo.module.css";

function ProfileInfo({ name, email,profileImg }) {
  return (            //위에 나중에 서버랑 맞춰서 써야함
    
    <div className={styles.profileDetails}>
      <h1 style={ {margin : "20px"}}>
        내 정보
      </h1>
      <div
        style={{
          width: "10000%",
          borderBottom: "4px solid #aaa",
          lineHeight: "0.5em",
          margin: "20px 0 20px",
        }}
      />
      
      <div className="profile-img">
        <img src={profileImg} alt="profile image" />
      </div>
      
      <div style={{margin : "20px"}} className={styles.profileDetails}>
        <h2>이름 : {name}</h2>
        <p>이메일 : {email}</p>
      </div>
    </div>
  );
}

export default ProfileInfo;