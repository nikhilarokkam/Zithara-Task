const pool = require('../../db');
const queries = require('./queries');

const getCustomers = (req, res) => {
    pool.query(queries.getCustomers, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const getCustomersById = (req, res)=>{
    const sno = parseInt(req.params.sno);
    pool.query(queries.getCustomersById,[sno],(error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};

module.exports = {
    getCustomers,
    getCustomersById, 
};