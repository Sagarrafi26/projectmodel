 
// import React, { useState, useEffect } from "react";
 
// const Table = ({ modelIds }) => {
//   const [editingCell, setEditingCell] = useState(null);
//   const [cellValues, setCellValues] = useState({});
//   const[data,setData]=useState([])
//   // Function to handle cell click
//   const handleCellClick = (rowId, colId) => {
//     console.log("Clicked cell:", rowId, colId);
//     setEditingCell({ rowId, colId });
//     // Initialize cell value if not present
//     setCellValues((prevState) => ({
//       ...prevState,
//       [`${rowId}-${colId}`]: prevState[`${rowId}-${colId}`] || "",
//     }));
//   };
 
//   // Function to handle input change
//   const handleInputChange = (e) => {
   
//     if (editingCell) {
//       const { rowId, colId } = editingCell;
//       const value = e.target.value;
//       setCellValues((prevState) => ({
//         ...prevState,
//         [`${rowId}-${colId}`]: value,
//       }));
//     }
//   };
 
//   // Function to handle input blur
//   const handleInputBlur = () => {
//     setEditingCell(null);
//   };
//   const handleCancel = () => {
//     setEditingCell(null); // Clear editingCell state
//     setCellValues({}); // Clear cellValues state
//   };
 
//   // Function to handle saving edited cell values
//   const handleSave = async (e) => {
//      e.preventDefault();
//     console.log("Current editingCell:", editingCell);
//     if (editingCell) {
//       const { rowId, colId } = editingCell;
//       console.log("rowId:", rowId); // Log the value of rowId
//     console.log("colId:", colId); // Log the value of colId
//     console.log("modelId:", modelIds[rowId]); // Log the value of modelId
//     console.log("Id:", ids[colId]); // Log the value of Id
//      const  value = cellValues[`${rowId}-${colId}`];
   
//     try {
   
     
//         // Make the update request
//         const response = await fetch(`http://localhost:8082/update`, {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             productionValue: value,
//             id: rowId,
//             modelId: modelIds[colId],
//           }),
//         });
       
 
//         // Check if the response is successful
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const newData = [...data];
//         newData[rowId][colId] = value;
//         setData(newData);
 
//         // Update the state if the response is successful
//         setEditingCell(null);
//         console.log("Data updated successfully");
//       } catch (error) {
//         console.error("Error updating data:", error);
//       }
//     } else {
//       console.error("Editing cell is null");
 
//   };
//     }
//     useEffect(() => {
//       // API call to fetch data from backend
//       fetch('http://localhost:8082/data')
//         .then(response => response.json())
//         .then(result => {
//           console.log("Received data:", result.data); // Log the received data
//           // Check if data is an array before calling map
//           if (Array.isArray(result.data)) {
//             // Transform data into the desired format
//             const transformedData = result.data.map(item => ({
//               modelId: item.ModelID,
//               date: item.date
//               // Add other properties you need
//             }));
   
//             // Update state with transformed data
//             setData(transformedData);
//           } else {
//             console.error("Received data is not an array:", result.data);
//           }
//         })
//         .catch(error => console.error('Error fetching model data:', error));
//     }, []);
 
   
 
 
//   // Generate IDs 1 to 30
//   const ids = Array.from({ length: 30 }, (_, i) => i + 1);
 
//   return (
//     <div className="overflow-x-auto">
//       <table className="table-auto border border-collapse border-gray-500">
//         <thead>
//         <tr className="bg-gray-200">
//       <th colSpan="40" className="text-center">
//         <span className="mx-8">Monthly data for April</span>
//       </th>
//     </tr>
//           <tr className="bg-gray-200">
         
//             <th className="border border-gray-500"></th>
//             {/* Render IDs horizontally */}
//             {ids.map((date) => (
//               <th key={date} className="border border-gray-500 px-4 py-2">
//                 {date}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {/* Render ModelIds vertically */}
//           {modelIds.map((modelId, rowIndex) => (
//             <tr key={modelId}>
//               <td className="border border-gray-500 px-4 py-2">{modelId}</td>
//               {ids.map((id, colIndex) => {
//                 const cellKey = `${rowIndex}-${colIndex}`;
//                 const productionValue = data.find(item => item.modelId === modelId && item.date === id)?.productionValue || "";
 
