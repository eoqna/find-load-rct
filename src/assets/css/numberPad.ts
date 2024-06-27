import styled from "styled-components";
import { Colors } from "../../utils/colors";

export const InputLayout = styled.div`
  width: calc(100% - 40px);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0 20px;
  border: 1px solid ${Colors.Black};
  border-radius: 6px;
`;

export const Input = styled.input`
  width: 20%;
  height: 10vh;
  font-size: 1.8rem;
  color: #006eb6;
  font-weight: bold;
  text-align: center;
  border: none;
  outline: none;
  cursor: default;
`;

export const NumberPadLayout = styled.div`
  width: calc(100% - 38px);
  margin: 10px 20px 0;
  text-align: center;
  margin-top: 12px;
`;

export const NumberPadGroupLayout = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const NumberPad = styled.button<{ mode: string }>`
  width: 33.33%;
  height: 8vh;
  margin: 5px;
  padding: 0;
  text-align: center;
  font-weight: bold;
  ${(props) => props.mode === "default" 
    ? `border: 1px solid ${Colors.DarkGray};
       color: ${Colors.DarkGray};
       font-size: 1.5rem;
       background: ${Colors.White};
      `
    : `border: 1px solid ${Colors.DarkGray};
       color: ${Colors.White};
       font-size: 1.3rem;
       background: ${Colors.Primary};
      `
  }
  cursor: pointer;
  outline: none;
  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }
`;