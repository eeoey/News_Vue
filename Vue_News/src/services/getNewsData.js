/* 远程获取新闻和新闻类别的数据 */
import axios from "axios";
import { APPCODE } from "./config";

axios.defaults.withCredentials = true;

// 获取新闻类别
export async function getNewsChannels() {
  let resp = await axios.post(
    "http://localhost:8083/api/v1/category/list",
    {
      headers: {
        Authorization: `APPCODE ${APPCODE}`
      }
    }
  );
  return resp.data.data;
}

/**
 * 按照频道，分页获取新闻
 * @param {String} channelId 频道 ID
 * @param {String} page 页码
 * @param {String} maxResult 每页最大请求数
 * @returns {String} 函数返回值注释
 */
export async function getNewsList(channelId, page = 1, maxResult = 10) {
  let resp = axios.post(
    "http://localhost:8083/api/v1/content/?pageNum="+page+"&pageSize="+maxResult,
    {
      categoryId: channelId,
      pageNum: page,
      pageSize: maxResult
    },
    {
      // TIPS 请求头
      headers: {
        Authorization: `APPCODE ${APPCODE}`
      }
    }
  );
  return resp;
}
/**
 * 按照频道，分页获取新闻
 * @param {String} channelId 频道 ID
 * @param {String} page 页码
 * @param {String} maxResult 每页最大请求数
 * @returns {String} 函数返回值注释
 */
 export async function serachList(keyword,channelId, page = 1, maxResult = 10) {
  let resp = axios.post(
    "http://localhost:8083/api/v1/content/search?pageNum="+page+"&pageSize="+maxResult+"&keyword="+keyword,
    {
      categoryId: channelId,
      pageNum: page,
      pageSize: maxResult,
      keyword: keyword
    },
    {
      // TIPS 请求头
      headers: {
        Authorization: `APPCODE ${APPCODE}`
      }
    }
  );
  return resp;
}

export async function detail(id, pageSize) {
  let resp = await axios.post(
    "http://localhost:8083/api/v1/content/detail?id=" +
      id +
      "&page_size=" +
      pageSize
  );
  return resp.data;
}

/**
 * 获取推荐新闻
 * @returns {Promise<any>}
 */
export async function recommend(userId) {
  let resp = await axios.get("http://localhost:8083/api/v1/content/recommend?userId="+userId);
  return resp.data;
}


export async function prePublish(content){
  let resp = await axios.post("http://localhost:8083/api/v1/content/prepublish", content);
  return resp.data;
}
