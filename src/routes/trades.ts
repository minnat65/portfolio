import { Router } from "express";
import { addTrade, getAllTrades, getTradeById, updateTrade, deletTrade } from "../services/trades";

const router = Router();

router.post('/trades', async (req, res) => {
  const tradeData = req.body;
  const { portfolioId } = req.query;

  res.status(201).json({
    status: true,
    data: await addTrade(tradeData, String(portfolioId))
  })
});

router.get('/trades', async (req, res) => {
  res.status(200).json({
    success: true,
    data: await getAllTrades()
  });
});

router.get('/trades/:tradesId', async (req, res) => {
  const { tradesId } = req.params;
  res.status(200).json({
    success: true,
    data: await getTradeById(tradesId)
  });
});

router.patch('/trades/:tradesId', async (req, res) => {
  const { tradesId } = req.params;
  const toBeUpdateData = req.body;

  res.status(200).json({
    success: true,
    data: await updateTrade(tradesId, toBeUpdateData)
  });
});

router.delete('/trades/:tradesId', async (req, res) => {
  const { tradesId } = req.params;

  res.status(200).json({
    success: true,
    data: await deletTrade(tradesId)
  });
});

export { router as tradeRouter };