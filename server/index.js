const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const EmployeeRoutes = require('./Routes/EmployeeRoutes');
const EmployeeModel = require('./Models/Employee');
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use('/api/employees', EmployeeRoutes);

// MongoDB connection with error handling
mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ems_db", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB Connected successfully...');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

app.post("/employees", (req, res) => {
    const {email, password} = req.body;
    EmployeeModel.findOne({email: email})
    .then(user => {
        if(user) {
            if(user.password === password){
                res.json("Success")
            } else {
                res.json("the password is incorrect")
            }
        } else {
            res.json("No record existed")
        }
    })
})

// POST route to create a new employee
app.post('/employees', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Basic validation
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create new employee
        const newEmployee = new EmployeeModel(req.body);
        await newEmployee.save();
        res.status(201).json(newEmployee); // Return the newly created employee
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to create employee', error: err });
    }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});

// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// require('dotenv').config();
// const cors = require('cors');
// const EmployeeRoutes = require('./Routes/EmployeeRoutes');
// const PORT = process.env.PORT || 8080;



// require('./Models/db');
// app.use(cors());
// app.use(bodyParser.json());

// app.use('/api/employees', EmployeeRoutes);

// app.listen(PORT, () => {
//     console.log(`Server is running on PORT: ${PORT}`);
// })


