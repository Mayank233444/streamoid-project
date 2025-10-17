
function helperSearch(filters){
    const mockProducts = [
    { 
      sku: 'TSHIRT-RED-001', 
      name: 'Red T-Shirt', 
      brand: 'Nike', 
      color: 'Red', 
      price: 499, 
      quantity: 20 
    },
    { 
      sku: 'TSHIRT-BLUE-002', 
      name: 'Blue T-Shirt', 
      brand: 'Adidas', 
      color: 'Blue', 
      price: 599, 
      quantity: 15 
    },
    { 
      sku: 'JEANS-BLACK-003', 
      name: 'Black Jeans', 
      brand: 'Nike', 
      color: 'Black', 
      price: 1599, 
      quantity: 8 
    },
    { 
      sku: 'SHOES-WHITE-004', 
      name: 'White Shoes', 
      brand: 'Adidas', 
      color: 'White', 
      price: 2999, 
      quantity: 12 
    }
  ];

  let results = mockProducts;

  if(filters.brand){
    results = results.filter(product => 
        product.brand.toLowerCase().includes(filters.brand.toLowerCase())
    );
  }

  if(filters.color){
    results = results.filter(product => 
        product.color.toLowerCase().includes(filters.color.toLowerCase())
    );
  }
  if(filters.minPrice){
    results = results.filter(product => product.price >= filters.minPrice);
  }
  if(filters.maxPrice){
    results = results.filter(product => product.price <= filters.maxPrice);
  }
  return results;
}


describe('Product Search Filters', ()=>{

    test('should find Nike products when filtering by brand "nike"',()=>{
        const filters = { brand: 'nike' };
        const results = helperSearch(filters);

        expect(results).toHaveLength(2);
        expect(results[0].brand).toBe('Nike');
        expect(results[1].brand).toBe('Nike');
    });


    test('should find blue products when filtering by color "blue"',()=>{
        const filters = { color: 'blue' };
        const results = helperSearch(filters);

        expect(results).toHaveLength(1);
        expect(results[0].color).toBe('Blue');
        expect(results[0].sku).toBe('TSHIRT-BLUE-002');
    });


    test('should find products priced 1000 or above',()=>{
        const filters = { minPrice: 1000 };
        const results = helperSearch(filters);

        expect(results).toHaveLength(2);
        results.forEach(product => {
            expect(product.price).toBeGreaterThanOrEqual(1000);
        });
    });


    test('should find products priced 1000 or below',()=>{
        const filters = { maxPrice: 1000 };
        const results = helperSearch(filters);

        expect(results).toHaveLength(2);
        results.forEach(product => {
            expect(product.price).toBeLessThanOrEqual(1000);
        });
    });


    test('should find Nike products between 500 and 2000',()=>{
        const filters = { 
        brand: 'nike', 
        minPrice: 500, 
        maxPrice: 2000 
        };
        const results = helperSearch(filters);

        expect(results).toHaveLength(1);
        expect(results[0].brand).toBe('Nike');
        expect(results[0].price).toBe(1599);
    });


    test('should return all products when no filters are applied',()=>{
        const filters = {};
        const results = helperSearch(filters);

        expect(results).toHaveLength(4);
      
    });


    test('should return empty array for non-existent brand',()=>{
        const filters = { brand: 'NonexistentBrand' };
        const results = helperSearch(filters);

        expect(results).toHaveLength(0);
      
    });


    test('should find products regardless of case',()=>{
        const filters = { brand: 'NIKE' };
        const results = helperSearch(filters);

        expect(results).toHaveLength(2);
      
    });




})