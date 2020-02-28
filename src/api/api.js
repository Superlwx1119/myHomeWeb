import axios from 'axios'
import qs from 'qs'
let baseUrl=""
if(process.env.NODE_ENV=='development'){
  baseUrl='/'
}else{
  baseUrl='http://148.70.94.32:5050' 
}
export const BaseUrl = baseUrl

const request = axios.create({
    baseURL: baseUrl, // api 的 base_url
    timeout: 20000 // request timeout
})

export function getDetail(data){
    return request({
      url: 'api/getDetail',
      method: 'post',
      data: data
      /*  headers: {'Content-Type': 'application/x-www-form-urlencoded'}, */
    })
}

export function getComments(data) {
    return request({
      url: 'api/getComments',
      method: 'post',
    //   data,
    //   params: data
      /*  headers: {'Content-Type': 'application/x-www-form-urlencoded'}, */
    })
}

export function getImages(data) {
    return request({
      url: 'static/'+data.url,
      method: 'get',
    //   params:data
    })
}

export function getUser(data) {
    return request({
      url: 'api/getUser',
      method: 'post',
      data:data
      /*  headers: {'Content-Type': 'application/x-www-form-urlencoded'}, */
    })
}

export function fileUpload(data) {
    return request({
      url: 'api/fileUpload',
      method: 'post',
      data:data
      /*  headers: {'Content-Type': 'application/x-www-form-urlencoded'}, */
    })
}

export function getValue(data) {
    return request({
      url: 'api/getValue',
      method: 'get',
    //   data,
    //   params: data
      /*  headers: {'Content-Type': 'application/x-www-form-urlencoded'}, */
    })
}
export function getMyRecord(data) {
    return request({
      url: 'api/getMyRecord',
      method: 'post',
    //   data,
    //   params: data
      /*  headers: {'Content-Type': 'application/x-www-form-urlencoded'}, */
    })
}