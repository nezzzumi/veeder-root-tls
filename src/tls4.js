/* eslint-disable new-cap */
const net = require('net');

class Tls {
  /**
   *
   * @param {string} ip IP do TLS
   * @param {number} port Porta do TLS (padrão 10001)
   */
  constructor(ip, port = 10001) {
    this.ip = ip;
    this.port = port;
  }

  async connect() {
    this.client = net.createConnection({
      host: this.ip,
      port: this.port,
    });

    this.client.on('connect', () => {
      console.log(`Conectado a ${this.ip}:${this.port}.`);
    });

    this.client.on('timeout', () => {
      throw Error(
        `Conexão com ${this.ip}:${this.port} atingiu o limite de tempo sem resposta.`,
      );
    });

    this.client.on('error', () => {
      throw Error(
        'Ocorreu um erro com a conexão.',
      );
    });
  }

  async getTanks() {
    let buffer = new Buffer.from([0x1]);
    buffer += new Buffer.from('i20100');

    this.client.write(buffer);
    this.client.on('data', (data) => data);
  }
}

module.exports = Tls;
