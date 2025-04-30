export function saveToLocalStorage(key: string, value: object): void {
  const marshaledValue = JSON.stringify(value);
  localStorage.setItem(key, marshaledValue);
}

export function loadFromLocalStorage<T>(key: string): T {
  try {
    const unmarshaledValue = localStorage.getItem(key);
    if (!unmarshaledValue) {
      return {} as T;
    }
    return JSON.parse(unmarshaledValue) as T;
  } catch {
    return {} as T;
  }
}
