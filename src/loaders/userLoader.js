import { getUserConnected } from "../apis/users";

export async function userLoader() {
  return getUserConnected();
}
