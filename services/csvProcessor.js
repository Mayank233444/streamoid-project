const csv = require('csv-parser');

const { Readable } = require('stream');

class csvProcessor{
    constructor(){
        this.requiredFields = ['sku', 'name', 'brand', 'mrp', 'price', 'quantity'];
    }

    async processCSV(fileBuffer){
        return new Promise((resolve , reject)=>{
             const validProducts = [];
             const failedRows = [];

             const stream = Readable.from(fileBuffer.toString());
             let rowCount = 0;

             stream
             .pipe(csv())
             .on('data' , (row)=>{
                 rowCount++;
                const validation = this.validateRow(row, rowCount);
                 if (validation.isValid){
                    const processedRow ={
                        ...row,
                        mrp: parseFloat(row.mrp),
                        price: parseFloat(row.price),
                        quantity: parseInt(row.quantity)
                    };
                    validProducts.push(processedRow);
                 }
                 else{
                    failedRows.push({
                        row: rowCount + 1, 
                        data: row,
                        errors: validation.errors
                    });
                 }
             })
             .on('end',()=>{
                console.log(`Processed ${rowCount} rows`);
                resolve({ validProducts, failedRows });
             })
             .on('error', (error) => {
                reject(new Error(`CSV parsing error: ${error.message}`));
        });
        });
    }
    validateRow(row, rowNumber){
        const errors = [];
         for (const field of this.requiredFields) {
      if(!row[field] || row[field].toString().trim() === '') {
            errors.push(`Missing required field: ${field}`);
      }
    }

     if (row.mrp) {
      const mrp = parseFloat(row.mrp);
      if (isNaN(mrp)) {
        errors.push('MRP must be a valid number');
      }
    }

    if (row.price) {
      const price = parseFloat(row.price);
      if (isNaN(price)) {
        errors.push('Price must be a valid number');
      }
    }

    if (row.quantity) {
      const quantity = parseInt(row.quantity);
      if (isNaN(quantity)) {
        errors.push('Quantity must be a valid integer');
      }
    }

    if (row.price && row.mrp) {
      const price = parseFloat(row.price);
      const mrp = parseFloat(row.mrp);
      if (!isNaN(price) && !isNaN(mrp) && price > mrp) {
        errors.push('Price cannot be greater than MRP');
      }
    }

    if (row.quantity) {
      const quantity = parseInt(row.quantity);
      if (!isNaN(quantity) && quantity < 0) {
        errors.push('Quantity cannot be negative');
      }
    }

    return {
        isValid: errors.length === 0,
        errors
    };
    }
}

module.exports = new csvProcessor();
