import { API } from "../config";

const getProducts = sortBy => {
  return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`, {
    method: "GET"
  })
    .then(res => {
      return res.json();
    })
    .catch(err => console.log(err));
};

export default getProducts;
