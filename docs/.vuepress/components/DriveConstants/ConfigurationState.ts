import { Motor, MotorGroupItem } from "./MotorData";

enum ChassisEnum {
  STRAFER_V1_CHASSIS = "STRAFER_V1_CHASSIS",
  STRAFER_V3_CHASSIS = "STRAFER_V3_CHASSIS",
  CUSTOM = "CUSTOM",
}

interface ConfigurationState {
  chassisSelected: ChassisEnum;

  customMotorSelected: boolean;
  motorGroupSelected: MotorGroupItem;
  motorSelected: Motor;

  ticksPerRev: number;
  maxRPM: number;

  gearRatio: number;
  wheelRadius: number;
  trackWidth: number;

  runUsingEncoder: boolean;
}

export { ConfigurationState as default, ChassisEnum };
