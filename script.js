/* ---------------- 取得輸入框 ---------------- */
const inputName = document.getElementById("nameInput");

/* ---------- 工具函式：判斷指定字元在某字型內是否有 Glyph ---------- */
function supportsGlyph(fontFamily, char) {
  // 共用同一張 Canvas，可重複利用
  const canvas = supportsGlyph.canvas || (supportsGlyph.canvas = document.createElement("canvas"));
  const ctx = canvas.getContext("2d");

  // 第 1 次：絕對存在的字型（monospace）
  ctx.font = "40px monospace";
  const baseWidth = ctx.measureText(char).width;

  // 第 2 次：目標字型 + 回落 monospace
  ctx.font = `40px "${fontFamily}", monospace`;
  const testWidth = ctx.measureText(char).width;

  // 寬度不同 ➜ 代表換字型成功 (即有 Glyph)
  return testWidth !== baseWidth;
}

/* ------------------ 監聽輸入框事件 ------------------ */
inputName.addEventListener("input", function () {
  const typedValue = inputName.value.trim();
  const mainTexts = document.querySelectorAll(".main-text");

  mainTexts.forEach(el => {
    /* === ① 沒輸入文字 → 還原預設 === */
    if (typedValue === "") {
      el.textContent = "預覽字型";
      el.classList.add("placeholder-text");
      el.classList.remove("unsupported");
      return;
    }

    /* === ② 判斷目前這個框的目標字型 whether fully supports === */
    // 先抓該元素設定的 font-family（只取第一個）
    const targetFont = getComputedStyle(el)
      .fontFamily.replace(/["']/g, "")   // 去掉引號
      .split(",")[0]                     // 取第一個名稱
      .trim();

    // 每一個字元都必須有 Glyph；缺一即算不支援
    const allSupported = [...typedValue].every(ch => supportsGlyph(targetFont, ch));

    if (allSupported) {
      /* --- 完全支援：顯示使用者輸入 --- */
      el.textContent = typedValue;
      el.classList.remove("placeholder-text", "unsupported");
    } else {
      /* --- 不支援：顯示固定文案 --- */
      el.textContent = "無法支援";
      el.classList.remove("placeholder-text");
      el.classList.add("unsupported");
    }
  });
});
