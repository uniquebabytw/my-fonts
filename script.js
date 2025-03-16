function adjustHeight() {
    const imgRatio = 2; // 你的圖片長度 = 2 倍寬度
    const windowWidth = window.innerWidth;
    const newHeight = windowWidth * imgRatio; // 計算符合比例的高度
    document.body.style.height = newHeight + "px";
}

// 當頁面載入時修正高度
window.onload = adjustHeight;

// 當視窗大小改變時，重新計算高度
window.onresize = adjustHeight;
