document.addEventListener("DOMContentLoaded", () => {
  const messageDiv = document.getElementById("message");
  const registrationForm = document.getElementById("registrationForm");
  const loginForm = document.getElementById("loginForm");
  const profileDiv = document.getElementById("profile");

  const BASE_URL = "http://localhost:3333";

  // Registration Form Submit Event
  registrationForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("passwordConfirm").value;

    try {
      const response = await axios.post(`${BASE_URL}/auth/sign-up`, {
        username,
        password,
        passwordConfirm,
      });

      messageDiv.innerHTML = `<p>Registration successful.</p>`;
    } catch (error) {
      messageDiv.innerHTML = `<p>Error: ${error.response.data.message}</p>`;
    }
  });

  // Login Form Submit Event
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    try {
      const response = await axios.post(`${BASE_URL}/auth/sign-in`, {
        username,
        password,
      });

      const token = response.data.accessToken;
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      messageDiv.innerHTML = `<p>Login successful. Token: ${token}</p>`;
      localStorage.setItem("token", token);
      await displayProfile();
    } catch (error) {
      messageDiv.innerHTML = `<p>Error: ${error.response.data.message}</p>`;
    }
  });

  // Profile Display
  const displayProfile = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/users/me`);

      const user = response.data;
      profileDiv.innerHTML = `<p>Username: ${user.username}, Registered At: ${user.createdAt}</p>`;
    } catch (error) {
      profileDiv.innerHTML = `<p>Error: ${error.response.data.message}</p>`;
    }
  };

  // Load Profile on Page Load if Token Exists
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    displayProfile();
  }
});
