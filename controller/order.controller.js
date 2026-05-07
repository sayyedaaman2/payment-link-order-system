import OrderModel from '../model/order.model.js';


export const createOrder = async (req,res,next)=>{
    try{
        const order = new OrderModel(req.body);
        await order.save();
        res.status(201).json(order);
    }catch(err){    
        next(err);
    }
}

export const getOrders = async (req,res,next)=>{
    try{
        const orders = await OrderModel.find();
        res.json(orders);
    }catch(err){
        next(err);
    }
}

export const getOrderById = async (req,res,next)=>{
    try{
        const order = await OrderModel.findById(req.params.id);
        if(!order) return res.status(404).json({message:"Order not found"});
        res.json(order);
    }catch(err){
        next(err);
    }
}

export const updateOrder = async (req,res,next)=>{
    try{
        const order = await OrderModel.findByIdAndUpdate(req.params.id, req.body, {new:true});
        if(!order) return res.status(404).json({message:"Order not found"});
        res.json(order);
    }catch(err){
        next(err);
    }
}

export const deleteOrder = async (req,res,next)=>{
    try{
        const order = await OrderModel.findByIdAndDelete(req.params.id);
        if(!order) return res.status(404).json({message:"Order not found"});
        res.json({message:"Order deleted"});
    }catch(err){
        next(err);
    }
}
