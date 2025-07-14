const inputName = document.getElementById("nameInput");
const mainTexts = document.querySelectorAll(".main-text");

inputName.addEventListener("input", handleInput);

function handleInput() {
  const value = inputName.value.trim();

  mainTexts.forEach(el => {
    const fontName = el.dataset.font;           // 抓 data-font
    
    if (value === "") {
      // 沒輸入內容 → 還是顯示預覽字樣
      el.textContent = "預覽字型";
      el.classList.add("placeholder-text");
      el.classList.remove("unsupported");
      return;
    }

    // 用 FontFaceSet API 檢查「這個字型是否能顯示所有字元」
    const isSupported = document.fonts.check(`16px "${fontName}"`, value);

    if (isSupported) {
      el.textContent = value;                   // OK：顯示使用者輸入
      el.classList.remove("placeholder-text", "unsupported");
    } else {
      el.textContent = "無法支援";              // NG：顯示 4 個字
      el.classList.add("unsupported");
      el.classList.remove("placeholder-text");
    }
  });
}
