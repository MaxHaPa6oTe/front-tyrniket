'use client'
import React from "react";
import './tyrniket.css'
import Opove from "@/components/Opove/Opove";
import axios from 'axios'
import { Backend_URL } from "@/lib/Constants";
import { useSession } from "next-auth/react";
import { ITyrniket, IZdanie } from "@/lib/types";

const Tyrnikets = () => {
    const { data: session } = useSession();
    axios.defaults.baseURL=Backend_URL
    axios.defaults.headers.common = {'Authorization': `Bearer ${session?.backendTokens.accessToken}`}
    const [opov,setOpov] = React.useState<number>(0)
const [oshibkaT,setOshibkaT] = React.useState('')
const [oshibkaZd,setOshibkaZd] = React.useState('')
const [infoZd,setInfoZd] = React.useState('')
const [idZd,setIdZd] = React.useState<number>(1)
const [infoT,setInfoT] = React.useState('')
const [zdanie,setZdanie] = React.useState<IZdanie[] | null>(null)
const [table,setTable] = React.useState<ITyrniket[] | null>(null)
React.useEffect(()=>{
    axios.get('/tyrniket/zdanie')
    .then(o=>setZdanie(o.data)).catch(e=>console.log(''))
    axios.get('/tyrniket')
    .then(o=>setTable(o.data)).catch(e=>console.log(''))
},[opov,session])

const addT = async () => {
    let otvet = confirm('Вы хотите добавить новый турникет? В случае чего, удалять его придется в ручную')
    if (otvet) {
    await axios.post('/tyrniket', {zdanie:idZd,info:infoT})
    .then(o=>{setOpov(1);setOshibkaT('');setInfoT('')}).catch(e=>setOshibkaT(e.response.data.message))
    if (opov!==0) setTimeout(()=>{setOpov(0)},5200)
    }
}

const addZd = async () => {
    let otvet = confirm('Вы хотите добавить новое здание? В случае чего, удалять его придется в ручную')
    if (otvet) {
    await axios.post('/tyrniket/zdanie',{info:infoZd})
    .then(o=>{setOpov(2);setOshibkaZd('');setInfoZd('')}).catch(e=>setOshibkaZd(e.response.data.message))
    if (opov!==0) setTimeout(()=>{setOpov(0)},5200)
    }
}
return <>
    {opov!==0?<Opove text={opov===1?'Турникет добавлен':'Здание добавлено'}/>:null}
<div className="ZT">
    <div>
    <h3>Имеющиеся турникеты</h3>
    <table className="tablee">
            <thead>
            <tr>
                <th>ID</th><th>Здание</th><th>Расположение</th> 
            </tr>
            </thead>
            <tbody>
            {table?table.map(o=>
                <tr key={o.id}>
                <td>{o.id}</td><td>{o.Zdanie.info}</td><td>{o.info}</td> 
            </tr>
            ):null}
            </tbody>
        </table>
        </div>

        <div>
    <div className="infoZT">
        <p>После установки турникета необходимо добавить
        его в базу. Если турникет установлен в новое здание, то
        необходимо добавить это здание в базу.
        </p>
        </div>

        <div className="TyrniketsAdd">
    <form
    className="addZT"
    onSubmit={o=>o.preventDefault()}
    >
        <h3>Новый турникет</h3>
        {<h6>{oshibkaT?oshibkaT:null}</h6>}
        <br/>
        <label>В каком здании он стоит?</label>
        <br/>
        <select onChange={o=>setIdZd(+o.target.value)}>
            {zdanie?zdanie.map(o=>
            <option
            key={o.id}
            value={o.id}
            >
            {o.info}
            </option>):null}
        </select>
        <br/>
        <label>Введите информацию о новом турникете</label>
        <br/>
        <input type='text'
        required
        placeholder="к примеру - Вход 1"
        value={infoT}
        onChange={o=>setInfoT(o.target.value)}
        />
        <button onClick={()=>addT()}>Добавить</button>
    </form>
    
    <form
    className="addZT"
    onSubmit={o=>o.preventDefault()}
    >
        <h3>Новое здание</h3>
        {<h6>{oshibkaZd?oshibkaZd:null}</h6>}
        <br/>
        <label>Введите информацию о новом здании</label>
        <br/>
        <input
        type='text'
        required
        onChange={o=>setInfoZd(o.target.value)}
        value={infoZd}
        placeholder="к примеру - Троллейбусное депо 1"/>
        <br/>
        <button onClick={()=>addZd()}>
            Добавить
        </button>
    </form>
    </div>
    </div>

    </div>
    </>
}

export default Tyrnikets;
