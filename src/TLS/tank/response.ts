import ResponseMessage from '../responseMessage';
import Tank from './tank';

class ResponseMessageTank extends ResponseMessage {
  readonly tanks: Tank[];

  constructor(buffer: Buffer) {
    super(buffer);
    this.tanks = [];

    // console.log(
    //   buffer
    //     .subarray(this.paddingHeader, buffer.indexOf(this.terminationFlag))
    //     .toString()
    // );
  }
}

export default ResponseMessageTank;
