class TankStatus {
  /**
   * (LSB) Delivery in Progress
   */
  readonly deliveryInProgress: boolean;

  /**
   * Leak Test in Progress
   */
  readonly leakTestInProgress: boolean;

  /**
   * Invalid Fuel Height Alarm (MAG Probes Only)
   */
  readonly invalidFuelHeightAlarm: boolean;

  constructor(
    deliveryInProgress: boolean,
    leakTestInProgress: boolean,
    invalidFuelHeightAlarm: boolean
  ) {
    this.deliveryInProgress = deliveryInProgress;
    this.leakTestInProgress = leakTestInProgress;
    this.invalidFuelHeightAlarm = invalidFuelHeightAlarm;
  }
}

export default TankStatus;
