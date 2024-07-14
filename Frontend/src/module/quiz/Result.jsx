import React, { useEffect, useState } from "react";
import Navbar from "../base/Navbar";
import { useParams } from "react-router-dom";
import parser from "fast-xml-parser";
import { saveAs } from "file-saver";
import * as xlsx from 'xlsx';

const Result = () => {
  const { quiz_slug } = useParams();
  const [xmlData, setXmlData] = useState(null);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_QUIZ_RESULT + `${quiz_slug}/`;
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: "JWT " + localStorage.getItem("accessToken"),
      },
    };
    // Fetch XML data
    fetch(apiUrl, requestOptions)
      .then((response) => response.text())
      .then((xml) => {
        const jsonData = new parser.XMLParser(xml, { ignoreAttributes: false });
        setXmlData(jsonData);
      })
      .catch((error) => {
        console.error("Error fetching or parsing XML:", error);
      });
  }, []);

  const handleDownload = () => {
    if (!xmlData) return;

    // Transform xmlData into an array of arrays representing rows and columns
    const rows = Object.keys(xmlData).map((key) => {
      return [key, xmlData[key]]; // Each key-value pair becomes a row
    });

    // Create a new workbook
    const wb = xlsx.utils.book_new();

    // Create a new worksheet
    const ws = xlsx.utils.aoa_to_sheet(rows);

    // Add the worksheet to the workbook
    xlsx.utils.book_append_sheet(wb, ws, "Sheet1");

    // Convert the workbook to an Excel file
    const excelBuffer = xlsx.write(wb, { bookType: "xlsx", type: "array" });

    // Save the Excel file
    const excelBlob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(excelBlob, "quiz_results.xlsx");
  };
  return (
    <>
      <div>
        <Navbar />
        <div className="container mx-auto mt-8">
          <button
            onClick={handleDownload}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Download Excel
          </button>
        </div>
      </div>
    </>
  );
};

export default Result;
