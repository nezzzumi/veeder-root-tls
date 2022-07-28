import ResponseMessage from '../responseMessage';
import Tank from './tank';

class ResponseMessageTank extends ResponseMessage {
  readonly tanks: Tank[];

  static tankBytesLength: number = 65;

  constructor(buffer: Buffer) {
    super(buffer);
    this.tanks = [];

    const bytesTanks = buffer.subarray(
      this.paddingHeader,
      buffer.indexOf(ResponseMessage.terminationFlag)
    );

    for (
      let i = 0;
      i < bytesTanks.length / ResponseMessageTank.tankBytesLength;
      i += 1
    ) {
      const tankBytes = bytesTanks.subarray(
        i * ResponseMessageTank.tankBytesLength,
        i * ResponseMessageTank.tankBytesLength +
          ResponseMessageTank.tankBytesLength
      );
      this.tanks.push(Tank.fromBytes(tankBytes));
    }
  }
}

export default ResponseMessageTank;
