import Image from "next/image";
import style from "@styles/menu.module.scss";

const PrintButton = () => {
  const handlePrint = () => {
    window.print();
  };
  return (
    <>
      <Image
        src="/periodontal-chart/assets/printer_icon.svg"
        alt="print-button-icon"
        height={32}
        width={32}
        className={style["menu-icon"]}
        onClick={handlePrint}
      />
      <label>印刷</label>
    </>
  );
};

export default PrintButton;
