const express = require('express');
const cors = require('cors');
const customerRoutes = require('./src/customers/routes');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Hello World!");
});

app.use('/api/v1/customers', customerRoutes);

app.listen(port, () => console.log(`Server is running on port ${port}`));