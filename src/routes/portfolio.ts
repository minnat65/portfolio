import { Router } from "express";
import { addPortfolio, getHoldings, getPortfolio, getReturns } from "../services/portfolio";

const router = Router();

router.post('/portfolios', async (req, res) => {
  res.status(200).json({
    status: true,
    data: await addPortfolio()
  })
});

router.get('/portfolios', async (req, res) => {
  res.status(200).json({
    status: true,
    data: await getPortfolio()
  })
});

router.get('/portfolios/holdings', async (req, res) => {
  res.status(200).json({
    status: true,
    data: await getHoldings()
  })
});

router.get('/portfolios/returns', async (req, res) => {
  res.status(200).json({
    status: true,
    data: await getReturns()
  })
});

export { router as portfolioRouter };