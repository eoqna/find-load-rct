import styled from "styled-components";
import { Colors } from "../../utils/colors";

export const CarListLayout = styled.div`
  width: calc(100% - 40px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px 20px;
  padding: 8px;
  margin-bottom: 5px;
  background: ${Colors.White};
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  border-radius: 8px;
  user-select: none;
`;

export const CarImageLayout = styled.div`
  width: 25%;
  height: 100%;
`;

export const CarImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 4px;
`;

export const CarInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: calc(55% - 10px);
  height: 100%;
  margin: 0 8px;
`;

export const CarNumber = styled.p`
  display: flex;
  width: 100%;
  align-items: center;
  color: ${Colors.Primary};
  font-size: 1.6rem;
  font-weight: bold;
  margin: 0;
`;

export const CarInfoColumn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Label = styled.p`
  display: flex;
  align-items: center;
  font-size: 0.7rem;
  font-weight: bold;
  margin: 0 0 3px 0;
`;

export const Text = styled.p`
  display: flex;
  align-items: center;
  width: 60%;
  padding: 2px 6px;
  margin: 0;
  border-radius: 4px;
  color: #fff;
  background: #006eb6;
  font-weight: bold;
  font-size: 0.7rem;
`;

export const LocationInfoButtonLayout = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${Colors.Red};
  border: 1px solid #eee;
  border-radius: 4px;
`;

export const ButtonText = styled.span`
  font-size: 0.6rem;
  font-weight: bold;
  color: ${Colors.White};
  margin: 4px 0 0 0;
`;
