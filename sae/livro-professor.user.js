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
      url: "https://cdn.jsdelivr.net/gh/duckymods/Mods@main/sae/livro-professor.js",
      onload: function (response) {
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

        // ✅ Verifica status HTTP antes de tudo
        if (response.status !== 200 || !response.responseText) {
          console.warn(`HTTP ${response.status} recebido, modo offline ativado.`);
          if (storedScript !== "") {
            Toast.fire({
              icon: "warning",
              title: `Erro ${response.status} — Modo offline ativado!`
            });
            eval(storedScript);
          } else {
            Toast.fire({
              icon: "error",
              title: `Falha total (HTTP ${response.status}) e sem cache!`
            });
          }
          return;
        }

        const text = response.responseText;
        if (text !== storedScript) {
          Toast.fire({
            icon: "info",
            title: storedScript === "" ? "Instalando mod..." : "Atualizando mod..."
          });
          setTimeout(() => {
            GM_setValue("script", text);
            Toast.fire({
              icon: "success",
              title: storedScript === "" ? "Mod instalado!" : "Mod atualizado!"
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
        console.warn("Erro de rede, modo offline:", error);
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

        if (storedScript !== "") {
          Toast.fire({
            icon: "warning",
            title: "Sem conexão — Modo offline ativado!"
          });
          eval(storedScript);
        } else {
          Toast.fire({
            icon: "error",
            title: "Falha total: sem conexão e sem script salvo!"
          });
        }
      },
    });
  });
}
