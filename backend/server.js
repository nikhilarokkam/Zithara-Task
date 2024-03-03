const express = require('express');
const cors = require('cors');
const customerRoutes = require('./src/customers/routes');
const path=require("path");
const app = express();
const PORT = process.env.PORT || 3000;

//process.env.PORT
//process.env.NODE_ENV => production or undefined


app.use(cors());
app.use(express.json());

if(process.env.NODE_ENV==="production"){
    //server static content
    //npm run build
    app.use(express.static(path.join(__dirname,"frontend/build")));
}
console.log(__dirname);
console.log(path.join(__dirname,"frontend/build"));

app.get("/",(req,res)=>{
    res.send("Hello World!");
});

app.use('/api/v1/customers', customerRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));