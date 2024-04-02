
import './App.css';

import Table from './Components/Table';

function App() {
  
  const modelIds = ['model1', 'model2', 'model3', 'model4', 'model5'];
  // Fetch data from backend when the component mounts
 
  return (
    
    <Table modelIds={modelIds}/>
     );
}

export default App;
