export default async function teardown() {
  (globalThis as any).__GANACHE_OPEN_FORMAT__.close();
}
