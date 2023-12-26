import React from 'react';
import styles from "../styles/ProfileInfo.module.css";
// import userimg from "../../public/img/userimg.png" // 일단 기본 이미지 넣어서 띄워봄

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
          width: "90%",
          marginLeft : "70px",
          borderBottom: "4px solid #aaa",
          lineHeight: "0.5em",
        }}
      />
      
      <div className={styles.profileImg}>
        <img src="/img/userimg.png" alt="profile" /> 
      </div>
      
      <div style={{margin : "20px"}} className={styles.profileDetails}>
        {/* <img src= {userimg} /> */}
        <div>
          <p> 이름 </p>
          <p style={{fontSize: "1.3rem", color: "darkblue"}}>{name}</p>
        </div>
        <div
          style={{
            marginTop: "30px",
            marginBottom: "30px",
          }}
        >
        <p> 이메일 </p>
        <p style={{fontSize: "1.3rem", color: "darkblue"}}>{email}</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo;