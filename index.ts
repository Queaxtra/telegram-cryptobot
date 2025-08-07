require("dotenv").config();
import { Telegraf } from "telegraf";
import { fetchPrices } from "./src/fetch";
import { symbols } from "./utils/symbols";
import job from "./utils/cron";
import fs from "fs";

const TOKEN: string = process.env.TOKEN || "";
export const bot = new Telegraf(TOKEN);

// start command
bot.start((ctx) => {
  const userId = ctx.from?.id;

  if (!userId) return ctx.reply("Failed to fetch user ID");

  const messageText = ctx.message?.text || "";
  const commandParts = messageText.split(" ");
  const selectedSymbol = commandParts[1];

  if (!selectedSymbol) {
    return ctx.reply(`Please provide a symbol. Usage: /start SYMBOL\nAvailable symbols: ${symbols.join(', ')}`);
  }

  if (!symbols.includes(selectedSymbol.toUpperCase())) {
    return ctx.reply(`Invalid symbol. Available symbols are: ${symbols.join(', ')}`);
  }

  ctx.reply(`Your user ID is ${userId}. Bot started successfully with symbol: ${selectedSymbol.toUpperCase()}`);
  fs.writeFileSync('data/userId.txt', userId.toString());
  fs.writeFileSync('data/symbol.txt', selectedSymbol.toUpperCase());

  if (fs.existsSync('data/old_price.txt')) {
    fs.unlinkSync('data/old_price.txt');
  }

  job.start();
  console.log('Cron job started for user:', userId, 'with symbol:', selectedSymbol.toUpperCase());
});

// help command
bot.help((ctx) => {
  ctx.reply("Available commands:\n/start SYMBOL\n/help\n/price SYMBOL");
});

// price command
bot.command("price", async (ctx) => {
  const symbol: any = ctx.message.text.split(" ")[1];
  if (!symbol) return ctx.reply(`Invalid symbol. Available symbols are: ${symbols.join(', ')}`);

  const prices: any = await fetchPrices(symbol);

  if (!prices) return ctx.reply("Failed to fetch prices");

  ctx.reply(`The price of the product named ${prices.symbol} is ${prices.price}`);
});

bot.launch().then(() => {
  if (!fs.existsSync('data/userId.txt')) return;
  if (!fs.existsSync('data/symbol.txt')) return;

  const userId = fs.readFileSync('data/userId.txt', 'utf8').trim();
  const symbol = fs.readFileSync('data/symbol.txt', 'utf8').trim();

  if (!userId) return;
  if (!symbol) return;

  if (fs.existsSync('data/old_price.txt')) {
    fs.unlinkSync('data/old_price.txt');
  }

  job.start();
  console.log('Cron job started for existing user:', userId, 'with symbol:', symbol);
});
