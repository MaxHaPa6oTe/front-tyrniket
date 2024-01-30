type Props = {
  children: React.ReactNode;
};

export const metadata = {
  title: "Работники",
  description: "Поиск, добавление работника Метроэлектротранс",
};

const WorkersLayout = async (props: Props) => {
  return (
    <div>
      <div>{props.children}</div>
    </div>
  );
};

export default WorkersLayout;
