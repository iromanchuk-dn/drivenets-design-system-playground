### Prompt

Implement this design from Figma.
@https://www.figma.com/design/6PzD1I7Xf9UaFkJArGyVAF/DAP-25?node-id=23625-312777&m=dev @App.tsx

### Results

- After first shot everything is up and running

#### Problems

- css does't use tokens from DS
- used DsButton v1.2, but override all styles via css
- didn't use DsDropdownMenu to build Action Menu
- DsTypography is not used at all
- Didn't use DatePicker
- DsStepper was used without the ability to change active step
- Wrong icon was used: <DsIcon icon="refresh" /> instead of <DsIcon icon="more_vert" />
- AI installed "@tanstack/react-table", but it should not have done it.
- Didn't use <StatusBadge> component
