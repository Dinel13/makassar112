import Marquee from "react-easy-marquee";

export default function HgLaporan() {
  return (
    <Marquee
      duration={25000}
      // background="#00DEFB"
      height="160px"
      width="100%"
      axis="X"
      align="center"
      pauseOnHover={true}
      reverse={true}
    >
      <div className="text-center h-24  flex-col flex items-center border p-4 dark-sidebar m-4 rounded-xl">
        <p>
          Terjadi Peperangan di daerah Gowa. Laporan telah diteruskan ke pihak
          kepolisisan setempat
        </p>
        <p>11/21/2021</p>
        <p>3:26</p>
      </div>
      <div className="text-center h-24  flex-col flex items-center border  p-4 dark-sidebar m-4 rounded-xl">
        <p>
          fdsfds fsd fas asdasa sadsad sad sad. fasfafasf asdasd asdasd asdasd
          asdasd asd
        </p>
        <p>10/29/2021</p>
        <p>3:26</p>
      </div>
      <div className="text-center h-24 flex-col flex items-center border  p-4 dark-sidebar m-4 rounded-xl">
        <p>
          Tdasdsadasdsa sadsadas sadasda. fasdsaddsad asdasd ada asdasd
          awdsadasdsafda fa. sdfsfsfs sdfsdfsdfsdfsfds sdf dsfsdf fa
        </p>
        <p>1/2y1/2021</p>
        <p>3:26</p>
      </div>
    </Marquee>
  );
}
