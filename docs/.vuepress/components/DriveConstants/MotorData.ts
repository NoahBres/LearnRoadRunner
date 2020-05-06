interface Motor {
  name: string;

  maxRPM: number;
  ticksPerRev: number;
  speccedGearRatio: number;
}

interface MotorListInterface {
  [key: string]: Motor;
}

interface MotorGroupItem {
  name: string;
  key: string;
  src: string;
  color: string;
  derivatives: Motor[];
}

enum MotorModel {
  REV_CORE_HEX,
  REV_HD_HEX_SPUR_40,
  REV_HD_HEX_SPUR_20,
  REV_HD_HEX_PLANETARY_20,
  AM_NEVEREST_BARE,
  AM_NEVEREST_CLASSIC_60,
  AM_NEVEREST_CLASSIC_40,
  AM_NEVEREST_ORBITAL_20,
  AM_NEVEREST_ORBITAL_3_7,
  TETRIX_TORQUENADO_60,
  TETRIX_TORQUENADO_40,
  TETRIX_TORQUENADO_20,
  MR_MATRIX_BARE,
  GOBILDA_5201_53,
  GOBILDA_5201_26,
  GOBILDA_5202_188,
  GOBILDA_5202_139,
  GOBILDA_5202_99_5,
  GOBILDA_5202_71_2,
  GOBILDA_5202_50_9,
  GOBILDA_5202_26_9,
  GOBILDA_5202_19_2,
  GOBILDA_5202_13_7,
  GOBILDA_5202_5_2,
  GOBILDA_5202_3_7,
}

