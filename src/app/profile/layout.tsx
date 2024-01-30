type Props = {
  children: React.ReactNode;
};

export const metadata = {
  title: "Аккаунт",
  description: "Аккаунт сервиса Метроэлектротранс",
};

const ProfileLayout = async (props: Props) => {
  return (
    <div>
      <div>{props.children}</div>
    </div>
  );
};

export default ProfileLayout;
