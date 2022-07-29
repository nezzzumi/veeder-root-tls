import Tls from './tls/tls4';

const tlsIp = process.env.TLS_IP;

if (!tlsIp) {
  console.error(`Variável de ambiente TLS_IP não definida.`);
  process.exit(1);
}

const tls = new Tls(tlsIp);

(async () => {
  await tls.connect();

  const responseTanks = await tls.getTanks();
  console.log(responseTanks);

  tls.destroy();
})();
