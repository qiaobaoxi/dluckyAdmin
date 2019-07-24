import axios from 'axios';

let base = '';
let base1 = '/api';
export const requestLogin = params => { return axios.post(`${base1}/login`, params).then(res =>  res.data); };

export const saveNews = params => { return axios.post(`${base1}/saveNews`, params).then(res =>  res.data); };
export const updateNews = params => { return axios.post(`${base1}/updateNews`, params).then(res =>  res.data); };
export const getNewsList = params => { return axios.get(`${base1}/getNewsList`, {params:params}).then(res =>  res.data); };
export const getNewsDes = params => { return axios.get(`${base1}/getNewsDes`, {params:params}).then(res =>  res.data); };
