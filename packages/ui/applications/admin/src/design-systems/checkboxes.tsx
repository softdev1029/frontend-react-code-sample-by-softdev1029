import { CheckboxVariant, Checkbox, Box } from "@softdev1029/react-components";

export const Checkboxes = (): JSX.Element => (
  <>
    <Box p="10">
      <Checkbox>Default</Checkbox>
    </Box>
    <Box p="10">
      <Checkbox defaultIsChecked>Default - Checked</Checkbox>
    </Box>
    <Box p="10">
      <Checkbox variant={CheckboxVariant.Positive}>Positive</Checkbox>
    </Box>
    <Box p="10">
      <Checkbox variant={CheckboxVariant.Positive} defaultIsChecked>
        Positive - Checked
      </Checkbox>
    </Box>
    <Box p="10">
      <Checkbox variant={CheckboxVariant.Negative}>Negative</Checkbox>
    </Box>
    <Box p="10">
      <Checkbox variant={CheckboxVariant.Negative} defaultIsChecked>
        Negative - Checked
      </Checkbox>
    </Box>
  </>
);
