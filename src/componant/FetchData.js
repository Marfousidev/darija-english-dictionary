import React, { useState, useEffect } from "react";

import MoroccanDarija from "../MoroccanDarija.png";
const FetchData = () => {
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedJSON, setSelectedJSON] = useState(null);

  useEffect(() => {
    // Fetch data from data.json
    fetch("https://raw.githubusercontent.com/Marfousidev/darija-english-dictionary/gh-pages/data.json")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Fetch error for data.json:", error);
      });
    // Fetch data from data1.json
    fetch("https://raw.githubusercontent.com/Marfousidev/darija-english-dictionary/gh-pages/data1.json")
      .then((response) => response.json())
      .then((data) => {
        setData1(data);
      })
      .catch((error) => {
        console.error("Fetch error for data1.json:", error);
      });
    // Fetch data from data2.json
    fetch("https://raw.githubusercontent.com/Marfousidev/darija-english-dictionary/gh-pages/data2.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setData2(data);
      })
      .catch((error) => {
        console.error("Fetch error for data2.json:", error);
      });
    // Fetch data from data3.json
    fetch("https://raw.githubusercontent.com/Marfousidev/darija-english-dictionary/gh-pages/data3.json")
      .then((response) => response.json())
      .then((data) => {
        setData3(data);
      })
      .catch((error) => {
        console.error("Fetch error for data3.json:", error);
      });
    // Fetch data from data4.json
    fetch("https://raw.githubusercontent.com/Marfousidev/darija-english-dictionary/gh-pages/data4.json")
      .then((response) => response.json())
      .then((data) => {
        setData4(data);
      })
      .catch((error) => {
        console.error("Fetch error for data4.json:", error);
      });
  }, []);

  useEffect(() => {
    // Combine data from both files based on the selected JSON file
    let combinedData = [];

    switch (selectedJSON) {
      case "data":
        combinedData = data;
        break;
      case "data1":
        combinedData = data1;
        break;
      case "data2":
        combinedData = data2;
        break;
      case "data3":
        combinedData = data3;
        break;
      case "data4":
        combinedData = data4;
        break;
      default:
        break;
    }

   
   
  });

  const handleSearch = () => {
    // Combine data from both files
    const combinedData = [...data, ...data1, ...data2, ...data3, ...data4];

    // Filter data based on search term
    const filtered = combinedData.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    // Update the filtered data state
    setFilteredData(filtered);
  };

  const handleClear = () => {
    setSearchTerm("");
    setFilteredData([]);
  };

  return (
    <div>
      <div className="bg-stone-200 p-1 block justify-center items-center w-full; pb-8 ">
        <div className="grid  place-content-center ">
          <img
            className="w-48 my-8 rounded-3xl"
            src={MoroccanDarija}
            alt="Logo"
          />
          <div className="text-slate-800 font-medium mb-3  sm:md:text-base text-sm text-center ">
          <h3 className="text-blue-900 italic">Link To Our Website</h3>
          <a href="https://crossculturelove.com/" target="_blank" className="underline italic font-bold text-red-700">CrossCultureLove</a>
          </div>
         

        </div>

        <div className="flex  place-content-center w-full ">
          <input
            className="p-2 mb-8 bg-neutral-100 text-slate-400 font-medium  rounded-3xl border-none text-smd sm:w-1/3 lg:w-8/12"
            type="text"
            placeholder="Search English or Darija"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex  place-content-center   ">
          <div className="">
            <button
              className=" p-2 mr-3 bg-gradient-to-r cursor-pointer w-13  text-smd  from-stone-300 to-white-200 hover:bg-white text-slate-500 font-light   rounded-3xl border-none"
              id="search"
              onClick={handleSearch}
            >
              Search
            </button>

            <button
              className="p-2 m- bg-gradient-to-r cursor-pointer w-13  text-smd  from-stone-300 to-white-200 hover:bg-white text-slate-500 font-light w-fit rounded-3xl border-none"
              id="Clear"
              onClick={handleClear}
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      <div className="w-full bg-slate-700  ">
        {searchTerm.trim() !== "" &&
          filteredData.length > 0 && ( // Conditionally render data when showData is true
            <table className="w-full">
              <thead>
                <tr className="text-sm  text-center  sm:md:text-base lg:text-base ">
                  {Object.keys(filteredData[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-sm  text-center  sm:md:text-base lg:text-base">
                {filteredData.map((item, index) => (
                  <tr key={index}>
                    {Object.values(item).map((value, idx) => (
                      <td
                        className="w-8 h-1 row-auto border-solid border-2 border-gray-500 p-1 "
                        key={idx}
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
      </div>
    </div>
  );
};

export default FetchData;