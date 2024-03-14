import styled from "styled-components";
import useAppStore from "../store/useAppStore";

const BackgroundLayout = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(60, 60, 60, 0.7);
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

const Content = styled.div`
  width: 70%;
  text-align: center;
  background: white;
  border: 0 solid #fff;
  border-radius: 5px;
  font-size: 4vmin;
  font-weight: bold;
  padding: 60px 0;
  color: rgba(0, 0, 0, 0.7);
`;

const Modal = () => {
  const { modal, setModal } = useAppStore();

  return (
    <BackgroundLayout onClick={() => setModal({ open: false, content: "" })}>
      <Content>{modal.content ? modal.content : ""}</Content>
    </BackgroundLayout>
  );
};

export default Modal;