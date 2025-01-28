(function () {
  console.warn("Script state: " + (window.x_running ? "Running" : "Starting"));
  if (window.x_running) return console.warn("Double run prevented");
  window.x_running = true;
  /**
   * Adds a CSS style to the page
   * @param {string} css - The CSS rules to apply
   */
  function addStyle(css) {
    const style = document.createElement("style");
    style.innerHTML = css;
    document.head.appendChild(style);
  }

  const customStyleForOD = `
  span.name {
    text-align: center !important;
    font-size: 24px !important;
  }
  div.rating, div.qrcode-container {
    display: none !important;
  }
`;

  addStyle(`
  .X-HIDE {
    display: none !important;
  }  
`);

  let x_enhance_title = false;
  function lightenRGB(rgb, lightenFactor = 0.2) {
    // Extraindo os valores da string rgb(r, g, b)
    const match = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);

    if (!match) {
      throw new Error(
        "Formato inválido. Use uma cor no formato 'rgb(r, g, b)'."
      );
    }

    let [_, r, g, b] = match;

    // Convertendo os valores para números
    r = parseInt(r, 10);
    g = parseInt(g, 10);
    b = parseInt(b, 10);

    // Clareando cada canal RGB, aproximando para 255
    r = Math.min(Math.round(r + (255 - r) * lightenFactor), 255);
    g = Math.min(Math.round(g + (255 - g) * lightenFactor), 255);
    b = Math.min(Math.round(b + (255 - b) * lightenFactor), 255);

    // Retornando a nova cor no formato rgb
    return `rgb(${r}, ${g}, ${b})`;
  }

  function main() {
    addStyle(`
    div#app {
        overflow-y: auto; /* Permite a rolagem no eixo Y */
        height: 100vh; /* Garante que o #app ocupe a altura total da janela */
        width: 100vw;
    }
    .centralizar {
      position: relative;
      text-align: center; /* Centraliza horizontalmente o texto e elementos inline */
      padding: 0; /* Certifique-se que não tem deslocamentos indesejados */
    }

    .centralizar > * {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      min-width: 60vw;
    }
    
    div#app main {
    
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);*/
        width: 80%;
        
    }
    .css-j7qwjs {
      overflow: auto !important;
      max-height: 60vh !important;
    }
    
    .css-lvoalq {
      overflow: unset !important;
    }
    div#app main div.chakra-container.css-1g9eqn7 div.css-1l2z1d3 + div {
        overflow-y: auto;
        max-height: 35vh;
    }

    div#app:has(overflow-y) main {
        max-height: calc(100vh - 40px); /* Considera margens ao calcular a altura */
    }

    /* Estiliza a barra de rolagem para navegadores com suporte a Webkit */
    div#app main::-webkit-scrollbar {
        width: 12px; /* Define a largura da barra */
    }

    div#app main::-webkit-scrollbar-track {
        background: transparent; /* Cor do fundo da trilha */
        border-radius: 6px;  /* Bordas arredondadas */
    }

    div#app main::-webkit-scrollbar-thumb {
        background: transparent; /* Gradiente na barra */
        border-radius: 6px; /* Arredonda os cantos */
        border: 3px solid transparent; /* Dá um efeito de espaçamento ao redor */
    }

    div#app main::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(45deg, #ff6a5f, #50c9b7); /* Gradiente ao passar o mouse */
    }

    /* Para navegadores sem suporte ao Webkit */
    div#app main {
        scrollbar-width: thin; /* Reduz a largura da barra de rolagem */
        scrollbar-color: transparent transparent; /* Cor da barra e do fundo */
    }

    @media (max-width: 600px) {
        div#app main {
            width: 100% !important; /* Para ocupar toda a largura em telas pequenas */
            padding: 10px;         /* Adiciona um pouco de respiro */
        }
    }
    
    div#app main .chakra-container .css-1ofqig9 {
        border-radius: 10px !important;
        background-color: #fff !important;
        padding: 20px !important;
        border-bottom: 0 !important;
    }
    div#app main .chakra-container .css-1mgym42, div#app main .chakra-container .css-1npqdk9 {
        border-radius: 10px !important;
    }

    div#app main .chakra-container .css-1mgym42 .css-tnz4q8 {
        border-radius: 5px;
        text-align: center;
    }

    div#app main .chakra-container .css-1mgym42 .css-hn2x0o::-webkit-scrollbar {
        display: none;
        user-select: none;
    }
    div#app main .chakra-container .css-hn2x0o {
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
    }
    div#app main .chakra-container a.chakra-button.css-s6vmz9{
        border: none !important;
    }
    .X-ZOOM-FONT {
        font-size: 16px !important;
    }
    .chakra-container.css-6lbqvs {
        border-radius: 5px !important;
        width: 600px !important;
        max-width: 600px !important;
    }

    .chakra-container.css-6lbqvs .chakra-text.css-9pkcji {
        font-size: 1.25rem;
        margin-bottom: 10px;
    }
    .chakra-container.css-6lbqvs .css-bnsuz3 {
        width: 500px;
    }
    .css-1qztf4l .chakra-popover__popper.css-1qq679y {
        display: none !important;
    }
    .chakra-button.css-d657kx {
        display: none !important;

    }
    .chakra-text.css-1pmmppi {
        display: none !important;
    }
        
    a.chakra-button.css-xd26f0 {
        display: none !important;
    }
    .chakra-button[aria-label="sair"] {
      display: none !important;
    }
    .chakra-button.css-1t8tlmm {
      display: none !important;
    }

    .chakra-modal__content-container .css-7d0ckw {
      display: none !important;
    }
    .css-1tnwwz0 > :not(button) {
      border-radius: 0px !important;
    }
    .css-1tnwwz0 {
      padding-inline-start: 0px;
      padding-inline-end: 0px;
      padding-top: 0px;
      padding-bottom: 0px;
    }
    .css-1tnwwz0, .css-1uds6oo, .css-1cjvbe6 {
      width: 100vw;
      height: 100vh;
    }


    .close-btn {
      position: fixed;
      top: 10px;
      right: 10px;
      width: 64px;
      height: 64px;
      background-color: transparent;
      color: black;
      font-size: 36px;
      font-weight: bold;
      border: none;
      cursor: pointer;
      z-index: 9999; /* Ensures it's on top */
    }

    .close-btn::before {
        content: '❌'; /* Unicode for the cross character */
        display: block;
        text-align: center;
    }
    button[aria-label="Índice"], button[data-testid="open_drawer"], button[aria-label="Pesquisar"] { display: none !important; }
    @media screen and (min-width: 30em) {
      .css-hku6bi {
        grid-template: "header header" 40px "sidebar main" 1fr / 40px 1fr;
      }
    }
    .chakra-button.css-j4xw19 img {
      max-width: 55%;
      height: auto;
    }
    .chakra-button.css-10j1w54, .chakra-button.css-6d6s7f {
      width: 39px !important;
      height: 35px !important;
      min-width: 0 !important;
      padding: 0 !important;
    }

    .chakra-button.css-182lv0u {
      width: 39px !important;
      height: 35px !important;
      min-width: 0 !important;
      overflow: hidden !important;
    }
    .css-cr3mhi {
      padding: 0 !important;
    }

    .chakra-text.css-84c349 {
      display: none;
    }

    .css-nt3lq3 {
      width: 40px;
      height: 40px;
    }
    .css-1i9uft9 { font-size: 12px; }
    .X-CENTER-X-SCREEN {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
    .chakra-container.css-sgl8a2 {
      display: none;
    }
  `);

    let patches = [];
    patches.push(() => {
      if (
        document.querySelector("#app") &&
        !document.querySelector("#app").classList.contains("centralizar")
      ) {
        console.log(
          "[Livro Digital Enhanced] Added center to div.",
          document.querySelector("#app")
        );
        document.querySelector("#app").classList.add("centralizar");
      }
    });
    patches.push(() => {
      if (
        document.querySelector("#rybena-sidebar") &&
        !document.querySelector("#rybena-sidebar").classList.contains("X-HIDE")
      ) {
        console.log(
          "[Livro Digital Enhanced] Removed rybena acessibility bar.",
          document.querySelector("#rybena-sidebar")
        );
        document.querySelector("#rybena-sidebar").classList.add("X-HIDE");
      }
    });
    patches.push(() => {
      const divs = document.querySelectorAll("div.chakra-alert");

      divs.forEach((div) => {
        if (!div) return;
        const p = div.querySelector("p");
        if (
          p &&
          p.textContent
            .trim()
            .includes("é necessário o navegador do Google Chrome.") &&
          !div.classList.contains("X-HIDE")
        ) {
          div.classList.add("X-HIDE");
          console.log("[Livro Digital Enhanced] Removed alert div:", div);
        }
      });
    });
    patches.push(() => {
      const paragraphs = document.querySelectorAll("p");
      paragraphs.forEach((p) => {
        if (
          p.textContent.includes("direitos") &&
          !p.classList.contains("X-HIDE")
        ) {
          let ancestor = p.closest("div div div");
          if (ancestor && !ancestor.classList.contains("X-HIDE")) {
            ancestor.classList.add("X-HIDE");
            console.log(
              "[Livro Digital Enhanced] Removed copyright div:",
              ancestor
            );
          }
        }
      });
    });
    patches.push(() => {
      const paragraphs = document.querySelectorAll("p");
      paragraphs.forEach((p) => {
        if (p.textContent.includes("Termos")) {
          let ancestor = p.closest("div div div div");
          if (ancestor && !ancestor.classList.contains("X-HIDE")) {
            ancestor.classList.add("X-HIDE");
            console.log(
              "[Livro Digital Enhanced] Removed copyright div:",
              ancestor
            );
          }
        }
      });
    });
    patches.push(() => {
      const paragraphs = document.querySelectorAll(
        'div[data-testid="team_selector"].css-2isowc'
      );
      paragraphs.forEach((p) => {
        if (p.classList.contains("X-HIDE")) return;
        p.classList.add("X-HIDE");
        console.log("[Livro Digital Enhanced] Removed team div:", p);
      });
    });
    patches.push(() => {
      const paragraphs = document.querySelectorAll(
        "a.chakra-link, .css-gdl0o7"
      );
      paragraphs.forEach((p) => {
        if (
          (p.textContent.includes("Como instalar") ||
            p.textContent.includes("Tutorial")) &&
          !p.classList.contains("X-HIDE")
        ) {
          p.classList.add("X-HIDE");
          console.log("[Livro Digital Enhanced] Removed tutorial:", p);
        }
      });
    });
    patches.push(() => {
      const paragraphs = document.querySelectorAll("span.chakra-text");
      paragraphs.forEach((p) => {
        if (
          p.textContent.includes("Coleções") &&
          !p.classList.contains("X-HIDE")
        ) {
          let ancestor = p.closest("div.chakra-skeleton");
          if (!document.getElementById("X-ENHANCED-MODE-TITLE_CONTENT")) {
            let x = document.createElement("p");
            x.classList.add("chakra-text");
            x.classList.add("css-cyii0v");
            x.classList.add("x-ignore");
            x.id = "X-ENHANCED-MODE-TITLE_CONTENT";
            x.textContent = "Livro Digital [Enhanced Mode]";
            x.style.fontSize = "20px";
            p.closest("div.css-eh3s9g").appendChild(x);
          }

          if (ancestor && !ancestor.classList.contains("X-HIDE")) {
            ancestor.classList.add("X-HIDE");
            console.log(
              "[Livro Digital Enhanced] Removed collection div:",
              ancestor
            );
          }
        }
      });
    });
    patches.push(() => {
      const paragraphs = document.querySelectorAll("p.chakra-text");
      paragraphs.forEach((p) => {
        if (
          p.textContent.includes("Progresso das atividades realizadas no livro")
        ) {
          let ancestor = p.closest("div");
          if (ancestor && !ancestor.classList.contains("X-HIDE")) {
            ancestor.classList.add("X-HIDE");
            console.log("[Livro Digital Enhanced] Removed big div:", ancestor);
          }
        }
      });
    });
    patches.push(() => {
      const paragraphs = document.querySelectorAll("span.chakra-text");
      paragraphs.forEach((p) => {
        if (p.textContent.includes("Nova atualização disponível!")) {
          let ancestor = p.closest("div.chakra-toast__inner.css-dixmdy");
          if (ancestor && !ancestor.classList.contains("X-HIDE")) {
            ancestor.classList.add("X-HIDE");
            console.log("[Livro Digital Enhanced] Removed big div:", ancestor);
          }
        }
      });
    });
    patches.push(() => {
      const paragraphs = document.querySelectorAll("p.chakra-text.css-1sltjsj");
      paragraphs.forEach((p) => {
        if (p.textContent.includes("Componente")) {
          let ancestor = p.children[0]; //("b.chakra-text.css-1mxs9kn");
          if (ancestor && !ancestor.classList.contains("X-HIDE")) {
            ancestor.classList.add("X-ZOOM-FONT");
          }
        }
      });
    });
    patches.push(() => {
      const paragraphs = document.querySelectorAll(
        "div.chakra-skeleton.css-cdkrf0 div.css-rdwj84 img.chakra-image.css-fg2tlb"
      );
      paragraphs.forEach((p) => {
        if (p.attributes.getNamedItem("src") !== "") {
          p.classList.add("X-HIDE");
        }
      });
    });
    patches.push(() => {
      const paragraphs = document.querySelectorAll(
        "div.chakra-container.css-sgl8a2 div.css-1puynhf div"
      );
      paragraphs.forEach((p) => {
        if (p.innerHTML === "") {
          p.closest("div.chakra-container.css-sgl8a2").classList.add("X-HIDE");
        }
      });
    });
    patches.push(() => {
      const paragraphs = document.querySelectorAll(
        "div#app main .chakra-container .css-1mgym42 .css-tnz4q8 b"
      );
      paragraphs.forEach((p) => {
        if (p.innerText.toLowerCase().includes("UNIDADE")) {
          p.innerText = p.innerText.replaceAll(".", "x");
        }
      });
    });
    patches.push(() => {
      const paragraphs = document.querySelectorAll("div#app .css-v9p5l8 div");
      paragraphs.forEach((p) => {
        p.classList.add("X-CENTER-X-SCREEN");
      });
    });
    patches.push(() => {
      const paragraphs = document.querySelectorAll(
        "div.chakra-modal__body .css-em3u6v"
      );
      paragraphs.forEach((p) => {
        if (p.textContent.includes("Avalie")) {
          let close_btn = p.parentElement?.parentElement?.querySelector(
            ".chakra-modal__close-btn"
          );
          p.textContent = "";
          if (close_btn) {
            close_btn.click();
            console.log(
              "[Livro Digital Enhanced] Closed research popup",
              p.parentElement.parentElement
            );
          }
        }
      });
    });

    patches.push(() => {
      const spans = document.querySelectorAll(".css-1uds6oo");
      spans.forEach((span) => {
        if (span.classList.contains("X-MODIFIED")) return;
        span.classList.add("X-MODIFIED");

        const btn = document.createElement("button");
        btn.classList.add("close-btn");
        btn.addEventListener("click", () => {
          document.querySelector(".css-198ru36").click();
        });

        span.appendChild(btn);
      });
    });
    patches.push(() => {
      const spans = document.querySelectorAll(".chakra-text");
      spans.forEach((span) => {
        if (span.innerText.includes("quando a série")) {
          if (span.parentElement.parentElement.classList.contains("X-MODIFIED"))
            return;
          span.parentElement.parentElement.classList.add("X-MODIFIED");
          span.parentElement.parentElement.classList.add("X-HIDE");
          console.log("[Livro Digital Enhanced] Removed select serie!", span);
        }
      });
    });
    patches.push(() => {
      const spans = document.querySelectorAll(".chakra-text.css-1j8r2w0");
      spans.forEach((span) => {
        if (
          span.innerText.includes(
            "Infelizmente, seu navegador está desatualizado."
          )
        ) {
          if (span.parentElement.parentElement.classList.contains("X-MODIFIED"))
            return;
          span.parentElement.parentElement.classList.add("X-MODIFIED");
          span.parentElement.parentElement.classList.add("X-HIDE");
          console.log("[Livro Digital Enhanced] Removed select serie!", span);
        }
      });
    });
    patches.push(() => {
      const spans = document.querySelectorAll(
        ".chakra-modal__header.css-din6dh"
      );
      spans.forEach((span) => {
        if (span.innerText.includes("Versão suportadas")) {
          span.parentElement
            .querySelector("button.chakra-modal__close-btn")
            .click();
          console.log("[Livro Digital Enhanced] Removed select serie!", span);
        }
      });
    });
    let injectedMaterias = [];
    function core(x) {
      let Xy = false;
      if (x) {
        x.forEach((a) =>
          a.addedNodes.forEach((node) => {
            if (node?.classList?.contains("x-ignore")) Xy = true;
          })
        );
      }
      document.querySelectorAll(".css-hn2x0o").forEach((container) => {
        if (
          !injectedMaterias.includes(container.getAttribute("x-uid") || "") &&
          !container.classList.contains("X-INJECT")
        ) {
          let id = crypto.randomUUID();
          container.setAttribute("x-uid", id);
          injectedMaterias.push(id);
          container.classList.add("X-INJECT");
          addDraggableMaterias(container);
        }
      });
      if (Xy) return;
      patches.forEach((fn) => fn());
    }

    const observer = new MutationObserver(core);
    observer.observe(document.body, { childList: true, subtree: true });
    function addDraggableMaterias(container) {
      // Variáveis para o drag
      let isDragging = false;
      let startX;
      let scrollLeft;

      // Previne o arrasto de imagens dentro do container
      container.querySelectorAll("a").forEach((img) => {
        img.addEventListener("dragstart", (e) => e.preventDefault());
        img.style.userSelect = "none";
      });

      // Adiciona eventos para o drag
      container.addEventListener("mousedown", (e) => {
        isDragging = true;
        container.classList.add("dragging"); // Adicione uma classe para estilos visuais, se necessário
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
      });

      container.addEventListener("mouseleave", () => {
        isDragging = false;
        container.classList.remove("dragging");
      });

      container.addEventListener("mouseup", () => {
        isDragging = false;
        container.classList.remove("dragging");
      });

      container.addEventListener("mousemove", (e) => {
        if (!isDragging) return; // Só move se estiver arrastando
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 1; // Multiplicador para ajustar a velocidade
        container.scrollLeft = scrollLeft - walk;
      });

      // Adiciona um estilo opcional para indicar o estado de arrasto
      container.style.cursor = "grab";
      container.addEventListener("mousedown", () => {
        container.style.cursor = "grabbing";
      });
      container.addEventListener("mouseup", () => {
        container.style.cursor = "grab";
      });

      // Adiciona funcionalidade de scroll com a roda do mouse
      container.addEventListener("wheel", (event) => {
        event.preventDefault(); // Previne o scroll vertical do navegador
        container.scrollLeft += event.deltaY / 4; // Faz scroll horizontal
      });

      // Prioriza o container interno durante o scroll
      container.addEventListener("wheel", (event) => {
        if (container.scrollWidth > container.clientWidth) {
          event.preventDefault(); // Previne o scroll do elemento pai
          container.scrollLeft += event.deltaY / 4; // Faz scroll horizontal no container interno
        }
      });
    }

    core();
    setInterval(() => {
      core();
    }, 10);
  }
  function rgbToHex(rgb) {
    // Extraindo os valores de r, g e b
    const match = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);

    if (!match) {
      throw new Error(
        "Formato inválido. Use uma cor no formato 'rgb(r, g, b)'."
      );
    }

    let [_, r, g, b] = match;

    // Convertendo os valores para números e depois para hexadecimal
    r = parseInt(r, 10).toString(16).padStart(2, "0");
    g = parseInt(g, 10).toString(16).padStart(2, "0");
    b = parseInt(b, 10).toString(16).padStart(2, "0");

    // Retornando o formato hexadecimal
    return `#${r}${g}${b}`;
  }
  function mainLivro() {
    let patches = [];
    let clr = window.getComputedStyle(
      document.querySelector("header")
    ).backgroundColor;

    console.log(clr);
    addStyle(`
        blockquote.nesteCapitulo {
            border-radius: 5px !important;
        }
        .x-no-before::before, .nesteCapitulo::before, .botao-professor::before, .x-no-after::after {
            content: none !important;
            position: static !important;
            left: auto !important;
            top: auto !important;
            transform: none !important;
            -webkit-transform: none !important;
            width: auto !important;
            height: auto !important;
            background-color: transparent !important;
            background-repeat: initial !important;
            background-image: none !important;
        }
        .janelaProfessor-content {
            width: 100% !important;
            height: 100% !important;
            min-width: 100% !important;
            min-height: 100% !important;
            margin: 0 !important;
        }
        .janelaProfessor-close-icon {
            z-index: 9999;
            color: black !important;
            border-radius: 100% !important;
            background: white !important;
            padding: 10px !important;
            width: 50px !important;
            height: 50px !important;
            font-size: 21px !important;
            line-height: 30px !important;
              box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19) !important;
        }
        .X-PAGER {
            background: transparent !important;
            height: 1px !important;
            border-color: transparent transparent transparent transparent !important;
            margin-top: 10px !important;
            margin-bottom: 50px !important;
            border-bottom: 1px solid #ccc !important;
            border-bottom-color: #ccc !important;
            width: 100% !important;
        }
        .X-PAGER p {
            display: none !important;
        }
        .span-area-input {
            background: none !important;
            border-radius: 0 !important;
            color: black !important;
            border: none !important;
            border-bottom: 1px solid black !important;
            font-style: normal !important;
        }
        .emTempo {
            margin: auto;
        }
        .botao-professor  {
          display: inline;
          font-size: 16px;
          z-index: 99999;
          color: white;
          background-color: #007BFF;
          border: none;
          text-decoration: none;
          cursor: pointer;
        }
        .botao-professor {
          background: linear-gradient(135deg, #${rgbToHex(clr)}, #${rgbToHex(
      lightenRGB(clr)
    )}) !important;
          border: none !important;
          border-radius: 50% !important;
          width: 40px !important;
          height: 40px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          cursor: pointer !important;
          background-size: 200% !important;
          background-position: left !important;
          padding: 10px !important;
          float: right !important;
          transition: background 0.5s ease, box-shadow 0.3s ease !important;
          margin: 5px !important;
          text-align: center !important;
        }

        .botao-professor .icone {
          font-size: 1rem !important;
          color: white !important;
        }

        .botao-professor:hover {
          background-position: right !important;
        }
        label span.check {
          border: 1px solid black !important;
          border-radius: 2.5px;
          width: 50px !important;
          height: 50px !important;
        }
        .atividades figure.alinhaEsquerda, .atividades figure.alinhaDireita {
          text-align: center !important;
        }
        .X-FIGURES-FLEX {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.5;
        }
        .alternativaLetra {
          padding: 0 0 0 6em !important;
        }
        .atividades figure img {
          left: 15%;
        }

  `);

    patches.push(() => {
      const spans = document.querySelectorAll("span");
      spans.forEach((span) => {
        if (span.textContent.includes("Escola Digital")) {
          span.closest("blockquote").classList.add("X-HIDE");
        }
      });
    });
    patches.push(() => {
      const spans = document.querySelectorAll("p.textoCredito");
      spans.forEach((span) => {
        span.classList.add("X-HIDE");
      });
    });
    patches.push(() => {
      const spans = document.querySelectorAll(
        "blockquote.nesteCapitulo h1.tituloQuote"
      );
      spans.forEach((span) => {
        if (span.classList.contains("X-MODIFIED")) return;
        span.innerText = "Neste capítulo";
        span.classList.add("X-MODIFIED");
        const agaum = span.closest("h1");
        agaum.style.textAlign = "center";
        agaum.classList.add("x-no-before");
      });
    });
    patches.push(() => {
      const spans = document.querySelectorAll("p.textoOralidade");
      spans.forEach((span) => {
        if (span.classList.contains("X-MODIFIED")) return;
        span.classList.add("X-MODIFIED");
        span.classList.remove("textoOralidade");
      });
    });
    patches.push(() => {
      const spans = document.querySelectorAll(".pagina");
      spans.forEach((span) => {
        if (span.classList.contains("X-MODIFIED")) return;
        span.classList.add("X-PAGER");
        span.classList.add("X-MODIFIED");
      });
    });
    patches.push(() => {
      const spans = document.querySelectorAll(".textoReferencia");
      spans.forEach((span) => {
        span.style.display = "none";
        span.classList.add("X-HIDE");
      });
    });

    patches.push(() => {
      const spans = document.querySelectorAll(
        ".atividades figure.alinhaEsquerda, .atividades figure.alinhaDireita"
      );
      spans.forEach((span) => {
        if (span.classList.contains("X-MODIFIED")) return;
        span.classList.add("X-MODIFIED");
        let p = span.querySelector("p.alternativaLetra");
        let fc = span.querySelector("figCaption");

        let flex = document.createElement("div");
        flex.classList.add("X-FIGURES-FLEX");

        span.appendChild(flex);

        flex.appendChild(p);
        flex.appendChild(fc);
      });
    });

    patches.push(() => {
      const spans = document.querySelectorAll("digital-object");
      spans.forEach((span) => {
        let htmlCode = span
          .querySelector("div")
          ?.shadowRoot?.querySelector("html");

        if (!htmlCode) return console.log("No html code");
        if (span.classList.contains("X-MODIFIED")) return;
        span.classList.add("X-MODIFIED");

        var inlineScript = document.createElement("style");
        inlineScript.innerHTML = `
        ${customStyleForOD}
      `;
        htmlCode.appendChild(inlineScript);
      });
    });

    patches.push(() => {
      document
        .querySelectorAll('a.professor[style*="display: inline;"]')
        .forEach((anchor) => {
          // Cria o novo elemento com as classes e estrutura desejadas
          if (anchor.classList.contains("botao-professor")) return;
          anchor.className = "botao-professor x-no-before x-no-after";
          //anchor.href = "#" + anchor.href.split("#")[1];

          // Adiciona o ícone dentro do novo elemento
          const iconSpan = document.createElement("span");
          iconSpan.className = "icone";
          iconSpan.textContent = "🎓";
          anchor.innerHTML = "";
          anchor.appendChild(iconSpan);
          let destino = anchor.closest(".X-PAGER"); //.previousElementSibling;

          /*while (destino && !destino.classList.contains("X-PAGER")) {
          if (destino.tagName == "BLOCKQUOTE")
            console.log(destino.previousSibling);
          destino = destino.previousElementSibling;
        }*/

          if (destino && destino.classList.contains("X-PAGER")) {
            console.log(destino.closest("main"), destino);
            if (destino.tagName === "BLOCKQUOTE")
              destino.closest("main").insertBefore(anchor, destino.nextSibling);
          } else {
            console.log("Sem destino!");
          }
          // Substitui o antigo <a> pelo novo
          //anchor.replaceWith(newAnchor);
        });
    });
    function core() {
      patches.forEach((fn) => {
        try {
          fn();
        } catch (e) {}
      });
    }
    function createFooterElement() {
      const footer = document.createElement("div");
      footer.textContent = "Pg. 0";
      footer.style.position = "fixed";
      footer.style.bottom = "0px";
      footer.style.right = "0px";
      footer.style.backgroundColor = window.getComputedStyle(
        document.querySelector("header")
      ).backgroundColor;
      footer.style.color = "white";
      footer.style.padding = "15px 20px";
      footer.style.borderTopLeftRadius = "14px";
      footer.style.zIndex = "1000";
      footer.style.fontFamily = "Nunito, sans-serif";
      footer.style.fontSize = "20px";
      footer.style.fontWeight = "bold";
      document.body.appendChild(footer);
      return footer;
    }
    // Executa ao carregar a página
    const pager_el = createFooterElement();
    function findClosestElement() {
      const elements = document.querySelectorAll(".pagina");
      let closestElement = null;
      let closestDistance = -Infinity; // Começamos com o menor valor possível

      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const distance = rect.top; // Distância do topo do elemento ao topo da janela

        // Verifica se o elemento está acima do usuário (com 20px de margem de erro)
        if (distance <= 60 && distance > closestDistance) {
          closestDistance = distance;
          closestElement = element;
        }
      });

      if (closestElement) {
        pager_el.innerText = "Pg. " + closestElement.textContent.trim();
      }
    }

    // Adicionar evento de scroll
    setInterval(findClosestElement, 50);
    findClosestElement();
    core();
    const observer = new MutationObserver(core);
    observer.observe(document.body, { childList: true, subtree: true });
  }

  function waitForElement(selector, callback) {
    let observer;
    observer = new MutationObserver(() => mainsss());
    function mainsss() {
      if (document.querySelector(selector)) {
        observer.disconnect();
        callback(document.querySelector(selector));
      }
    }
    mainsss();
    observer.observe(document.body, { childList: true, subtree: true });
  }

  function mainLG() {
    let patches = [];
    addStyle(`
    .css-ev2pl9 { display: inline !important; margin: auto; }
    .css-ev2pl9 .css-1qkagck { background: transparent !important; }
    .css-l8vg34 {
      max-width: unset !important;
      padding-inline-start: unset !important;
      padding-inline-end: unset !important;
    }
  `);
    patches.push(() => {
      let login_bloat = document.querySelector(".css-dho3mt");
      if (login_bloat) {
        login_bloat.classList.add("X-HIDE");
        console.log(
          "[Livro digital enhanced] Removed login sidebar",
          login_bloat
        );
      }
    });
    patches.push(() => {
      let login_bloat = document.querySelector(".css-dho3mt");
      if (login_bloat) {
        login_bloat.classList.add("X-HIDE");
        console.log(
          "[Livro digital enhanced] Removed login sidebar",
          login_bloat
        );
      }
    });
    function core() {
      patches.forEach((fn) => {
        try {
          fn();
        } catch (e) {}
      });
    }

    core();
    const observer = new MutationObserver(core);
    observer.observe(document.body, { childList: true, subtree: true });
  }

  waitForElement("div#app", (element) => {
    mainLG();
    main();
  });

  waitForElement("blockquote.nesteCapitulo", (element) => {
    mainLivro();
  });

  waitForElement("body.od", () => {
    console.log("Objeto digital :)");
    let patches = [];
    patches.push(() => {
      document
        .querySelectorAll('a.professor[style*="display: inline;"]')
        .forEach((anchor) => {
          if (anchor.classList.contains("botao-professor")) return;
          if (!anchor.checkVisibility()) return;
          anchor.className = "botao-professor x-no-before x-no-after";
          const iconSpan = document.createElement("span");
          iconSpan.className = "icone";
          iconSpan.textContent = "🎓";
          anchor.innerHTML = "";
          anchor.appendChild(iconSpan);
        });
    });
    function core() {
      patches.forEach((fn) => {
        try {
          fn();
        } catch (e) {}
      });
    }

    core();
    const observer = new MutationObserver(core);
    observer.observe(document.body, { childList: true, subtree: true });

    let clr = "rgb(0, 123, 255)";
    addStyle(`
        body {
          height: auto !important;
        }
        .botao-professor  {
          display: inline;
          font-size: 16px;
          z-index: 99999;
          color: white;
          background-color: #007BFF;
          border: none;
          text-decoration: none;
          cursor: pointer;
        }
        .botao-professor {
          background: linear-gradient(135deg, #${rgbToHex(clr)}, #${rgbToHex(
      lightenRGB(clr)
    )}) !important;
          border: none !important;
          border-radius: 50% !important;
          width: 40px !important;
          height: 40px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          cursor: pointer !important;
          background-size: 200% !important;
          background-position: left !important;
          padding: 10px !important;
          float: right !important;
          transition: background 0.5s ease, box-shadow 0.3s ease !important;
          margin: 5px !important;
          text-align: center !important;
        }

        .botao-professor .icone {
          font-size: 1rem !important;
          color: white !important;
        }

        .botao-professor:hover {
          background-position: right !important;
        }
  `);
  });
  console.warn("Script state: " + (window.x_running ? "Running" : "Starting"));
})();
