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
    wheelSelection: {};
    driveEncoders: {};
    botDimensions: {};
    done: {};
  };
}

type ModalEvent =
  | { type: "SELECTED_CHASSIS"; value: ChassisEnum }
  | { type: "SELECTED_CUSTOM_CHASSIS"; value: null };

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
      motorSelection: {},
      wheelSelection: {},
      driveEncoders: {},
      botDimensions: {},
      done: {},
    },
  },
  {
    actions: {
      setChassis: assign({
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
