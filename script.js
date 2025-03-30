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
  });
});
