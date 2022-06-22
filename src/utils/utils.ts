/** 
 * remove query parameters from URL
 */
const cleanURL = (input: string): string => {
  return input.split("?")[0];
};

export { cleanURL };
