'use client'
import axios from "axios";
import React from "react";
import './workers.css'
import Button from "@/components/Button/Button";

interface IWorker {
  id: number,
  createdAt: string,
  otdel: string,
  fio: string,
  phone: string,
  karta: string,
  photo: string
}

const Workers = () => {
 
  const [fio,setFio] = React.useState('')
  const [worker,setWorker] = React.useState<IWorker[]>([])
  const [skolkoNado,setSkolkoNado] = React.useState(3)
  const [oldFio, setOldFio] = React.useState('')
  const [count,setCount] = React.useState(0)  
  React.useEffect(()=>{
    const timeOut = setTimeout(()=>Poisk(),1000)
    return ()=>clearTimeout(timeOut)
  },[fio,skolkoNado])
  
  const Poisk = async () => {
    if (fio === ' ' || fio === '' || fio.length<3) {
      setWorker([])
      setSkolkoNado(3)
      setCount(0)
      return 
    }
    if (oldFio !== fio) {
      setSkolkoNado(3)
    }
    await axios.post('http://localhost:8000/worker/all', {fio,skolkoNado})
    .then(e=>{setWorker(e.data.workers);setOldFio(fio);setCount(e.data.count)})
  }

  return <div>
    <form className="container" onSubmit={e=>e.preventDefault()}>
    <h3>Работники</h3>
    <input className="inputs"
    onChange={e=>setFio(e.target.value)}
    required
    placeholder="Введите ФИО сотрудника"/>
    </form>
    <div className="yii">
      {worker.map((o)=>{
      return <div key={o.id} className="yi">
        <img src={`http://localhost:8000/${o.photo}`} style={{width:'120px'}} alt={o.fio}/>
        <p>{o.fio}</p>
      </div>
    })}
    {worker.length<count?<div
    className="eche"
    onClick={()=>setSkolkoNado(skolkoNado+3)}> 
    <Button> 
      Еще?
    </Button>
    </div>:null}
    </div>
    </div>;
};

export default Workers;
