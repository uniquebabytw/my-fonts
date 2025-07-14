const inputName = document.getElementById("nameInput");

inputName.addEventListener("input", function () {
  const typedValue = inputName.value.trim(); 

  const mainTexts = document.querySelectorAll(".main-text");

  mainTexts.forEach(element => {
    if (typedValue === "") {
      element.textContent = "預覽字型";    
      element.classList.add("placeholder-text");
    } else {
      element.textContent = typedValue;   
      element.classList.remove("placeholder-text");
    }
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
// 檢查字型是否成功載入
fontsToCheck.forEach(fontName => {
  document.fonts.load(`16px '${fontName}'`).then(fonts => {
    const isLoaded = fonts.length > 0;
    if (!isLoaded) {
      // 找出對應使用該字型的元素
      document.querySelectorAll(`.main-text`).forEach(el => {
        if (getComputedStyle(el).fontFamily.includes(fontName)) {
          el.textContent = '無法支援';
        }
      });
    }
  });
});
