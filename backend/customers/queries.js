const getCustomers = "SELECT * FROM customer_details";
const getCustomersById = "SELECT * FROM customer_details WHERE sno = $1";

module.exports = {
    getCustomers,
    getCustomersById,
};
