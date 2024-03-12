import styled from "styled-components";

export const InputLayout = styled.div`
  width: calc(100% - 18px);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0 10px;
`;

export const NumberPadLayout = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 5px;
`;

export const NumberPad = styled.button`
  width: calc(33% - 10px);
  margin: 5px;
  height: 8vh;
  text-align: center;
  background: #fff;
  color: rgba(0, 0, 0, 0.6);
  font-size: 1.5rem;
  font-weight: bold;
  border: 0 solid #fff;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
`;