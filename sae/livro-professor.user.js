// ==UserScript==
// @name        Livro Digital (Professor)
// @namespace   Hiro Scripts
// @match       https://livrodigital.sae.digital/@mount*
// @grant       none
// @version     1.1
// @author      Hiro
// @require     https://github.com/caffwydev/cdn/blob/main/LivroDigital.js?raw=true
// @description 28/05/2024, 16:01:28
// ==/UserScript==

const sweetAlertScriptUrl =
  "https://cdn.jsdelivr.net/npm/sweetalert2@11.10.6/dist/sweetalert2.all.min.js";
const sweetAlertCssUrl =
  "https://cdn.jsdelivr.net/npm/sweetalert2@11.10.6/dist/sweetalert2.min.css";
const notiflixCssUrl =
  "https://cdn.jsdelivr.net/npm/notiflix@3.2.7/src/notiflix.min.css";
const notiflixJsUrl =
  "https://cdn.jsdelivr.net/npm/notiflix@3.2.7/dist/notiflix-aio-3.2.7.min.js";
function injectCSS(url) {
  return new Promise((resolve, reject) => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = url;
    link.onload = resolve;
    link.onerror = reject;
    document.head.appendChild(link);
  });
}


function injectScript(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = url;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}


if (window.top !== window.self) {
  let sstyle = document.createElement('style');
  sstyle.textContent = 'a.professor.professor.professor { display: inline !important; }';
  document.documentElement.appendChild(sstyle);
  Promise.all([
    injectScript(sweetAlertScriptUrl),
    injectCSS(sweetAlertCssUrl),
    injectCSS(notiflixCssUrl),
    injectScript(notiflixJsUrl),
  ])
  .then(async () => {
      Swal.fire("Livro Digital (Modo Professor)", "Atualização disponível!", "info")
  })
}
