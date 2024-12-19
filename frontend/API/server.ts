import { VercelRequest, VercelResponse } from "@vercel/node";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req: VercelRequest, res: VercelResponse) => {
  if (req.method === "POST") {
    const { name, price, imaUrl } = req.body;

    if (!name || !price || !imaUrl) {
      return res.status(400).json({ error: "Campos obrigatórios ausentes." });
    }

    try {
      const newProduct = await prisma.products.create({
        data: { name, price, imaUrl },
      });
      return res.status(201).json(newProduct);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao criar o produto." });
    }
  }

  if (req.method === "GET") {
    const { name } = req.query;

    if (!name) {
      return res
        .status(400)
        .json({ error: 'O parâmetro "name" é obrigatório.' });
    }

    try {
      const products = await prisma.products.findMany({
        where: { name: String(name), Availabe: false },
      });
      return res.json(products);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar produtos." });
    }
  }

  return res.status(405).json({ error: "Método não permitido." });
};
