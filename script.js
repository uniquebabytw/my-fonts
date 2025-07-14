document.addEventListener("DOMContentLoaded", () => {
  const inputName = document.getElementById("nameInput");

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

  // ⏳ 等待字型全部載入後再執行
  document.fonts.ready.then(() => {
    updatePreviewText(""); // 初次執行預設
    inputName.addEventListener("input", (e) => {
      updatePreviewText(e.target.value); // 使用者輸入更新
    });
  });
});
