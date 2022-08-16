import { ResponseMessage } from '../responseMessage';

import { Alarm } from './alarm';

/**
 * Representa o retorno da consulta dos alarmes no TLS.
 * @public
 */
export class ResponseMessageAlarm extends ResponseMessage {
  /**
   * Lista de alarmes retornados pelo TLS.
   * @readonly
   */
  readonly alarms: Alarm[];

  /**
   * Quantidade de bytes retornados para cada alarme.
   * @example
   * const tankBytes = '030302';
   * console.log(tankBytes.length)
   * > 6
   */
  static alarmBytesLength = 6;

  constructor(buffer: Buffer) {
    super(buffer);
    this.alarms = [];

    const bytesAlarms = buffer.subarray(
      this.paddingHeader,
      buffer.indexOf(ResponseMessage.terminationFlag)
    );

    for (
      let i = 0;
      i < bytesAlarms.length / ResponseMessageAlarm.alarmBytesLength;
      i += 1
    ) {
      const alarmBytes = bytesAlarms.subarray(
        i * ResponseMessageAlarm.alarmBytesLength,
        i * ResponseMessageAlarm.alarmBytesLength +
          ResponseMessageAlarm.alarmBytesLength
      );

      this.alarms.push(Alarm.fromBytes(alarmBytes));
    }
  }
}
