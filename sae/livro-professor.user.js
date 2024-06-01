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

fetch("https://example.com/my-script.user.js") // Replace with your script URL
  .then((response) => response.text())
  .then((text) => {
    // Extract version number from the script
    const latestVersion = text.match(/@version\s+([0-9.]+)/)[1];
    const currentVersion = GM_info.script.version;

    // Compare versions
    if (latestVersion > currentVersion) {
      // Update available, prompt user or automatically update
      if (confirm("An update is available. Do you want to install it?")) {
        // Perform update
        GM.setValue("script", text);
        alert("Script updated successfully!");
      }
    } else {
      console.log("No update available");
    }
  })
  .catch((error) => {
    console.error("Error checking for updates:", error);
  });
