const API_USERS = "https://serieback-production.up.railway.app/api";

export async function signup(values) {
  try {
    const response = await fetch(`${API_USERS}/users/register`, {
      method: "POST",
      body: values,
    });
    const body = await response.json();
    if (response.ok) {
      return body;
    } else {
      if (body) {
        throw body;
      } else {
        throw new Error("Error register");
      }
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getUserConnected() {
  const response = await fetch(`${API_USERS}/users/current`);
  return await response.json();
}

export async function getAdminConnected() {
  const response = await fetch(`${API_USERS}/users/admin`);
  return await response.json();
}

export async function signin(credentials) {
  console.log(credentials);
  try {
    const response = await fetch(`${API_USERS}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const body = await response.json();
    if (response.ok) {
      return body;
    } else {
      if (body) {
        throw body;
      } else {
        throw new Error("Error connection");
      }
    }
  } catch (error) {
    console.error(error);
  }
}

export async function signout() {
  await fetch(`${API_USERS}/users`, {
    method: "DELETE",
  });
}