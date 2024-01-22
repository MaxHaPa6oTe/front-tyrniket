'use client'
import React from "react";
import './addWorker.css'
import Opove from "@/components/Opove/Opove";
import anonim from './anonim.png'
import Image from "next/image";
import Button2 from "@/components/ButtonGPT/Button2";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Backend_URL } from "@/lib/Constants";

const AddWorker = () => {
  const { data: session } = useSession();
  const [checkedValues, setCheckedValues] = React.useState<number[]>([]);
  const formData = new FormData()
  const [opov,setOpov] = React.useState<boolean>(false)
  const [fio,setFio] = React.useState<string>('')
  const [otdel,setOtdel] = React.useState('')
  const [phone,setPhone] = React.useState('')
  const [karta, setKarta] = React.useState('')
  const [photo,setPhoto] = React.useState<File | null>(null) 
  const [oshibka,setOshibka] = React.useState('')
  const [image,setImage] = React.useState('')
  const [zdanie,setZdanie] = React.useState<null | any[]>(null)
  React.useEffect(()=>{
    axios.defaults.baseURL=Backend_URL
    axios.defaults.headers.common = {'Authorization': `Bearer ${session?.backendTokens.accessToken}`}
    axios.get('/tyrniket/zdanie').then(o=>setZdanie(o.data))
  },[])
  const ADD = () => {
    if (fio === ' ' || fio === '' || fio.length<3 || !photo) {
        return
    }
    let array = ''
    checkedValues.forEach(o=>array=array+o)
    formData.append('fio',fio)
    formData.append('otdel',otdel)
    formData.append('phone',phone)
    formData.append('karta',karta)
    formData.append('dostyp',array)
    formData.append('photo',photo as Blob)
    axios.post('/worker/create',formData)
    .then(()=>{setOpov(true);setOshibka('');setFio('');setImage('');
    setOtdel('');setPhone('');setKarta('');setPhoto(null);
  })
    .catch(e=>setOshibka(e.response.data.message))
    if (opov === true) setTimeout(()=>setOpov(false),5200)
  }

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setPhoto(event.target.files[0]);
      setImage(URL.createObjectURL(event.target.files[0]))
    }
  };

   return <>
    {opov?<Opove text='Сотрудник добавлен'/>:null}
    
   <div className="addWorker">
   <form onSubmit={o=>o.preventDefault()}>
    <h2>Новый работник</h2>
    <h6>{oshibka}</h6>
    
    <div className="forma">
    <div className="fot">
    <label>
        Фото сотрудника
    </label>
    <br/>
    {image?
    <img alt='' src={image} className="ava"/>:
    <Image alt='' src={anonim} className="ava"/>} 
    <br/>
    <label className="uploadLabelBlue">
    <input type="file"
    onChange={handleFileInputChange}
    />Загрузить фото
    </label> 
    </div> 

    <div className="infa">
    <br/>
    <label>
        ФИО Сотрудника
    </label>
    <br/>
    <input type="text" 
    required
    value={fio}
    onChange={o=>setFio(o.target.value)}
    />
    <br/>
    <label>
        Отдел
    </label>
    <br/>
    <input type="text"
    required
    value={otdel}
    onChange={e=>setOtdel(e.target.value)}
    />
    <br/>
   <label>
        Телефон
    </label>
    <br/>
    <input type="text"
    required
    value={phone}
    onChange={e=>setPhone(e.target.value)}
    />
    <br/>
    <label>
        Номер карты
    </label>
    <br/>
    <input type="text"
    required
    value={karta}
    onChange={e=>setKarta(e.target.value)}
    />
    <br/>
    </div>

    <div className="dostyp">
    <fieldset>
  <legend>Доступ к объектам</legend>
{zdanie?zdanie.map(o=><div key={o.id}>
  <input type="checkbox" id={o.id} 
  onChange={() => {
    if (checkedValues.includes(o.id)) {
      setCheckedValues(checkedValues.filter((id) => id !== o.id));
    } else {
      setCheckedValues([...checkedValues, o.id]);
    }
  }}/>
  <label>{o.info}</label>
  </div>):null}
</fieldset>
    </div>
    
    </div>
    <br/>

    <div className="addRab">
    <div onClick={ADD}>
    <Button2 text="Добавить"/>
    </div>
    </div>
    <br/>

    </form>
    </div>
    </>   
};

export default AddWorker;