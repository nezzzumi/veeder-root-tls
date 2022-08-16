import { AlarmCategory } from './category';
import { AlarmType } from './type';

export class Alarm {
  /**
   * ID do tanque.
   * @readonly
   */
  readonly tankId: number;

  /**
   * Categoria do alarme/aviso.
   * @readonly
   */
  readonly category: AlarmCategory;

  /**
   * Tipo do alarme.
   * @readonly
   */
  readonly type: AlarmType;

  constructor(tankId: number, category: AlarmCategory) {
    this.tankId = tankId;
    this.category = category;
  }

  /**
   * Cria instância de um alarme através dos bytes retornados pelo TLS.
   * @param buffer Buffer contendo informações do tanque
   * @returns Alarme com as informações tratadas.
   */
  static fromBytes(buffer: Buffer): Alarm {
    const alarmCategoryID = parseInt(buffer.subarray(0, 2).toString(), 10);
    const alarmTypeID = parseInt(buffer.subarray(2, 4).toString(), 10);
    const tankNumber = parseInt(buffer.subarray(4, 6).toString(), 10);

    const type = new AlarmType(alarmTypeID, '');
    const category = new AlarmCategory(alarmCategoryID, type);

    return new Alarm(tankNumber, category);
  }
}
