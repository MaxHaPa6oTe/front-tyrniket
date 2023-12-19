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
  const [dataS,setDataS] = useState('')
  const [dataP,setDataP] = useState('')
  const [worker,setWorker] = useState<IWorker[]>([])
  const [tyrniket, setTyrniket] = useState<IZdanie[]>([])
  React.useEffect(()=>{
    axios.get('http://localhost:8000/tyrniket')
    .then(e=>setTyrniket(e.data))
  },[])
  React.useEffect(()=>{
    if (poiskFio === fio) return
    setFio(poiskFio)
    if (poiskFio === ' ' || poiskFio === '' || poiskFio.length<3) {
      setWorker([])
      return 
    }
    const Timeout = setTimeout(async () => {
      setFio(poiskFio);
      await axios.post('http://localhost:8000/worker/all', {fio})
    .then(e=>{setWorker(e.data);})
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

  return <div>
    <h3>Отметки</h3>
    <form className='search_form' onSubmit={(e)=>e.preventDefault()}>
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
    <label>Выберите место:</label>
<br/>
<p></p><select onChange={e=>console.log(e.target.value)}>
  {tyrniket.map(o=>{
    return <option key={o.id} value={o.id}>
      {o.info}
      </option>})}
</select>
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
      {worker.map(o=>{
        return <li key={o.id} 
        onClick={()=>{setFio(o.fio);setPoiskFio(o.fio);setWorker([])}}
        className='autocomplite_item'>
          {o.fio}
          </li>
      })}
    </ul>
    <button onClick={()=>{}}>Поиск</button>
    </form>
    </div>;
};

export default Otmetki;
