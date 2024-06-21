import{a as f,i as c,S as w}from"./assets/vendor-c493984e.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))u(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const m of a.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&u(m)}).observe(document,{childList:!0,subtree:!0});function n(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function u(t){if(t.ep)return;t.ep=!0;const a=n(t);fetch(t.href,a)}})();f.defaults.baseURL="https://pixabay.com";async function h(s,e){return(await f.get("/api/",{params:{key:"44352919-dbe9ef0ac86097ad22a8e9457",q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:e}})).data}function y(s){return s.map(e=>`<li class="gallery-item">
      <div class="image-cont">
        <a class="gallery-link" href="${e.largeImageURL}">
          <img class="gallery-image" src="${e.webformatURL}" alt="${e.tags}" />
        </a>
        <div class="image-descr">
          <div class="descr-box">
            <p class="image-feature">Likes</p>
            <p class="image-data">${e.likes}</p>
          </div>
          <div class="descr-box">
            <p class="image-feature">Views</p>
            <p class="image-data">${e.views}</p>
          </div>
          <div class="descr-box">
            <p class="image-feature">Comments</p>
            <p class="image-data">${e.comments}</p>
          </div>
          <div class="descr-box">
            <p class="image-feature">Downloads</p>
              <p class="image-data">${e.downloads}</p>
          </div>
        </div>
      </div>
    </li>
  `).join("")}const g=document.querySelector(".load-more-btn"),P=document.querySelector(".search-form"),x=document.querySelector(".search-input"),d=document.querySelector(".gallery"),v=document.querySelector(".loader");let i,l="",p;const S=15;P.addEventListener("submit",async s=>{if(s.preventDefault(),l=s.target.elements.query.value.trim(),i=1,b(),r(),d.innerHTML="",l===""){c.error({position:"topRight",message:"Please enter some text"}),o();return}try{const e=await h(l,i);if(p=Math.ceil(e.totalHits/S),e.hits&&e.hits.length>0){const n=y(e.hits);d.insertAdjacentHTML("beforeend",n),o(),r(),new w(".gallery a",{captions:!0,captionDelay:250,captionPosition:"bottom",captionsData:"alt"}).refresh()}else c.error({position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"}),o(),r()}catch(e){console.log(e),r(),o(),c.error({position:"topRight",message:"Sorry, the request can't be completed at this time. Please try again"})}x.value="",L()});g.addEventListener("click",async()=>{i++,b(),r();try{const s=await h(l,i),e=y(s.hits);d.insertAdjacentHTML("beforeend",e),R()}catch(s){console.log(s)}o(),L()});function q(){g.classList.remove("visually-hidden")}function r(){g.classList.add("visually-hidden")}function b(){v.classList.remove("visually-hidden")}function o(){v.classList.add("visually-hidden")}function L(){i>=p?(r(),p&&(c.info({position:"bottomRight",message:"We're sorry, but you've reached the end of search results"}),r())):q()}function R(){const e=d.children[0].getBoundingClientRect().height;scrollBy({top:e*2,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
