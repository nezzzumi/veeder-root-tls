import TankStatus from './status';

class Tank {
  readonly number: number;

  readonly productCode: string;

  readonly status: TankStatus;

  readonly dataFieldsLength: number;

  readonly volume: number;

  readonly tcVolume: number;

  readonly ullage: number;

  readonly height: number;

  readonly water: number;

  readonly temperature: number;

  readonly waterVolume: number;

  constructor(
    number: number,
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
    this.number = number;
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

    const tank = new Tank(
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

    return tank;

    // return tank;
  }
}

export default Tank;
