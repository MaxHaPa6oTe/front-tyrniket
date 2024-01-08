'use client'
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { Backend_URL } from "@/lib/Constants";
// import { getServerSession } from "next-auth";
import React from "react";
import './sotr.css'
import anonim from '../anonim.png'
import Image from "next/image";
import axios from "axios";

type Props = {
  params: {
    id: string;
  };
};

interface IWorker {
  id:number,
  createdAt: string,
  otdel:string,
  fio:string,
  phone:string,
  karta:string,
  photo:string
}
// const ProfilePage = async (props: Props) => {
//   const session = await getServerSession(authOptions);
//   const response = await fetch(Backend_URL + `/user/${props.params.id}`, {
//     method: "GET",
//     headers: {
//       authorization: `Bearer ${session?.backendTokens.accessToken}`,
//       "Content-Type": "application/json",
//     },
//   });
//   // console.log({ response });
//   const user = await response.json();

const Sotrydnik = (props:Props) => {

const [worker, setWorker] = React.useState<null | IWorker>(null)
React.useEffect(()=>{
  axios.get(`http://localhost:8000/worker/${props.params.id}`)
  .then(o=>setWorker(o.data)).catch(()=>console.log('ошибка'))
},[])
  return (
    <>
      <div className="sotrydnik">
      <h2>Информация о сотруднике</h2>

      <div className="body">
      <div className="body_1">
      <label>
        Фото сотрудника
    </label>
    <br/>
    {worker?
    <img alt='' src={`http://localhost:8000/${worker.photo}`} className="face"/>:
    <Image alt='' src={anonim} className="face"/>}
    <br/>
      </div>
      <div className="body_2">
    <label>
        ФИО Сотрудника
    </label>
    <br/>
    <p>
    <i><b>{worker?.fio}</b></i>
    </p>
    <label>
        Отдел
    </label>
    <p>
    <i><b>{worker?.otdel}</b></i>
    </p>
    <label>
        Телефон
    </label>
    <p>
    <i><b>{worker?.phone}</b></i>
    </p>
    <label>
        Номер карты
    </label>
    <p>
    <i><b>{worker?.karta}</b></i>
    </p>
    <label>
        Дата добавления
    </label>
    <p>
    <i><b>{worker?.createdAt.slice(0,19).replace('T',' ')}</b></i>
    </p>
      </div>
      </div>

      <div className="footer">

      </div>
      </div>
    </>
  );
};

export default Sotrydnik;
