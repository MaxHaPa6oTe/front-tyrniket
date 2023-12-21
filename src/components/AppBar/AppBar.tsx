'use client'
import Link from "next/link";
import React from "react";
import './AppBar.css'

const AppBar = () => {
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
      <div className="AppBar">
        <button onClick={()=>setBar(!bar)}>xyi</button>
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
        <Link href='/otmetki' className="shapka" onClick={()=>setBar(!bar)}>
          Отметки
          </Link>
        <Link href='/workers' className="shapka" onClick={()=>setBar(!bar)}>
          Работники
          </Link>
        <Link href='/tyrnikets' className="shapka" onClick={()=>setBar(!bar)}>
          Турникеты
          </Link>
        <Link href='/profile' className="shapka" onClick={()=>setBar(!bar)}>
          Аккаунт
          </Link>
      </div>}
      </>
  );
};

export default AppBar;
