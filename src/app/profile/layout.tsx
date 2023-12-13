import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/route";

type Props = {
  children: React.ReactNode;
};

export const metadata = {
  title: "Аккаунт",
  description: "Аккаунт сервиса Метроэлектротранс",
};

const ProfileLayout = async (props: Props) => {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <div>{props.children}</div>
    </div>
  );
};

export default ProfileLayout;
