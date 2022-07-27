class TankStatus {
  readonly deliveryInProgress: boolean;

  readonly leakTestInProgress: boolean;

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
