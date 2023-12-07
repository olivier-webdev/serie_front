import { getSeries } from "../apis/series";

export async function seriesLoader() {
  return getSeries();
}
