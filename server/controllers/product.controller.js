const Product = require("./../models/product.model")
//Controller holds the logic

// When someone goes to the link made in your route, it will then connect to the corresponding function in this controller. The mongodb command, such as .find(), findOneAndUpdate(), deleteOne(), etc. will make it look or perform an action in the database. If it is successful, it will run the .then line in the controller. If unsuccessful, the .catch line in the controller will be run. What the .then line is doing: getting the response that is asked for (such as finding one/all, update,create, delete) and putting it in a json object, where the variable name represents the json object from the response.

// create --- to test in Postman, use post, click body, click x-www-urlencoded, then fill in some key and value info, then send the request and see if it shows up in the area below.
module.exports.addProduct = (req, res)=>{
    const newProduct = req.body
    Product.create(newProduct)
        .then(product=> res.json(product))
        .catch(err=> res.json(err))
}

// Get all --- to test in Postman, use get, click params, and press send. It should return an empty array if there are no entries.
module.exports.allProducts = (req, res)=>{
    Product.find()
        .then(products => res.json(products))
        .catch(err=> res.json(err))
}

// Get one
module.exports.oneProduct = (req, res)=>{
    // id is obtained by params
    const idFromParams = req.params.id
    Product.findOne({_id: idFromParams})
        .then(oneProduct => res.json(oneProduct))
        .catch(err=> res.json(err))
}

// update -- getOne + create --- to test in Postman, use get, click body, click x-www-urlencoded, send the request and see if it shows up in the area below.
module.exports.updateProduct = (req, res)=>{
    // grab id from params
    const idFromParams = req.params.id
    const updateValue = req.body
    // update should be in the following steps: criteria, updatedValue, options
    Product.findOneAndUpdate(
        // the following line is the find one part of updating
        {_id : idFromParams},
        // object of the things from req body, what you want to change
        updateValue,
        // New is referring to the response we get by running findOneAndUpdate(). If new : true, it will return the updated version. If new : false, it will return the original version. Vast majority of new uses will be true, not false. By default, validations are not executed by findOneAndUpdate, so need to add runValidators to get it to work.
        {new: true, runValidators: true}
    )
        .then(updatedProduct => res.json(updatedProduct))
        .catch(err=> res.json(err))
}

// delete --- to test in Postman, use delete, click body, click x-www-urlencoded, then fill in some key and value info, then send the request. Then do a get request to see if that entry is still there or not.
module.exports.deleteProduct = (req, res)=>{
    Product.deleteOne({_id: req.params.id})
        .then(deleteConfirm=>res.json(deleteConfirm))
        .catch(err=>res.json(err))
}