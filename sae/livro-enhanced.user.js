// ==UserScript==
// @name        Livro Digital Enhanced
// @namespace   Hiro Scripts
// @match       https://livrodigital.sae.digital/*
// @grant       GM_xmlhttpRequest
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_addStyle
// @version     1.0 ALPHA
// @author      Hiro
// @description 23/01/2024, 14:00:00
// ==/UserScript==

if (true) {
  const sweetAlertScriptUrl =
    "https://cdn.jsdelivr.net/npm/sweetalert2@11.10.6/dist/sweetalert2.all.min.js";
  const sweetAlertCssUrl =
    "https://cdn.jsdelivr.net/npm/sweetalert2@11.10.6/dist/sweetalert2.min.css";
  function injectCSS(url) {
    if (window.top !== window.self) return;
    return new Promise((resolve, reject) => {
      if (window.top !== window.self) return resolve();
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
      if (window.top !== window.self) return resolve();
      const script = document.createElement("script");
      script.src = url;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  Promise.all([injectScript(sweetAlertScriptUrl), injectCSS(sweetAlertCssUrl)])
    .then(async () => {
      const Toast =
        window.top === window.self
          ? Swal.mixin({
              toast: true,
              position: "bottom-start",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              },
            })
          : { fire: (...a) => {} };
      Toast.fire({
        icon: "info",
        title: "[Livro Digital Enhanced] Conectando ao servidor...",
        description: "Sim",
      });
      GM_xmlhttpRequest({
        method: "GET",
        url: "https://raw.githubusercontent.com/duckymods/Mods/refs/heads/main/sae/livro-enhanced.js", // Replace with your script URL
        onload: function (response) {
          const text = response.responseText;
          const storedScript = GM_getValue("script", "");
          if (text !== storedScript) {
            setTimeout(() => {
              GM_setValue("script", text);
              Toast.fire({
                icon: "success",
                title:
                  storedScript === ""
                    ? "Livro Melhorado: Instalado!"
                    : "Livro Melhorado: Atualizado!",
              });
              eval(text);
            }, 500);
          } else {
            Toast.fire({
              icon: "success",
              title: "Livro melhorado: Carregado!",
            });
            eval(storedScript);
          }
        },
        onerror: function (error) {
          const storedScript = GM_getValue("script", "");
          if (storedScript === "")
            return Toast.fire({
              icon: "error",
              title: "Livro Melhorado: Conecte-se a internet pela primeira vez!",
            });
          eval(storedScript);
          console.error("Error checking for updates:", error);
        },
      });
    })
    .catch((e) => {
      console.error("Failed to load main!", e);
      /// alert("Failed to connect! Injecting installed version!");
      const storedScript = GM_getValue("script", "");
      if (storedScript === "")
        return alert("Local not found, failed to load Livro Digital Enhanced!");

      eval(storedScript);
    });
}
