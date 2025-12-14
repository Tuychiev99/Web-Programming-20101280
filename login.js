const loginForm = document.getElementById("loginForm");
const userIdInput = document.getElementById("userId");
const userPwInput = document.getElementById("userPw");

loginForm.addEventListener("submit", e => {
  e.preventDefault();

  const id = userIdInput.value.trim();
  const pw = userPwInput.value.trim();

  if (id === "tsst" && pw === "1234") {
    localStorage.setItem("loggedIn", "true");
    window.location.href = "create.html";
  } else {
    alert("Invalid credentials. Try id: tsst / pw: 1234");
  }
});
