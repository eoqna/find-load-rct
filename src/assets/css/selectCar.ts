import styled from "styled-components";
import { Colors } from "../../utils/colors";

export const Layout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const CarListLayout = styled.div<{ $margin: number, $height: string, $center: boolean }>`
  width: 100%;
  height: ${({ $height }) => $height};
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  margin-top: ${({ $margin }) => `${$margin}px`};
  overflow-y: auto;
  ${({ $center }) => $center && "justify-content: center; align-items: center;"}
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const CarInfoLayout = styled.div`
  width: calc(100% - 72px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  margin: 0px 20px 20px 20px;
  background: ${Colors.White};
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 8px;
  user-select: none;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const CarImageLayout = styled.div<{ $url?: string }>`
  width: 25%;
  height: 100%;
  background: url(${({ $url }) => $url});
  background-size: cover;
  background-position: center center;
  border-radius: 4px;
  border: 1px solid ${Colors.LightGray};
`;

export const CarInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: calc(55% - 32px);
  height: 100%;
  margin: 0 16px;
`;

export const CarNumber = styled.p`
  display: flex;
  width: 100%;
  align-items: center;
  color: ${Colors.Primary};
  font-size: 5vmin;
  font-weight: bold;
  margin: 0 0 4px;
`;

export const CarInfoColumn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const Label = styled.p`
  display: flex;
  align-items: center;
  font-size: 3vmin;
  font-weight: bold;
  margin: 0;
`;

export const Text = styled.p`
  width: 60%;
  display: flex;
  align-items: center;
  padding: 4px 8px;
  margin: 0;
  border-radius: 4px;
  color: #fff;
  background: #006eb6;
  font-weight: bold;
  font-size: 2.8vmin;
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
  font-size: 3vmin;
  font-weight: bold;
  color: ${Colors.White};
  margin: 4px 0 0 0;
`;
