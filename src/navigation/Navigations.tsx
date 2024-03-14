import { Route, Routes, useNavigate } from "react-router";
import styled from "styled-components";
import InputCarNumber from "../screen/InputCarNumber";
import SelectCar from "../screen/SelectCar";
import FindRoute from "../screen/FindRoute";
import Main from "../screen/Main";
import ParkingInfo from "../screen/ParkingInfo";
import Footer from "../components/Footer";
import { Colors } from "../utils/colors";
import InputKioskInfo from "../screen/InputKioskInfo";
import useEventTimeout from "../hooks/useEventTimeout";

const Layout = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${Colors.Background};
`;

const Navigations = () => {
  const navigation = useNavigate();
  useEventTimeout(() => navigation('/'));

  return (
    <Layout className="main" >
      <Routes>
        <Route index element={<Main navigation={navigation} />} />
        <Route path="/kiosk/floor" element={<InputKioskInfo navigation={navigation} />} />
        <Route path="/kiosk/input" element={<InputCarNumber navigation={navigation} />} />
        <Route path="/kiosk/select" element={<SelectCar navigation={navigation} />} />
        <Route path="/kiosk/info" element={<ParkingInfo navigation={navigation} />} />
        <Route path="/kiosk/route" element={<FindRoute navigation={navigation} />} />
        <Route path="/common/footer" element={<Footer />} />
      </Routes>
    </Layout>
  );
}

export default Navigations;