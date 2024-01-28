'use client'
import React from "react";
import './workers.css'
import Button from "@/components/Button/Button";
import { useRouter } from 'next/navigation'
import axios from "axios";
import { Backend_URL } from "@/lib/Constants";
import { useSession } from "next-auth/react";
import { IWorker } from "@/lib/types";

const Workers = () => {
  const { data: session } = useSession();
  const router = useRouter()
  const [fio,setFio] = React.useState('')
  const [worker,setWorker] = React.useState<IWorker[]>([])
  const [skolkoNado,setSkolkoNado] = React.useState(6)
  const [oldFio, setOldFio] = React.useState('')
  const [count,setCount] = React.useState(0)  
  React.useEffect(()=>{
    const timeOut = setTimeout(()=>Poisk(),1000)
    return ()=>clearTimeout(timeOut)
  },[fio,skolkoNado])
  
  const Poisk = async () => {
    if (fio === ' ' || fio === '' || fio.length<3) {
      setWorker([])
      setSkolkoNado(6)
      setCount(0)
      return 
    }
    if (oldFio !== fio) {
      setSkolkoNado(6)
    }
    axios.defaults.headers.common = {'Authorization': `Bearer ${session?.backendTokens.accessToken}`}

    const response = await axios.post(Backend_URL+'/worker/all', {fio, skolkoNado})
    .then(e=>{setWorker(e.data.workers);setOldFio(fio);setCount(e.data.count)})
  }

  return <div>
    <form className="container" onSubmit={e=>e.preventDefault()}>
    <h3>Работники</h3>
    <input className="inputs"
    onChange={o=>setFio(o.target.value)}
    required
    placeholder="Введите ФИО сотрудника"/>
    </form>
    <div className="yii">
      {worker.map((o)=>{
      return <div key={o.id} className="yi" onClick={()=>router.push(`/workers/worker/${o.id}`)}>
        <img src={`${Backend_URL}/${o.photo}`} style={{width:'140px',height:'180px'}} alt={o.fio}/>
        <p>{o.fio}</p>
      </div>
    })}
    {worker.length<count?<div
    className="eche"
    onClick={()=>setSkolkoNado(skolkoNado+6)}> 
    <Button> 
      Еще?
    </Button>
    </div>:null}
    </div>
    </div>;
};

export default Workers;
