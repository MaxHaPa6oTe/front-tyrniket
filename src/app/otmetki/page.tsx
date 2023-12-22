"use client";
import './otmetki.css'
import React, { useState } from "react";
import axios from 'axios'


interface IZdanie {
  id: number,
  info: string
}
interface IWorker {
  id: number,
  createdAt: string,
  otdel: string,
  fio: string,
  phone: string,
  karta: string,
  photo: string
}
const Otmetki = () => {
  const [fio,setFio] = useState('')
  const [poiskFio,setPoiskFio] = useState('')
  const [DataS,setDataS] = useState('')
  const [DataP,setDataP] = useState('')
  const [workerPoisk,setWorkerPoisk] = useState<IWorker[]>([])
  const [otmetkaVZdanii, setOtmetkaVZdanii] = useState<IZdanie[]>([])
  const [zdanie,setZdanie] = useState(1)
  const [worker,setWorker]=useState<null | number>(null)
  const [otmetki,setOtmetki] = useState<any[]>([])
  React.useEffect(()=>{
    axios.get('http://localhost:8000/tyrniket')
    .then(e=>setOtmetkaVZdanii(e.data))
  },[])
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
      await axios.post('http://localhost:8000/worker/all', {fio})
    .then(o=>{setWorkerPoisk(o.data.workers);})
    },2000)
    return () => clearTimeout(Timeout)
  },[poiskFio])
  // const session = await getServerSession(authOptions);
//   function response() {
//     axios.post('http://localhost:8000/otmetka/all', {
//     // headers: {
//     //   // authorization: `Bearer ${session?.backendTokens.accessToken}`,
//     //   "Content-Type": "application/json",
//     // },
//   DataS:dataS,DataP:dataP
//   }).then((res)=>console.log(res.data))
//   .catch(e=>console.log(e.response.data.message));
// }
async function poiskOtmetok() {
  if (DataS==='' || DataP==='' || fio==='') return
    await axios.post('http://localhost:8000/otmetka/poisk', 
    {DataS,DataP,zdanie,worker}).then(o=>setOtmetki(o.data))
  return
}
  return <div>
    <div className='Otmetki'>
    <form className='search_form' onSubmit={(e)=>e.preventDefault()}>
    <h3>Отметки</h3>
    <label>Выберите место:</label>
<br/>
<select onChange={o=>setZdanie(+o.target.value)}>
  {otmetkaVZdanii.map(o=>{
    return <option key={o.id} value={o.id}>
      {o.info}
      </option>})}
</select>
<br/>
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
    <br/>
<label>Выберите сотрудника:</label>    
    <br/>
    <input
    name='fio'
    className="search_input"
    type='text'
    autoComplete='off'
    placeholder="Введие ФИО сотрудника"
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
    <button onClick={()=>poiskOtmetok()}>Поиск</button>
    {}
    </form>
    </div>
    <hr/>
    <table>
      <tbody>
      {otmetki.map((o:any)=>{
        return <tr key={o.id}>
        <td>{o.createdAt}</td><td>{o.tyrniket.info}</td><td>{o.worker.fio}</td> 
    </tr>
      })}
      </tbody>
      </table>
    </div>;
};

export default Otmetki;
