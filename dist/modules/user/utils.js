"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSignMessage = void 0;
function createSignMessage(userAddress, nonce) {
    return `
Welcome to the KoHa marketplace.

This  signature will not trigger a blockchain transaction and will not cost any fee.
Sign to verify you are the owner of this address: ${userAddress}

Nonce: ${nonce}`;
}
exports.createSignMessage = createSignMessage;
//# sourceMappingURL=utils.js.map