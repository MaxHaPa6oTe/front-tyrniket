// import { getServerSession } from "next-auth";
// import { authOptions } from "../api/auth/[...nextauth]/route";

type Props = {
  children: React.ReactNode;
};

export const metadata = {
  title: "Турникеты",
  description: "Список турникетов Метроэлектротранс",
};

const TyrniketsLayout = async (props: Props) => {
  // const session = await getServerSession(authOptions)
 return (
    <>
      <div>{props.children}</div>
    </>
  );
};

export default TyrniketsLayout;
