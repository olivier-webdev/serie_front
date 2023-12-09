// const API_USERS = "https://serieback-production.up.railway.app/api";
const API_USERS = "http://localhost:8000/api";

export async function verifyMail(token) {
  try {
    const response = await fetch(`${API_USERS}/users/verifyMail/${token}`);
    return response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function resetPassword(email) {
  try {
    const response = await fetch(`${API_USERS}/users/resetPassword/${email}`);
    return response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function modifyPassword(password, email) {
  try {
    const response = await fetch(`${API_USERS}/users/modifyPassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, email }),
    });
    return response.json();
  } catch (error) {
    console.error(error);
  }
}
