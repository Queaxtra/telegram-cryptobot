import { CronJob } from "cron";
import { sendPrice } from "../src/sendPrice";
import fs from "fs";

const readUserIdFromFile = (): string | null => {
  if (!fs.existsSync('data/userId.txt')) {
    return null;
  }

  const userId = fs.readFileSync('data/userId.txt', 'utf8').trim();

  if (!userId) {
    return null;
  }

  return userId;
};

const readSymbolFromFile = (): string | null => {
  if (!fs.existsSync('data/symbol.txt')) {
    return null;
  }

  const symbol = fs.readFileSync('data/symbol.txt', 'utf8').trim();

  if (!symbol) {
    return null;
  }

  return symbol;
};

const job = CronJob.from({
  cronTime: "*/5 * * * * *", // every 5 secs
	onTick: async function () {
	  const userId = readUserIdFromFile();
	  const symbol = readSymbolFromFile();

	  if (!userId) {
	    return;
	  }

	  if (!symbol) {
	    return;
	  }

	  await sendPrice(userId, symbol);
	},
	start: false
});

export default job;
