const Tls = require('./tls4');

const tls = new Tls('34.131.193.205');

(async () => {
  await tls.connect();
  console.log(await tls.getTanks());
})();
