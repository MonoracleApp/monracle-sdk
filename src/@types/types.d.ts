interface MonoracleData<T = any> {
  creatorWallet: string;
  data: T;
  apiUrl: string;
  apiHeaders: string;
  apiParameters: string;
  lastUpdateTime: bigint;
}