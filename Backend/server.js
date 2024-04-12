const express = require('express');
const sql = require('mssql/msnodesqlv8');
const cors = require('cors');

const app = express();
const port = 8082;
app.use(cors());
app.use(express.json()); // Add this line to parse JSON request bodies


const config = {
  server: 'TECHNO-511\\SQLDEV2019',
  database: 'SagarDB',
  user: 'sa',
  password: 'techno-123',
  driver: 'msnodesqlv8',
  options: {
    trustedConnection: true
  }
};
// Global SQL pool
let pool;

// Connect to the database
async function connectDatabase() {
  try {
    pool = await new sql.ConnectionPool(config).connect();
    console.log('Connected to database');
  } catch (error) {
    console.error('Error connecting to database:', error);
    process.exit(1); // Exit the application on connection failure
  }
}

// Handle server startup
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log("hi")
  connectDatabase();
});


app.get('/data', getData);

async function getData(req, res) {
    try {
      const query = `
      SELECT *
      FROM newproduction       
      `;
      const result = await pool.request().query(query);
      res.json({ data: result.recordset });
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Error fetching data' });
    }
  }
  
  app.put('/update',updateData)

  async function updateData(req, res) {
    const { productionValue, date, id, modelId } = req.body;
    try {
      const query = `
        UPDATE newproduction
        SET Production_values = @productionValue,
            date = @date,
            ModelId=@modelId
        WHERE Id = @id 
      `;
      await pool.request()
        .input('productionValue', sql.Int, productionValue)
        .input('date', sql.Date, date) // Assuming 'date' column is of type Date
        
        .input('id', sql.Int, id)
        .input('modelId', sql.VarChar(50), modelId)
        .query(query);
      res.json({ success: true });
    } catch (error) {
      console.error('Error updating data:', error);
      res.status(500).json({ error: 'Error updating data' });
    }
  }
  