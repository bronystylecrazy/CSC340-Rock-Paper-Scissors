export const randomPick = <T>(array: T[]) => {
  return array[Math.floor(Math.random() * array.length)];
};
