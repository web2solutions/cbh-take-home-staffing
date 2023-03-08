export const InMemoryStore = ((): Record<string, Map<string, unknown>> => {
  const stores: Record<string, Map<string, unknown>> = {
    Agent: new Map<string, unknown>(),
    Facility: new Map<string, unknown>(),
    Shift: new Map<string, unknown>(),
  };
  return stores;
})();
