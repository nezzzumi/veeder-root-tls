import net from 'net';

import { ResponseMessageAlarm } from './alarm/response';
import { ResponseMessageTank } from './tank/response';

export class Tls {
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
   * Instância do net.Socket (conexão TCP com o TLS).
   * @readonly
   */
  private readonly socket: net.Socket;

  /**
   *
   * @param {string} ip IP do TLS
   * @param {number} port Porta do TLS (padrão 10001)
   */
  constructor(ip: string, port = 10001) {
    this.ip = ip;
    this.port = port;
    this.socket = net.createConnection({
      host: this.ip,
      port,
    });
  }

  /**
   * Lê toda informação da conexão aberta até o ETX (byte que sinaliza o fim da mensagem).
   * @returns Buffer contendo as informações lidas.
   */
  private async readAll(): Promise<Buffer> {
    const result = Buffer.from(
      await new Promise((resolve) => {
        let data = Buffer.from([]);

        this.socket.on('data', (chunk) => {
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
   * Destrói conexão com o TLS.
   */
  destroy() {
    this.socket.destroy();
  }

  /**
   * Consulta informações do(s) tanque(s).
   * @param tank Número do tanque a ser buscado. (Todos tanques por padrão)
   * @returns ResponseMessageTank contendo as informações retornadas.
   */
  async getTanks(tank = '00'): Promise<ResponseMessageTank> {
    const padTank = tank.padStart(2, '0');
    const command = `i201${padTank}`;
    const buffer = Buffer.concat([Buffer.from([0x1]), Buffer.from(command)]);

    await this.socket.write(buffer);
    const result = await this.readAll();

    if (result.length === 0) {
      throw Error('Retorno vazio ao buscar tanques.');
    }

    const response = new ResponseMessageTank(result);

    return response;
  }

  async getAlarms(tank = '00'): Promise<ResponseMessageAlarm> {
    const padTank = tank.padStart(2, '0');
    const command = `i101${padTank}`;
    const buffer = Buffer.concat([Buffer.from([0x1]), Buffer.from(command)]);

    await this.socket.write(buffer);
    const result = await this.readAll();

    if (result.length === 0) {
      throw Error('Retorno vazio ao buscar alarmes dos tanques.');
    }

    const response = new ResponseMessageAlarm(result);

    return response;
  }
}
