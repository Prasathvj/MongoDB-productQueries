//Q.1. Find all the information about each products

    db.Products.find({})

//-------------------------------------------------------------
//Q.2. Find the product price which are between 400 to 800

    db.products.find({product_price:{$gte:400, $lte:800}})

//-------------------------------------------------------------
//Q.3. Find the product price which are not between 400 to 600

    db.products.find({
        product_price:{
            $not:{$gte:400, $lte:800}
        }
    })

//-------------------------------------------------------------
//Q.4. List the four product which are grater than 500 in price 

    db.products.find({product_price:{$gt:500}}).limit(4)

//-------------------------------------------------------------
//Q.5. Find the product name and product material of each products

    db.products.find().forEach(ele => {
        print('Product Name :',ele.product_name , 
              'Product Material :',ele.product_material)
    });
    //or

    db.products.find({},{product_name:1,product_material:1})

//-------------------------------------------------------------
//Q.6. Find the product with a row id of 10

    db.products.find({id:"10"})

//-------------------------------------------------------------
//Q.7. Find only the product name and product material
    db.products.find().forEach(ele => {
        print('Product Name :',ele.product_name , 
              'Product Material :',ele.product_material)
    });

//-------------------------------------------------------------
//Q.8. Find all products which contain the value of soft in product material


    //method-1 ($regex)
    db.products.find({
        product_material: { $regex: /soft/i } 
    })


    //Method-2 ($in)
    db.products.find({
        product_material:{ $in:[/soft/i] }
    })

//-------------------------------------------------------------
//Q.9. Find products which contain product color indigo  and product price 492.00

    db.products.find({
        $and: [
        { product_color: "indigo" },
        { product_price: 492 }
        ]
    })
  
//-------------------------------------------------------------
//Q.10. Delete the products which product price value are same

db.products.aggregate([
    {
      $group: {
        _id: "$product_price",
        count: { $sum: 1 },
        docs: { $push: "$_id" }
      }
    },
    {
      $match: {
        count: { $gt: 1 }
      }
    }
  ]).forEach(function(doc) {
    db.products.deleteMany({ _id: { $in: doc.docs } });
  });

//-------------------------------------------------------------