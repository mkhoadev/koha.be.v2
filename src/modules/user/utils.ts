export function createSignMessage(userAddress: string, nonce: string) {
  return `
Welcome to the KoHa marketplace.

This  signature will not trigger a blockchain transaction and will not cost any fee.
Sign to verify you are the owner of this address: ${userAddress}

Nonce: ${nonce}`;
}