const MotorList: MotorListInterface = {
  [MotorModel.REV_CORE_HEX]: {
    name: "Core Hex Motor",

    maxRPM: 125,
    ticksPerRev: 288,
    speccedGearRatio: 72,
  },
  [MotorModel.REV_HD_HEX_SPUR_40]: {
    name: "HD Hex Motor 40:1 Spur Gearbox",

    maxRPM: 150,
    ticksPerRev: 1120,
    speccedGearRatio: 40,
  },
  [MotorModel.REV_HD_HEX_SPUR_20]: {
    name: "HD Hex Motor 20:1 Spur Gearbox",

    maxRPM: 300,
    ticksPerRev: 560,
    speccedGearRatio: 20,
  },
  [MotorModel.REV_HD_HEX_PLANETARY_20]: {
    name: "HD Hex Motor 20:1 Planetary Gearbox",

    maxRPM: 300,
    ticksPerRev: 560,
    speccedGearRatio: 20,
  },
  [MotorModel.AM_NEVEREST_BARE]: {
    name: "NeveRest Bare",

    // Specced rpm is actually 6600 but motors.vex.com
    // reports 5480
    maxRPM: 5480,
    ticksPerRev: 1680,
    speccedGearRatio: 1,
  },
  [MotorModel.AM_NEVEREST_CLASSIC_60]: {
    name: "NeveRest Classic 60",

    maxRPM: 105,
    ticksPerRev: 1680,
    speccedGearRatio: 60,
  },
  [MotorModel.AM_NEVEREST_CLASSIC_40]: {
    name: "NeveRest Classic 40",

    maxRPM: 160,
    ticksPerRev: 1120,
    speccedGearRatio: 40,
  },
  [MotorModel.AM_NEVEREST_ORBITAL_20]: {
    name: "NeveRest Orbital 20",

    maxRPM: 340,
    ticksPerRev: 537.6,
    speccedGearRatio: 19.2,
  },
  [MotorModel.AM_NEVEREST_ORBITAL_3_7]: {
    name: "NeveRest Orbital 3.7",

    maxRPM: 1780,
    ticksPerRev: 103.6,
    speccedGearRatio: 3.7,
  },
  [MotorModel.TETRIX_TORQUENADO_60]: {
    name: "TETRIX MAX TorqueNADO 60:1",

    maxRPM: 100,
    ticksPerRev: 1440,
    speccedGearRatio: 60,
  },
  [MotorModel.TETRIX_TORQUENADO_40]: {
    name: "TETRIX MAX TorqueNADO 40:1",

    maxRPM: 150,
    ticksPerRev: 960,
    speccedGearRatio: 40,
  },
  [MotorModel.TETRIX_TORQUENADO_20]: {
    name: "TETRIX MAX TorqueNADO 20:1",

    maxRPM: 300,
    ticksPerRev: 480,
    speccedGearRatio: 20,
  },
  [MotorModel.MR_MATRIX_BARE]: {
    name: "Modern Robotics/MATRIX 12VDC Motor",

    maxRPM: 5994,
    ticksPerRev: 28,
    speccedGearRatio: 1,
  },
  [MotorModel.GOBILDA_5201_53]: {
    name: "goBILDA 5201 Series, 53:1 Ratio, 105 RPM",

    maxRPM: 105,
    ticksPerRev: 1497.325,
    speccedGearRatio: 53,
  },
  [MotorModel.GOBILDA_5201_26]: {
    name: "goBILDA 5201 Series, 26:1 Ratio, 210 RPM",

    maxRPM: 210,
    ticksPerRev: 723.24,
    speccedGearRatio: 26,
  },
  [MotorModel.GOBILDA_5202_188]: {
    name: "goBILDA 5202 Series, 188:1 Ratio, 30 RPM",

    maxRPM: 30,
    ticksPerRev: 5264,
    speccedGearRatio: 188,
  },
  [MotorModel.GOBILDA_5202_139]: {
    name: "goBILDA 5202 Series, 139:1 Ratio, 43 RPM",

    maxRPM: 43,
    ticksPerRev: 3892,
    speccedGearRatio: 139,
  },
  [MotorModel.GOBILDA_5202_99_5]: {
    name: "goBILDA 5202 Series, 99.5:1 Ratio, 60 RPM",

    maxRPM: 60,
    ticksPerRev: 2786,
    speccedGearRatio: 99.5,
  },
  [MotorModel.GOBILDA_5202_71_2]: {
    name: "goBILDA 5202 Series, 71.2:1 Ratio, 84 RPM",

    maxRPM: 84,
    ticksPerRev: 1993.6,
    speccedGearRatio: 71.2,
  },
  [MotorModel.GOBILDA_5202_50_9]: {
    name: "goBILDA 5202 Series, 50.9:1 Ratio, 117 RPM",

    maxRPM: 117,
    ticksPerRev: 1425.2,
    speccedGearRatio: 50.9,
  },
  [MotorModel.GOBILDA_5202_26_9]: {
    name: "goBILDA 5202 Series, 26.9:1 Ratio, 223 RPM",

    maxRPM: 223,
    ticksPerRev: 753.2,
    speccedGearRatio: 26.9,
  },
  [MotorModel.GOBILDA_5202_19_2]: {
    name: "goBILDA 5202 Series, 19.2:1 Ratio, 312 RPM",

    maxRPM: 312,
    ticksPerRev: 537.6,
    speccedGearRatio: 19.2,
  },
  [MotorModel.GOBILDA_5202_13_7]: {
    name: "goBILDA 5202 Series, 13.7:1 Ratio, 435 RPM",

    maxRPM: 435,
    ticksPerRev: 383.6,
    speccedGearRatio: 13.7,
  },
  [MotorModel.GOBILDA_5202_5_2]: {
    name: "goBILDA 5202 Series, 5.2:1 Ratio, 1150 RPM",

    maxRPM: 1150,
    ticksPerRev: 145.6,
    speccedGearRatio: 5.2,
  },
  [MotorModel.GOBILDA_5202_3_7]: {
    name: "goBILDA 5202 Series, 3.7:1 Ratio, 1620 RPM",

    maxRPM: 1620,
    ticksPerRev: 103.6,
    speccedGearRatio: 3.7,
  },
};

