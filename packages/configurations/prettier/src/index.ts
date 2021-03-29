import type { Options } from "prettier";
import type { Override } from "./overrides";
import { overrides } from "./overrides";

type Config = Options & { overrides?: Override[] };

const config: Config = {
  overrides,
};

export default config;
