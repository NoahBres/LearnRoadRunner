import { Machine, assign } from "xstate";
import DriveConstantStorage, {
  StraferV1Constants,
  BlankConstants,
} from "./DriveConstantStorage";
import { ChassisEnum } from "./ChassisEnum";

interface ModalStateSchema {
  states: {
    chassisSelection: {};
    motorSelection: {};
    manualMotorSelection: {};
    gearRatioSelection: {};
    wheelSelection: {};
    driveEncoders: {};
    botDimensions: {};
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
  | { type: "BACK"; value: null };

interface ModalContext {
  chassisSelected: ChassisEnum;
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
      chassisSelected: ChassisEnum.CUSTOM,
    },
    states: {
      chassisSelection: {
        on: {
          SELECTED_CHASSIS: "done",
          SELECTED_CUSTOM_CHASSIS: "motorSelection",
        },
        exit: ["setChassis", "loadTemplate"],
      },
      motorSelection: {
        on: {
          SELECTED_MOTOR: "gearRatioSelection",
          SELECTED_CUSTOM_MOTOR: "manualMotorSelection",
          BACK: "chassisSelection",
        },
      },
      manualMotorSelection: {
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
              cond: (ctx, e, { state }) =>
                state.history.matches("motorSelection"),
            },
            {
              target: "manualMotorSelection",
              cond: (ctx, e, { state }) =>
                state.history.matches("manualMotorSelection"),
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
        },
      },
      driveEncoders: {},
      done: {},
    },
  },
  {
    actions: {
      setChassis: assign<ModalContext, ModalEvent>({
        chassisSelected: (context, event) => event.value,
      }),
      loadTemplate: (context, event) => {
        switch (event.value) {
          case ChassisEnum.STRAFER_V1_CHASSIS:
            DriveConstantStorage.loadTemplate(StraferV1Constants);
            break;
          case ChassisEnum.CUSTOM:
            DriveConstantStorage.loadTemplate(BlankConstants);
            break;
        }
      },
    },
  }
);