const MotorGroup: MotorGroupItem[] = [
  {
    name: "REV Core Hex",
    key: "rev-core-hex",
    src: "./assets/drive-constants/core-hex-quarter.jpg",
    color: "orange",
    derivatives: [MotorList[MotorModel.REV_CORE_HEX]],
  },
  {
    name: "REV HD Hex",
    key: "rev-hd-hex",
    src: "./assets/drive-constants/rev-hd-quarter.jpg",
    color: "orange",
    derivatives: [
      MotorList[MotorModel.REV_HD_HEX_SPUR_40],
      MotorList[MotorModel.REV_HD_HEX_SPUR_20],
      MotorList[MotorModel.REV_HD_HEX_PLANETARY_20],
    ],
  },
  {
    name: "NeveRest Bare",
    key: "am-neverest-bare",
    src: "./assets/drive-constants/neverest-bare-half.jpg",
    color: "red",
    derivatives: [MotorList[MotorModel.AM_NEVEREST_BARE]],
  },
  {
    name: "NeveRest Classic",
    key: "am-neverest-classic",
    src: "./assets/drive-constants/neverest-classic-half.jpg",
    color: "red",
    derivatives: [
      MotorList[MotorModel.AM_NEVEREST_CLASSIC_60],
      MotorList[MotorModel.AM_NEVEREST_CLASSIC_40],
    ],
  },
  {
    name: "NeveRest Orbital",
    key: "am-neverest-orbital",
    src: "./assets/drive-constants/neverest-orbital-half.jpg",
    color: "red",
    derivatives: [
      MotorList[MotorModel.AM_NEVEREST_ORBITAL_20],
      MotorList[MotorModel.AM_NEVEREST_ORBITAL_3_7],
    ],
  },
  // {
  //   name: "MATRIX Bare",
  //   key: "mr-matrix-bare",
  //   src: "./assets/drive-constants/matrix-bare-quarter.jpg",
  //   color: "yellow",
  //   derivatives: [MotorList[MotorModel.MR_MATRIX_BARE]],
  // },
  {
    name: "TorqueNADO",
    key: "tetrix-torquenado",
    src: "./assets/drive-constants/torquenado-quarter.jpg",
    color: "blue",
    derivatives: [
      MotorList[MotorModel.TETRIX_TORQUENADO_60],
      MotorList[MotorModel.TETRIX_TORQUENADO_40],
      MotorList[MotorModel.TETRIX_TORQUENADO_20],
    ],
  },
  {
    name: "goBILDA 5201 Series",
    key: "gobilda-5201",
    src: "./assets/drive-constants/gobilda-5201-quarter.jpg",
    color: "yellow",
    derivatives: [
      MotorList[MotorModel.GOBILDA_5201_53],
      MotorList[MotorModel.GOBILDA_5201_26],
    ],
  },
  {
    name: "goBILDA 5202 Series",
    key: "gobilda-5202",
    src: "./assets/drive-constants/gobilda-5202-quarter.jpg",
    color: "yellow",
    derivatives: [
      MotorList[MotorModel.GOBILDA_5202_188],
      MotorList[MotorModel.GOBILDA_5202_139],
      MotorList[MotorModel.GOBILDA_5202_99_5],
      MotorList[MotorModel.GOBILDA_5202_71_2],
      MotorList[MotorModel.GOBILDA_5202_50_9],
      MotorList[MotorModel.GOBILDA_5202_26_9],
      MotorList[MotorModel.GOBILDA_5202_19_2],
      MotorList[MotorModel.GOBILDA_5202_13_7],
      MotorList[MotorModel.GOBILDA_5202_5_2],
      MotorList[MotorModel.GOBILDA_5202_3_7],
    ],
  },
];

export { MotorList, MotorGroup, Motor, MotorModel };
