import { getImagesByQuery } from "./js/pixabay-api.js";
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from "./js/render-functions.js";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const form = document.querySelector('.form')
const input = form.elements['search-text'];
const loadMoreBtn = document.querySelector(".load-more");

let currentQuery = "";
let page = 1;
let totalPages = 0;

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const query = input.value.trim();


    if (!query) {
        iziToast.warning({
            title: 'Warning',
            message: 'Please enter a search query!',
            position: 'topRight',
          });
          return;
  }
  currentQuery = query;
  page = 1;
    clearGallery();
    hideLoadMoreButton();
    showLoader();
  try {
    const data = await getImagesByQuery(currentQuery, page)
        if (!data.hits.length) {
          iziToast.error({
            title: "Error",
            message: "Sorry, there are no images matching your search query. Please try again!",
            position: "topRight"
          });
          return;
        }
      
    createGallery(data.hits);
    totalPages = Math.ceil(data.totalHits / 15);
    if (page < totalPages) showLoadMoreButton();
  }
    catch(error){
      iziToast.error({
        title: "Error",
        message: error.message || "An error occurred while fetching images",
        position: "topRight"
      });
    }finally {
        hideLoader();
      form.reset();
    };
})

loadMoreBtn.addEventListener("click", async () => {
  page++;
  showLoader();
  hideLoadMoreButton();
  try {
    const data = await getImagesByQuery(currentQuery, page);
    createGallery(data.hits);
    smoothScroll();
    if (page < totalPages) {
      showLoadMoreButton()
    } else {
      iziToast.info({
        title: "Info",
        message: "We're sorry, but you've reached the end of search results.",
        position: "topRight",
      });
    }

  } catch (error) {
    iziToast.error({
      title: "Error",
      message: error.message,
      position: "topRight",
    });
  } finally {
    hideLoader();
  }
});

function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector(".gallery")
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: "smooth",
  });
}
