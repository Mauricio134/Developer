const mongoose = require('mongoose');
const createError = require('http-errors');

const Product = require('../Models/Product.model');

getAllProducts = async (req,res,next) =>{
    try{
        const results = await Product.find({},{__v: 0});
        res.send(results);
    }catch(error){
        res.send(error.message);
    }
}

createNewProduct = async (req, res, next) => {
    try{
        const product = new Product(req.body);
        const result = await product.save();
        res.send(result);
    }catch(error){
        if(error.name === 'ValidationError'){
            next(createError(422, error.message));
            return;
        }
        next(error);
    }
}

getOneProduct = async (req, res, next) => {
    const id = req.params.id;
    try{
        const result = await Product.findById(id);
        if(!result){
            throw createError(404, 'Product Not Found');
        }
        res.send(result);
    }catch(error){
        if(error instanceof mongoose.CastError){
            next(createError(400,'Invalid Product id'));
            return;
        }
        next(error);
    }
}

deleteOneProduct = async (req, res, next) => {
    try{
        const id = req.params.id;
        const result = await Product.findByIdAndDelete(id);
        res.send(result);
    }catch(error){
        res.send(error.message);
    }
}

updateOneProduct = async (req, res, next) => {
    const id = req.params.id;
    try{
        const update = req.body;
        const result = await Product.findByIdAndUpdate(id, update);
        res.send(result);
    }catch(error){
        res.send(error.message);
    }
}

module.exports = {
    getAllProducts,
    createNewProduct,
    getOneProduct,
    deleteOneProduct,
    updateOneProduct
};