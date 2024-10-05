import { BaseMovie } from "./BaseMovie";

export interface PopularMovie extends BaseMovie {
  genre_ids: number[];
}
