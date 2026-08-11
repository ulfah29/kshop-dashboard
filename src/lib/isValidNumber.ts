export const isValidNumber = (value: string): boolean => {
  return value.trim() !== '' && Number.isFinite(Number(value));
}