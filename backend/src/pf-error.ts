class PFError extends Error {
  constructor(message: string) {
    super('PF: ' + message);
  }
}

export { PFError };
