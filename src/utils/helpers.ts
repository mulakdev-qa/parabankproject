export async function pause(ms?: number): Promise<void> {
  const { config } = await import('./config');
  const delay = ms ?? config.stepDelay;
  if (delay > 0) {
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
}
