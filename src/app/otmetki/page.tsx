"use client";
import React, { useState } from "react";
import axios from 'axios'

interface ITyrniket {
  id: number,
  info: string
}
const Otmetki = () => {
  const [fio,setFio] = useState('')
  const [dataS,setDataS] = useState('')
  const [dataP,setDataP] = useState('')
  const [tyrniket, setTyrniket] = useState<ITyrniket[]>([])
  React.useEffect(()=>{
    axios.get('http://localhost:8000/tyrniket')
    .then(e=>setTyrniket(e.data))
  })
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
    <form onSubmit={(e)=>e.preventDefault()}>
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
    <label>Выберите сотрудника:</label>    <br/>
    <input
    name='fio'
    className="input"
    type='text'
    placeholder="Введие ФИО сотрудника"
    onChange={(e) => setFio(e.target.value)}
    />  <br/>
    <label>Выберите турникет:</label>
<br/>
<select onChange={e=>console.log(e.target.value)}>
  {tyrniket.map(o=>{
    return <option key={o.id} value={o.id}>
      {o.info}
      </option>})}
</select>
<br/>
    {/* <button onClick={(e)=>response()}>Поиск</button> */}
    </form>
    </div>;
};

export default Otmetki;
