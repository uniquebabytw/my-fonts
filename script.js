document.getElementById('textInput').addEventListener('input', function () {
    let text = this.value || '預覽文字';
    document.getElementById('previewGirl').textContent = text;
    document.getElementById('previewChild').textContent = text;
    document.getElementById('previewInk').textContent = text;
});
