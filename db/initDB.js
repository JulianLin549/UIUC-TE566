const db = require('./connectDB');
const initQuery = `
    
    DROP TABLE IF EXISTS employee;
    CREATE TABLE employee (
        employee_id SERIAL PRIMARY KEY,
        first_name VARCHAR(64),
        last_name VARCHAR(64),
        address VARCHAR(256),
        salary decimal(12,2),
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );    
    
    DROP TABLE IF EXISTS vendor;
    CREATE TABLE vendor (
        vendor_id SERIAL PRIMARY KEY,
        company_name VARCHAR(64),
        part VARCHAR(64),
        unit_price decimal(12,2),
        address VARCHAR(256),
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );   
    
    DROP TABLE IF EXISTS customer;
    CREATE TABLE customer (
        customer_id SERIAL PRIMARY KEY,
        company_name VARCHAR(64),
        name VARCHAR(64),
        address VARCHAR(256),
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );     
    
    DROP TABLE IF EXISTS payroll;
    CREATE TABLE payroll (
        payroll_id SERIAL PRIMARY KEY,
        employee_id VARCHAR(64),
        amount decimal(12,2),
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );    
    
    DROP TABLE IF EXISTS inventory;
    CREATE TABLE inventory (
        item_id SERIAL PRIMARY KEY,
        part_name VARCHAR(64),
        unit_price decimal(12,2),
        quantity integer,
        value decimal(20,2),
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    ); 
    INSERT INTO inventory (part_name, unit_price, quantity, value)
    VALUES ('Complete Product', 0, 0, 0);
    
    DROP TABLE IF EXISTS invoice;
    CREATE TABLE invoice (
        invoice_id SERIAL PRIMARY KEY,
        customer_id VARCHAR(64),
        quantity integer,
        value decimal(20,2),
        settlement boolean,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    ); 
    INSERT INTO inventory (part_name, unit_price, quantity, value)
    VALUES ('Complete Product', 0, 0, 0);
    
    DROP TABLE IF EXISTS purchase_order;
    CREATE TABLE purchase_order (
        po_id SERIAL PRIMARY KEY,
        part_id VARCHAR(64),
        quantity integer,
        unit_price decimal(12,2),
        value decimal(16,2),
        settlement boolean,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    ); 
    
    
    DROP TABLE IF EXISTS balance_sheet;
    CREATE TABLE balance_sheet (
        bs_id SERIAL PRIMARY KEY,
        cash decimal(16,2),
        receivable decimal(16,2),
        inventory decimal(16,2),
        building decimal(16,2),
        equipment decimal(16,2),
        payable decimal(16,2),
        mortgage decimal(16,2),
        networth decimal(16,2)
    ); 
    
    DROP TABLE IF EXISTS income_statement;
    CREATE TABLE income_statement (
        is_id SERIAL PRIMARY KEY,
        sales decimal(16,2),
        cogs decimal(16,2),
        gross_profit decimal(16,2),
        payroll decimal(16,2),
        bills decimal(16,2),
        income_taxes decimal(16,2),
        net_income decimal(16,2),
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    ); 
`;

const initDB = async () => {
    try{
        await db.query(initQuery)
        console.log("successful init db")
    } catch (error) {
        console.log(error)
        throw new Error('connection broke');
    }

}

module.exports = initDB();