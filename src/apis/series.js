const API_USERS = "https://serieback-production.up.railway.app/api";
// const API_USERS = "http://localhost:8000/api";

export async function getSeries() {
  try {
    const response = await fetch(`${API_USERS}/series/getSeries`);
    return response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function addSerie(values) {
  try {
    const response = await fetch(`${API_USERS}/series/addSerie`, {
      method: "POST",
      body: values,
    });
    return response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function deleteSerie(id) {
  try {
    await fetch(`${API_USERS}/series/deleteSerie/${id}`, {
      method: "DELETE",
    });
    return;
  } catch (error) {
    console.error(error);
  }
}

export async function updateSerie(newSerie) {
  try {
    const response = await fetch(`${API_USERS}/series/modifySerie`, {
      method: "PATCH",
      body: newSerie,
    });
    return response.json();
  } catch (error) {
    console.error(error);
  }
}
