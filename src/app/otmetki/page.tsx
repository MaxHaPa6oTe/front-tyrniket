"use client";
import React, { useState } from "react";
import axios from 'axios'

const Otmetki = () => {
  const [fio,setFio] = useState('')
  const [dataS,setDataS] = useState('')
  const [dataP,setDataP] = useState('')

  // const session = await getServerSession(authOptions);
  function response() {
    axios.post('http://localhost:8000/otmetka/all', {
    headers: {
      // authorization: `Bearer ${session?.backendTokens.accessToken}`,
      "Content-Type": "application/json",
    },
  tyrniket:1,worker:2
  }).then((res)=>console.log(res.data))
  .catch(e=>console.log(e.response.data.message));
}
  // console.log(response);

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
<select>
  <option value="ypr">Управление</option>
  <option value="eldp">Электродепо</option>
  <option value="tramv">Трамвайное депо</option>
  <option value="trol1">Троллейбусное депо 1</option>
  <option value="trol2">Троллейбусное депо 2</option>
</select>
<br/>
    <button onClick={(e)=>response()}>Поиск</button>
    </form>
    </div>;
};

export default Otmetki;
