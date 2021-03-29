import { ButtonVariant } from "./constants";
import type { ComponentStyleConfig } from "@chakra-ui/react";

export const style: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: "sm",
    color: "white",
    opacity: 1,
    _focus: {
      boxShadow: "outline",
    },
    _disabled: {
      bg: "gray.300",
      color: "gray.500",
      opacity: 1,
      ":hover, :focus": {
        opacity: 1,
      },
    },
  },
  variants: {
    [ButtonVariant.Primary]: {
      bg: "green.500",
      ":hover, :focus": {
        bg: "green.400",
      },
    },
    [ButtonVariant.Secondary]: {
      bg: "white",
      color: "green.500",
      border: "1px",
      borderColor: "green.500",
      ":hover, :focus": {
        bg: "green.500",
        color: "white",
      },
    },
    [ButtonVariant.Quiet]: {
      bg: "white",
      color: "green.500",
      ":hover, :focus": {
        bg: "green.100",
      },
      ":disabled": {
        bg: "white",
        color: "gray.500",
      },
    },
    [ButtonVariant.Background]: {
      bg: "green.500",
      border: "3px",
      borderColor: "white",
      color: "white",
      ":hover, :focus": {
        bg: "white",
        borderColor: "white",
        color: "green.500",
      },
    },
    [ButtonVariant.Negative]: {
      background: "white",
      color: "red.500",
      border: "1px",
      borderColor: "red.500",
      ":hover, :focus": {
        color: "white",
        background: "red.500",
      },
    },
  },
  defaultProps: {
    variant: ButtonVariant.Primary,
  },
};
