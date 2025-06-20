import axios from "axios";

const API_KEY = "50837590-b5294368a5e0df0c87d227cce"
const BASE_URL = "https://pixabay.com/api/";

export async function getImagesByQuery(query, page=1) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
    page,
    per_page: 15,
  };
  try {
   const response = await axios.get(BASE_URL, { params });

    return response.data;

  } catch(error) {
   throw new Error("Помилка запиту до API");
 };
}