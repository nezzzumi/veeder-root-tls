import Tls from './tls/tls4';

const tlsIp = process.argv[2];
const tlsPort = parseInt(process.argv[3], 10) || 10001;

if (!tlsIp) {
  console.error(`Variável de ambiente TLS_IP não definida.`);
  process.exit(1);
}

const tls = new Tls(tlsIp, tlsPort);

(async () => {
  await tls.connect();

  const responseTanks = await tls.getTanks();
  console.log(responseTanks);

  tls.destroy();
})();
