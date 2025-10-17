const Product = require('../models/Product');
const csvProcessor = require('../services/csvProcessor');
const fs = require('fs');


const productController = {
    //Upload function
    uploadCSV : async(req , res) => {
        try{
            if(!req.file){
                return res.status(400).json({ 
          success: false,
          error: 'No file uploaded' 
        });
            }


            console.log(`Processing file: ${req.file.filename}`);

             const fileBuffer = fs.readFileSync(req.file.path);

             const { validProducts, failedRows } =  await csvProcessor.processCSV(fileBuffer);

             let storedCount = 0;
            const saveErrors = [];

            for (const productData of validProducts){
                try{
                     await Product.findOneAndUpdate(
                        {sku: productData.sku},
                        productData,
                        {
                            upsert : true,
                            new : true,
                            runValidators : true,
                        }
                     );
                     storedCount++;
                }
                catch(error){
                    saveErrors.push({
                     sku: productData.sku,
                     error: error.message
          });
                }
            }


            fs.unlinkSync(req.file.path);

       res.json({
        success: true,
        stored: storedCount,
        failed: [...failedRows, ...saveErrors],
        message: `Successfully processed ${storedCount} products`
      });
        }
        catch(error){
            console.error('Upload error:', error);
      res.status(500).json({ 
        success: false,
        error: 'Error processing CSV file',
        details: error.message 
      });
        }
    },

    //Listing items function
    listProducts : async (req, res)=>{
        try{
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const skip = (page - 1) * limit;


        const products = await Product.find()
        .sort({ createdAt: -1 }) 
        .skip(skip)
        .limit(limit);

            const total = await Product.countDocuments();

        res.json({
        success: true,
        products,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      });

        }
        catch(error){
            console.error('List products error:', error);
        res.status(500).json({ 
        success: false,
        error: 'Error fetching products',
        details: error.message 
      });

        }
    },

    //Searching products function
    searchProducts : async(req ,res) =>{
        try{
            const { brand, color, minPrice, maxPrice } = req.query;
             const query = {};

        if (brand) {
        query.brand = new RegExp(brand, 'i'); 
        }
        if (color) {
        query.color = new RegExp(color, 'i'); 
        }

        if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = parseFloat(minPrice); 
        if (maxPrice) query.price.$lte = parseFloat(maxPrice); 
      }

      console.log('Search query:', query);

      const products = await Product.find(query);

       res.json({
        success: true,
        products,
        count: products.length,
        filters: { brand, color, minPrice, maxPrice }
      });

        }
        catch(error){
             console.error('Search products error:', error);


       res.status(500).json({ 
        success: false,
        error: 'Error searching products',
        details: error.message 
      });


        }
    }

};

module.exports = productController;