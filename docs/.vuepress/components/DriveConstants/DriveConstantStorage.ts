interface DriveConstantFormat {
  ticksPerRev: number;
  maxRPM: number;

  runUsingEncoder: boolean;

  wheelRadius: number;
  gearRatio: number;
  trackWidth: number;

  maxVel: number;
  maxAccel: number;
}

const BlankConstants: DriveConstantFormat = {
  ticksPerRev: 1,
  maxRPM: 1,

  runUsingEncoder: false,

  wheelRadius: 1,
  gearRatio: 1,

  trackWidth: 1,

  maxVel: 1,
  maxAccel: 1,
};

const StraferV1Constants: DriveConstantFormat = {
  ticksPerRev: 386.3,
  maxRPM: 435,

  runUsingEncoder: true,

  wheelRadius: 1.9685,
  gearRatio: 0.5,

  trackWidth: 15,

  maxVel: (435 / 60) * 0.5 * 1.9685 * 2 * Math.PI,
  maxAccel: (435 / 60) * 0.5 * 1.9685 * 2 * Math.PI,
};

class DriveConstantStorage {
  // Prefix local storage keys to avoid any future constants
  private static readonly PREFIX = "DriveConstant";

  // Variables used to get keys
  static readonly TICKS_PER_REV = "ticksPerRev";
  static readonly MAX_RPM = "maxRPM";
  static readonly RUN_USING_ENCODER = "runUsingEncoder";
  static readonly WHEEL_RADIUS = "wheelRadius";
  static readonly GEAR_RATIO = "gearRatio";
  static readonly TRACK_WIDTH = "trackWidth";
  static readonly MAX_VEL = "maxVel";
  static readonly MAX_ACCEL = "maxAccel";

  static getData(): DriveConstantFormat {
    return {
      ticksPerRev:
        Number(localStorage.getItem(`${this.PREFIX}-${this.TICKS_PER_REV}`)) ||
        1,

      maxRPM:
        Number(localStorage.getItem(`${this.PREFIX}-${this.MAX_RPM}`)) || 1,

      runUsingEncoder:
        Boolean(
          localStorage.getItem(`${this.PREFIX}-${this.RUN_USING_ENCODER}`)
        ) || false,

      wheelRadius:
        Number(localStorage.getItem(`${this.PREFIX}-${this.WHEEL_RADIUS}`)) ||
        1,

      gearRatio:
        Number(localStorage.getItem(`${this.PREFIX}-${this.GEAR_RATIO}`)) || 1,

      trackWidth:
        Number(localStorage.getItem(`${this.PREFIX}-${this.TRACK_WIDTH}`)) || 1,

      maxVel:
        Number(localStorage.getItem(`${this.PREFIX}-${this.MAX_VEL}`)) || 1,

      maxAccel:
        Number(localStorage.getItem(`${this.PREFIX}-${this.MAX_VEL}`)) || 1,
    };
  }

  static setData(key: string, data: string) {
    window.localStorage.setItem(`${this.PREFIX}-${key}`, data);
  }

  static loadTemplate(data: DriveConstantFormat) {
    localStorage.setItem(
      `${this.PREFIX}-${this.TICKS_PER_REV}`,
      data.ticksPerRev.toString()
    );

    localStorage.setItem(
      `${this.PREFIX}-${this.MAX_RPM}`,
      data.maxRPM.toString()
    );

    localStorage.setItem(
      `${this.PREFIX}-${this.RUN_USING_ENCODER}`,
      data.runUsingEncoder.toString()
    );

    localStorage.setItem(
      `${this.PREFIX}-${this.WHEEL_RADIUS}`,
      data.wheelRadius.toString()
    );

    localStorage.setItem(
      `${this.PREFIX}-${this.GEAR_RATIO}`,
      data.gearRatio.toString()
    );

    localStorage.setItem(
      `${this.PREFIX}-${this.TRACK_WIDTH}`,
      data.trackWidth.toString()
    );

    localStorage.setItem(
      `${this.PREFIX}-${this.MAX_VEL}`,
      data.maxVel.toString()
    );

    localStorage.setItem(
      `${this.PREFIX}-${this.MAX_ACCEL}`,
      data.maxAccel.toString()
    );
  }
}

export { DriveConstantStorage as default, StraferV1Constants, BlankConstants };
