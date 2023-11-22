const createPandaMethod = (type) => {
  return async (params) => {
    return new Promise((resolve, reject) => {
      // Send request
      const messageId = `${type}-${Date.now()}-${Math.random()}`;
      const requestEvent = new CustomEvent('PandaRequest', {
        detail: { messageId, type, params },
      });
      document.dispatchEvent(requestEvent);

      // Listen for a response
      function onResponse(e) {
        if (e.detail.type === type) {
          if (e.detail.success) {
            resolve(e.detail.data);
          } else {
            reject(e.detail.error);
          }
        }
      }

      document.addEventListener(messageId, onResponse, { once: true });
    });
  };
};

window.panda = {
  isReady: true,
  connect: createPandaMethod('connect'),
  disconnect: createPandaMethod('disconnect'),
  isConnected: createPandaMethod('isConnected'),
  getPubKeys: createPandaMethod('getPubKeys'),
  getAddresses: createPandaMethod('getAddresses'),
  getBalance: createPandaMethod('getBalance'),
  getOrdinals: createPandaMethod('getOrdinals'),
  sendBsv: createPandaMethod('sendBsv'),
  transferOrdinal: createPandaMethod('transferOrdinal'),
  signMessage: createPandaMethod('signMessage'),
  broadcast: createPandaMethod('broadcast'),
  getSignatures: createPandaMethod('getSignatures'),
  getSocialProfile: createPandaMethod('getSocialProfile'),
  getPaymentUtxos: createPandaMethod('getPaymentUtxos'),
  getExchangeRate: createPandaMethod('getExchangeRate'),
  purchaseOrdinal: createPandaMethod('purchaseOrdinal'),
  generateTaggedKeys: createPandaMethod('generateTaggedKeys'),
  getTaggedKeys: createPandaMethod('getTaggedKeys'),
  inscribe: createPandaMethod('sendBsv'),
};
