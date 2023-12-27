'use client'
import axios from "axios";
import React from "react";
import './tyrniket.css'

interface ITyrniket {
    id: number,
    info: string
} 

const Tyrnikets = () => {
const [table,setTable] = React.useState<ITyrniket[] | null>(null)
React.useEffect(()=>{
    axios.get('http://localhost:8000/tyrniket')
    .then(e=>setTable(e.data)).catch(e=>console.log('ошибка'))
},[])
return <div>
    <h3>
    Турникеты
    </h3>
    <table className="tablee">
            <thead>
            <tr>
                <th>ID</th><th>Oписание</th> 
            </tr>
            </thead>
            <tbody>
            {table?table.map(o=>
                <tr key={o.id}>
                <td>{o.id}</td><td>{o.info}</td> 
            </tr>
            ):null}
            </tbody>
        </table>
    </div>;
};

export default Tyrnikets;
