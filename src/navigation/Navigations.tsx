import { Route, Routes, useNavigate } from "react-router";
import styled from "styled-components";
import CarNumber from "../screen/CarNumber";
import SelectCar from "../screen/SelectCar";
import FindRoute from "../screen/FindRoute";
import Main from "../screen/Main";
import Footer from "../components/Footer";
import { Colors } from "../utils/colors";
import useEventTimeout from "../hooks/useEventTimeout";
import NotFoundPage from "../screen/NotFoundPage";

const Layout = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${Colors.White};
`;

const Navigations = () => {
  const navigation = useNavigate();
  
  // 30초 동안 움직임이 없으면 메인 화면으로 이동
  // useEventTimeout(() => navigation('/'));

  return (
    <Layout className="main" >
      <Routes>
        <Route index element={<Main navigation={navigation} />} />
        <Route path="kiosk">
          <Route path="input" element={<CarNumber navigation={navigation} />} />
          <Route path="select" element={<SelectCar navigation={navigation} />} />
          <Route path="route" element={<FindRoute navigation={navigation} />} />
        </Route>
        <Route path="/common/footer" element={<Footer />} />
        <Route path="/*" element={<NotFoundPage navigation={navigation} />} />
      </Routes>
    </Layout>
  );
}

export default Navigations;