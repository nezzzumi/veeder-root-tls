import { TankStatus } from './status';

export class Tank {
  /**
   * ID do tanque.
   * @readonly
   */
  readonly id: number;

  /**
   * ID do produto.
   * @readonly
   */
  readonly productCode: string;

  /**
   * Status do tanque.
   * @readonly
   */
  readonly status: TankStatus;

  /**
   * Quantidade de campos com dados (exemplo: volume, tc-volume, água, etc).
   * @readonly
   */
  readonly dataFieldsLength: number;

  /**
   * Volume de combustível no tanque.
   * @readonly
   */
  readonly volume: number;

  /**
   * Volume de combustível no tanque (considerando a temperatura).
   * @readonly
   */
  readonly tcVolume: number;

  /**
   * Volume vazio no tanque.
   * @readonly
   */
  readonly ullage: number;

  /**
   * Altura do tanque.
   * @readonly
   */
  readonly height: number;

  /**
   * Quantidade de água no tanque.
   * @readonly
   */
  readonly water: number;

  /**
   * Temperatura no tanque.
   * @readonly
   */
  readonly temperature: number;

  /**
   * Volume de água no tanque.
   * @readonly
   */
  readonly waterVolume: number;

  constructor(
    id: number,
    productCode: string,
    status: TankStatus,
    dataFieldsLength: number,
    volume: number,
    tcVolume: number,
    ullage: number,
    height: number,
    water: number,
    temperature: number,
    waterVolume: number
  ) {
    this.id = id;
    this.productCode = productCode;
    this.status = status;
    this.dataFieldsLength = dataFieldsLength;
    this.volume = volume;
    this.tcVolume = tcVolume;
    this.ullage = ullage;
    this.height = height;
    this.water = water;
    this.temperature = temperature;
    this.waterVolume = waterVolume;
  }

  /**
   * Cria instância de um tanque através dos bytes retornados pelo TLS.
   * @param buffer Buffer contendo informações do tanque
   * @returns Tanque com as informações tratadas.
   */
  static fromBytes(buffer: Buffer): Tank {
    const tankNumber = parseInt(buffer.subarray(0, 2).toString(), 10);
    const productCode = buffer.subarray(2, 3).toString();
    const status = buffer.subarray(3, 7).toString();
    const dataFieldsLength = Number(buffer.subarray(7, 9).toString());

    const parts: Buffer[] = [];
    const BYTES_DATA_FIELD = 8;

    for (let i = 9; i < buffer.length; i += BYTES_DATA_FIELD) {
      parts.push(
        Buffer.from(buffer.subarray(i, i + BYTES_DATA_FIELD).toString(), 'hex')
      );
    }

    const volume = parts[0].readFloatBE();
    const tcVolume = parts[1].readFloatBE();
    const ullage = parts[2].readFloatBE();
    const height = parts[3].readFloatBE();
    const water = parts[4].readFloatBE();
    const temperature = parts[5].readFloatBE();
    const waterVolume = parts[6].readFloatBE();

    return new Tank(
      tankNumber,
      productCode,
      new TankStatus(status[0] === '1', status[1] === '1', status[2] === '1'),
      dataFieldsLength,
      volume,
      tcVolume,
      ullage,
      height,
      water,
      temperature,
      waterVolume
    );
  }
}
