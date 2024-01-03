'use client'
import React from "react";
import axios from "axios";
import './addWorker.css'
import Button from "@/components/Button/Button";
import Opove from "@/components/Opove/Opove";

const addWorker = () => {

  const formData = new FormData()
  const [info,setInfo] = React.useState(false)
  const [fio,setFio] = React.useState('')
  const [otdel,setOtdel] = React.useState('')
  const [phone,setPhone] = React.useState('')
  const [karta, setKarta] = React.useState('')
  const [photo,setPhoto] = React.useState<null | File>(null) 
  const [oshibka,setOshibka] = React.useState('')
  const [opovInfa,setOpovInfa] = React.useState('')

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setPhoto(event.target.files[0]);
    }
  };

  const ADD = async () => {
    if (fio === ' ' || fio === '' || fio.length<3) {
        return
    }
    formData.append('fio',fio)
    formData.append('otdel',otdel)
    formData.append('phone',phone)
    formData.append('karta',karta)
    formData.append('photo',photo as Blob)
    await axios.post('http://localhost:8000/worker/create',formData)
    .then(()=>{setInfo(true);setOshibka('')})
    .catch(e=>setOshibka(e.response.data.message))
    setTimeout(()=>setInfo(false),5200)
  }

   return <>
    {info?<Opove text='Сотрудник добавлен'/>:null}
   
   <div className="addWorker">
   <form onSubmit={e=>e.preventDefault()}>
    <h2>Новый работник</h2>
    <h6>{oshibka}</h6>
    <label>
        Фото сотрудника
    </label>
    <br/>
    <input type="file"
    onChange={handleFileInputChange}
    />
    <br/>
    <label>
        ФИО Сотрудника
    </label>
    <br/>
    <input type="text" 
    required
    onChange={e=>setFio(e.target.value)}
    />
    <br/>
    <label>
        Отдел
    </label>
    <br/>
    <input type="text"
    required
    onChange={e=>setOtdel(e.target.value)}
    />
    <br/>
   <label>
        Телефон
    </label>
    <br/>
    <input type="text"
    required
    onChange={e=>setPhone(e.target.value)}
    />
    <br/>
    <label>
        Номер карты
    </label>
    <br/>
    <input type="text"
    required
    onChange={e=>setKarta(e.target.value)}
    />
    <br/>
    <div className="addRab">
    <div onClick={ADD}>
    <Button>Добавить</Button>
    </div>
    </div>
    </form>
    </div>
    </>   
};

export default addWorker;
