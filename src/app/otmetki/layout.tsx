import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/route";

type Props = {
  children: React.ReactNode;
};

export const metadata = {
  title: "Отметки",
  description: "Поиск отметок сотрудника",
};

const OtmetkiLayout = async (props: Props) => {
  // const session = await getServerSession(authOptions);
  return (
    <div>
      <div>{props.children}</div>
    </div>
  );
};

export default OtmetkiLayout;
