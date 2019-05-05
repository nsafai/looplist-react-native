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

export default postData;