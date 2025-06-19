import"./assets/styles-Dc5GuO5k.js";import{a as w,S as L,i as s}from"./assets/vendor-Bq379mSf.js";const v="50837590-b5294368a5e0df0c87d227cce",S="https://pixabay.com/api/";async function c(t,r=1){const e={key:v,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:15};try{return(await w.get(S,{params:e})).data}catch{throw new Error("Помилка запиту до API")}}const d=document.querySelector(".gallery"),h=document.querySelector(".loader"),u=document.querySelector(".load-more");let o;function m(t){const r=t.map(e=>`
        <li class="gallery-item">
          <a href="${e.largeImageURL}">
            <img 
              src="${e.webformatURL}" 
              alt="${e.tags}" 
              class="gallery-image"
            >
          </a>
          <div class="image-info">
            <p><b>Likes:</b> ${e.likes}</p>
            <p><b>Views:</b> ${e.views}</p>
            <p><b>Comments:</b> ${e.comments}</p>
            <p><b>Downloads:</b> ${e.downloads}</p>
          </div>
        </li>
      `).join("");d.insertAdjacentHTML("beforeend",r),o?o.refresh():o=new L(".gallery a",{captionsData:"alt",captionDelay:250})}function q(){d.innerHTML="",o&&o.destroy(),o=null}function g(){h.classList.remove("hidden")}function p(){h.classList.add("hidden")}function y(){u.classList.remove("hidden")}function f(){u.classList.add("hidden")}const n=document.querySelector(".form"),E=n.elements["search-text"],R=document.querySelector(".load-more");let i="",a=1,l=0;n.addEventListener("submit",async t=>{t.preventDefault();const r=E.value.trim();if(!r){s.warning({title:"Warning",message:"Please enter a search query!",position:"topRight"});return}i=r,a=1,q(),f(),g();try{const e=await c(i,a);if(!e.hits.length){s.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}m(e.hits),l=Math.ceil(e.totalHits/15),a<l&&y()}catch(e){s.error({title:"Error",message:e.message||"An error occurred while fetching images",position:"topRight"})}finally{p(),n.reset()}});R.addEventListener("click",async()=>{a++,g(),f();try{const t=await c(i,a);m(t.hits),B(),a<l?y():s.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})}catch(t){s.error({title:"Error",message:t.message,position:"topRight"})}finally{p()}});function B(){const{height:t}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
