/**
 * Monoracle - Get your own data from chain
 */

import { ethers, Contract } from 'ethers';
import MonoracleArtifact from './abis/Monoracle.json';

export interface MonoracleData<T = any> {
  creatorWallet: string;
  data: T;
  apiUrl: string;
  apiHeaders: string;
  apiParameters: string;
  lastUpdateTime: bigint;
}

/**
 * Fetch all data from a Monoracle contract
 * @param contractAddress - Contract address
 * @param rpcUrl - RPC URL (default: https://testnet-rpc.monad.xyz/)
 * @returns All contract data
 */
export async function getMonoracleData<T>(
  contractAddress: string,
  rpcUrl: string = 'https://testnet-rpc.monad.xyz/'
): Promise<MonoracleData<T>> {
  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const contract = new Contract(contractAddress, MonoracleArtifact.abi, provider);

  const [creatorWallet, dataRaw, apiUrl, apiHeaders, apiParameters, lastUpdateTime] = await Promise.all([
    contract.creatorWallet(),
    contract.getData(),
    contract.apiUrl(),
    contract.apiHeaders(),
    contract.apiParameters(),
    contract.lastUpdateTime(),
  ]);

  // Parse data if it's JSON
  let data: any;
  try {
    data = JSON.parse(dataRaw);
  } catch {
    data = dataRaw;
  }

  return {
    creatorWallet,
    data,
    apiUrl,
    apiHeaders,
    apiParameters,
    lastUpdateTime,
  };
}
