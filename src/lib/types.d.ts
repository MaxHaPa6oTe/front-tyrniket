export type User = {
  id: string;
  name: string;
  role: string;
};
export interface IWorker {
  id: number,
  createdAt: string,
  otdel: string,
  fio: string,
  phone: string,
  karta: string,
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