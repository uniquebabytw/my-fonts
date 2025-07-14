document.addEventListener("DOMContentLoaded", () => {
  const inputName = document.getElementById("nameInput");

  // 🔍 字型載入檢查（初始狀態用）
  const fontsToCheck = [ ... ];

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

  function isFontSupported(text, font) {
    const fallback = 'Arial';
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = `40px '${font}'`;
    const widthTarget = context.measureText(text).width;
    context.font = `40px '${fallback}'`;
    const widthFallback = context.measureText(text).width;
    return Math.abs(widthTarget - widthFallback) > 0.5;
  }

  function updatePreviewText(value) {
    const typedValue = value.trim();
    document.querySelectorAll(".main-text").forEach(element => {
      const font = getComputedStyle(element).fontFamily.split(',')[0].replace(/["']/g, '').trim();
      if (typedValue === "") {
        element.textContent = "預覽字型";
        element.classList.add("placeholder-text");
      } else {
        if (isFontSupported(typedValue, font)) {
          element.textContent = typedValue;
          element.classList.remove("placeholder-text");
        } else {
          element.textContent = "無法支援";
          element.classList.add("placeholder-text");
        }
      }
    });
  }

  // 🔧 補上的觸發部分：
  updatePreviewText("");
  inputName.addEventListener("input", (e) => {
    updatePreviewText(e.target.value);
  });
});
