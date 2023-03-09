import axios from "axios";
axios.defaults.withCredentials = true;
/**
 * 登录功能
 * @param {object} loginInfo 信息对象
 */
export async function login(loginInfo) {
  axios.defaults.withCredentials = true;
  // 接口地址 post http://study.yuanjin.tech/api/user/login，使用了代理解决浏览器跨域问题
  let resp = await axios.post("http://localhost:8083/api/v1/user/login?username="+loginInfo.username+"&password="+loginInfo.password);
  return resp.data;
}

/**
 * 使用保存在浏览器中的 token 换取已登录的用户信息
 */
export async function accessConfig() {
  axios.defaults.withCredentials = true;
  // get http://study.yuanjin.tech/api/user/whoami
  // authorization: bearer token xxxxx

  // 利用 token 换取用户信息
  let userResp = await axios.get("http://localhost:8083/api/v1/user/info");
  return userResp.data.data; // 服务器返回的用户信息
}

/**
 * 通过清除令牌注销用户
 */
export function logout() {
  localStorage.removeItem("token");
  axios.post("http://localhost:8083/api/v1/user/logout").then(()=>{

  })
}

/**
 * 更新用户信息
 * @param {object} userInfo
 * @returns {any}
 */
export async function update(userInfo){
  axios.defaults.withCredentials = true;
  let resp = await axios.post("http://localhost:8083/api/v1/user/update", userInfo);
  return resp.data;
}
/**
 * 注册用户
 * @param {object} userInfo
 */
export async function logup(userInfo) {

  // post http://study.yuanjin.tech/api/user/reg
  let resp = await axios.post("http://localhost:8083/api/v1/user/register", userInfo);
  return resp.data;
}

export async function favoriteArt(id){
  axios.defaults.withCredentials = true;
  let resp = await axios.post('http://localhost:8083/api/v1/collect/favorite?articleId='+id);
  return resp.data;
}

export async function likeArt(id){

  let resp = await axios.post('http://localhost:8083/api/v1/collect/like?articleId='+id);
  return resp.data;
}

export async function comment(comment, articleId){
  let data = {
    content: comment,
    cId: articleId
  };
  let resp = await axios.post('http://localhost:8083/api/v1/comments/add', data);
  return resp.data;
}
