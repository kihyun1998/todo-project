# 당신의 하루 📅

### 프로젝트 개요
##### 소개
- 할 일을 정리하여 당신의 하루를 관리하세요! <br />할 일이 너무 많아 어떤 일을 먼저 할지 모르겠다면 AI에게 맡겨보세요!
##### 목적
- 웹 기술 학습 (Spring Boot, React, MySQL)
- 웹 기술 간의 상호작용 학습
##### 참여 인원
- 4인
##### 사용한 기술 스택
| 용도     | 기술 스택 |
|:--------:|:--------:|
| Front End    | React.js     |
| Back End     | Spring Boot  |
| Database     | MySQL        |
| Server Hosting     | 예정        |

<br />

### 기능 소개

##### 메인
![메인](https://github.com/Seang-G/Photo_Album/assets/61152284/c207035a-18ca-4048-9bb5-39e0b60af64c)
- 서비스를 시작하면 가장 먼저 보이는 페이지
- 다크모드, 테마 변경 지원

  
<br />

##### 회원가입
![회원가입](https://github.com/Seang-G/Photo_Album/assets/61152284/a5a715b8-4d5c-441c-abb9-6d0f399a4ed9)
- 회원가입을 할 수 있는 페이지
- 아이디, 닉네임, 비밀번호(+확인), 이메일, 나이, 직업, 성별 입력
- 몇 가지 규칙 확인
  - 닉네임 및 아이디 중복 여부, 2글자 이상
  - 비밀번호 알파벳, 숫자, 특수문자 포함 여부, 8~30 글자
    
<br />

##### 로그인
![로그인](https://github.com/Seang-G/Photo_Album/assets/61152284/64b2a4b8-b5d4-406d-baac-65c351be68e9)
- 로그인 페이지
- JWT 토큰을 이용한 인증

<br />

##### 메인 (로그인 상태)
![메인_로그인](https://github.com/Seang-G/Photo_Album/assets/61152284/aee9553f-ec04-4751-b3a9-73b159964476)
- 로그인이 된 상태에서의 메인 페이지
- 할 일 목록을 바로 볼 수 있음
- 메인 화면에 표시할 할 일 목록 변경 가능 

<br />

##### 할 일
![할 일](https://github.com/Seang-G/Photo_Album/assets/61152284/7d2dd8a7-e77a-4d83-854a-ba39b3d628e3)
- 할 일을 관리하는 페이지
- 할 일 추가, 삭제, 수정, 완료 가능
- 할 일 추가시 중요도, 기간, 예상 소요시간, 난이도를 설정할 수 있음 (AI가 할 일 들의 우선순위를 정하는데에 도움이 될 요소)
- ~~AI 정렬기능 (삭제)~~ 먼저 해야할 일을 AI가 추천 (예정)

<br />

##### 내 정보
![내 정보](https://github.com/Seang-G/Photo_Album/assets/61152284/7f04a55a-a01d-41dc-a0cc-aee2392588b3)
- 나의 정보를 확인할 수 있는 페이지
- 비밀번호 변경 가능

<br />

##### 메뉴
<img alt="메뉴" src="https://github.com/Seang-G/Photo_Album/assets/61152284/51e93293-6094-4637-8dc2-33287f97ddf9" height=600 /> <br />
- 어느 페이지에서나 열 수 있는 메뉴
- 다른 페이지 클릭 시 이동
- 할 일 목록 추가, 삭제, 이름 변경
