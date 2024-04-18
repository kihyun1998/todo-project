export const logout = (preString="") => {
  sessionStorage.removeItem("accessToken")
  alert(preString + "로그아웃 되었습니다.")
  window.location.href="/"
}