import  { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import axios from "axios";
import BillReceipt from "./BillReceipt";
import "./App.css";

const App = () => {
  const [data, setData] = useState([]);
  const receiptRef = useRef();

  useEffect(() => {
    axios
      .get("https://api.ownfood.com.bd/api/v1/get-single-orders/66b34e7c31c565578a494692")
      .then((response) => {
        if (response.data.status === "Success") {
          setData(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);


  const handlePrintMini = useReactToPrint({
    content: () => receiptRef.current,
    pageStyle: `
      @media print {
        @page { size: 80mm 200mm; margin: 0; }
        body { margin: 0; }
        .receipt {
          font-size: 10px; /* Adjust font size for smaller print */
        }
      }
    `,
  });
  
  const handlePrintA4 = useReactToPrint({
    content: () => receiptRef.current,
    pageStyle: `
      @media print {
        @page { size: A4; margin: 20mm; }
        body { margin: 0; }
      }
    `,
  });
  


  return (
    <div>
      <BillReceipt ref={receiptRef} data={data} />
      <button onClick={handlePrintMini}>Print Mini PDF</button>
      <button onClick={handlePrintA4}>Print A4 PDF</button>
    </div>
  );
};

export default App;
