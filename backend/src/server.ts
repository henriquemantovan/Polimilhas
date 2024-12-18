import express from "express";
import cors from "cors";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();
const port = 3000;

// Middlewares
app.use(express.json());
app.use(cors());

// Rotas

// 1. Criar um novo produto
app.post("/api/products", async (req: Request, res: Response) => {
  const { name, price, imaUrl } = req.body;

  if (!name || !price || !imaUrl) {
    return res
      .status(400)
      .json({ error: "Por favor, preencha todos os campos obrigatórios." });
  }

  try {
    const newProduct = await prisma.products.create({
      data: {
        name,
        price,
        imaUrl,
      },
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar o produto." });
  }
});

// 2. Modificar o campo "Availabe" de um produto (update)
app.put("/api/products/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { Availabe } = req.body;

  if (typeof Availabe !== "boolean") {
    return res
      .status(400)
      .json({ error: '"Availabe" deve ser um valor booleano.' });
  }

  try {
    const updatedProduct = await prisma.products.update({
      where: { id: Number(id) },
      data: { Availabe },
    });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar o produto." });
  }
});

// 3. Pegar todas as informações de todos os produtos
// 3. Pegar todos os produtos com o nome especificado e "Availabe" igual a false
app.get("/api/products", async (req: Request, res: Response) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ error: 'O parâmetro "name" é obrigatório.' });
  }

  try {
    const products = await prisma.products.findMany({
      where: {
        name: String(name),
        Availabe: false,
      },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar os produtos." });
  }
});
