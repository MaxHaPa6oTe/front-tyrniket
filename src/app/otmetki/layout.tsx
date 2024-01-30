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
      {props.children}
    </div>
  );
};

export default OtmetkiLayout;