//                 return (
//                   <td
//                     key={id}
//                     className="border border-gray-500 px-4 py-2"
//                     onClick={() => handleCellClick(rowIndex, colIndex)}
//                   >
//                     {/* Conditionally render input field */}
//                     {editingCell &&
//                     editingCell.rowId === rowIndex &&
//                     editingCell.colId === colIndex ? (
//                       <input
//                         type="text"
//                         value={cellValues[cellKey]}
//                         onChange={handleInputChange}
//                         onBlur={handleInputBlur}
//                       />
//                     ) : (
//                       productionValue
//                     )}
//                   </td>
//                 );
//               })}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {/* Save button */}
//       <div className="flex justify-center my-10 ">
//       <button
//         onClick={handleSave}
//         className="py-0 mx-4 border   border-gray-500 px-6   "
//       >
//         Save
//       </button>
//       <button
//         onClick={handleCancel}
//         className="py-0 mx-4 border  border-gray-500 px-6 "
//       >
//         Cancel
//       </button>
//       </div>            
//     </div>
//   );
// };
 
// export default Table;
 
// import React, { useState } from "react";

// const Table = ({ modelIds }) => {
//   const [editingCell, setEditingCell] = useState({ rowId: null, colId: null });
//   const [cellValues, setCellValues] = useState({});
//   const [data, setData] = useState([]);

//   const handleCellClick = (rowId, colId) => {
//     console.log("Clicked cell:", rowId, colId);
//     setEditingCell({ rowId, colId });
//     const cellKey = `${rowId}-${colId}`;
//     setCellValues((prevState) => ({
//       ...prevState,
//       [cellKey]: prevState[cellKey] || "",
//     }));
//   };

//   const handleInputChange = (e) => {
//     const { rowId, colId } = editingCell;
//     const value = e.target.value;
//     setCellValues((prevState) => ({
//       ...prevState,
//       [`${rowId}-${colId}`]: value,
//     }));
//   };

//   const handleInputBlur = () => {
//     setEditingCell({ rowId: null, colId: null });
//   };

//   const handleCancel = () => {
//     setEditingCell({ rowId: null, colId: null });
//     setCellValues({});
//   };

//   const handleSave = async (e) => {
//     e.preventDefault();
//     console.log("Current editingCell:", editingCell);
//     if (editingCell && editingCell.rowId !== undefined && editingCell.colId !== undefined) {
//       const { rowId, colId } = editingCell;
//       console.log("rowId:", rowId); // Log the value of rowId
//       console.log("colId:", colId); // Log the value of colId
//       console.log("modelId:", modelIds[rowId]); // Log the value of modelId
//       console.log("Id:", dates[colId]); // Log the value of Id
   
//     const value = cellValues[`${rowId}-${colId}`];
//     // Assuming the month is April

//     try {
//       const response = await fetch(`http://localhost:8082/update`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           productionValue: value,
//           date: dates,
          
//           modelId: modelIds[rowId],
//         }),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const newData = [...data];
//       newData[rowId][colId] = value;
//       setData(newData);

//       setEditingCell({ rowId: null, colId: null });
//       console.log("Data updated successfully");
//     } catch (error) {
//       console.error("Error updating data:", error);
//     }
//   }else {
//       console.error("Editing cell is null");
//     }
  
//   };

//   const dates = Array.from({ length: 30 }, (_, i) => {
//     const day = i + 1;
//     const formattedDay = day < 10 ? `0${day}` : day; // Add leading zero if day is less than 10
//     return `2024-04-${formattedDay}`;
//   }); // Assuming there are 30 days in a month

