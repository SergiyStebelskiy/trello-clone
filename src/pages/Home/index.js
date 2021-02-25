import { useEffect } from "react";
import { useHistory } from "react-router-dom";
const HomePage = () => {
  const history = useHistory();
  useEffect(() => history.push("/boards"), [history]);
  return <div></div>;
};

export default HomePage;
