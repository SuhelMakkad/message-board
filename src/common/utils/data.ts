export const formatDate = (timestamp: string) => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};
