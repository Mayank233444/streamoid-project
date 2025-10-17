const csvProcessor = require('../../services/csvProcessor');

function createCSVBuffer(csvContent) {
  return Buffer.from(csvContent, 'utf-8');
}


describe('CSV file Processing', ()=>{

    test('should process valid CSV file correctly' , async ()=>{

        const validCSV = `sku,name,brand,color,size,mrp,price,quantity
TSHIRT-RED-001,Classic Cotton T-Shirt,StreamThreads,Red,M,799,499,20
TSHIRT-BLK-002,Classic Cotton T-Shirt,StreamThreads,Black,L,799,549,12`;

        const csvBuffer = createCSVBuffer(validCSV);

        const result = await csvProcessor.processCSV(csvBuffer);

        expect(result.validProducts).toHaveLength(2);
        expect(result.failedRows).toHaveLength(0);

         expect(result.validProducts[0].sku).toBe('TSHIRT-RED-001');
        expect(result.validProducts[0].price).toBe(499);
        expect(result.validProducts[0].quantity).toBe(20);

    });


    test('should separate valid and invalid rows in mixed CSV' , async ()=>{

         const mixedCSV = `sku,name,brand,color,size,mrp,price,quantity
TSHIRT-RED-001,Classic Cotton T-Shirt,StreamThreads,Red,M,799,499,20
BAD-PRODUCT-001,Invalid Product,,Red,M,500,600,-5`;

        const csvBuffer = createCSVBuffer(mixedCSV);

        const result = await csvProcessor.processCSV(csvBuffer);

    expect(result.validProducts).toHaveLength(1);
    expect(result.failedRows).toHaveLength(1);
    expect(result.failedRows[0].errors).toContain('Missing required field: brand');
    expect(result.failedRows[0].errors).toContain('Price cannot be greater than MRP');
    expect(result.failedRows[0].errors).toContain('Quantity cannot be negative');

    });

})