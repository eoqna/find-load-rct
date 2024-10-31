import styled from "styled-components";
import { Colors } from "../../utils/colors";

export const CarInfoLayout = styled.div`
  width: 80%;
  height: 50%;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 5px;
  padding: 10px;
  align-items: center;
  margin-bottom: 10px;
`;

export const CarImage = styled.img`
  width: 100%;
  height: 40%;
`;

export const CarInfo = styled.div`
  width: 100%;
  height: calc(60% - 15px);
  display: flex;
  flex-direction: column;
  margin-top: 15px;
`;

export const TextLayout = styled.div`
  display: flex;
  width: 100%;
  height: calc(25% - 10px);
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const Label = styled.p`
  padding: 0;
  margin: 0;
  width: 23%;
  font-weight: bold;
  font-size: 3vmin;
`;

export const Text = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 75%;
  height: calc(80% - 10px);
  padding: 5px 0;
  border-radius: 5px;
  color: #fff;
  background: #006eb6;
  font-weight: bold;
  font-size: 3vmin;
  margin: 0;
`;

export const ButtonLayout = styled.div<{ $mobile?: boolean }>`
  display: flex;
  width: calc(80% + 20px);
  height: 10%;
  flex-direction: row;
  align-items: center;
  justify-content: ${({ $mobile }) => $mobile ? "center" : "space-between"};
`;

export const Button = styled.button<{ $mobile?: boolean }>`
  width: ${({ $mobile }) => $mobile ? "100%" : "48%"};
  height: ${({ $mobile }) => $mobile ? "70%" : "100%"};
  margin: 0;
  padding: 0;
  font-size: 4vmin;
  font-weight: bold;
  color: ${Colors.White};
  background: ${Colors.Primary};
  border: 0 solid ${Colors.Primary};
  border-radius: 10px;
`;