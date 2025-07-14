<script>
/* ---------- ① 共用的字元檢測工具函式 ---------- */
function isGlyphSupported(fontFamily, text) {
  // 建一個離屏 canvas（全程共用，不必重複建立）
  if (!isGlyphSupported.canvas) {
    isGlyphSupported.canvas = document.createElement("canvas");
    isGlyphSupported.ctx    = isGlyphSupported.canvas.getContext("2d");
    isGlyphSupported.canvas.width  = 200;
    isGlyphSupported.canvas.height = 100;
  }
  const ctx = isGlyphSupported.ctx;

  // 先測量 fallback 字型（monospace）的寬度
  ctx.font = "40px monospace";
  const fallbackWidth = ctx.measureText(text).width;

  // 再測量目標字型
  ctx.font = `40px ${fontFamily}, monospace`;
  const targetWidth = ctx.measureText(text).width;

  // 若兩者寬度相同 ⇒ 代表 browser fallback 了，表示該字型缺字
  return targetWidth !== fallbackWidth;
}

/* ---------- ② 監聽輸入框 ---------- */
const inputName = document.getElementById("nameInput");

inputName.addEventListener("input", function () {
  const typedValue = inputName.value.trim();
  const mainTexts  = document.querySelectorAll(".main-text");

  mainTexts.forEach(el => {
    // A. 沒打字：保持「預覽字型」
    if (typedValue === "") {
      el.textContent = "預覽字型";
      el.classList.add("placeholder-text");
      return;           // ← 直接跳到下一個迴圈
    }

    // B. 使用者有輸入，先預設顯示輸入文字
    el.textContent = typedValue;
    el.classList.remove("placeholder-text");

    /* ---------- ③ 檢測目前字型是否支援 ---------- */
    // 取得該元素真正生效的 font-family
    const fontFamily = window.getComputedStyle(el).fontFamily;

    // 若目標字型無法支援其中任何一個字元，改顯示「無法支援」
    const unsupported = [...typedValue].some(char => 
      !isGlyphSupported(fontFamily, char)
    );

    if (unsupported) {
      el.textContent = "無法支援";
      el.classList.add("placeholder-text"); // 加上淡色樣式（可選）
    }
  });
});
</script>
