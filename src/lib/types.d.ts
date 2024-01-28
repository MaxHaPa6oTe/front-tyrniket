export type User = {
  id: string;
  name: string;
  role: string;
};
export interface IWorker {
  id: number,
  createdAt: string,
  post: string,
  fio: string,
  birthday: string,
  photo: string
}
export interface IZdanie {
  id: number,
  info: string
}
export interface ITyrniket {
  id: number,
  info: string,
  Zdanie: {
      info: string
  }
} 