//MODAL BUY TICKETS

var buyBtns = document.querySelectorAll(".modal-buy-ticket");
var modal = document.querySelector(".js-modal");
var modalClose = document.querySelector(".js-close");
var modalContainer = document.querySelector(".js-modal-container");

for (let i of buyBtns) {
  i.addEventListener("click", function () {
    modal.classList.add("open");
  });
}

modalClose.addEventListener("click", function () {
  modal.classList.remove("open");
});

modal.addEventListener("click", function () {
  modal.classList.remove("open");
});

modalContainer.addEventListener("click", function (event) {
  event.stopPropagation();
});

//MOBILE MENU
var header = document.querySelector("#header");
var mobileMenu = document.getElementById("mobile-menu");

mobileMenu.onclick = function () {
  let isClosed = header.clientHeight === 46;
  if (isClosed) header.style.height = "auto";
  else header.style.height = null;
};

var menuItems = document.querySelectorAll('#nav li a[href *= "#"]');
for (let i of menuItems) {
  i.onclick = function (event) {
    var isParentMenu =
      this.nextElementSibling &&
      this.nextElementSibling.classList.contains("subnav");
    if (isParentMenu) event.preventDefault();
    else header.style.height = null;
  };
}

// TOAST

function toast({ title = "", type = "", message = "", duration = 3000 }) {
  const main = document.getElementById("toast");
  if (main) {
    const toast = document.createElement("div");
    toast.classList.add("toast", `toast--${type}`);

    const autoRemove = setTimeout(() => {
      main.removeChild(toast);
    }, 4000);

    toast.onclick = (e) => {
      if (e.target.closest(".toast__close")) main.removeChild(toast);
      clearTimeout(autoRemove);
    };

    const icons = {
      success: "fas fa-check-circle",
      error: "fas fa-exclamation-circle",
    };

    toast.innerHTML = `
            <div class="toast__icon">
                <i class="${icons[type]}"></i>
            </div>
            <div class="toast__body">
                <h3 class="toast__title">${title}</h3>
                <p class="toast__msg">${message}</p>
            </div>
            <div class="toast__close">
                <i class="fas fa-times"></i>
            </div>`;
    main.appendChild(toast);
  }
}

document.getElementById("buy-ticket").onclick = () => {
  const howMany = document.forms["buyTicket"]["quantity"].value;
  const enterEmail = document.forms["buyTicket"]["mail-to"].value;

  if (howMany && enterEmail) {
    toast({
      title: "Success",
      message: "Submitted successfully!",
      type: "success",
      duration: 3000,
    });
  } else {
    toast({
      title: "Error",
      message: "You have filled in missing information!",
      type: "error",
      duration: 3000,
    });
  }
};

document.querySelector("input.send-message").onclick = () => {
  if (
    document.forms["sendContact"]["name-contact"].value &&
    document.forms["sendContact"]["mail-contact"].value &&
    document.forms["sendContact"]["message-contact"].value
  ) {
    toast({
      title: "Success",
      message: "Submitted successfully!",
      type: "success",
      duration: 3000,
    });
  } else {
    toast({
      title: "Error",
      message: "You have filled in missing information!",
      type: "error",
      duration: 3000,
    });
  }
};

var signInInfo = [
  {
    id: "quang29112002",
    pass: "123456",
  },
  {
    id: "HuongGiang",
    pass: "0602",
  },
];

// SIGN IN

document.querySelector("#sign-in-form").onsubmit = (e) => {
  const userName = document.getElementById("username").value;
  const passWord = document.getElementById("pass-word").value;
  e.preventDefault();
  const checkAccount = signInInfo.find((a) => {
    return a.id == userName && a.pass == passWord;
  });

  document.querySelector(".account-option__sign-in").classList.add("dissapear");
  document
    .querySelector(".account-option__sign-out")
    .classList.remove("dissapear");

  if (checkAccount) {
    document.querySelector(".sign-in").classList.add("dissapear");
  } else {
    toast({
      title: "Error",
      message: "Wrong username or password!",
      type: "error",
      duration: 3000,
    });
  }
};

// SHOW PASSWORD

const showPassWord = document.querySelectorAll(".show-pass");

for (let i of showPassWord) {
  i.onclick = () => {
    const passField = i.previousElementSibling;
    const showPass = i.querySelector("i");
    if (passField.type == "password") {
      passField.type = "text";
      showPass.classList.remove("fa-eye");
      showPass.classList.add("fa-eye-slash");
    } else {
      passField.type = "password";
      showPass.classList.remove("fa-eye-slash");
      showPass.classList.add("fa-eye");
    }
  };
}

document.querySelector(".create-account").onclick = () => {
  document.querySelector(".sign-in__container").classList.add("dissapear");
  document.querySelector(".sign-up__container").classList.remove("dissapear");
};

document.querySelector("#sign-up-form").onsubmit = (e) => {
  const newUserName = document.getElementById("new-username").value;
  const newPassword = document.getElementById("new-password").value;
  const confirmNewPassword =
    document.getElementById("check-new-password").value;
  e.preventDefault();

  const checkExistedAccount = signInInfo.find((a) => {
    return a.id == newUserName;
  });

  if (checkExistedAccount) {
    toast({
      title: "Error",
      message: "Account existed! Please try again",
      type: "error",
      duration: 3000,
    });
  } else if (newPassword != confirmNewPassword) {
    toast({
      title: "Error",
      message: "Password does not match!",
      type: "error",
      duration: 3000,
    });
  } else {
    const newAccount = {
      id: "",
      pass: "",
    };

    newAccount.id = newUserName;
    newAccount.pass = confirmNewPassword;

    signInInfo.push(newAccount);

    toast({
      title: "Success",
      message: "Registered successfully!",
      type: "success",
      duration: 3000,
    });

    document.querySelector(".sign-in__container").classList.remove("dissapear");
    document.querySelector(".sign-up__container").classList.add("dissapear");
  }
};

// SIGN IN/OUT

document.querySelector(".account-option__sign-in").onclick = () => {
  if (document.querySelector(".sign-in").classList.contains("dissapear"))
    document.querySelector(".sign-in").classList.remove("dissapear");
};

document.querySelector(".account-option__sign-out").onclick = () => {
  document
    .querySelector(".account-option__sign-out")
    .classList.add("dissapear");
  document
    .querySelector(".account-option__sign-in")
    .classList.remove("dissapear");
};
