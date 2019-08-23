function getDataFromUrl(url) {
  return fetch(url)
    .then((data)=> data.json())
    .catch((err)=> {});
}

export default {
    getDataFromUrl,
};
