/* eslint-disable new-cap */
const net = require('net');
const { PromiseSocket } = require('promise-socket');

class Tls {
  ip: string;
  port: number;
  private promiseSocket: typeof PromiseSocket;
  /**
   *
   * @param {string} ip IP do TLS
   * @param {number} port Porta do TLS (padrão 10001)
   */
  constructor(ip: string, port: number = 10001) {
    this.ip = ip;
    this.port = port;
  }

  async connect() {
    this.promiseSocket = new PromiseSocket(net.Socket());

    try {
      await this.promiseSocket.connect({
        host: this.ip,
        port: this.port,
      });
      console.log(`Conectado a ${this.ip}:${this.port}.`);
    } catch (error: any) {
      console.error('Ocorreu um erro ao se conectar ao TLS4.', error.name);
      throw error;
    }
  }

  async getTanks() {
    let buffer = Buffer.from([0x1]);
    buffer.write('i20100');
    console.log(buffer);

    await this.promiseSocket.write(buffer);
    await this.promiseSocket.end();

    const result = this.promiseSocket.readAll();

    return result;
  }
}

export default Tls;
