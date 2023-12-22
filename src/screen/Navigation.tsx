import { Route, Routes } from "react-router";
import styled from "styled-components";
import InputCarNumber from "./kiosk/InputCarNumber";
import SelectCar from "./SelectCar";
import FindRoute from "./kiosk/FindRoute";
import Main from "./Main";
import ParkingInfo from "./kiosk/ParkingInfo";
import Footer from "../components/Footer";
import FindMyCar from "./mobile/FindMyCar";
import Login from "./mobile/Login";
import Join from "./mobile/Join";
import { Colors } from "../utils/colors";

const Layout = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${Colors.Background};
`;

const Navigation = () => {
  return (
    <Layout className="main" >
      <Routes>
        <Route index element={<Main />} />
        <Route path="/mobile/login" element={<Login />} />
        <Route path="/mobile/join" element={<Join />} />
        <Route path="/kiosk/input" element={<InputCarNumber />} />
        <Route path="/select" element={<SelectCar />} />
        <Route path="/kiosk/info" element={<ParkingInfo />} />
        <Route path="/kiosk/route" element={<FindRoute />} />
        <Route path="/mobile/find" element={<FindMyCar />} />
        <Route path="/common/footer" element={<Footer />} />
      </Routes>
    </Layout>
  );
}

export default Navigation;