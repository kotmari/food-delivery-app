import type { NextFunction, Request, Response } from "express";
import { prisma } from "../lib/prisma";
import type {
  ICreateProductInput,
} from "../types/product.interface";


export const getShops = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const min = req.query.minRating ? Number(req.query.minRating) : undefined;
    const max = req.query.maxRating ? Number(req.query.maxRating) : undefined;

    const shops = await prisma.shop.findMany({
      where: {
        rating: {
          gte: min,
          lte: max
        }
      },
      orderBy: {
        rating: "desc",
      },
      include: {
        _count: {
          select: {
            products: true,
          },
        },
      },
    });

    if (shops.length === 0) {
      return res.status(404).json("Not found shops");
    }

    res.json(shops);
  } catch (error) {
    next(error);
  }
};

export const getShopById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params as { id: string };

    const shop = await prisma.shop.findUnique({
      where: {
        id: id,
      },
      include: {
        products: {
          include: {
            category: true,
          },
        },
      },
    });

    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    res.json(shop);
  } catch (error) {
    next(error);
  }
};

export const createShop = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, address, rating, image_url, products } = req.body;

    const newShop = await prisma.shop.create({
      data: {
        name,
        address,
        rating: rating ?? 4.0,
        image_url: image_url ?? null,
        ...(products?.length && {
          products: {
            create: products.map((product: ICreateProductInput) => ({
              name: product.name,
              price: Number(product.price),
              image_url: product.image_url ?? null,
              category: {
                connect: { id: product.categoryId },
              },
            })),
          },
        }),
      },
      include: {
        products: true,
      },
    });

    res.status(201).json(newShop);
  } catch (error) {
    next(error);
  }
};
