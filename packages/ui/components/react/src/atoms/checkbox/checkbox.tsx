import { CheckboxVariant } from "./constants";
import {
  Checkbox as ChakraCheckbox,
  CheckboxProps as ChakraCheckboxProps,
} from "@chakra-ui/react";
import type { O } from "@softdev1029/type-utils";

export type CheckboxProps = O.Omit<
  ChakraCheckboxProps,
  "variant" | "colorScheme"
> & {
  variant?: CheckboxVariant;
};

export const Checkbox = ({ variant, ...props }: CheckboxProps): JSX.Element => {
  const colorSchemes = new Map<CheckboxVariant, string>([
    [CheckboxVariant.Default, "green"],
    [CheckboxVariant.Positive, "darkGreen"],
    [CheckboxVariant.Negative, "red"],
  ]);

  const colorScheme = colorSchemes.get(variant ?? CheckboxVariant.Default);

  return <ChakraCheckbox {...props} colorScheme={colorScheme} />;
};
