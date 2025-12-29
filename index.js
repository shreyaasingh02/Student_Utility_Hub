const pass = document.querySelector(".password");
const toggle = document.querySelector(".toggle");

toggle.addEventListener("click", () => {
  if (pass.type === "password") {
    pass.type = "text";
    toggle.classList.remove("fa-eye-slash");
    toggle.classList.add("fa-eye");
  } else {
    pass.type = "password";
    toggle.classList.remove("fa-eye");
    toggle.classList.add("fa-eye-slash");
  }
});


let forpass = document.querySelector(".fpass");
forpass.onclick = () => {
    console.log("Clicked");
    window.location.href = "forget-pass.html";
}

const card = document.querySelector(".main-card");


