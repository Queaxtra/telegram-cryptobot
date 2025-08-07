import { fetchPrices } from "../src/fetch";
import { bot } from "..";
import { promises as fs } from 'fs';
import { join } from 'path';

export const sendPrice = async function (userId: string, symbol: string) {
  if (!userId || !symbol) return { error: 'Invalid user ID or symbol' };

  const prices: any = await fetchPrices(symbol);
  if (!prices) return { error: 'Failed to fetch prices' };

  const currentPrice = parseFloat(prices.price);
  const oldPriceFilePath = join(process.cwd(), 'data', 'old_price.txt'); // we specify the file path

  let message = '';

  // if the old price file exists, oldPriceExists will be true, otherwise it will be false.
  const oldPriceExists = await fs.access(oldPriceFilePath).then(() => true).catch(() => false);

  if (!oldPriceExists) {
    message = `Price for ${symbol}: ${prices.price}`;
    await fs.writeFile(oldPriceFilePath, currentPrice.toString());
    await bot.telegram.sendMessage(userId, message);
    return true;
  }

  const oldPriceData = await fs.readFile(oldPriceFilePath, 'utf8');
  const oldPrice = parseFloat(oldPriceData.trim());
  const priceDiff = currentPrice - oldPrice;

  if (priceDiff === 0) {
    message = `Price did not change, still ${prices.price}`;
  }

  if (priceDiff !== 0) {
    const percentageChange = Math.abs(priceDiff) / oldPrice * 100; // calculate percentage change
    const direction = priceDiff > 0 ? 'increase' : 'decrease'; // if the price change is positive, set 'increase', if negative, set 'decrease'
    message = `There is a ${percentageChange.toFixed(2)}% ${direction}, new price is ${prices.price}`;
  }

  await fs.writeFile(oldPriceFilePath, currentPrice.toString());
  await bot.telegram.sendMessage(userId, message);

  return true;
}
