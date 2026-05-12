import Order from "./order.schema.js";

export const getOrderById = async(orderId: string)=>{
    const order = await Order.findById(orderId);
    return order;
}