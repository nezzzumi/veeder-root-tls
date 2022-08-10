import { ResponseMessage } from '../responseMessage';

import { Tank } from './tank';

/**
 * Representa o retorno da consulta dos tanques no TLS.
 * @public
 */
export class ResponseMessageTank extends ResponseMessage {
  /**
   * Lista de tanques retornados pelo TLS.
   * @readonly
   */
  readonly tanks: Tank[];

  /**
   * Quantidade de bytes retornados para cada tanque.
   * @example
   * const tankBytes = '01100000745637B044561D9F047617650438AF6090000000041E6BC6B00000000';
   * console.log(tankBytes.length)
   * > 65
   */
  static tankBytesLength = 65;

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
