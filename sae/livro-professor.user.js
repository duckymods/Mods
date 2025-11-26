// ==UserScript==
// @name        Livro Digital (Professor)
// @namespace   Hiro Scripts
// @match       https://livrodigital.sae.digital/*
// @grant       GM_xmlhttpRequest
// @grant       GM_setValue
// @grant       GM_getValue
// @version     2.1.1
// @updateURL   https://cdn.jsdelivr.net/gh/duckymods/Mods@main/sae/livro-professor.user.js
// @downloadURL https://cdn.jsdelivr.net/gh/duckymods/Mods@main/sae/livro-professor.user.js
// ==/UserScript==
// ==============================================================================
//   AURA + EGO
//   Github      https://github.com/duckymods/Mods
//   Versão      Beta 2.1
//   Descrição   Seletor de cargo para SAE Digital com tudo que encontrei.
//   Sites       livrodigital.sae.digital
//   Addons      Nenhum
// ==============================================================================


console.log("[AURA + EGO] Mod feito por @duckymods, github.com/duckymods");
console.log("[AURA + EGO] Iniciando VMs...");
(function() {
    const CONFIG = {
      storageRoleKey: "sae_role_selected",
      storageDebugKey: "sae_debug_active",
      storageSafeKey: "sae_safe_mode",
      targetUrlPart: "https://apis.sae.digital/livro-digital/base"
  };

  const ROLES = [
      {
          value: "STUDENT",
          display: "Aluno",
          icon: '<path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/>',
          tooltip: "Acesso padrão do sistema",
          enabled: true,
          tested: true,
          message: ""
      },
      {
          value: "TEACHER",
          display: "Professor",
          icon: '<path d="M20 17V7c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2zM6 7h12v10H6V7zm-4 5h2v8h16v2H2V12z"/> <path d="M9 10h6v2H9z"/>',
          tooltip: "Libera gabaritos e manuais",
          enabled: true,
          tested: true,
          message: ""
      },
      {
          value: "STAFF",
          display: "Staff",
          icon: '<path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>',
          tooltip: "Equipe interna (Restrito)",
          enabled: true,
          tested: false,
          message: "Esta role pode causar instabilidade em contas de alunos comuns e/ou não fazer nada."
      },
      {
          value: "RESPONSIBLE",
          display: "Responsável",
          icon: '<path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>',
          tooltip: "Visão dos pais/responsáveis (não faz nada)",
          enabled: true,
          tested: false,
          message: "Não faz nada."
      },
      {
          value: "COORDINATOR",
          display: "Coord.",
          icon: '<path d="M22 11V3h-7v3H9V3H2v8h7V8h2v10h4v3h7v-8h-7v3h-2V8h2v3z"/>',
          tooltip: "Gestão pedagógica",
          enabled: true,
          tested: false,
          message: "CUIDADO: Acesso de coordenação possivelmente detectado (não faz nada?)"
      },
      {
          value: "PRINCIPAL",
          display: "Diretor",
          icon: '<path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>',
          tooltip: "Gestão total da unidade",
          enabled: true,
          tested: false,
          message: "EXTREMO CUIDADO: Simular um diretor pode ser detectado (não faz nada?)"
      },
      {
          value: "ADMINISTRATOR",
          display: "Admin",
          icon: '<path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>',
          tooltip: "Superusuário do sistema",
          enabled: false,
          tested: false,
          message: "Esta função está desativada por segurança (crie uma fork dev para ativar!)."
      }
  ];

  const Kernel = {
      vms: [],
      state: { currentRole: "STUDENT", debugMode: false, safeMode: false, loadSafe: () => {
            let safeUnlock = document.createElement("style");
            safeUnlock.textContent = "a.professor.professor.professor { display: inline !important; }";
            document.documentElement.appendChild(safeUnlock);
          }
      },
      log: function(vmId, vmType, message, meta = {}) {
          if (!this.state.debugMode) return;
          console.groupCollapsed(`%c[VM #${vmId}] ${vmType}`, 'color: #00ffff; background: #333; padding: 2px 4px; border-radius: 3px;');
          console.log(`%cMsg: ${message}`, 'color: #fffaaa');
          if(Object.keys(meta).length) console.log(`Data:`, meta);
          console.groupEnd();
      },
      register: function(id, type, executionFn) {
          this.vms.push({ id, type });
          executionFn(this);
      }
  };


  Kernel.register('01', 'State Manager', function(sys) {
      const savedRole = localStorage.getItem(CONFIG.storageRoleKey);
      const savedDebug = localStorage.getItem(CONFIG.storageDebugKey);
      const savedSafe = localStorage.getItem(CONFIG.storageSafeKey);

      if (savedRole) sys.state.currentRole = savedRole;
      if (savedDebug === 'true') sys.state.debugMode = true;
      if (savedSafe === 'true') {
        sys.state.safeMode = true;
        if (sys.state.currentRole === "TEACHER") {
          sys.state.loadSafe();
        }
      }

      sys.setRole = (newRole) => {
          sys.state.currentRole = newRole;
          localStorage.setItem(CONFIG.storageRoleKey, newRole);
      };
      sys.toggleDebug = (active) => {
          sys.state.debugMode = active;
          localStorage.setItem(CONFIG.storageDebugKey, active);
      };
      sys.toggleSafe = (active) => {
          sys.state.safeMode = active;
          localStorage.setItem(CONFIG.storageSafeKey, active);
      };
  });

  Kernel.register('02', 'Payload Engine', function(sys) {
      sys.processPayload = (jsonString) => {
          try {
              const json = JSON.parse(jsonString);
              if (json && json.profile) {
                  json.profile.role = sys.state.currentRole;
                  return JSON.stringify(json);
              }
          } catch (e) {}
          return jsonString;
      };
  });

  Kernel.register('03', 'Fetch Proxy', function(sys) {
      if (sys.state.safeMode) {
          sys.log('03', 'Fetch Proxy', 'DISABLED (Safe Mode Active)');
          return;
      }
      const originalFetch = window.fetch;
      window.fetch = async (...args) => {
          const [resource] = args;
          const isTarget = typeof resource === 'string' && resource.includes(CONFIG.targetUrlPart);
          const response = await originalFetch(...args);
          if (isTarget) {
              try {
                  const clone = response.clone();
                  const text = await clone.text();
                  const modifiedText = sys.processPayload(text);
                  return new Response(modifiedText, {
                      status: response.status, statusText: response.statusText, headers: response.headers
                  });
              } catch (err) {}
          }
          return response;
      };
  });

  Kernel.register('04', 'XHR Proxy', function(sys) {
      if (sys.state.safeMode) {
          sys.log('04', 'XHR Proxy', 'DISABLED (Safe Mode Active)');
          return;
      }
      const originalOpen = XMLHttpRequest.prototype.open;
      const originalSend = XMLHttpRequest.prototype.send;
      XMLHttpRequest.prototype.open = function(method, url) {
          this._saeTarget = typeof url === 'string' && url.includes(CONFIG.targetUrlPart);
          return originalOpen.apply(this, arguments);
      };
      XMLHttpRequest.prototype.send = function() {
          if (this._saeTarget) {
              const self = this;
              const originalOnReadyStateChange = self.onreadystatechange;
              self.onreadystatechange = function() {
                  if (self.readyState === 4 && self.responseText) {
                      try {
                          const newText = sys.processPayload(self.responseText);
                          Object.defineProperty(self, 'responseText', { value: newText });
                          Object.defineProperty(self, 'response', { value: newText });
                      } catch(e) {}
                  }
                  if (originalOnReadyStateChange) originalOnReadyStateChange.apply(this, arguments);
              };
          }
          return originalSend.apply(this, arguments);
      };
  });

  Kernel.register('05', 'UI Manager', function(sys) {
      if (window.top !== window.self) return;

      const CSS = `
          @font-face {
              font-family: 'Sae Default Rounded';
              src: url(https://cdn.jsdelivr.net/gh/duckymods/Mods@main/assets/font.woff2) format('woff2');
              font-weight: 600;
          }
          .sae-ui-wrapper { font-family: 'Sae Default Rounded', Roboto, sans-serif; }
          #sae-toggle-btn {
              position: fixed; bottom: 20px; left: 20px;
              width: 56px; height: 56px;
              background: linear-gradient(135deg, #1e1e1e, #2a2a2a);
              border: 1px solid #444;
              border-radius: 50%; box-shadow: 0 4px 15px rgba(0,0,0, 0.5);
              display: flex; align-items: center; justify-content: center;
              cursor: pointer; z-index: 999990;
              transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55), border-color 0.3s;
              animation: saePulse 4s infinite ease-in-out;
          }
          @keyframes saePulse { 0%, 100% { box-shadow: 0 4px 15px rgba(0,0,0, 0.5); } 50% { box-shadow: 0 0 25px rgba(255, 107, 107, 0.2); } }
          #sae-toggle-btn:hover { transform: scale(1.1) rotate(90deg); border-color: #FF6B6B; }
          #sae-toggle-btn svg { width: 28px; height: 28px; fill: #FF6B6B; }
          #sae-panel {
              position: fixed; bottom: 90px; left: 20px; width: 340px;
              background: rgba(18, 18, 18, 0.95); backdrop-filter: blur(16px);
              border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 20px;
              padding: 24px; box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8);
              z-index: 999991;
              transform: translateY(30px) scale(0.95); opacity: 0; pointer-events: none;
              transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
              display: flex; flex-direction: column; gap: 16px;
          }
          #sae-panel.visible { transform: translateY(0) scale(1); opacity: 1; pointer-events: auto; }
          .sae-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px; }
          .sae-title-container { font-size: 16px; font-weight: 800; letter-spacing: 0.5px; }
          .sae-title-gradient {
              background: linear-gradient(90deg, #FF6B6B, #FF8E53);
              -webkit-background-clip: text; -webkit-text-fill-color: transparent;
              text-transform: uppercase; margin-right: 5px;
          }
          .sae-title-normal { color: #888; font-weight: 500; font-size: 14px; }
          .sae-header-actions { display: flex; gap: 5px; }
          .sae-action-btn {
              background: rgba(255,255,255,0.05); border: none; cursor: pointer;
              padding: 6px; border-radius: 8px; opacity: 0.7; transition: all 0.2s;
              display: flex; align-items: center; justify-content: center;
          }
          .sae-action-btn:hover { opacity: 1; background: rgba(255,255,255,0.1); transform: translateY(-2px); }
          .sae-action-btn svg { width: 18px; height: 18px; }
          .sae-btn-min svg { fill: #ccc; }
          .sae-btn-close svg { fill: #ff4444; }
          .sae-stagger-item { opacity: 0; transform: translateY(10px); }
          #sae-panel.visible .sae-stagger-item { animation: saeSlideIn 0.5s ease forwards; }
          @keyframes saeSlideIn { to { opacity: 1; transform: translateY(0); } }
          .sae-roles-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
          .sae-role-card {
              position: relative;
              background: rgba(255, 255, 255, 0.03); border-radius: 12px; padding: 12px 6px;
              cursor: pointer; transition: all 0.3s ease; border: 1px solid transparent;
              display: flex; flex-direction: column; align-items: center; justify-content: center;
              min-height: 80px; overflow: hidden;
          }
          .sae-role-card::before {
              content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%;
              background: linear-gradient(45deg, transparent, rgba(255,255,255,0.05), transparent);
              transform: translateX(-100%); transition: 0.5s;
          }
          .sae-role-card:hover::before { transform: translateX(100%); }
          .sae-role-card:hover { background: rgba(255, 255, 255, 0.08); transform: translateY(-3px); box-shadow: 0 5px 15px rgba(0,0,0,0.3); }
          .sae-role-card.active {
              border-color: #FF6B6B; background: rgba(255, 107, 107, 0.1);
              box-shadow: 0 4px 12px rgba(255, 107, 107, 0.2);
          }
          .sae-role-card.disabled { opacity: 0.4; cursor: not-allowed; filter: grayscale(1); }
          .sae-role-card svg { width: 26px; height: 26px; fill: #888; margin-bottom: 8px; transition: fill 0.3s; }
          .sae-role-card.active svg { fill: #FF6B6B; filter: drop-shadow(0 0 5px rgba(255,107,107,0.6)); }
          .sae-role-label { font-size: 11px; font-weight: 500; color: #ccc; text-align: center; }
          .sae-role-card[data-tooltip]:hover::after {
              content: attr(data-tooltip);
              position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%);
              background: #222; color: #fff; padding: 6px 10px; border-radius: 6px;
              font-size: 10px; white-space: nowrap; pointer-events: none;
              margin-bottom: 8px; border: 1px solid #444; box-shadow: 0 5px 15px rgba(0,0,0,0.5);
              opacity: 0; animation: saeFadeIn 0.2s forwards 0.3s; z-index: 10;
          }
          @keyframes saeFadeIn { to { opacity: 1; } }
          .sae-debug-row, .sae-safe-row, .sae-teacher-toggle-row {
              display: flex; align-items: center; justify-content: space-between;
              background: rgba(0,0,0,0.3); padding: 12px; border-radius: 10px; border: 1px solid #333;
          }
          .sae-safe-row { border-color: rgba(0, 255, 127, 0.2); }
          .sae-debug-label { font-size: 12px; color: #aaa; font-weight: 600; }
          .sae-switch { position: relative; display: inline-block; width: 40px; height: 22px; }
          .sae-switch input { opacity: 0; width: 0; height: 0; }
          .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #444; transition: .4s; border-radius: 34px; }
          .slider:before { position: absolute; content: ""; height: 16px; width: 16px; left: 3px; bottom: 3px; background-color: white; transition: .4s; border-radius: 50%; }
          input:checked + .slider { background-color: #FF6B6B; }
          input:checked + .slider:before { transform: translateX(18px); }
          input.safe-active:checked + .slider { background-color: #00ff7f; }
          .sae-apply-btn {
              width: 100%; padding: 14px;
              background: linear-gradient(90deg, #FF6B6B, #FF8E53);
              border: none; border-radius: 10px; color: white; font-weight: 700; font-size: 13px;
              cursor: pointer; transition: all 0.3s; letter-spacing: 0.5px;
              text-transform: uppercase; box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
              position: relative; overflow: hidden;
          }
          .sae-apply-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(255, 107, 107, 0.4); }
          .sae-apply-btn:active { transform: scale(0.98); }
          .sae-modal-backdrop {
              position: fixed; top: 0; left: 0; width: 100%; height: 100%;
              background: rgba(0,0,0,0.7); backdrop-filter: blur(5px);
              z-index: 999999; display: flex; align-items: center; justify-content: center;
              opacity: 0; animation: saeFadeIn 0.3s forwards;
          }
          .sae-modal-content {
              background: #1e1e1e; width: 320px; border-radius: 16px; padding: 25px;
              border: 1px solid #444; box-shadow: 0 20px 50px rgba(0,0,0,0.8);
              text-align: center; transform: scale(0.9); animation: saePopIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          }
          @keyframes saePopIn { to { transform: scale(1); } }
          .sae-modal-icon { width: 50px; height: 50px; margin: 0 auto 15px; fill: #FF6B6B; display: block; filter: drop-shadow(0 0 10px rgba(255,107,107,0.3)); }
          .sae-modal-title { color: #fff; font-size: 18px; font-weight: bold; margin-bottom: 10px; }
          .sae-modal-text { color: #aaa; font-size: 14px; line-height: 1.4; margin-bottom: 10px; }
          .sae-modal-subtext { color: #FF6B6B; font-size: 12px; margin-bottom: 20px; font-weight: bold; background: rgba(255, 107, 107, 0.1); padding: 8px; border-radius: 6px; }
          .sae-modal-actions { display: flex; gap: 10px; justify-content: center; }
          .sae-btn { flex: 1; padding: 10px; border-radius: 8px; border: none; font-weight: bold; cursor: pointer; transition: 0.2s; }
          .sae-btn-cancel { background: #333; color: #fff; }
          .sae-btn-confirm { background: #FF6B6B; color: #fff; }
          .sae-btn-confirm:hover { box-shadow: 0 0 15px rgba(255,107,107,0.4); }
      `;

      function createModal(title, text, subtext, onConfirm) {
          const backdrop = document.createElement('div');
          backdrop.className = 'sae-modal-backdrop';
          backdrop.innerHTML = `
              <div class="sae-modal-content">
                  <svg class="sae-modal-icon" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                  </svg>
                  <div class="sae-modal-title">${title}</div>
                  <div class="sae-modal-text">${text}</div>
                  ${subtext ? `<div class="sae-modal-subtext">${subtext}</div>` : ''}
                  <div class="sae-modal-actions">
                      <button class="sae-btn sae-btn-cancel">CANCELAR</button>
                      <button class="sae-btn sae-btn-confirm">CONFIRMAR</button>
                  </div>
              </div>
          `;
          const close = () => { backdrop.style.opacity = '0'; setTimeout(() => backdrop.remove(), 200); };
          backdrop.querySelector('.sae-btn-cancel').onclick = close;
          backdrop.querySelector('.sae-btn-confirm').onclick = () => { close(); onConfirm(); };
          document.body.appendChild(backdrop);
      }

      function render() {
          const style = document.createElement('style');
          style.innerHTML = CSS;
          document.head.appendChild(style);

          const wrapper = document.createElement('div');
          wrapper.className = 'sae-ui-wrapper';

          const fab = document.createElement('div');
          fab.id = 'sae-toggle-btn';
          fab.innerHTML = '<svg viewBox="0 0 24 24"><path d="M12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.58 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58z"/></svg>';

          const panel = document.createElement('div');
          panel.id = 'sae-panel';

          const header = document.createElement('div');
          header.className = 'sae-header';
          header.innerHTML = `
              <div class="sae-title-container">
                  <span class="sae-title-gradient">AURA + EGO</span>
                  <span class="sae-title-normal">Painel</span>
              </div>
          `;

          const actionsDiv = document.createElement('div');
          actionsDiv.className = 'sae-header-actions';
          const minBtn = document.createElement('button');
          minBtn.className = 'sae-action-btn sae-btn-min';
          minBtn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M19 13H5v-2h14v2z"/></svg>';
          minBtn.title = "Minimizar (Ocultar painel)";
          minBtn.onclick = (e) => { e.stopPropagation(); togglePanel(); };
          const closeBtn = document.createElement('button');
          closeBtn.className = 'sae-action-btn sae-btn-close';
          closeBtn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z"></path></svg>';
          closeBtn.title = "Encerrar AURA + EGO";
          closeBtn.onclick = (e) => {
              e.stopPropagation();
              if(confirm("Deseja encerrar o AURA + EGO?")) wrapper.remove();
          };
          actionsDiv.appendChild(minBtn);
          actionsDiv.appendChild(closeBtn);
          header.appendChild(actionsDiv);
          panel.appendChild(header);

          // Safe Mode Toggle
          const safeRow = document.createElement('div');
          safeRow.className = 'sae-safe-row sae-stagger-item';
          safeRow.style.animationDelay = '0.05s';
          safeRow.innerHTML = `
              <span class="sae-debug-label" style="color:#00ff7f;">Safe Mode</span>
              <label class="sae-switch">
                  <input type="checkbox" id="sae-safe-check" class="safe-active" ${sys.state.safeMode ? 'checked' : ''}>
                  <span class="slider"></span>
              </label>
          `;
          const safeCheck = safeRow.querySelector('#sae-safe-check');
          safeCheck.onclick = (e) => {
              e.preventDefault();
              const confirmMsg = sys.state.safeMode
                  ? "Desativar Safe Mode? Os proxies de rede serão reativados (requer reload)."
                  : "Ativar Safe Mode? Isso desativa interceptações de rede e limita o painel.";
              createModal("Atenção", confirmMsg, "A página será recarregada.", () => {
                  sys.toggleSafe(!sys.state.safeMode);
                  location.reload();
              });
          };
          panel.appendChild(safeRow);

          if (!sys.state.safeMode) {
              // NORMAL MODE CONTENT
              const debugRow = document.createElement('div');
              debugRow.className = 'sae-debug-row sae-stagger-item';
              debugRow.style.animationDelay = '0.1s';
              debugRow.innerHTML = `
                  <span class="sae-debug-label">Logs de Console</span>
                  <label class="sae-switch">
                      <input type="checkbox" id="sae-debug-check" ${sys.state.debugMode ? 'checked' : ''}>
                      <span class="slider"></span>
                  </label>
              `;
              const debugCheck = debugRow.querySelector('#sae-debug-check');
              debugCheck.onclick = (e) => {
                  e.preventDefault();
                  const targetState = !sys.state.debugMode;
                  if (targetState) {
                      createModal("Ativar Debug?", "Logs técnicos serão exibidos no console.", null, () => {
                          debugCheck.checked = true; sys.toggleDebug(true);
                      });
                  } else {
                      debugCheck.checked = false; sys.toggleDebug(false);
                  }
              };
              panel.appendChild(debugRow);

              const grid = document.createElement('div');
              grid.className = 'sae-roles-grid sae-stagger-item';
              grid.style.animationDelay = '0.2s';
              let tempSelectedRole = sys.state.currentRole;
              const cards = [];
              ROLES.forEach(r => {
                  const card = document.createElement('div');
                  card.className = `sae-role-card ${r.value === tempSelectedRole ? 'active' : ''} ${!r.enabled ? 'disabled' : ''}`;
                  card.innerHTML = `<svg viewBox="0 0 24 24">${r.icon}</svg><div class="sae-role-label">${r.display}</div>`;
                  if (r.tooltip) card.setAttribute('data-tooltip', r.tooltip);
                  if (r.enabled) {
                      card.onclick = () => {
                          const selectRole = () => {
                              tempSelectedRole = r.value;
                              cards.forEach(c => c.classList.remove('active'));
                              card.classList.add('active');
                          };
                          if (!r.tested) {
                              createModal("Experimental", `Role <b>${r.display}</b> não testada.`, r.message, selectRole);
                          } else {
                              selectRole();
                          }
                      };
                  }
                  cards.push(card);
                  grid.appendChild(card);
              });
              panel.appendChild(grid);

              const applyBtn = document.createElement('button');
              applyBtn.className = 'sae-apply-btn sae-stagger-item';
              applyBtn.style.animationDelay = '0.3s';
              applyBtn.innerText = 'Aplicar Mudanças';
              applyBtn.onclick = () => { sys.setRole(tempSelectedRole); location.reload(); };
              panel.appendChild(applyBtn);

          } else {
              const teacherRow = document.createElement('div');
              teacherRow.className = 'sae-teacher-toggle-row sae-stagger-item';
              teacherRow.style.animationDelay = '0.1s';
              const isTeacher = sys.state.currentRole === 'TEACHER';
              teacherRow.innerHTML = `
                  <span class="sae-debug-label" style="color: #FF6B6B;">Modo Professor</span>
                  <label class="sae-switch">
                      <input type="checkbox" id="sae-teacher-check" ${isTeacher ? 'checked' : ''}>
                      <span class="slider"></span>
                  </label>
              `;
              const teacherCheck = teacherRow.querySelector('#sae-teacher-check');
              teacherCheck.onclick = (e) => {
                  e.preventDefault();
                  const newRole = isTeacher ? 'STUDENT' : 'TEACHER';
                  createModal(
                      isTeacher ? "Desativar Professor?" : "Ativar Professor?",
                      "Em Safe Mode, a interceptação é limitada. A página será recarregada para aplicar.",
                      null,
                      () => {
                          sys.setRole(newRole);
                          location.reload();
                      }
                  );
              };
              panel.appendChild(teacherRow);
          }

          let isOpen = false;
          const togglePanel = () => {
              isOpen = !isOpen;
              panel.classList.toggle('visible', isOpen);
              fab.style.opacity = isOpen ? '0' : '1';
              fab.style.pointerEvents = isOpen ? 'none' : 'auto';
          };
          fab.onclick = (e) => { e.stopPropagation(); togglePanel(); };
          document.addEventListener('click', (e) => {
              if (isOpen && !panel.contains(e.target) && !fab.contains(e.target) && !e.target.closest('.sae-modal-backdrop')) {
                  togglePanel();
              }
          });

          wrapper.appendChild(fab);
          wrapper.appendChild(panel);
          document.body.appendChild(wrapper);
          sys.log('05', 'UI Manager', 'Ready');
      }
      if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render);
      else render();
  });
})();
