import { Fragment } from "react";
import Header from "./Header";
import CreateBoardPopup from "popups/CreateBoardPopup";
import { useSelector } from "react-redux";

const MainLayout = ({ children }) => {
  const popup = useSelector((state) => state.popup);
  return (
    <Fragment>
      {popup === "create_board" && <CreateBoardPopup />}
      <Header />
      <main>{children}</main>
    </Fragment>
  );
};

export default MainLayout;
