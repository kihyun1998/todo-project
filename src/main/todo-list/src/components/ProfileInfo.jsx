import React from 'react';
import styles from "../styles/ProfileInfo.module.css";
// import userimg from "../../public/img/userimg.png" // 일단 기본 이미지 넣어서 띄워봄

function ProfileInfo({ name, email,profileImg }) {
  return (            //위에 나중에 서버랑 맞춰서 써야함  유저 이미지는 src = {이미지} 넣음 ㅇㅇ
    
    <div className={styles.profile}>
      <h1>
        내 정보
      </h1>

      <div
        className={styles.hr}
      />
      
      <div className={styles.profileImg}>
        <img src="/img/userimg.png" alt="profile" /> 
      </div>
      
      <div className={styles.profileDetails}>
        <div>
          <h2>이름</h2>
          <p>{name}</p>
        </div>
        <div>
          <h2>이메일</h2>
          <p>{email}</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo;