import { Buttons, Checkboxes } from "@softdev1029/admin-app/design-systems";
import {
  Tabs,
  Tab,
  ThemeProvider,
  theme as components,
} from "@softdev1029/react-components";

import {
  borders,
  colors,
  shadows,
  radii,
  extendTheme,
} from "@softdev1029/design-tokens";

const theme = extendTheme({
  borders,
  colors,
  shadows,
  radii,
  components,
});

export const App = (): JSX.Element => (
  <ThemeProvider theme={theme}>
    <Tabs>
      <Tab title="Buttons">
        <Buttons />
      </Tab>
      <Tab title="Checkboxes">
        <Checkboxes />
      </Tab>
    </Tabs>
  </ThemeProvider>
);
