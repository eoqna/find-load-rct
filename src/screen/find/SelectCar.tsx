import { useNavigate } from "react-router-dom";
import useDataStore from "../../store/useDataStore";
import styled from "styled-components";

const Layout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  background-color: #aaa;
  border: 0;
  border-radius: 10px;
  color: #ffffff;
  font-size: 30px;
  width: 605px;
  height: 100px;
  margin-top: 20px;
  cursor: pointer;
`;

const SelectCar = () => {
  const { carNumber } = useDataStore();
  const navigation = useNavigate();

  return (
    <Layout>
      <Button
        onClick={() => navigation("/find")}
      >{carNumber}</Button>
    </Layout>
  )
};

export default SelectCar;