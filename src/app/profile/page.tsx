'use client'

import './akk.css'
import React from "react";
import { useSession } from "next-auth/react";
import SignInButton from '@/components/SignInButton';

const Profile = () => {
  const { data: session } = useSession();

  return <div className="O1">
    <SignInButton/>
    <h3>Ваш профиль</h3>
    {session? <div>
    <p>{session.user.id}</p>
    <p>{session.user.name}</p>
    <p>{session.user.role}</p>
    {session.backendTokens.accessToken}
    </div>
    :null
  }
    </div>;
};

export default Profile;
