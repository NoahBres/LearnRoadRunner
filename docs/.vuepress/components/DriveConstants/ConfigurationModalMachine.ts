import { Machine } from "xstate";

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
  | { type: "SELECTED_CHASSIS" }
  | { type: "SELECTED_CUSTOM_CHASSIS" };

interface ModalContext {
  chassisSelected: string;
}

export const configurationModalMachine = Machine<
  ModalContext,
  ModalStateSchema,
  ModalEvent
>({
  id: "configurationModal",
  initial: "chassisSelection",
  context: {
    chassisSelected: "",
  },
  states: {
    chassisSelection: {
      on: {
        SELECTED_CHASSIS: "done",
        SELECTED_CUSTOM_CHASSIS: "motorSelection",
      },
    },
    motorSelection: {},
    wheelSelection: {},
    driveEncoders: {},
    botDimensions: {},
    done: {},
  },
});
