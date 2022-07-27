abstract class ResponseMessage {
  readonly command: string;

  readonly datetime: Date;

  readonly paddingHeader: number;

  readonly terminationFlag: string = '&&';

  constructor(buffer: Buffer) {
    this.command = buffer.subarray(1, 7).toString();

    const year = 2000 + parseInt(buffer.subarray(7, 9).toString(), 10);
    const month = parseInt(buffer.subarray(9, 11).toString(), 10);
    const day = parseInt(buffer.subarray(11, 13).toString(), 10);
    const hours = parseInt(buffer.subarray(13, 15).toString(), 10);
    const minutes = parseInt(buffer.subarray(15, 17).toString(), 10);

    this.datetime = new Date(year, month, day, hours, minutes);

    // <SOH> + COMANDO + DATETIME
    this.paddingHeader = 1 + this.command.length + 10;
  }
}

export default ResponseMessage;
