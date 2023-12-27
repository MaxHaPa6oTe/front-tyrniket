import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Backend_URL } from "@/lib/Constants";
import { getServerSession } from "next-auth";

// type Props = {
//   params: {
//     id: string;
//   };
// };

// const ProfilePage = async (props: Props) => {
//   const session = await getServerSession(authOptions);
//   const response = await fetch(Backend_URL + `/user/${props.params.id}`, {
//     method: "GET",
//     headers: {
//       authorization: `Bearer ${session?.backendTokens.accessToken}`,
//       "Content-Type": "application/json",
//     },
//   });
//   // console.log({ response });
//   const user = await response.json();

  return (
    <div>
      <div>
        User Profile
      </div>

      <div>
        <p>Name:</p>
        <p>{user.name}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
