const postData = async (url = ``, data = {}) => {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrer: "no-referrer",
    body: JSON.stringify(data),
  });
  return await response; // parses JSON response into native Javascript objects 
}

const getData = async (url = ``, data = {}) => {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrer: "no-referrer",
    // body: JSON.stringify(data),
  });
  return await response; // parses JSON response into native Javascript objects 
}

const LOCAL_URL = 'http://10.0.1.2:8080';
const PROD_URL = 'https://loop-list.herokuapp.com';
const SCHOOL_URL = 'http://172.30.6.164:8080';
const HOST_URL = PROD_URL;

export {postData, getData, HOST_URL };