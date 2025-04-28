import { useCallback } from "react";
import useAppStore from "../stores/useAppStore";
import { Colors } from "../utils/colors";
import clsx from "clsx";
import useDataStore from "../stores/useDataStore";

const Modal = () => {
  const { modal, openModal } = useAppStore();
  const { mobile } = useDataStore();

  const onClickButton= useCallback(() => {
    return openModal({
      open: false,
      content: [],
    });
  }, []);

  return (
    <div 
      className="w-full h-full flex justify-center items-center absolute top-0 left-0 z-50"
      style={{ background: "rgba(0, 0, 0, 0.4)"}}
    >
      <div className={clsx(
        "w-2/3 flex flex-col justify-center items-center bg-white shadow-2xl",
        mobile ? "p-6" : "py-14"
      )}>
        {modal.content.map((content, idx) => (
          <p className={clsx(
            "text-[3.5vmin] font-bold",
            mobile ? "mb-4" : "mb-8"
            )} 
            key={idx}
          >
            {modal.content ? content : ""}
          </p>
        ))}
        <button
          className={clsx(
            "text-[3vmin] font-bold text-white cursor-pointer",
            mobile ? "w-full py-3 mt-2" : "w-4/5 py-5 mt-6"
          )}
          style={{ background: Colors.Primary }}
          onClick={onClickButton}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default Modal;