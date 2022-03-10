const db = require('./connectDB');
const initQuery = `
    
    DROP TABLE IF EXISTS employee;
    CREATE TABLE employee (
        employee_id SERIAL PRIMARY KEY,
        name VARCHAR(64),
        address VARCHAR(256),
        salary decimal(12,2),
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );    
    INSERT INTO "employee" ("name", "address", "salary", "created_at") VALUES 
    ('Julian', '508 E University Ave, Champaign, IL 61820', '45000', '2022-02-26 06:42:07.756923+00');
    
    DROP TABLE IF EXISTS vendor;
    CREATE TABLE vendor (
        vendor_id SERIAL PRIMARY KEY,
        company_name VARCHAR(64),
        address VARCHAR(256),
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );   
    INSERT INTO "vendor" ("vendor_id", "company_name", "address", "created_at") VALUES
        ('0', '', '', '2022-02-26 06:42:07.756923+00');

    INSERT INTO "vendor" ("company_name", "address", "created_at") VALUES
    ('Stark Industries', '1200 Industrial Ave, Long Beach, CA 90803', '2022-02-26 06:42:07.756923+00'),
    ('Freeway Metal Inc.', '2021 S Neil St, Champaign, IL 61820', '2022-02-26 06:42:07.756923+00'),
    ('Freeway Metal Inc.', '2021 S Neil St, Champaign, IL 61820', '2022-02-26 06:42:07.756923+00');

    
    DROP TABLE IF EXISTS customer;
    CREATE TABLE customer (
        customer_id SERIAL PRIMARY KEY,
        company_name VARCHAR(64),
        name VARCHAR(64),
        address VARCHAR(256),
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );     
    INSERT INTO "customer" ("company_name", "name", "address", "created_at") VALUES
    ('Walmart', 'William Lencer', '2610 N Prospect Ave, Champaign, IL 61822', '2022-02-26 06:42:07.756923+00'),
    ('Ace Hardware', 'Jack White', '2021 S Neil St, Champaign, IL 61820', '2022-02-26 06:42:07.756923+00'),
    ('The Home Depot', 'Craig Menear', '820 Bloomington Rd, Champaign, IL 61820', '2022-02-26 06:42:07.756923+00'),
    ('Harbor Freight Tools', 'Eric Smidt', '1508 N Cunningham Ave, Urbana, IL 61802', '2022-02-26 06:42:07.756923+00');

    
    DROP TABLE IF EXISTS part;
    CREATE TABLE part (
        part_id SERIAL PRIMARY KEY,
        vendor_id VARCHAR(64),
        part_name VARCHAR(64),
        unit_price decimal(12,2),
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );     
    INSERT INTO "part" ("vendor_id", "part_name", "unit_price", "created_at") VALUES
    ('2', 'Screw', 0.1, '2022-02-26 06:42:07.756923+00'),
    ('2', 'Nut', 0.1, '2022-02-26 06:42:07.756923+00');

    
    DROP TABLE IF EXISTS payroll;
    CREATE TABLE payroll (
        payroll_id SERIAL PRIMARY KEY,
        employee_id VARCHAR(64),
        amount decimal(12,2),
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );    
    INSERT INTO "payroll" ("employee_id", "amount", "created_at") VALUES
    ('1', '45000', '2022-02-26 06:42:07.756923+00');

    
    DROP TABLE IF EXISTS inventory;
    CREATE TABLE inventory (
        id SERIAL PRIMARY KEY,
        part_name VARCHAR(64),
        part_id VARCHAR(64),
        vendor_id VARCHAR(64),
        unit_price decimal(12,2),
        quantity integer,
        value decimal(20,2),
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    ); 
    INSERT INTO inventory (part_name, part_id, vendor_id, unit_price, quantity, value) VALUES 
    ('Complete Product', '0', '1', 10, 10000, 100000),
    ('Screw', '1', '2', 0.1, 50000, 50000),
    ('Nut', '2', '2', 0.1, 50000, 50000);

    
    DROP TABLE IF EXISTS invoice;
    CREATE TABLE invoice (
        invoice_id SERIAL PRIMARY KEY,
        customer_id VARCHAR(64),
        quantity integer,
        unit_price decimal(20,2),
        value decimal(20,2),
        settlement boolean,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    ); 
    INSERT INTO invoice (customer_id, quantity, unit_price, value, settlement, created_at) VALUES
        ('1', 1000, 10, 10000, 't', '2022-01-01 07:04:46.403439+00'),
        ('1', 5000, 10, 50000, 't', '2022-01-01 07:04:46.403439+00'),
        ('1', 1000, 10, 10000, 'f', '2022-01-01 07:04:46.403439+00'),
        ('2', 5000, 10, 50000, 'f', '2022-01-01 07:04:46.403439+00'),        
        ('3', 2000, 10, 20000, 'f', '2022-01-01 07:04:46.403439+00'),
        ('4', 2000, 10, 20000, 'f', '2022-01-01 07:04:46.403439+00');

    
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
    INSERT INTO "purchase_order" ("part_id", "quantity", "unit_price", "value", "settlement", "created_at") VALUES
    ('1', 500000, 0.1, 50000, 'f', '2022-01-01 07:04:46.403439+00');
    
    DROP TABLE IF EXISTS balance_sheet;
    CREATE TABLE balance_sheet (
        bs_id SERIAL PRIMARY KEY,
        cash decimal(16,2),
        receivable decimal(16,2),
        building decimal(16,2),
        equipment decimal(16,2),
        payable decimal(16,2),
        mortgage decimal(16,2),
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    ); 
    INSERT INTO "balance_sheet" ("cash", "receivable", "building", "equipment", "payable", "mortgage") VALUES
    (2000000, 100000, 0, 0, 50000, 0);
   
    DROP TABLE IF EXISTS income_statement;
    CREATE TABLE income_statement (
        is_id SERIAL PRIMARY KEY,
        sales decimal(16,2),
        cogs decimal(16,2),
        payroll decimal(16,2),
        bills decimal(16,2),
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    ); 
    INSERT INTO "income_statement" ("sales", "cogs", "payroll", "bills") VALUES   
    (0.00, 0.00, 0.00, 0.00);
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