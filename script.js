document.addEventListener("DOMContentLoaded", () => {
  // 1️⃣ 檢查字型載入
  const fontsToCheck = [
    'LXGWMarkerGothic-Regular',
    'PopGothicCjkTc-Regular',
    '王汉宗行楷体繁',
    'edukai-5.0',
    'NotoSansTC-Regular',
    'wt021',
    '王漢宗中圓體繁',
    'KosefontP-JP',
    'Mamelon',
    '宅在家自動筆20231015',
    'wp010-08',
    'BpmfGenSenRounded-M'
  ];

  fontsToCheck.forEach(fontName => {
    document.fonts.load(`16px '${fontName}'`).then(fonts => {
      if (fonts.length === 0) {
        document.querySelectorAll(".main-text").forEach(el => {
          if (getComputedStyle(el).fontFamily.includes(fontName)) {
            el.textContent = "無法支援";
            el.classList.add("placeholder-text");
          }
        });
      }
    });
  });

  // 2️⃣ 處理使用者輸入
  const inputName = document.getElementById("nameInput");

  inputName.addEventListener("input", () => {
    const typedValue = inputName.value.trim();
    document.querySelectorAll(".main-text").forEach(element => {
      if (typedValue === "") {
        element.textContent = "預覽字型";
        element.classList.add("placeholder-text");
      } else {
        element.textContent = typedValue;
        element.classList.remove("placeholder-text");
      }
    });
  });
});

