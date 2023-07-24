// LOGIN
const loginUrl = "http://localhost:5678/api/users/login";
const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");
const submitBtn = document.querySelector("input[type='submit']");
const form = document.getElementById("loginForm");
const loginError = document.querySelector(".loginError");
const passwordError = document.querySelector(".passwordError");

const logUser = {
  email: "",
  password: "",
};

// differents event et etape pour le login

// Event au Submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  e.stopPropagation();
  loginUser();
});

// Eventau MAIL
inputEmail.addEventListener("input", (e) => {
  //inputEmail.setCustomValidity;
  inputEmail.reportValidity();
  logUser.email = e.target.value;
});

// Event au Password
inputPassword.addEventListener("input", (e) => {
  //inputEmail.setCustomValidity;
  inputPassword.reportValidity();
  logUser.password = e.target.value;
});

//Event au chargement du DOM**
document.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();
  logUser.email = inputEmail.value;
  logUser.password = inputPassword.value;
  console.log(logUser);
});

// *****
// Fetch  user

async function loginUser() {
  try {
    await fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(logUser),
    })
      .then((response) => response.json())
      .then((responseData) => {
        data = responseData;
        console.log(data);
      });
    if (data.message) {
      loginError.textContent = "identifiant incorrect";
      inputEmail.style.color = "red";
      console.log(logUser);
    } else if (data.error) {
      passwordError.textContent = "mot de passe incorrect";
      loginError.textContent = "";
     
     

      console.log(logUser);
    } else {
      inputPassword.style.color = "#1d6154";
      passwordError.textContent = "";
      loginError.textContent = "";
      console.log("LogAdmin OK");
      console.log(logUser);
      // stockage du token dans le stockage local
      localStorage.setItem("token", data.token);
      //Redirection index.html
      window.location.href = "../index.html";
    }
  } catch (error) {
    console.log(error);
  }
}
