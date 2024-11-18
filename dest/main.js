const btnClose = document.querySelector(".textskip"),
  email = document.querySelector(".email"),
  emailInput = document.getElementsByClassName("email").value,
  feedbackElement = document.getElementsByClassName("emailFeedback"),
  popup = document.querySelector(".popup"),
  btnSub = document.querySelector(".btnsub");

// Hiện popup khi vào web
window.addEventListener("load", function () {
  setTimeout(function openPopup(event) {
    popup.classList.add("active");
  }, 2000);
});

// Ẩn popup khi click btn
function closePopup() {
  btnClose.addEventListener("click", function () {
    popup.classList.remove("active");
  });
}
closePopup();

// FORM VALIDATE
function Validator(options) {
  function valiate(inputElement, rule) {
    var errorMessage = rule.test(inputElement.value);
    var errorElement = inputElement.parentElement.querySelector(
      options.errorSelector
    );

    if (errorMessage) {
      errorElement.innerText = errorMessage;
      inputElement.parentElement.classList.add("--invalid");
    } else {
      errorElement.innerText = "";
      inputElement.parentElement.classList.remove("--invalid");
    }
  }

  // lấy element của form cần validate
  var formElement = document.querySelector(options.form);

  if (formElement) {
    //khi submit form
    formElement.onsubmit = function (e) {
      e.preventDefault();

      // lặp qua từng rule và validate
      options.rules.forEach(function (rule) {
        var inputElement = formElement.querySelector(rule.selector);
        valiate(inputElement, rule);
      });
    };

    // lặp qua và xử lí
    options.rules.forEach(function (rule) {
      var inputElement = formElement.querySelector(rule.selector);
      var errorElement = inputElement.parentElement.querySelector(
        options.errorSelector
      );

      if (inputElement) {
        // xử lí trường hợp blur khỏi input
        inputElement.onblur = function () {
          valiate(inputElement, rule);
        };
        // Xử lí khi người dùng nhập
        inputElement.oninput = function () {
          errorElement.innerText = "";
          inputElement.parentElement.classList.remove("--invalid");
        };
      }
    });
  }
}

Validator.isEmail = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return regex.test(value)
        ? undefined
        : "Please enter a valid email address.";
    },
  };
};

Validator({
  form: "#formjs",
  formGroupSelector: ".form",
  errorSelector: ".emailFeedback",
  rules: [Validator.isEmail("#emailinput")],
});
