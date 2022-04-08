import { useParams } from "react-router-dom";
const UserProfile = () => {
  const { email } = useParams();
  return <h1>user profile:{email} </h1>;
};

export default UserProfile;
