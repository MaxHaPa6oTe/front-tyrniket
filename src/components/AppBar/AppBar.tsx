'use client'
import Link from "next/link";
import React from "react";
import './AppBar.css'
import Image from "next/image";
import menu from './free-icon-menu-1301992.png'
import akk from './user.png'
import { useRouter } from 'next/navigation'


const AppBar = () => {
  const router = useRouter()
  const [bar,setBar] = React.useState(false)
  const wrapRef = React.useRef<any>(null)
  const handleClick = (e:Event) => {
    if (wrapRef && !wrapRef.current?.contains(e.target)) {
      setBar(false)
  }
}
  React.useEffect(()=>{
    document.addEventListener('mousedown',handleClick)
  },[])
  return (
    <>
      {/* <div className="AppBar">
        <div className="naz">
        <Image src={menu} alt='' className="logo" onClick={()=>setBar(!bar)}/>
        <i>Сервис по проходам</i> 
        </div>
        <div className="sprava">
        <Image src={akk} alt='' className="logo"/>
        <span>User</span>
        </div>
      </div>
      {bar && <div className="menu" ref={wrapRef}>
            <div className="close">
              <i>МЕНЮ</i>
              <span ref={wrapRef} style={{cursor:'pointer'}}
               onClick={()=>setBar(!bar)}>
                X
              </span>
              </div>
              <hr className="otstyp"/>
        <Link href='/workers/worker' className="shapka" onClick={()=>setBar(!bar)}>
          Добавить сотрудника
          </Link>
          <Link href='/workers' className="shapka" onClick={()=>setBar(!bar)}>
          Поиск сотрудника
          </Link>
        <Link href='/otmetki' className="shapka" onClick={()=>setBar(!bar)}>
          Поиск отметки
          </Link>
        <Link href='/tyrnikets' className="shapka" onClick={()=>setBar(!bar)}>
          Турникеты
          </Link>
        <Link href='/profile' className="shapka" onClick={()=>setBar(!bar)}>
          Аккаунт
          </Link>
      </div>} */}
      <div className="AppBar">
        <div className="nadp">
        <i>Сервис по проходам</i> 
        </div>
      <div className="linkCenter">
      <Link href='/workers/worker' className="Linkk" onClick={()=>setBar(!bar)}>
          Добавить сотрудника
          </Link>
          <Link href='/workers' className="Linkk" onClick={()=>setBar(!bar)}>
          Поиск сотрудника
          </Link>
        <Link href='/otmetki' className="Linkk" onClick={()=>setBar(!bar)}>
          Поиск отметки
          </Link>
        <Link href='/tyrnikets' className="Linkk" onClick={()=>setBar(!bar)}>
          Турникеты
          </Link>
      </div>
      <div className="spr">
      <div className="usSpr" onClick={()=>{router.push('/profile')}}>
        <Image src={akk} alt='' className="logo"/>
        <span>User</span>
        </div>
        </div>
      </div>
      </>
  );
};

export default AppBar;
