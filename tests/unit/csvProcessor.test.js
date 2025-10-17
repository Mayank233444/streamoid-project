const csvProcessor = require('../../services/csvProcessor');


describe('CSV Row Validation' , ()=>{

    test('should accept valid perfect product',()=>{
    const validProduct = {
      sku: 'TSHIRT-RED-001',
      name: 'Classic Cotton T-Shirt',
      brand: 'StreamThreads',
      color: 'Red',
      size: 'M',
      mrp: '799',   
      price: '499',   
      quantity: '20'
    };

    const result = csvProcessor.validateRow(validProduct , 1);

    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);

    });


    test('should reject product where price is greater than MRP',()=>{
    const invalidProduct = {
      sku: 'BAD-PRODUCT-001',
      name: 'Invalid Product', 
      brand: 'TestBrand',
      color: 'Red',
      size: 'M',
      mrp: '500',    
      price: '600',
      quantity: '5'
    };

    const result = csvProcessor.validateRow(invalidProduct , 2);

    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Price cannot be greater than MRP');

    });



    test('should reject product with negative quantity',()=>{
     const invalidProduct = {
      sku: 'BAD-PRODUCT-002',
      name: 'Invalid Product',
      brand: 'TestBrand', 
      color: 'Blue',
      size: 'L',
      mrp: '1000',
      price: '800',
      quantity: '-5'  
    };

    const result = csvProcessor.validateRow(invalidProduct , 3);

    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Quantity cannot be negative');

    });


    test('should reject product with missing brand',()=>{
     const invalidProduct = {
      sku: 'BAD-PRODUCT-003',
      name: 'Invalid Product',
     
      color: 'Green',
      size: 'XL', 
      mrp: '1000',
      price: '800',
      quantity: '10'
    };

    const result = csvProcessor.validateRow(invalidProduct , 4);

    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Missing required field: brand');

    });


    test('should reject product with invalid number in MRP',()=>{
      const invalidProduct = {
      sku: 'BAD-PRODUCT-004',
      name: 'Invalid Product',
      brand: 'TestBrand',
      color: 'Yellow',
      size: 'S',
      mrp: 'one thousand', 
      price: '800',
      quantity: '10'
    };

    const result = csvProcessor.validateRow(invalidProduct , 5);

    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('MRP must be a valid number');

    });


    test('should treat empty string as missing field',()=>{
     const invalidProduct = {
      sku: 'BAD-PRODUCT-005',
      name: 'Invalid Product', 
      brand: '',  
      color: 'Red',
      size: 'M',
      mrp: '1000',
      price: '800',
      quantity: '10'
    };

    const result = csvProcessor.validateRow(invalidProduct , 6);

    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Missing required field: brand');

    });


    test('should report all errors for very invalid product',()=>{
    const veryInvalidProduct = {
      sku: 'BAD-PRODUCT-006',
      name: '', 
      brand: '', 
      color: 'Red',
      size: 'M',
      mrp: '300',
      price: '400', 
      quantity: '-10' 
    };

    const result = csvProcessor.validateRow(veryInvalidProduct , 7);

    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Missing required field: name');
    expect(result.errors).toContain('Missing required field: brand');
    expect(result.errors).toContain('Price cannot be greater than MRP');
    expect(result.errors).toContain('Quantity cannot be negative');
    expect(result.errors).toHaveLength(4);

    });


});