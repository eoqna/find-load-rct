import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { carList } from "../../utils/temp";
import useDataStore from "../../store/useDataStore";

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
  const navigation = useNavigate();
  const { setSelectCar } = useDataStore();

  const onSelectCarNumber = (item: ApiResponse.CarState) => {
    setSelectCar(item);
    navigation("/find");
  };

  return (
    <Layout>
      {
        carList.map((item, index) => {
          return (
            <Button
              onClick={() => onSelectCarNumber(item)}
              key={index}
            >
              {item.car_number}
            </Button>
          );
        })
      }
    </Layout>
  )
};

export default SelectCar;