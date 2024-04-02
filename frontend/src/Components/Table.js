// import React from 'react';

// class Table extends React.Component {
//   render() {
//     // Generate IDs 1 to 30
//     const ids = Array.from({ length: 30 }, (_, i) => i + 1);
//     // Sample ModelIds
//     const modelIds = ['model1', 'model2', 'model3', 'model4', 'model5'];

//     return (
//       <div className="overflow-x-auto">
//         <table className="table-auto border border-collapse border-gray-500">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="border border-gray-500"></th>
//               {/* Render IDs horizontally */}
//               {ids.map(id => (
//                 <th key={id} className="border border-gray-500 px-4 py-2">{id}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {/* Render ModelIds vertically */}
//             {modelIds.map(modelId => (
//               <tr key={modelId}>
//                 <td className="border border-gray-500 px-4 py-2">{modelId}</td>

//                 {ids.map(id => (
//                   <td key={id} className="border border-gray-500 px-4 py-2"></td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     );
//   }
// }

// export default Table;

// import React from 'react';

// class Table extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       editedValue: '', // State to track edited value
//       selectedCell: null // State to track selected cell
//     };
//   }

//   handleCellClick = (modelId, id) => {
//     this.setState({
//       selectedCell: { modelId, id }, // Set the selected cell
//       editedValue: this.props.data[modelId][id] || '' // Set the edited value from props or empty string
//     });
//   };

//   handleValueChange = (event) => {
//     this.setState({ editedValue: event.target.value });
//   };

//   handleSave = async () => {
//     const { selectedCell, editedValue } = this.state;
//     const { modelId, id } = selectedCell;

//     try {
//       const response = await fetch(`http://localhost:8081/update/${id}/${modelId}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ productionValue: editedValue }),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       console.log('Data saved successfully');
//       // Refresh data after saving
//       this.props.refreshData();
//     } catch (error) {
//       console.error('Error saving data:', error);
//     }

//     // Clear selected cell and edited value
//     this.setState({ selectedCell: null, editedValue: '' });
//   };

//   handleCancel = () => {
//     // Clear selected cell and edited value
//     this.setState({ selectedCell: null, editedValue: '' });
//   };

//   render() {
//     const { data } = this.props;
//     const { editedValue, selectedCell } = this.state;

//     const ids = Array.from({ length: 30 }, (_, i) => i + 1);
//     const modelIds = ['model1', 'model2', 'model3', 'model4', 'model5'];

//     return (
//       <div className="overflow-x-auto">
//         <table className="table-auto border border-collapse border-gray-500">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="border border-gray-500"></th>
//               {ids.map(id => (
//                 <th key={id} className="border border-gray-500 px-4 py-2">{id}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {modelIds.map(modelId => (
//               <tr key={modelId}>
//                 <td className="border border-gray-500 px-4 py-2">{modelId}</td>
//                 {ids.map(id => {
//                   const cellValue = data[modelId][id];
//                   return (
//                     <td
//                       key={id}
//                       className={`border border-gray-500 px-4 py-2 ${selectedCell && selectedCell.modelId === modelId && selectedCell.id === id ? 'bg-gray-200' : ''}`}
//                       onClick={() => this.handleCellClick(modelId, id)}
//                     >
//                       {selectedCell && selectedCell.modelId === modelId && selectedCell.id === id ? (
//                         <input
//                           type="text"
//                           value={editedValue}
//                           onChange={this.handleValueChange}
//                           autoFocus
//                         />
//                       ) : (
//                         cellValue
//                       )}
//                     </td>
//                   );
//                 })}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         {selectedCell && (
//           <div>
//             <button onClick={this.handleSave}>Save</button>
//             <button onClick={this.handleCancel}>Cancel</button>
//           </div>
//         )}
//       </div>
//     );
//   }
// }

// export default Table;

import React, { useState, useEffect } from "react";

const Table = ({ modelIds }) => {
  const [editingCell, setEditingCell] = useState(null);
  const [cellValues, setCellValues] = useState({});
  const[data,setData]=useState({})
  // Function to handle cell click
  const handleCellClick = (rowId, colId) => {
    console.log("Clicked cell:", rowId, colId);
    setEditingCell({ rowId, colId });
    // Initialize cell value if not present
    setCellValues((prevState) => ({
      ...prevState,
      [`${rowId}-${colId}`]: prevState[`${rowId}-${colId}`] || "",
    }));
  };

  // Function to handle input change
  const handleInputChange = (e) => {
    if (editingCell) {
      const { rowId, colId } = editingCell;
      const value = e.target.value;
      setCellValues((prevState) => ({
        ...prevState,
        [`${rowId}-${colId}`]: value,
      }));
    }
  };

  // Function to handle input blur
  const handleInputBlur = () => {
    setEditingCell(null);
  };
  const handleCancel = () => {
    setEditingCell(null); // Clear editingCell state
    setCellValues({}); // Clear cellValues state
  };

  // Function to handle saving edited cell values
  const handleSave = async (e) => {
    e.preventDefault();
    console.log("Current editingCell:", editingCell); 
    if (editingCell) {
      const { rowId, colId } = editingCell;
      console.log("rowId:", rowId); // Log the value of rowId
    console.log("colId:", colId); // Log the value of colId
    console.log("modelId:", modelIds[rowId]); // Log the value of modelId
    console.log("Id:", ids[colId]); // Log the value of Id
     const  value = cellValues[`${rowId}-${colId}`];
    
    try {
    
      
        // Make the update request
        const response = await fetch(`http://localhost:8082/update`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productionValue: value,
            id: rowId,
            modelId: modelIds[colId],
          }),
        });
        
  
        // Check if the response is successful
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const newData = [...data];
        newData[rowId][colId] = value;
        setData(newData);
  
        // Update the state if the response is successful
        setEditingCell(null);
        console.log("Data updated successfully");
      } catch (error) {
        console.error("Error updating data:", error);
      }
    } else {
      console.error("Editing cell is null");
  
  };
    }
    
  

  // Generate IDs 1 to 30
  const ids = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="overflow-x-auto">
      <table className="table-auto border border-collapse border-gray-500">
        <thead>
        <tr className="bg-gray-200">
      <th colSpan="40" className="text-center">
        <span className="mx-8">Monthly data for April</span>
      </th>
    </tr>
          <tr className="bg-gray-200">
          
            <th className="border border-gray-500"></th>
            {/* Render IDs horizontally */}
            {ids.map((id) => (
              <th key={id} className="border border-gray-500 px-4 py-2">
                {id}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Render ModelIds vertically */}
          {modelIds.map((modelId, rowIndex) => (
            <tr key={modelId}>
              <td className="border border-gray-500 px-4 py-2">{modelId}</td>
              {ids.map((id, colIndex) => {
                const cellKey = `${rowIndex}-${colIndex}`;
                return (
                  <td
                    key={id}
                    className="border border-gray-500 px-4 py-2"
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                  >
                    {/* Conditionally render input field */}
                    {editingCell &&
                    editingCell.rowId === rowIndex &&
                    editingCell.colId === colIndex ? (
                      <input
                        type="text"
                        value={cellValues[cellKey]}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                      />
                    ) : (
                      cellValues[cellKey]
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {/* Save button */}
      <div className="flex justify-center my-10 ">
      <button
        onClick={handleSave}
        className="py-0 mx-4 border   border-gray-500 px-6   "
      >
        Save
      </button>
      <button
        onClick={handleCancel}
        className="py-0 mx-4 border  border-gray-500 px-6 "
      >
        Cancel
      </button> 
      </div>            
    </div>
  );
};

export default Table;
