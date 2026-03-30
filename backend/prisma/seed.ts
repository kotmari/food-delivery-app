import { prisma } from "../src/lib/prisma";
import * as dotenv from 'dotenv';

dotenv.config();


async function main() {
  const categories = await prisma.category.findMany();
  
  const getCatId = (name: string) => categories.find(c => c.name === name)?.id || categories[0].id;

  await prisma.shop.create({
    data: {
      name: "Burger King",
      address: "st. Red 89",
      rating: 4.5,
      image_url: "https://logos-world.net/wp-content/uploads/2020/05/Burger-King-Logo.png",
      products: {
        create: [
          { name: "Whopper", price: 150, categoryId: getCatId('Burgers'), image_url: "https://example.com/whopper.jpg" },
          { name: "Steakhouse", price: 190, categoryId: getCatId('Burgers'), image_url: "https://example.com/steak.jpg" },
          { name: "French Fries", price: 60, categoryId: getCatId('Snacks'), image_url: "https://example.com/fries.jpg" },
          { name: "Coca-Cola 0.5", price: 45, categoryId: getCatId('Drinks'), image_url: "https://example.com/cola.jpg" },
          { name: "Hot Brownie", price: 85, categoryId: getCatId('Desserts'), image_url: "https://example.com/brownie.jpg" },
        ]
      }
    }
  });

  await prisma.shop.create({
    data: {
      name: "Pizza Hut",
      address: "pl Blue 12",
      rating: 4.7,
      image_url: "https://upload.wikimedia.org/wikipedia/sco/d/d2/Pizza_Hut_logo.svg",
      products: {
        create: [
          { name: "Pepperoni Pizza", price: 280, categoryId: getCatId('Pizza'), image_url: "https://example.com/pep.jpg" },
          { name: "Margarita", price: 220, categoryId: getCatId('Pizza'), image_url: "https://example.com/marg.jpg" },
          { name: "Garlic Bread", price: 70, categoryId: getCatId('Snacks'), image_url: "https://example.com/bread.jpg" },
          { name: "Orange Juice", price: 55, categoryId: getCatId('Drinks'), image_url: "https://example.com/juice.jpg" },
          { name: "Ice Cream", price: 90, categoryId: getCatId('Desserts'), image_url: "https://example.com/ice.jpg" },
        ]
      }
    }
  });

  await prisma.shop.create({
    data: {
      name: "Sushi Master",
      address: "st. Pink 12",
      rating: 4.9,
      image_url: "https://sushimaster.ua/img/logo.png",
      products: {
        create: [
          { name: "Philadelphia Roll", price: 320, categoryId: getCatId('Sushi'), image_url: "https://example.com/phila.jpg" },
          { name: "California Roll", price: 290, categoryId: getCatId('Sushi'), image_url: "https://example.com/calif.jpg" },
          { name: "Miso Soup", price: 110, categoryId: getCatId('Salads'), image_url: "https://example.com/miso.jpg" },
          { name: "Green Tea", price: 40, categoryId: getCatId('Drinks'), image_url: "https://example.com/tea.jpg" },
          { name: "Mochi", price: 130, categoryId: getCatId('Desserts'), image_url: "https://example.com/mochi.jpg" },
        ]
      }
    }
  });

  console.log("✅Add shops successfully");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });