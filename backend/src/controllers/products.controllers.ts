import type { NextFunction, Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const getProductsByShop = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {

   const shopId = req.params.shopId as string
   const {categoryId} = req.query
   const sortBy = req.query.sortBy as string || 'name-asc'

   let orderBy: any = {name: "asc"}

   if(sortBy === 'price-asc') orderBy = {price: 'asc'}
   if(sortBy === 'price-desc') orderBy = {price: 'desc'}
   if(sortBy === 'name-desc') orderBy = {name: 'desc'}
    
    const products = await prisma.product.findMany({
      where: {
         shopId: shopId,
         ...(categoryId ? {categoryId: String(categoryId)} : {}) 
      },
      orderBy: orderBy,
      include: {
         category: true
      }
    });

    if (products.length === 0) {
      return res.status(404).json("Not found products");
    }

    res.json(products);
  } catch (error) {
    next(error);
  }
};


export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params as { id: string };

    const product = await prisma.product.findUnique({
      where: {
        id: id,
      },
      include: {
         category: true
      }
      
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
};