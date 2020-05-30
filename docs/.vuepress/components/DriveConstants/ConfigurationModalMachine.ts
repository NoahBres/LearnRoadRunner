import { Machine, assign } from "xstate";

import ConfigurationState from "./ConfigurationState";

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
  | { type: "SELECTED_CHASSIS"; value: ConfigurationState }
  | { type: "SELECTED_CUSTOM_CHASSIS"; value: ConfigurationState }
  | { type: "SELECTED_MOTOR"; value: ConfigurationState }
  | { type: "SELECTED_CUSTOM_MOTOR"; value: ConfigurationState }
  | { type: "SET_MANUAL_MOTOR"; value: ConfigurationState }
  | { type: "SET_GEAR_RATIO"; value: ConfigurationState }
  | { type: "SELECTED_WHEEL_SIZE"; value: ConfigurationState }
  | { type: "SELECTED_DIMENSIONS"; value: ConfigurationState }
  | { type: "SELECTED_AYUDE"; value: ConfigurationState }
  | { type: "BACK"; value: ConfigurationState };

enum PrecedingMotorSelectionSlide {
  TemplateSelect,
  ManualSelect,
}

enum PrecedingDoneSlide {
  ChassisSelect,
  AyudeSelect,
}

interface ModalContext {
  currentConfigurationState: ConfigurationState;

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
      currentConfigurationState: {
        chassisSelected: null,

        customMotorSelected: false,
        motorGroupSelected: null,
        motorSelected: null,

        ticksPerRev: null,
        maxRPM: null,

        gearRatio: null,
        wheelRadius: null,
        trackWidth: null,

        runUsingEncoder: null,
      },

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
        exit: ["setCurrentConfigurationState"],
      },
      motorSelection: {
        on: {
          SELECTED_MOTOR: "gearRatioSelection",
          SELECTED_CUSTOM_MOTOR: "manualMotorSelection",
          BACK: "chassisSelection",
        },
        exit: [
          assign({
            precedingMotorSelectionSlide: (context) =>
              PrecedingMotorSelectionSlide.TemplateSelect,
          }),
          "setCurrentConfigurationState",
        ],
      },
      manualMotorSelection: {
        on: {
          SET_MANUAL_MOTOR: "gearRatioSelection",
          BACK: "motorSelection",
        },
        exit: [
          assign({
            precedingMotorSelectionSlide: (context) =>
              PrecedingMotorSelectionSlide.ManualSelect,
          }),
          "setCurrentConfigurationState",
        ],
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
        exit: ["setCurrentConfigurationState"],
      },
      wheelSelection: {
        on: {
          SELECTED_WHEEL_SIZE: "botDimensions",
          BACK: "gearRatioSelection",
        },
        exit: ["setCurrentConfigurationState"],
      },
      botDimensions: {
        on: {
          BACK: "wheelSelection",
          SELECTED_DIMENSIONS: "ayudeSelection",
        },
        exit: ["setCurrentConfigurationState"],
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
        exit: ["setCurrentConfigurationState"],
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
    actions: {
      setCurrentConfigurationState: assign<ModalContext, ModalEvent>({
        currentConfigurationState: (context, event) =>
          event.value || context.currentConfigurationState,
      }),
    },
  }
);
