import type { NextFunction, Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { orderSchema } from "../middleware/validate.middleware";


export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {

   const validateData = await orderSchema.validate(req.body)
    const { userName, userEmail, userPhone, userAddress, totalPrice, items } = validateData;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Not found product" });
    }

    const newOrder = await prisma.order.create({
      data: {
        userName,
        userEmail,
        userPhone,
        userAddress,
        totalPrice: Number(totalPrice),
        items: items
        
      }
    });

    res.status(201).json({
      message: "Order seccussesfully",
      orderId: newOrder.id
    });
  } catch (error) {
    next(error);
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