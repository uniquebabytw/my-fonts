// 🔹 調整頁面高度，確保背景圖片顯示完整
function adjustHeight() {
    const imgRatio = 2; // 你的圖片長度 = 2 倍寬度
    const windowWidth = window.innerWidth;
    const newHeight = windowWidth * imgRatio; // 計算符合比例的高度
    document.body.style.height = newHeight + "px";
}

// 當頁面載入時修正高度
window.onload = function () {
    adjustHeight(); // 調整背景圖片高度
    updatePreviewText(); // 預設同步輸入框內容
};

// 當視窗大小改變時，重新計算高度
window.onresize = adjustHeight;

function updatePreviewText() {
    const inputField = document.getElementById("textInput");

    if (!inputField) return; // 確保輸入框存在

    inputField.addEventListener("input", function () {
        const text = inputField.value.trim() || "預覽"; // 預設顯示 "預覽"

        document.getElementById("previewGirl").textContent = text;
        document.getElementById("previewChild").textContent = text;
        document.getElementById("previewInk").textContent = text;
    });
}

    inputField.addEventListener("input", function () {
        const text = inputField.value.trim() || "預覽"; // 預設顯示 "預覽"
        previewBoxes.forEach(box => {
            box.textContent = text;
        });
    });
}

// 當 DOM 加載完成後執行
document.addEventListener("DOMContentLoaded", updatePreviewText);
