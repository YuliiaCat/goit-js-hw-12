import{a as f,S as w,i}from"./assets/vendor-c493984e.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))g(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const u of r.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&g(u)}).observe(document,{childList:!0,subtree:!0});function c(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function g(t){if(t.ep)return;t.ep=!0;const r=c(t);fetch(t.href,r)}})();f.defaults.baseURL="https://pixabay.com";async function h(s,e){return(await f.get("/api/",{params:{key:"44352919-dbe9ef0ac86097ad22a8e9457",q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:e}})).data}function y(s){return s.map(e=>`<li class="gallery-item">
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
  `).join("")}const p=document.querySelector(".load-more-btn"),S=document.querySelector(".search-form"),q=document.querySelector(".search-input"),d=document.querySelector(".gallery"),v=document.querySelector(".loader");let n,l="",m;const x=15;let b=new w(".gallery a",{captions:!0,captionDelay:250,captionPosition:"bottom",captionsData:"alt"});S.addEventListener("submit",async s=>{if(s.preventDefault(),l=s.target.elements.query.value.trim(),n=1,L(),a(),d.innerHTML="",l===""){i.error({position:"topRight",message:"Please enter some text"}),o();return}try{const e=await h(l,n);if(m=Math.ceil(e.totalHits/x),e.hits&&e.hits.length>0){const c=y(e.hits);d.insertAdjacentHTML("beforeend",c),o(),a(),b.refresh()}else i.error({position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"}),o(),a()}catch(e){console.log(e),a(),o(),i.error({position:"topRight",message:"Sorry, the request can't be completed at this time. Please try again"})}q.value="",P()});p.addEventListener("click",async()=>{n++,L(),a();try{const s=await h(l,n),e=y(s.hits);d.insertAdjacentHTML("beforeend",e),b.refresh(),$()}catch(s){console.log(s),i.error({position:"bottomRight",message:"Sorry, the request can't be completed at this time. Please try again"})}o(),P()});function R(){p.classList.remove("visually-hidden")}function a(){p.classList.add("visually-hidden")}function L(){v.classList.remove("visually-hidden")}function o(){v.classList.add("visually-hidden")}function P(){n>=m?(a(),m&&(i.info({position:"bottomRight",message:"We're sorry, but you've reached the end of search results"}),a())):R()}function $(){const e=d.children[0].getBoundingClientRect().height;scrollBy({top:e*2,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
