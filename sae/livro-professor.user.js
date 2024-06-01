// ==UserScript==
// @name        Livro Digital (Professor)
// @namespace   Hiro Scripts
// @match       https://livrodigital.sae.digital/@mount*
// @grant       GM_xmlhttpRequest
// @grant       GM_setValue
// @grant       GM_getValue
// @version     1.0
// @author      Hiro
// @description 28/05/2024, 16:01:28
// ==/UserScript==

if (window.top !== window.self) {
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

  Promise.all([
    injectScript(sweetAlertScriptUrl),
    injectCSS(sweetAlertCssUrl),
    injectCSS(notiflixCssUrl),
    injectScript(notiflixJsUrl),
  ]).then(async () => {
    GM_xmlhttpRequest({
      method: "GET",
      url: "https://github.com/duckymods/Mods/raw/main/sae/livro-professor.js", // Replace with your script URL
      onload: function (response) {
        const text = response.responseText;
        const storedScript = GM_getValue("script", "");
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        if (text !== storedScript) {
          Toast.fire({
            icon: "info",
            title: "Atualizando mod!"
          });
          setTimeout(() => {
            GM_setValue("script", text);
            Toast.fire({
              icon: "success",
              title: "Mod atualizado e injetado!"
            });
            eval(text);
          }, 500);
        } else {
          Toast.fire({
            icon: "success",
            title: "Mod injetado!"
          });
          eval(storedScript);
        }
      },
      onerror: function (error) {
        console.error("Error checking for updates:", error);
      },
    });
  });
}
