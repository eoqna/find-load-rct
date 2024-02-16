import { useCallback, useEffect, useState } from "react";
import axiosClient from "../utils/axiosClient";

const KioskInfo = () => {
  const [ images, setImages ] = useState<any>();

  useEffect(() => {
    getImageFile();
  }, []);

  const getImageFile = useCallback( async () => {
    const { data } = await axiosClient.post("/api/kiosk/beta/parking/kiosk-list");

    console.log(data);

    setImages(data.list);
  }, []);

  return (
    <div>
      {images.map((item: any) => {
        return (
          <img src={`data:image/jpeg;base64, ${item.img_path_forward}`} alt="alt1" key={item.idx} />
        );
      })}
    </div>
  );
};

export default KioskInfo;