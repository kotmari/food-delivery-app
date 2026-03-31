import type { NextFunction, Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { orderSchema } from "../middleware/validate.middleware";



export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {

    const validatedData = await orderSchema.validate(req.body);
    
    const { userName, userEmail, userPhone, userAddress, totalPrice, items } = validatedData;

      const newOrder = await prisma.order.create({
      data: {
        userName,
        userEmail,
        userPhone,
        userAddress,
        totalPrice: Number(totalPrice),
        items: items ?? [], 
      },
    });

    res.status(201).json({
      message: "Order successfully created",
      orderId: newOrder.id,
    });
  } catch (error: any) {
    // Якщо валідація Yup не пройшла, вона викине помилку, яку підхопить catch
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    
    console.error("Prisma Error:", error);
    next(error); // Передаємо в errorHandler
  }
};

export const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const {id} = req.params as {id: string}

      const order = await prisma.order.findUnique({
         where: {
            id: id
         }
      })

      if(!order) {
         return res.status(404).json({ message: "Order not found" });
      }

      await prisma.order.delete({
         where: {
            id: id
         }
      })

      res.status(200).json({message: "Order deleted"})
   } catch (error) {
      next(error)
   }
}