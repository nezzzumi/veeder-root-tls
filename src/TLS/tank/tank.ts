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
    const tankNumber = buffer.subarray(0, 2).toString();
    console.log(tankNumber);
  }
}

export default Tank;
