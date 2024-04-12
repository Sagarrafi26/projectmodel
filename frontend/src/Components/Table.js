

import React, { useEffect, useState } from "react";

const Table = ({  }) => {
  const [editingCell, setEditingCell] = useState({ rowId: null, colId: null });
  const [cellValues, setCellValues] = useState(0);
  const [data, setData] = useState([]);
  const [state, setState] = useState({
    rowId: 0,
    colId: 0,
    cellValue: 0,
    cId : 0
  });
  const [dateD,setDateD] = useState("");
  const [modelD,setModelD] = useState("");
  const [productionD,setProductionD] = useState("");
  const [fetchData,setFetchData] = useState("");

  useEffect(() => {
    // API call to fetch data from backend
    fetch('http://localhost:8082/data')
      .then(response => response.json())
      .then(async data => {
        setFetchData(data.data);
        const transformedData = data.data.map(item => ({
          date:item.date.split('T')[0],
          modelId:item.modelId,
          productionValue:item.productionValue
        }));
        let ar1 =[],ar2=[],ar3=[];
      await  data.data.map(item=>{
           ar1.push(item.date);
           ar2.push(item.ModelId);
           ar3.push(item.Production_values);
        })
        let arU = [...new Set(ar1)]
        let arV=  [...new Set(ar2)]
        setDateD(arU);
          setModelD(arV);
          setProductionD(ar3)
  
        console.log("Fetched data:", data); // Log the fetched data
        // console.log("Data type:", typeof data); // Log the type of data
        setData(transformedData);
      })
      .catch(error => console.error('Error fetching company data:', error));
  }, []);
  
  
 

  const handleCellClick = (rowId, colId , cellId) => {
    setState((prev) => {
      return { ...prev, ["rowId"]: rowId, ["colId"]: colId , ["cId"]: cellId};
    });
    setEditingCell({ rowId, colId });
    const cellKey = `${rowId}-${colId}`;
    setCellValues((prevState) => ({
      ...prevState,
      [cellKey]: prevState[cellKey] || "",
    }));
  };
  const handleInputChange = (e) => {
    // const { rowId, colId } = editingCell;
    // console.log('colrowid',rowId,colId)
    // setCellValues(e.target.value);
    setState((prev) => {
      return { ...prev, ["cellValue"]: e.target.value };
    });
  };

  const handleInputBlur = () => {
    setEditingCell({ rowId: null, colId: null });
  };

  const handleCancel = () => {
    setEditingCell({ rowId: null, colId: null });
    setCellValues({});
  };
  const handleSave = async (e) => {
    e.preventDefault();
    // console.log("Current editingCell:", editingCell);
    // if (
    //   editingCell &&
    //   editingCell.rowId !== undefined &&
    //   editingCell.colId !== undefined
    // )
    if (cellValues !== 0 &&  state.cId !== 0) {
      // const { rowId, colId } = editingCell;
      // console.log("rowId:", state.rowId); // Log the value of rowId
      // console.log("colId:", state.colId); // Log the value of colId
      // console.log("modelId:", modelD[state.rowId]); // Log the value of modelId
      // console.log("Id:", dateD[state.colId]); // Log the value of Id

      //const value = cellValues[`${rowId}-${colId}`];
      const value = state.cellValue;
      let col = Number(state.colId);
      const date = dateD[col]; // Get the date from the dates array

      try {
        const response = await fetch(`http://localhost:8082/update`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productionValue: value,
            date: date,
            modelId: modelD[state.rowId],
            id :state.cId
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const newData = [...data];
        console.log(newData);
        newData[state.rowId][col] = value;
        setData(newData);
   
        setEditingCell({ rowId: null, colId: null });
        console.log("Data updated successfully");
        window.location.reload(true)
      } catch (error) {
        console.error("Error updating data:", error);
      }
    } else {
      console.error("Editing cell is null");
    }
  };
console.log('update',state)
  return (
    <div className="overflow-x-auto">
      <table className="table-auto border border-collapse border-gray-500">
        <thead>
          <tr className="bg-gray-200">
            <th colSpan={dateD.length + 1} className="text-center">
              <span className="mx-8">Monthly data for April</span>
            </th>
          </tr>
          <tr className="bg-gray-200">
            <th className="border border-gray-500"></th>
            {/* {dates.map((date, index) => (
              <th key={index} className="border border-gray-500 px-4 py-2">
                {date}
              </th>
            ))} */}
            {
              dateD.length > 0 ? dateD.map((item,index)=>{
                let dewDate = item.split('T')[0];
                  return(
                    <th key={index} className="border border-gray-500 px-4 py-2">
                    {dewDate}
              </th>
                  )
              })
              : ""
            }
          </tr>
        </thead>
        <tbody>
        {modelD.length > 0 ? (
          modelD.map((modelId, rowIndex) => {
            return(
              <tr key={rowIndex}>
              <td className="border border-gray-500 px-4 py-2">{modelId}</td>
              {dateD.map((date, colIndex) => {
                 let productionValue=null , cellId = 0;
                 fetchData.forEach(el=>{
                  let elDate  =  el.date.split('T')[0];
                  let cDate = date.split('T')[0];
                  if( elDate == cDate && el.ModelId === modelId){
                    productionValue = el.Production_values;
                    cellId = el.Id;
                  }
                 // console.log(modelId,"el date", el.date, "date from state", date)
                 })
                // console.log(modelId,date);
                 
                return (
                  <td
                    key={colIndex}
                    className="border border-gray-500 px-4 py-2"
                    onClick={() => handleCellClick(rowIndex, colIndex , cellId)}
                  >
                    {editingCell.rowId === rowIndex &&
                    editingCell.colId === colIndex ? (
                      <input
                        type="number"
                        value={productionValue}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                      />
                     ) : (
                      productionValue === null ? "" : productionValue
                     )}
                  </td>
                );
              })}
            </tr>
            )
          })
        ) : (
          ""
        )}
      </tbody>
      </table>
      {/* Save and Cancel buttons */}
      <div className="flex justify-center my-10">
        <button
          onClick={handleSave}
          className="py-0 mx-4 border   border-gray-500 px-6"
        >
          Save
        </button>
        <button
          onClick={handleCancel}
          className="py-0 mx-4 border  border-gray-500 px-6"
        >
          Cancel
        </button> 
      </div>
    </div>
  );
};

export default Table;

// import React, { useState } from "react";

// const Table = ({ modelIds, data }) => {
//   const [editingCell, setEditingCell] = useState({ rowId: null, colId: null });
//   const [cellValues, setCellValues] = useState({});

//   const getValueForCell = (modelId, date) => {
//     const rowData = data.find(item => item.date === date && item.modelId === modelId);
//     return rowData ? rowData.productionValue : "NA";
//   };

//   const handleCellClick = (rowId, colId) => {
//     setEditingCell({ rowId, colId });
//     const cellKey = `${rowId}-${colId}`;
//     setCellValues(prevState => ({
//       ...prevState,
//       [cellKey]: prevState[cellKey] || "",
//     }));
//   };

//   const handleInputChange = (e) => {
//     const { rowId, colId } = editingCell;
//     const cellKey = `${rowId}-${colId}`;
//     setCellValues(prevState => ({
//       ...prevState,
//       [cellKey]: e.target.value,
//     }));
//   };

//   return (
//     <div className="overflow-x-auto">
//       <table className="table-auto border border-collapse border-gray-500">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="border border-gray-500"></th>
//             {data.map((item, index) => (
//               <th key={index} className="border border-gray-500 px-4 py-2">
//                 {item.date.split('T')[0]}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {modelIds.map((modelId, rowIndex) => (
//             <tr key={rowIndex}>
//               <td className="border border-gray-500 px-4 py-2">{modelId}</td>
//               {data.map((item, colIndex) => (
//                 <td
//                   key={colIndex}
//                   className="border border-gray-500 px-4 py-2"
//                   onClick={() => handleCellClick(rowIndex, colIndex)}
//                 >
//                   {editingCell.rowId === rowIndex && editingCell.colId === colIndex ? (
//                     <input
//                       type="text"
//                       value={cellValues[`${rowIndex}-${colIndex}`] || ""}
//                       onChange={handleInputChange}
//                     />
//                   ) : (
//                     getValueForCell(modelId, item.date)
//                   )}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Table;
