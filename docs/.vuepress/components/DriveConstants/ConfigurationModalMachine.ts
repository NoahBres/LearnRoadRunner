import { Machine, assign } from "xstate";
import DriveConstantStorage, {
  StraferV1Constants,
  BlankConstants,
} from "./DriveConstantStorage";
import { Motor } from "./MotorData";

interface ConfigurationState {
  motorType: Motor;
  ticksPerRev: number;
  maxRPM: number;

  runUsingEncoder: boolean;

  wheelRadius: number;
  gearRatio: number;
  trackWidth: number;
}

interface ModalStateSchema {
  states: {
    chassisSelection: {};
    motorSelection: {};
    manualMotorSelection: {};
    gearRatioSelection: {};
    wheelSelection: {};
    botDimensions: {};
    ayudeSelection: {};
    done: {};
  };
}

type ModalEvent =
  | { type: "SELECTED_CHASSIS"; value: ChassisEnum }
  | { type: "SELECTED_CUSTOM_CHASSIS"; value: null }
  | { type: "SELECTED_MOTOR"; value: null }
  | { type: "SELECTED_CUSTOM_MOTOR"; value: null }
  | { type: "SET_MANUAL_MOTOR"; value: null }
  | { type: "SET_GEAR_RATIO"; value: null }
  | { type: "SELECTED_WHEEL_SIZE"; value: null }
  | { type: "SELECTED_DIMENSIONS"; value: null }
  | { type: "SELECTED_AYUDE"; value: null }
  | { type: "BACK"; value: null };

enum PrecedingMotorSelectionSlide {
  TemplateSelect,
  ManualSelect,
}

enum PrecedingDoneSlide {
  ChassisSelect,
  AyudeSelect,
}

interface ModalContext {
  precedingMotorSelectionSlide: PrecedingMotorSelectionSlide;
  precedingDoneSlide: PrecedingDoneSlide;
}

export const configurationModalMachine = Machine<
  ModalContext,
  ModalStateSchema,
  ModalEvent
>(
  {
    id: "configurationModal",
    initial: "chassisSelection",
    context: {
      precedingMotorSelectionSlide: null,
      precedingDoneSlide: null,
    },
    states: {
      chassisSelection: {
        on: {
          SELECTED_CHASSIS: {
            target: "done",
            actions: [
              assign({
                precedingDoneSlide: (context) =>
                  PrecedingDoneSlide.ChassisSelect,
              }),
            ],
          },
          SELECTED_CUSTOM_CHASSIS: "motorSelection",
        },
      },
      motorSelection: {
        exit: [
          assign({
            precedingMotorSelectionSlide: (context) =>
              PrecedingMotorSelectionSlide.TemplateSelect,
          }),
        ],
        on: {
          SELECTED_MOTOR: "gearRatioSelection",
          SELECTED_CUSTOM_MOTOR: "manualMotorSelection",
          BACK: "chassisSelection",
        },
      },
      manualMotorSelection: {
        exit: [
          assign({
            precedingMotorSelectionSlide: (context) =>
              PrecedingMotorSelectionSlide.ManualSelect,
          }),
        ],
        on: {
          SET_MANUAL_MOTOR: "gearRatioSelection",
          BACK: "motorSelection",
        },
      },
      gearRatioSelection: {
        on: {
          SET_GEAR_RATIO: "wheelSelection",
          BACK: [
            {
              target: "motorSelection",
              cond: (ctx, e) =>
                ctx.precedingMotorSelectionSlide ==
                PrecedingMotorSelectionSlide.TemplateSelect,
            },
            {
              target: "manualMotorSelection",
              cond: (ctx, e) =>
                ctx.precedingMotorSelectionSlide ==
                PrecedingMotorSelectionSlide.ManualSelect,
            },
          ],
        },
      },
      wheelSelection: {
        on: {
          SELECTED_WHEEL_SIZE: "botDimensions",
          BACK: "gearRatioSelection",
        },
      },
      botDimensions: {
        on: {
          BACK: "wheelSelection",
          SELECTED_DIMENSIONS: "ayudeSelection",
        },
      },
      ayudeSelection: {
        on: {
          BACK: "botDimensions",
          SELECTED_AYUDE: {
            target: "done",
            actions: [
              assign({
                precedingDoneSlide: (context) => PrecedingDoneSlide.AyudeSelect,
              }),
            ],
          },
        },
      },
      done: {
        on: {
          BACK: [
            {
              target: "chassisSelection",
              cond: (ctx, e) =>
                ctx.precedingDoneSlide == PrecedingDoneSlide.ChassisSelect,
            },
            {
              target: "ayudeSelection",
              cond: (ctx, e) =>
                ctx.precedingDoneSlide == PrecedingDoneSlide.AyudeSelect,
            },
          ],
        },
      },
    },
  },
  {
    actions: {},
  }
);
