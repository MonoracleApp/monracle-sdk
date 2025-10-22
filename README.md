# Monoracle SDK

Official JavaScript/TypeScript SDK for **Monoracle** - Transform APIs into blockchain oracles.

[![npm version](https://img.shields.io/npm/v/monoracle-sdk.svg)](https://www.npmjs.com/package/monoracle-sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🔮 What is Monoracle?

Monoracle is a platform that enables developers to transform any API into a blockchain oracle. It bridges the gap between off-chain data (real-world APIs) and on-chain smart contracts in a decentralized manner.

## 📦 Installation

```bash
npm install monoracle-sdk ethers
```

```bash
yarn add monoracle-sdk ethers
```

```bash
pnpm add monoracle-sdk ethers
```

## 🚀 Quick Start

### Fetch Monoracle Contract Data

The simplest way to get all data from a Monoracle contract:

```typescript
import { getMonoracleData } from 'monoracle-sdk';

// Using RPC URL
const data = await getMonoracleData(
  '0xYourContractAddress',
  'https://testnet.monad.xyz'
);

console.log(data.creatorWallet);   // Creator wallet address
console.log(data.data);             // Current oracle data
console.log(data.apiUrl);           // API URL
console.log(data.apiHeaders);       // API headers (JSON)
console.log(data.apiParameters);    // API parameters (JSON)
console.log(data.lastUpdateTime);   // Last update timestamp
```

### Using MonoracleContract Client

For more advanced usage with write operations:

```typescript
import { MonoracleContract } from 'monoracle-sdk';

const contract = new MonoracleContract({
  contractAddress: '0xYourContractAddress',
  rpcUrl: 'https://testnet.monad.xyz',
  privateKey: 'your-private-key' // Optional, required for write operations
});

// Read operations
const data = await contract.getData();
const apiUrl = await contract.getApiUrl();
const lastUpdate = await contract.getLastUpdateTime();

// Write operations (requires private key)
const tx = await contract.updateData('{"price": 100}');
await tx.wait();
```

### Fetch Oracle Contract Data

```typescript
import { getOracleData } from 'monoracle-sdk';

const oracleData = await getOracleData(
  '0xOracleContractAddress',
  'https://testnet.monad.xyz'
);

console.log(oracleData.creator);           // Creator address
console.log(oracleData.currentData);       // Current oracle data
console.log(oracleData.verifications);     // All verifications
console.log(oracleData.verificationCount); // Total verifications
```

### Using OracleContract Client

```typescript
import { OracleContract } from 'monoracle-sdk';

const oracle = new OracleContract({
  contractAddress: '0xOracleContractAddress',
  rpcUrl: 'https://testnet.monad.xyz',
  privateKey: 'master-wallet-private-key' // Only master wallet can update
});

// Read operations
const info = await oracle.getOracleInfo();
const currentData = await oracle.getCurrentData();
const verifications = await oracle.getVerifications();

// Write operation (master wallet only)
const tx = await oracle.updateData('{"temperature": 25}');
await tx.wait();
```

### Using Backend API Client

Interact with the Monoracle backend API:

```typescript
import { ApiClient } from 'monoracle-sdk';

const apiClient = new ApiClient({
  baseUrl: 'https://api.monoracle.io',
  timeout: 30000
});

// Create a new contract entry
const contract = await apiClient.createContract({
  name: 'My Weather Oracle',
  description: 'Real-time weather data',
  contractAddress: '0x123...',
  wallet: '0x456...',
  url: 'https://api.weather.com/data',
  headers: [{ key: 'Authorization', value: 'Bearer token' }],
  parameters: [{ key: 'city', value: 'London' }]
});

// Get contracts by wallet
const myContracts = await apiClient.getContractsByWallet({
  wallet: '0x456...'
});

// Get contract by ID
const contractData = await apiClient.getContractById(1);
```

## 🛠️ Utility Functions

### Format Timestamp

```typescript
import { formatTimestamp } from 'monoracle-sdk';

formatTimestamp(1234567890n); // "Feb 13, 2009, 11:31:30 PM"
formatTimestamp(0n);          // "Never"
```

### Format JSON

```typescript
import { formatJSON } from 'monoracle-sdk';

const formatted = formatJSON('{"name":"test"}');
// Output:
// {
//   "name": "test"
// }
```

### Shorten Address

```typescript
import { shortenAddress } from 'monoracle-sdk';

shortenAddress('0x1234567890abcdef1234567890abcdef12345678');
// "0x1234...5678"
```

### Parse Interval

```typescript
import { parseInterval } from 'monoracle-sdk';

parseInterval("10s"); // 10000 (milliseconds)
parseInterval("1m");  // 60000
parseInterval("1h");  // 3600000
parseInterval("1d");  // 86400000
```

## 📚 API Reference

### getMonoracleData(contractAddress, providerOrRpcUrl)

Fetch all data from a Monoracle contract in a single call.

**Parameters:**
- `contractAddress` (string): Contract address
- `providerOrRpcUrl` (Provider | string): ethers Provider or RPC URL

**Returns:** `Promise<MonoracleContractInfo>`

**Example:**
```typescript
const data = await getMonoracleData(
  '0xc3633482b735BDB78E2a8112EF7a4434F4A20024',
  'https://testnet.monad.xyz'
);
```

### getOracleData(contractAddress, providerOrRpcUrl)

Fetch all data from an Oracle contract in a single call.

**Parameters:**
- `contractAddress` (string): Contract address
- `providerOrRpcUrl` (Provider | string): ethers Provider or RPC URL

**Returns:** `Promise<OracleContractInfo>`

### MonoracleContract

Smart contract client for Monoracle contracts.

**Constructor:**
```typescript
new MonoracleContract({
  contractAddress: string,
  rpcUrl: string,
  privateKey?: string  // Optional, for write operations
})
```

**Read Methods:**
- `getData()` - Get current data
- `getApiUrl()` - Get API URL
- `getApiHeaders()` - Get API headers
- `getApiParameters()` - Get API parameters
- `getLastUpdateTime()` - Get last update timestamp
- `getCreatorWallet()` - Get creator address
- `getMasterWallet()` - Get master wallet address

**Write Methods (requires private key):**
- `updateData(newData: string)` - Update oracle data
- `updateMetaData(url, headers, params)` - Update API metadata

### OracleContract

Smart contract client for Oracle contracts.

**Read Methods:**
- `getCurrentData()` - Get current oracle data
- `getOracleInfo()` - Get oracle information
- `getVerifications()` - Get all verifications
- `getVerification(index)` - Get specific verification
- `getVerificationCount()` - Get verification count
- `isValidated()` - Check validation status

**Write Methods (master wallet only):**
- `updateData(newData: string)` - Update oracle data

### ApiClient

Backend API client for managing Monoracle contracts.

**Constructor:**
```typescript
new ApiClient({
  baseUrl: string,
  timeout?: number,
  headers?: Record<string, string>
})
```

**Methods:**
- `createContract(data)` - Create new contract
- `getContractsByWallet(params)` - Get contracts by wallet
- `getContractById(id)` - Get contract by ID

## 🔐 Contract ABIs

Access contract ABIs directly:

```typescript
import { MONORACLE_ABI, ORACLE_ABI } from 'monoracle-sdk';

// Use with ethers.js
const contract = new ethers.Contract(address, MONORACLE_ABI, provider);
```

## 📖 TypeScript Support

Full TypeScript support with comprehensive type definitions:

```typescript
import type {
  MonoracleContractInfo,
  OracleContractInfo,
  ContractHeader,
  ContractParameter,
  OracleVerification
} from 'monoracle-sdk';
```

## 🧪 Example: Browser Usage

```html
<!DOCTYPE html>
<html>
<head>
  <script type="module">
    import { getMonoracleData } from 'https://unpkg.com/monoracle-sdk';
    import { BrowserProvider } from 'https://unpkg.com/ethers@6/dist/ethers.min.js';

    async function loadData() {
      const provider = new BrowserProvider(window.ethereum);
      const data = await getMonoracleData(
        '0xYourContractAddress',
        provider
      );
      console.log('Oracle Data:', data);
    }

    loadData();
  </script>
</head>
<body>
  <h1>Monoracle Demo</h1>
</body>
</html>
```

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🔗 Links

- **Website:** [monoracle.io](https://monoracle.io)
- **Documentation:** [docs.monoracle.io](https://docs.monoracle.io)
- **GitHub:** [github.com/monoracle](https://github.com/monoracle)

## 💬 Support

- **Discord:** [discord.gg/monoracle](https://discord.gg/monoracle)
- **Twitter:** [@monoracle](https://twitter.com/monoracle)
- **Email:** support@monoracle.io

---

Made with ❤️ by [Monoracle Labs](https://monoracle.io)
