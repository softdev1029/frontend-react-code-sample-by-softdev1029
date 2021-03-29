import type { FunctionComponent } from "react";
import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
} from "@chakra-ui/react";

export type ButtonProps = ChakraButtonProps;

export const Button: FunctionComponent<ButtonProps> = (props: ButtonProps) => (
  <ChakraButton {...props} />
);
