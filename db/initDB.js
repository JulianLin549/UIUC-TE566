const db = require('./connectDB');
const initQuery = `
    DROP TABLE IF EXISTS employee;
    CREATE TABLE employee (
        employee_id SERIAL PRIMARY KEY,
        first_name VARCHAR(64),
        last_name VARCHAR(64),
        address VARCHAR(256),
        salary decimal(12,2)
      );    
    DROP TABLE IF EXISTS vendor;
    CREATE TABLE vendor (
        vendor_id SERIAL PRIMARY KEY,
        company_name VARCHAR(64),
        part VARCHAR(64),
        unit_price decimal(12,2)
        address VARCHAR(256)
      );   
    DROP TABLE IF EXISTS customer;
    CREATE TABLE customer (
        customer_id SERIAL PRIMARY KEY,
        company_name VARCHAR(64),
        name VARCHAR(64),
        address VARCHAR(256)
      );     
`;

const initDB = async () => {
    try{
        await db.query(initQuery)
        console.log("successful init db")
    } catch (error) {
        throw new Error('connection broke');
    }

}

module.exports = initDB();