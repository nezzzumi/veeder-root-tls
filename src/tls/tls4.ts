import PromiseSocket from 'promise-socket';
import net from 'net';
import ResponseMessageTank from './tank/response';

class Tls {
  /**
   * IP do TLS.
   * @readonly
   */
  readonly ip: string;

  /**
   * Porta do TLS.
   * @readonly
   */
  readonly port: number;

  /**
   * Instância do PromiseSocket (conexão TCP com o TLS).
   * @readonly
   */
  private readonly promiseSocket: PromiseSocket<net.Socket>;

  /**
   *
   * @param {string} ip IP do TLS
   * @param {number} port Porta do TLS (padrão 10001)
   */
  constructor(ip: string, port: number = 10001) {
    this.ip = ip;
    this.port = port;
    this.promiseSocket = new PromiseSocket(new net.Socket());
  }

  /**
   * Lê toda informação da conexão aberta até o ETX (byte que sinaliza o fim da mensagem).
   * @returns Buffer contendo as informações lidas.
   */
  private async readAll(): Promise<Buffer> {
    const result = Buffer.from(
      await new Promise((resolve) => {
        let data = Buffer.from([]);

        this.promiseSocket.stream.on('data', (chunk) => {
          data = Buffer.concat([data, chunk]);

          // ETX (ascii)
          if (data[data.length - 1] === 0x3) {
            resolve(data);
          }
        });
      })
    );

    return result;
  }

  /**
   * Cria conexão com o TLS.
   */
  async connect() {
    try {
      await this.promiseSocket.connect({
        host: this.ip,
        port: this.port
      });
      this.promiseSocket.setTimeout(3000);

      console.info(`Conectado a ${this.ip}:${this.port}.`);
    } catch (error: any) {
      console.error('Ocorreu um erro ao se conectar ao TLS4.', error.name);
      throw error;
    }
  }

  /**
   * Destrói conexão com o TLS.
   */
  destroy() {
    this.promiseSocket.destroy();
  }

  /**
   * Consulta informações do(s) tanque(s).
   * @param tank Número do tanque a ser buscado. (Todos tanques por padrão)
   * @returns ResponseMessageTank contendo as informações retornadas.
   */
  async getTanks(tank: string = '00'): Promise<ResponseMessageTank> {
    const padTank = tank.padStart(2, '0');
    const command = `i201${padTank}`;
    const buffer = Buffer.concat([Buffer.from([0x1]), Buffer.from(command)]);

    await this.promiseSocket.write(buffer);
    const result = await this.readAll();

    if (result.length === 0) {
      throw Error('Retorno vazio ao buscar tanques.');
    }

    const response = new ResponseMessageTank(result);

    return response;
  }
}

export default Tls;
