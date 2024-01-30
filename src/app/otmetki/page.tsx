"use client";
import './otmetki.css'
import React, { useState } from "react";
import { Backend_URL } from "@/lib/Constants";
import { useSession } from "next-auth/react";
import axios from 'axios';
import { IWorker, IZdanie } from '@/lib/types';

const Otmetki = () => {
  const { data: session } = useSession();
  axios.defaults.baseURL=Backend_URL
  axios.defaults.headers.common = {'Authorization': `Bearer ${session?.backendTokens.accessToken}`}
  const [fio,setFio] = useState('')
  const [poiskFio,setPoiskFio] = useState('')
  const [DataS,setDataS] = useState('')
  const [DataP,setDataP] = useState('')
  const [workerPoisk,setWorkerPoisk] = useState<IWorker[]>([])
  const [otmetkaVZdanii, setOtmetkaVZdanii] = useState<IZdanie[]>([])
  const [zdanie,setZdanie] = useState('1')
  const [worker,setWorker]=useState<null | number>(null)
  const [otmetki,setOtmetki] = useState<any[]>([])
  React.useEffect(()=>{
    axios.get('/tyrniket/zdanie')
    .then(e=>setOtmetkaVZdanii(e.data)).catch(e=>console.log(''))
  },[session])
  React.useEffect(()=>{
    if (poiskFio === fio) return
    setFio(poiskFio)
    if (poiskFio === ' ' || poiskFio === '' || poiskFio.length<3) {
      setWorkerPoisk([])
      setWorker(null)
      return 
    }
    const Timeout = setTimeout(async () => {
      setFio(poiskFio);
      await axios.post('/worker/all', {fio})
    .then(o=>{setWorkerPoisk(o.data.workers);})
    },2000)
    return () => clearTimeout(Timeout)
  },[poiskFio])

async function poiskOtmetok() {
  if (DataS==='' || DataP==='' || fio==='') return
    await axios.post('/otmetka/poisk', 
    {DataS,DataP,zdanie,worker}).then(o=>setOtmetki(o.data))
    .catch(()=>console.log("ошибка"))
  return
}
  return <div className='otm'>
    <form onSubmit={(e)=>e.preventDefault()}>
    <div className='filtr'>
    <div className='filtr_naz'>
    <h3>Отметки</h3>
    </div>
    <div className='tel1'>
      <div className='filtr_form_1'>
    <label>Выберите место:</label>
    <br/>
<select onChange={o=>setZdanie(o.target.value)}>
  {otmetkaVZdanii.map(o=>{
    return <option key={o.id} value={o.id}>
      {o.info}
      </option>})}
</select>
</div>
<div className='filtr_form_2'>
    <p>Выберите дату:</p>
    <label>с какого</label>
    <input
    name='dataS'
    type="date"
    required
    onChange={e => setDataS(e.target.value)}
    />
    <br/>
    <label>по какое</label>
    <input
    name='dataP'
    type="date"
    required
    onChange={(e) => setDataP(e.target.value)}
    />
    </div>
    <div className='filtr_form_3'>
<label>Выберите сотрудника:</label>    
<br/>
    <input
    name='fio'
    className="search_input"
    type='text'
    autoComplete='off'
    placeholder="Введие ФИО"
    onChange={(e) => setPoiskFio(e.target.value)}
    value={poiskFio}
    />
    <ul className="autocomplite">
      {workerPoisk.map(o=>{
        return <li key={o.id} 
        onClick={()=>{setWorker(o.id);setFio(o.fio);setPoiskFio(o.fio);setWorkerPoisk([])}}
        className='autocomplite_item'>
          {o.fio}
          </li>
      })}
    </ul>
    </div>
    </div>
    <div className='filter_form_button'>
    <a href={`${Backend_URL}/otmetka/download?DataS=${DataS}&DataP=${DataP}&zdanie=${zdanie}&worker=${worker}`}
    className={worker && DataS && DataP?'':'aDisabled'}    
    >Скачать</a>
    <button onClick={()=>poiskOtmetok()}>Показать</button>
    </div>
    </div>
    </form>

    <div className='otmetki'>
    <table>
      <tbody>
      {otmetki.map((o:any)=>{
        let data = o.createdAt.substring(0,o.createdAt.length-5)
        data = data.replace('T', ' ')
        return <tr key={o.id}>
        <td>{data}</td><td>{o.tyrniket.info}</td><td>{o.worker.fio}</td> 
    </tr>
      })}
      </tbody>
       </table>
      </div>
    </div>;
};

export default Otmetki;
