import { AlarmType } from './type';

export class AlarmCategory {
  /**
   * ID da categoria.
   */
  readonly id: number;

  /**
   * Tipo do alarme.
   */
  readonly type: AlarmType;

  constructor(id: number, type: AlarmType) {
    this.id = id;
    this.type = type;
  }
}
