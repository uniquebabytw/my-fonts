document.getElementById('textInput').addEventListener('input', function () {
    let text = this.value.trim();
    document.querySelectorAll('.preview-text').forEach(preview => {
        if (text === "") {
            preview.innerHTML = '<span class="default-text">預覽文字</span>'; // 恢復小字
        } else {
            preview.textContent = text; // 顯示使用者輸入的文字
        }
    });
});
