export const validateDOB = (value: string): boolean => {
  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  if (!value) {
    return true;
  }
  const match = value.match(regex);
  if (!match) {
    return false;
  }
  const [, day, month, year] = match;
  const date = new Date(
    parseInt(year, 10),
    parseInt(month, 10) - 1,
    parseInt(day, 10),
  );
  return (
    date.getDate() === parseInt(day, 10) &&
    date.getMonth() === parseInt(month, 10) - 1 &&
    date.getFullYear() === parseInt(year, 10)
  );
};

export const formatDOB = (value: string) => {
  if (!value) {
    return value;
  }
  const numbers = value.replace(/[^\d]/g, '');
  if (numbers.length <= 2) {
    return numbers;
  }
  if (numbers.length <= 4) {
    return `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
  }
  return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4, 8)}`;
};

export const formatDOBProfile = (value: string) => {
  if (!value) {
    return value;
  }
  const numbers = value.replace(/[^\d]/g, '');
  return `${numbers.slice(6, 8)}/${numbers.slice(4, 6)}/${numbers.slice(0, 4)}`;
};
