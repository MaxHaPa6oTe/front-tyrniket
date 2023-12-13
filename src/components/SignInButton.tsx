'use client'

import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const SignInButton = () => {
  const { data: session } = useSession();
  console.log({ session });

  if (session && session.user)
    return (
      <div>
        <span>{session.user.name} |</span>
        <Link
          href={"/api/auth/signout"}
          >
          | Выход
        </Link>
      </div>
    );

  return (
    <div>
      <Link
        href={"/api/auth/signin"}
      >
        | Вход |
      </Link>
    </div>
  );
};

export default SignInButton;
