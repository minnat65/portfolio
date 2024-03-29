import { Router } from "express";
import { addStock, getAllStocks } from "../services/stocks";

const router = Router();

router.post('/stocks', async (req, res) => {
  const stockData = req.body;

  res.status(201).json({
    status: 'success',
    data: await addStock(stockData)
  })
});

router.get('/stocks', async (req, res) => {
  res.status(200).json({
    status: 'success',
    data: await getAllStocks()
  });
});

export { router as stockRouter };