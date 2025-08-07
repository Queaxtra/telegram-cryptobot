# Telegram Crypto Bot

This project is a bot developed to monitor cryptocurrency prices and send notifications about changes via Telegram. The bot tracks price changes for the specified cryptocurrency symbol and checks every 5 seconds to notify the user of any changes.

## Features

- Real-time cryptocurrency price tracking
- Automatic notifications on price changes
- Percentage change calculation
- Support for multiple cryptocurrency symbols
- Persistent cron job system
- User session persistence

## Screenshot

![Screenshot](https://www.upload.ee/image/18441355/Screenshot_2025-08-08_at_1.17.47_AM.png)

## Requirements

- Node.js (v18 or higher)
- Bun runtime (recommended)
- Telegram Bot Token
- Cryptocurrency price API

## Installation

### 1. Download the Project

```bash
git clone https://github.com/queaxtra/telegram-cryptobot
cd telegram-cryptobot
```

### 2. Install Dependencies

Using Bun:
```bash
bun install
```

Using Node.js:
```bash
npm install
```

### 3. Set Environment Variables

Create a `.env` file in the project root directory:

```env
TOKEN=your_telegram_bot_token_here
API_URL=https://api.binance.com/api/v3/ticker/price
```

#### How to Get Telegram Bot Token:
1. Find @BotFather on Telegram
2. Send the `/newbot` command
3. Set your bot's name and username
4. Add the given token to your `.env` file

### 4. Create the Data Folder

```bash
mkdir data
```

## Running

### Run with Bun (Recommended)

```bash
bun run index.ts
```

### Run with Node.js

```bash
npx tsx index.ts
```

## Usage

### Bot Commands

#### `/start SYMBOL`
Starts the bot and begins tracking the specified cryptocurrency symbol.

Example:
```
/start BTCUSDT
```

#### `/price SYMBOL`
Shows the current price of the specified symbol.

Example:
```
/price ETHUSDT
```

#### `/help`
Displays the help message.

### Supported Symbols

The bot supports the following cryptocurrency symbols:

**Bitcoin (BTC):**
- BTCUSDT, BTCTRY, BTCEUR

**Ethereum (ETH):**
- ETHUSDT, ETHTRY, ETHEUR, ETHBTC

**Binance Coin (BNB):**
- BNBUSDT, BNBTRY, BNBEUR

**Cardano (ADA):**
- ADAUSDT, ADATRY, ADAEUR

**Ripple (XRP):**
- XRPUSDT, XRPTRY, XRPEUR

**Solana (SOL):**
- SOLUSDT, SOLTRY, SOLEUR

**Dogecoin (DOGE):**
- DOGEUSDT, DOGETRY, DOGEEUR

**Polkadot (DOT):**
- DOTUSDT, DOTTRY, DOTEUR

**Shiba Inu (SHIB):**
- SHIBUSDT, SHIBTRY, SHIBEUR

**Litecoin (LTC):**
- LTCTUSD, LTCTRY, LTCEUR, LTCBTC

### Price Monitoring System

After the bot is started:

1. It checks prices every 5 seconds
2. If there is a price change, it calculates the percentage change
3. Indicates the direction of increase or decrease
4. Sends a notification via Telegram

Notification examples:
- `Price for BTCUSDT: 45000.50` (Initial price)
- `There is a 2.34% increase, new price is 46053.00`
- `There is a 1.87% decrease, new price is 44158.50`
- `Price did not change, still 45000.50`

## Project Structure

```
telegram-cryptobot/
├── data/                    # Folder where user data is stored
│   ├── userId.txt          # Telegram user ID
│   ├── symbol.txt          # Tracked symbol
│   └── old_price.txt       # Previous price information
├── src/                    # Main source code
│   ├── fetch.ts            # Functions for fetching prices from API
│   └── sendPrice.ts        # Functions for sending price notifications
├── utils/                  # Utility tools
│   ├── cron.ts             # Scheduled tasks
│   └── symbols.ts          # Supported symbol list
├── index.ts                # Main application file
├── package.json            # Project dependencies
├── tsconfig.json           # TypeScript configuration
└── .env                    # Environment variables
```

## Development

### Adding a New Symbol

You can add new symbols by editing the `utils/symbols.ts` file:

```typescript
export const symbols = [
  // Existing symbols...
  "NEWSYMBOL",
];
```

### Changing Cron Job Schedule

You can adjust the checking frequency by changing the `cronTime` value in `utils/cron.ts`:

```typescript
cronTime: "*/10 * * * * *", // Every 10 seconds
cronTime: "0 * * * * *",    // Every minute
cronTime: "0 0 * * * *",    // Every hour
```

### Changing API Endpoint

To use a different cryptocurrency API, change the `API_URL` value in your `.env` file.

## Technical Details

### Technologies Used

- **Bun**: Modern JavaScript runtime
- **TypeScript**: For type safety
- **Telegraf**: Telegram Bot API wrapper
- **Cron**: For scheduled tasks
- **dotenv**: Environment variable management

### Data Storage

The bot stores user information and price history in the local file system:

- `data/userId.txt`: Telegram user ID
- `data/symbol.txt`: Tracked cryptocurrency symbol
- `data/old_price.txt`: Previous price information (for comparison)

### Error Handling

The bot checks for the following situations:
- Invalid symbol entry
- API connection errors
- File read/write errors
- Missing user ID

## License

This project is licensed under the MIT license.

## Contributing

1. Fork the project
2. Create a new branch
3. Make your changes
4. Submit a pull request

## Contact

This project was developed by [Queaxtra](https://github.com/queaxtra) and is licensed under the MIT license. No data is stored or shared in any way by this project. It is open source and free for everyone to use. To contact me, you can reach out via [Telegram](https://t.me/queaxtra) or email at `fatih@etik.com`.
