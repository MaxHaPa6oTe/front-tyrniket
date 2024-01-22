'use client'

import './akk.css'
import React from "react";
import { useSession } from "next-auth/react";
import Link from 'next/link';

const Profile = () => {
  const { data: session } = useSession();

  return <div className="O1">
    <h3>Ваш профиль</h3>
    {session? <div className='prof'>
      <br/>
    <p><i>Логин: </i>{session.user.name}</p>
    <br/>
    <p><i>Роль: </i>{session.user.role}</p>
    <br/>
    </div>
    :null
  }
      <div className="exit">
        <Link
          href={"/api/auth/signout"}
          >
          Сменить аккаунт?
        </Link>
      </div>
    </div>;
};

export default Profile;
