import Link from "next/link";
import React from "react";
import './AppBar.css'

const AppBar = () => {
  return (
      <div className="AppBar">
        <Link href='/otmetki' className="shapka">Отметки</Link>
        <Link href='/workers' className="shapka">Работники</Link>
        <Link href='/tyrnikets' className="shapka">Турникеты</Link>
        <Link href='/profile' className="shapka">Аккаунт</Link>
      </div>
  );
};

export default AppBar;
