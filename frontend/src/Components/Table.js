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

  // Function to handle cell click
  const handleCellClick = (rowId, colId) => {
    setEditingCell({ rowId, colId });
    // Initialize cell value if not present
    setCellValues((prevState) => ({
      ...prevState,
      [`${rowId}-${colId}`]: prevState[`${rowId}-${colId}`] || "",
    }));
  };

  // Function to handle input change
  const handleInputChange = (e) => {
    const { rowId, colId } = editingCell;
    const value = e.target.value;
    setCellValues((prevState) => ({
      ...prevState,
      [`${rowId}-${colId}`]: value,
    }));
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
    if (editingCell) {
      const { rowId, colId } = editingCell;
      const value = cellValues[`${rowId}-${colId}`];

      try {
        
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

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        console.log("Data updated successfully");
        setEditingCell(null);
      } catch (error) {
        console.error("Error updating data:", error);
      }
    } else {
      console.error("Editing cell is null");
    }
  };

  // Fetch data from backend when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Function to fetch data from backend
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8082/data");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      // Update cellValues state with fetched data
      // Assuming data is in the format { rowId-colId: value }
      setCellValues(
        jsonData.data.reduce((acc, row) => {
          Object.entries(row).forEach(([key, value]) => {
            if (key !== "Id") {
              acc[key] = value;
            }
          });
          return acc;
        }, {})
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Generate IDs 1 to 30
  const ids = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="overflow-x-auto">
      <table className="table-auto border border-collapse border-gray-500">
        <thead>
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
      <button
        onClick={handleSave}
        className="py-0 mx-12 border my-7 justify-items-center  border-gray-500 px-6   "
      >
        Save
      </button>
      <button
        onClick={handleCancel}
        className="py-0  border  my-7 justify-items-center border-gray-500 px-6 "
      >
        Cancel
      </button>
    </div>
  );
};

export default Table;
