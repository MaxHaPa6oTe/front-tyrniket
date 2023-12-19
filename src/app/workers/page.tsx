'use client'
import axios from "axios";
import React from "react";

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
  const [skolkoNado,setSkolkoNado] = React.useState(1)
  const [oldFio, setOldFio] = React.useState('')
  const [count,setCount] = React.useState(0)  
  React.useEffect(()=>{
    const timeOut = setTimeout(()=>Poisk(),1000)
    return ()=>clearTimeout(timeOut)
  },[fio,skolkoNado])
  
  const Poisk = async () => {
    if (fio === ' ' || fio === '' || fio.length<3) {
      setWorker([])
      setSkolkoNado(1)
      setCount(0)
      return 
    }
    if (oldFio !== fio) {
      setSkolkoNado(1)
    }
    await axios.post('http://localhost:8000/worker/all', {fio,skolkoNado})
    .then(e=>{setWorker(e.data.workers);setOldFio(fio);setCount(e.data.count)})
  }

  return <div>
    <h3>Работники</h3>
    <form onSubmit={e=>e.preventDefault()}>
    <input
    onChange={e=>setFio(e.target.value)}
    required
    placeholder="Введите ФИО сотрудника"/>
    </form>
    <div style={{display:'flex'}}>
      {worker.map((o)=>{
      return <div key={o.id}>
        <img src={`http://localhost:8000/${o.photo}`} width={150} alt={o.fio}/>
        <p>{o.otdel}</p>
        <p>{o.fio}</p>
      </div>
    })}
    </div>
    
    {worker.length<count?<button 
    onClick={()=>setSkolkoNado(skolkoNado+2)}>
      Еще
    </button>:null}
    </div>;
};

export default Workers;
