import React from 'react';
import styles from "../ProfileInfo.module.css";
import userimg from "../img/userimg.png" // 일단 기본 이미지 넣어서 띄워봄
function ProfileInfo({ name, email,profileImg }) {
  return (            //위에 나중에 서버랑 맞춰서 써야함  유저 이미지는 src = {이미지} 넣음 ㅇㅇ
    
    <div className={styles.profileDetails}>
      <h1 style={{
        marginLeft : "70px" , marginTop:"50px"
      }}>
        내 정보
      </h1>

      <div
        style={{
          width: "500%",
          marginLeft : "70px",
          borderBottom: "4px solid #aaa",
          lineHeight: "0.5em",
        }}
      />
      
      <div className={styles.profileImg}>
        <img src={userimg} alt="profile image" /> 
      </div>
      
      <div style={{margin : "20px"}} className={styles.profileDetails}>
        {/* <img src= {userimg} /> */}
        
        <p> 이름 </p>
        <p>{name}</p>
        <p> 이메일 </p>
        <p>{email}</p>
      </div>
    </div>
  );
}

export default ProfileInfo;