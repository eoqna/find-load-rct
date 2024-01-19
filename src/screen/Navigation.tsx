import { Route, Routes } from "react-router";
import styled from "styled-components";
import InputCarNumber from "./InputCarNumber";
import SelectCar from "./SelectCar";
import FindRoute from "./FindRoute";
import Main from "./Main";
import ParkingInfo from "./ParkingInfo";
import Footer from "../components/Footer";
import FindMyCar from "./mobile/FindMyCar";
import { Colors } from "../utils/colors";
import InputKioskInfo from "./InputKioskInfo";

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
        <Route path="/kiosk/floor" element={<InputKioskInfo />} />
        <Route path="/kiosk/input" element={<InputCarNumber />} />
        <Route path="/kiosk/select" element={<SelectCar />} />
        <Route path="/kiosk/info" element={<ParkingInfo />} />
        <Route path="/kiosk/route" element={<FindRoute />} />
        <Route path="/mobile/find" element={<FindMyCar />} />
        <Route path="/common/footer" element={<Footer />} />
      </Routes>
    </Layout>
  );
}

export default Navigation;