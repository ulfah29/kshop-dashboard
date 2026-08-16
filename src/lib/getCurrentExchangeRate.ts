import { getLocalStorage } from './getLocalStorage';

const getCurrentExchangeRate = (exchangeRate: number, localStorageKey: string) => {
  if (exchangeRate !== 0) {
    return exchangeRate;
  } else {
    const localDataExchangeRate = getLocalStorage(localStorageKey)?.rate || 0;

    return localDataExchangeRate?.toFixed(2) || exchangeRate;
  }
}

export default getCurrentExchangeRate;