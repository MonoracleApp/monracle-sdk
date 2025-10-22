# Monoracle SDK

[![npm version](https://img.shields.io/npm/v/monoracle-sdk.svg)](https://www.npmjs.com/package/monoracle-sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Blockchain](https://img.shields.io/badge/Blockchain-Enabled-blue.svg)](https://monoracle.xyz)
[![Monad](https://img.shields.io/badge/Network-Monad-purple.svg)](https://monad.xyz)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

Official JavaScript/TypeScript SDK for **Monoracle** - Transform APIs into blockchain oracles on Monad Network.

## =. What is Monoracle?

Monoracle is a decentralized platform that enables developers to transform any API into a blockchain oracle. Bridge the gap between off-chain data (real-world APIs) and on-chain smart contracts seamlessly on the Monad blockchain.

## =� Installation

```bash
npm install monoracle-sdk ethers
```

```bash
yarn add monoracle-sdk ethers
```

```bash
pnpm add monoracle-sdk ethers
```

## =� Quick Start

### Basic Usage

```typescript
import { getMonoracleData } from 'monoracle-sdk';

const CONTRACT_ADDRESS = '0xc3633482b735BDB78E2a8112EF7a4434F4A20024';

// Define your expected data type
interface ResponseProps {
  userId: number;
  id: number;
  title: string;
  body: string;
}

(async () => {
  // Fetch data from Monoracle contract with type safety
  const response = await getMonoracleData<ResponseProps[]>(CONTRACT_ADDRESS);

  console.log(response);
  console.log(response.data[0].title); // Typed access to your data
})();
```

### Response Structure

```typescript
interface MonoracleData<T> {
  creatorWallet: string;    // Contract creator's wallet address
  data: T;                  // Your typed data (auto-parsed if JSON)
  apiUrl: string;           // API URL configured in the contract
  apiHeaders: string;       // API headers
  apiParameters: string;    // API parameters
  lastUpdateTime: bigint;   // Last update timestamp
}
```

## =� Features

 **Type-Safe** - Full TypeScript support with generic types
 **Auto-Parse JSON** - Automatically parses JSON data from contracts
 **Default RPC** - Pre-configured with Monad testnet RPC
 **Lightweight** - Minimal dependencies (only ethers.js)
 **Promise-based** - Modern async/await API

## =� API Reference

### `getMonoracleData<T>(contractAddress, rpcUrl?)`

Fetch all data from a Monoracle contract with type safety.

**Type Parameters:**
- `T` - The expected type of the data field (defaults to `any`)

**Parameters:**
- `contractAddress` (string) - The address of the Monoracle contract
- `rpcUrl` (string, optional) - RPC URL (defaults to `https://testnet-rpc.monad.xyz/`)

**Returns:** `Promise<MonoracleData<T>>`

**Example:**

```typescript
// With default RPC URL (Monad testnet)
const data = await getMonoracleData<MyDataType>('0xYourContractAddress');

// With custom RPC URL
const data = await getMonoracleData<MyDataType>(
  '0xYourContractAddress',
  'https://custom-rpc.monad.xyz'
);
```

## <� Real-World Examples

### Example 1: Fetching Price Data

```typescript
interface PriceData {
  symbol: string;
  price: number;
  timestamp: number;
}

const priceOracle = await getMonoracleData<PriceData>('0xPriceOracleAddress');
console.log(`${priceOracle.data.symbol}: $${priceOracle.data.price}`);
```

### Example 2: Weather Data Oracle

```typescript
interface WeatherData {
  temperature: number;
  humidity: number;
  city: string;
}

const weather = await getMonoracleData<WeatherData>('0xWeatherOracleAddress');
console.log(`Temperature in ${weather.data.city}: ${weather.data.temperature}�C`);
```

### Example 3: Array of Data

```typescript
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const posts = await getMonoracleData<Post[]>('0xPostsOracleAddress');
posts.data.forEach(post => {
  console.log(post.title);
});
```

## =� Advanced Usage

### Accessing Contract Metadata

```typescript
const response = await getMonoracleData('0xContractAddress');

console.log('Creator:', response.creatorWallet);
console.log('API URL:', response.apiUrl);
console.log('Last Update:', new Date(Number(response.lastUpdateTime) * 1000));
console.log('API Headers:', response.apiHeaders);
console.log('API Parameters:', response.apiParameters);
```

### Error Handling

```typescript
try {
  const data = await getMonoracleData('0xContractAddress');
  console.log(data);
} catch (error) {
  console.error('Failed to fetch oracle data:', error);
}
```

## < Network Information

- **Monad Testnet RPC:** `https://testnet-rpc.monad.xyz/`
- **Chain ID:** 41454
- **Explorer:** [Monad Testnet Explorer](https://testnet.monadscan.com)

## = Links

- **Website:** [monoracle.xyz](https://monoracle.xyz)
- **Documentation:** [monoracle.xyz/docs](https://monoracle.xyz/docs)
- **Twitter:** [@monoracleweb3](https://x.com/monoracleweb3)
- **Monad Network:** [monad.xyz](https://monad.xyz)

## =� License

MIT License - see [LICENSE](LICENSE) file for details

## =� Support

- **Twitter:** [@monoracleweb3](https://x.com/monoracleweb3)
- **Documentation:** [monoracle.xyz/docs](https://monoracle.xyz/docs)


Made with ❤️ by [Monoracle Labs](https://monoracle.xyz)
