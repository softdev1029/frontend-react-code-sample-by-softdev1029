import { ButtonVariant, Button, Box } from "@softdev1029/react-components";

export const Buttons = (): JSX.Element => (
  <>
    <Box p="10">
      <Button>Primary</Button>
    </Box>
    <Box p="10">
      <Button variant={ButtonVariant.Secondary}>Secondary</Button>
    </Box>
    <Box p="10">
      <Button variant={ButtonVariant.Quiet}>Quiet</Button>
    </Box>
    <Box p="10" bg="#6ECB3F">
      <Button variant={ButtonVariant.Background}>Background</Button>
    </Box>
    <Box p="10">
      <Button variant={ButtonVariant.Negative}>Negative</Button>
    </Box>
  </>
);
