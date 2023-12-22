interface PointProps {
  x: number;
  y: number;
};

interface OptionProps {
  value: number;
  parking_name: string;
}

export const options: OptionProps[] = [
  {
    value: 0,
    parking_name: "다온빌딩",
  },
  {
    value: 1,
    parking_name: "여의도 IFC 몰",
  },
  {
    value: 2,
    parking_name: "삼섬동 코엑스",
  },
]

export const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 0, 11]; 

export const parkingInfo = {
  parking_uuid: 1000,
  car_number: "12가1234",
};

export const point_flor2: PointProps[] = [
  {x:584,y:253},
  {x:584,y:261},
];

export const point: PointProps[] = [
  {x:584,y:253},
  {x:584,y:245},
  {x:555,y:245},
  {x:555,y:238},
  {x:561,y:238},
  {x:561,y:230},
  {x:538,y:230},
  {x:538,y:221},
  {x:538,y:171},
  {x:500,y:171},
  {x:462,y:171},
  {x:425,y:171},
  {x:398,y:171},
  {x:381,y:171},
  {x:356,y:171},
  {x:312,y:171},
  {x:277,y:171},
  {x:277,y:210},
  {x:277,y:248},
  {x:277,y:285},
  {x:277,y:323},
  {x:277,y:361},
  {x:300,y:361},
];
