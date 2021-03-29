import { CheckboxVariant } from "./constants";
import type { ComponentStyleConfig } from "@chakra-ui/react";

export const style: ComponentStyleConfig = {
  baseStyle: {},
  variants: {
    [CheckboxVariant.Default]: {},
    [CheckboxVariant.Positive]: {
      borderColor: "darkGreen.500",
      color: "darkGreen.500",
    },
    [CheckboxVariant.Negative]: {
      borderColor: "red.500",
      color: "red.500",
    },
  },
  defaultProps: {
    variant: CheckboxVariant.Default,
  },
};
