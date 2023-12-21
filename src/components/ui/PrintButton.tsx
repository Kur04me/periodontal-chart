import Image from "next/image";
import style from "@styles/menu.module.scss";

const PrintButton = () => {
  const handlePrint = () => {
    window.print();
  };

  const svgFileName = "printer_icon.svg";
  const svgFileURL =
    process.env.NODE_ENV === "development"
      ? `/assets/${svgFileName}`
      : `/periodontal-chart/assets/${svgFileName}`;

  return (
    <>
      <Image
        src={svgFileURL}
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