//   return (
//     <div className="overflow-x-auto">
//       <table className="table-auto border border-collapse border-gray-500">
//         <thead>
//           <tr className="bg-gray-200">
//             <th colSpan={days.length + 1} className="text-center">
//               <span className="mx-8">Monthly data for April</span>
//             </th>
//           </tr>
//           <tr className="bg-gray-200">
//             <th className="border border-gray-500"></th>
//             {dates.map((day,index) => (
//               <th key={index} className="border border-gray-500 px-4 py-2">
//                 {day}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {modelIds.map((modelId, rowIndex) => (
//             <tr key={modelId}>
//               <td className="border border-gray-500 px-4 py-2">{modelId}</td>
//               {days.map((day, colIndex) => {
//                 const cellKey = `${rowIndex}-${colIndex}`;
//                 return (
//                   <td
//                     key={day}
//                     className="border border-gray-500 px-4 py-2"
//                     onClick={() => handleCellClick(rowIndex, colIndex)}
//                   >
//                     {editingCell.rowId === rowIndex &&
//                     editingCell.colId === colIndex ? (
//                       <input
//                         type="text"
//                         value={cellValues[cellKey] || ""}
//                         onChange={handleInputChange}
//                         onBlur={handleInputBlur}
//                       />
//                     ) : (
//                       cellValues[cellKey] || ""
//                     )}
//                   </td>
//                 );
//               })}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <div className="flex justify-center my-10 ">
//         <button
//           onClick={handleSave}
//           className="py-0 mx-4 border   border-gray-500 px-6   "
//         >
//           Save
//         </button>
//         <button
//           onClick={handleCancel}
//           className="py-0 mx-4 border  border-gray-500 px-6 "
//         >
//           Cancel
//         </button>
//       </div>
//     </div>
//   );
// };


// export default Table;


import React, { useState } from "react";

const Table = ({ modelIds }) => {
  const [editingCell, setEditingCell] = useState({ rowId: null, colId: null });
  const [cellValues, setCellValues] = useState({});
  const [data, setData] = useState([]);

  // Generate dates array for the month of April
  const dates = Array.from({ length: 30 }, (_, i) => {
    const day = i + 1;
    const formattedDay = day < 10 ? `0${day}` : day; // Add leading zero if day is less than 10
    return `2024-04-${formattedDay}`;
  });

  const handleCellClick = (rowId, colId) => {
    console.log("Clicked cell:", rowId, colId);
    setEditingCell({ rowId, colId });
    const cellKey = `${rowId}-${colId}`;
    setCellValues((prevState) => ({
      ...prevState,
      [cellKey]: prevState[cellKey] || "",
    }));
  };

  const handleInputChange = (e) => {
    const { rowId, colId } = editingCell;
    const value = e.target.value;
    setCellValues((prevState) => ({
      ...prevState,
      [`${rowId}-${colId}`]: value,
    }));
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
    console.log("Current editingCell:", editingCell);
    if (
      editingCell &&
      editingCell.rowId !== undefined &&
      editingCell.colId !== undefined
    ) {
      const { rowId, colId } = editingCell;
      console.log("rowId:", rowId); // Log the value of rowId
      console.log("colId:", colId); // Log the value of colId
      console.log("modelId:", modelIds[rowId]); // Log the value of modelId
      console.log("Id:", dates[colId]); // Log the value of Id

      const value = cellValues[`${rowId}-${colId}`];
      const date = dates[colId]; // Get the date from the dates array

      try {
        const response = await fetch(`http://localhost:8082/update`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productionValue: value,
            date: date,
            modelId: modelIds[rowId],
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const newData = [...data];
        newData[rowId][colId] = value;
        setData(newData);

        setEditingCell({ rowId: null, colId: null });
        console.log("Data updated successfully");
      } catch (error) {
        console.error("Error updating data:", error);
      }
    } else {
      console.error("Editing cell is null");
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="table-auto border border-collapse border-gray-500">
        <thead>
          <tr className="bg-gray-200">
            <th colSpan={dates.length + 1} className="text-center">
              <span className="mx-8">Monthly data for April</span>
            </th>
          </tr>
          <tr className="bg-gray-200">
            <th className="border border-gray-500"></th>
            {dates.map((date, index) => (
              <th key={index} className="border border-gray-500 px-4 py-2">
                {date}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
         {modelIds.map((modelId, rowIndex) => (
            <tr key={modelId}>
              <td className="border border-gray-500 px-4 py-2">{modelId}</td>
              {dates.map((day, colIndex) => {
                const cellKey = `${rowIndex}-${colIndex}`;
                return (
                  <td
                    key={day}
                    className="border border-gray-500 px-4 py-2"
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                  >
                    {editingCell.rowId === rowIndex &&
                    editingCell.colId === colIndex ? (
                      <input
                        type="text"
                        value={cellValues[cellKey] || ""}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                      />
                    ) : (
                      cellValues[cellKey] || ""
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
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
