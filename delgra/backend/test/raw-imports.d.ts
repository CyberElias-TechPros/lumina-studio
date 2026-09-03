/** Vite `?raw` text imports — used to pull migration SQL into the test harness. */
declare module "*?raw" {
  const content: string;
  export default content;
}
