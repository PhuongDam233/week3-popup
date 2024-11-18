function closePopup() {
  const btnClose = document.querySelector(".textskip"),
    popup = document.querySelector(".popup");

  btnClose.addEventListener("click", function () {
    popup.classList.remove("active");
  });
}
closePopup();
