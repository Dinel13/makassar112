import Marquee from "react-easy-marquee";

export default function HgLaporan() {
  return (
    <Marquee
      duration={5000}
      // background="#00DEFB"
      height="200px"
      width="100%"
      axis="Y"
      id="marquee"
      align="center"
      pauseOnHover={true}
      reverse={true}
    >
      <div className="text-center my-6 max-w-xl overflow-clip whitespace-normal">
        Terjadi Peperangan di daerah Gowa. Laporan telah diteruskan ke pihak
        kepolisian setempat
        <p className=""> 11/21/2021</p>
        <p>3:26</p>
      </div>
      <div className="text-center my-6 max-w-xl overflow-clip whitespace-normal">
        Terjadi kebakaran yang melahap 3 rumah di Sudiang. Lapora telah
        diteruskan kepada Damkar dan akan tiba dalam waktu 10 menit
        <p>10/29/2021</p>
        <p>3:26</p>
      </div>
    </Marquee>
  );
}
