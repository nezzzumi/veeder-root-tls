import Tls from './TLS/tls4';

const tls = new Tls('10.11.1.22');

(async () => {
  await tls.connect();

  const responseTanks = await tls.getTanks();
  console.log(responseTanks);

  tls.destroy();
})();
