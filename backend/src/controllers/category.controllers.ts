import type { NextFunction, Request, Response } from "express";
import { prisma } from "../lib/prisma";



export const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const categories = await prisma.category.findMany({
       orderBy: {
         name: "desc"
      }
    })

    res.json(categories)
   }catch(error){
      next(error)
   }
}