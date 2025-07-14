document.addEventListener("DOMContentLoaded", () => {
  const inputName = document.getElementById("nameInput");

  // 🔍 字型載入檢查（初始狀態用）
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

  // ✨ 判斷該字型是否真的能渲染某文字
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

  // 🔄 更新畫面顯示文字
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
