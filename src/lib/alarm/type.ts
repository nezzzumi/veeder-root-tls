export class AlarmType {
  /**
   * ID do tipo.
   */
  readonly id: number;

  /**
   * Descrição do tipo.
   */
  readonly description: string;

  constructor(id: number, description: string) {
    this.id = id;
    this.description = description;
  }
}
