import { useState } from "react";
import {
  DsTable,
  DsTabs,
  DsRadioGroup,
  DsStepper,
  DsStep,
  DsStepContent,
  DsButtonV3,
  DsIcon,
  DsTypography,
  DsSelect,
  DsTextInput,
} from "@drivenets/design-system";
import type { ColumnDef } from "@drivenets/design-system";
import "./App.css";

interface DeviceRow {
  id: string;
  deviceId: string;
  site: string;
  role: string;
  function: string;
  vendor: string;
  createdDate: string;
}

const devices: DeviceRow[] = [
  { id: "1", deviceId: "NYCYNYC8P02", site: "NYCYNYC8", role: "P-AGG", function: "SPINE", vendor: "DriveNets", createdDate: "01-Feb-26 20:22" },
  { id: "2", deviceId: "NYCYNYC8P03", site: "NYCYNYC8", role: "P-AGG", function: "SPINE", vendor: "DriveNets", createdDate: "01-Feb-26 20:22" },
  { id: "3", deviceId: "LAXCORP5P01", site: "LAXCORP5", role: "PE", function: "LEAF", vendor: "DriveNets", createdDate: "02-Feb-26 08:15" },
  { id: "4", deviceId: "LAXCORP5P02", site: "LAXCORP5", role: "PE", function: "LEAF", vendor: "DriveNets", createdDate: "02-Feb-26 08:15" },
  { id: "5", deviceId: "CHGNILP6R01", site: "CHGNILP6", role: "P-AGG", function: "SPINE", vendor: "DriveNets", createdDate: "03-Feb-26 14:30" },
  { id: "6", deviceId: "CHGNILP6R02", site: "CHGNILP6", role: "PE", function: "LEAF", vendor: "DriveNets", createdDate: "03-Feb-26 14:30" },
  { id: "7", deviceId: "DLLSTXP4P01", site: "DLLSTXP4", role: "P-AGG", function: "SPINE", vendor: "DriveNets", createdDate: "04-Feb-26 11:45" },
  { id: "8", deviceId: "DLLSTXP4P02", site: "DLLSTXP4", role: "PE", function: "LEAF", vendor: "DriveNets", createdDate: "04-Feb-26 11:45" },
  { id: "9", deviceId: "SFOCASFP301", site: "SFOCASF3", role: "PE", function: "LEAF", vendor: "DriveNets", createdDate: "05-Feb-26 09:00" },
  { id: "10", deviceId: "SFOCASFP302", site: "SFOCASF3", role: "P-AGG", function: "SPINE", vendor: "DriveNets", createdDate: "05-Feb-26 09:00" },
  { id: "11", deviceId: "MIAFLMIP101", site: "MIAFLMI1", role: "PE", function: "LEAF", vendor: "DriveNets", createdDate: "06-Feb-26 16:20" },
  { id: "12", deviceId: "MIAFLMIP102", site: "MIAFLMI1", role: "P-AGG", function: "SPINE", vendor: "DriveNets", createdDate: "06-Feb-26 16:20" },
];

const windowOptions = [
  { value: "window1", label: "08-Feb-26, 00:00 – 08-Feb-26, 06:00" },
  { value: "window2", label: "09-Feb-26, 00:00 – 09-Feb-26, 06:00" },
  { value: "window3", label: "10-Feb-26, 00:00 – 10-Feb-26, 06:00" },
];

const columns: ColumnDef<DeviceRow>[] = [
  {
    accessorKey: "deviceId",
    header: "Device ID",
    size: 160,
    cell: ({ getValue }) => (
      <DsTypography variant="body-sm-md" color="main" truncate>
        {getValue<string>()}
      </DsTypography>
    ),
  },
  {
    accessorKey: "id",
    id: "scheduledWindow",
    header: "Scheduled Window (0/12)",
    size: 240,
    cell: () => (
      <DsSelect
        options={windowOptions}
        value=""
        placeholder="dd-mm-yyyy, 00:00"
        size="small"
        style={{ width: "100%" }}
      />
    ),
  },
  {
    accessorKey: "site",
    header: "Site",
    size: 160,
  },
  {
    accessorKey: "role",
    header: "Role",
    size: 120,
  },
  {
    accessorKey: "function",
    header: "Function",
    size: 120,
  },
  {
    accessorKey: "vendor",
    header: "Vendor",
    size: 120,
  },
  {
    accessorKey: "createdDate",
    header: "Created Date",
    size: 200,
  },
];

const scheduleOptions = [
  {
    value: "afterApproval",
    title: "Rollout after approval",
    description: "Start the rollout as soon as all approvals are in.",
  },
  {
    value: "scheduleLater",
    title: "Schedule for later",
    description: "Start the rollout at a specific time.",
  },
  {
    value: "perDevice",
    title: "Schedule per device",
    description: "Set rollout windows for each device.",
  },
];

const steps = [
  { label: "Select templates" },
  { label: "Configure scope" },
  { label: "Launch Options" },
  { label: "Review and submit" },
];

function ProjectHeader() {
  return (
    <header className="project-header">
      <button className="header-close-btn" type="button">
        <span className="close-x">
          <DsIcon icon="close" size="small" color="var(--light-buttons-secondary-light, #e0e6f6)" />
        </span>
        Close
      </button>

      <div className="header-center">
        <DsTextInput
          placeholder="Create new rollout"
          size="small"
          className="header-title-input"
          style={{
            width: 240,
            textAlign: "center",
            background: "transparent",
            border: "none",
            color: "white",
          }}
        />
        <span className="header-badge">
          <DsIcon icon="stylus_note" size="small" filled color="white" />
          Draft
        </span>
      </div>

      <div className="header-buttons">
        <button className="header-btn-secondary" type="button">
          Discard
        </button>
        <button className="header-btn-primary" type="button">
          Save rollout
        </button>
        <button className="header-btn-icon" type="button">
          <DsIcon icon="more_vert" size="small" color="var(--light-buttons-secondary-light, #e0e6f6)" />
        </button>
      </div>
    </header>
  );
}

function LeftPanel({
  value,
  onValueChange,
}: {
  value: string;
  onValueChange: (v: string) => void;
}) {
  return (
    <aside className="left-panel">
      <div className="left-panel-content">
        <DsRadioGroup.Root value={value} onValueChange={(v) => v && onValueChange(v)}>
          {scheduleOptions.map((opt) => (
            <DsRadioGroup.Item key={opt.value} value={opt.value} className="radio-card">
              <div className="radio-card-text">
                <DsTypography variant="body-sm-md" color="main">
                  {opt.title}
                </DsTypography>
                <DsTypography variant="body-sm-reg" color="secondary">
                  {opt.description}
                </DsTypography>
              </div>
            </DsRadioGroup.Item>
          ))}
        </DsRadioGroup.Root>
      </div>
    </aside>
  );
}

function TimelineCard() {
  return (
    <div className="timeline-card">
      <div className="timeline-estimate">
        <div className="timeline-estimate-text">
          <DsTypography variant="heading3" color="main">
            0 days, 0 hrs
          </DsTypography>
          <DsTypography variant="body-sm-reg" color="secondary">
            Estimated completion based on stages
          </DsTypography>
        </div>
        <div className="timeline-estimate-icon">
          <DsIcon icon="calendar_clock" size="medium" color="secondary" />
        </div>
      </div>
      <div className="timeline-legend">
        <div className="timeline-legend-column">
          <div className="timeline-legend-row">
            <DsTypography variant="body-sm-reg" color="placeholder">
              Canary{" "}
            </DsTypography>
            <DsTypography variant="body-sm-md" color="secondary">
              ~0h
            </DsTypography>
          </div>
          <div className="timeline-legend-row">
            <DsTypography variant="body-sm-reg" color="placeholder">
              Early{" "}
            </DsTypography>
            <DsTypography variant="body-sm-md" color="secondary">
              ~0h
            </DsTypography>
          </div>
        </div>
        <div className="timeline-legend-column">
          <div className="timeline-legend-row">
            <DsTypography variant="body-sm-reg" color="placeholder">
              Broad
            </DsTypography>
            <DsTypography variant="body-sm-md" color="secondary">
              ~0h
            </DsTypography>
          </div>
          <div className="timeline-legend-row">
            <DsTypography variant="body-sm-reg" color="placeholder">
              Full
            </DsTypography>
            <DsTypography variant="body-sm-md" color="secondary">
              ~0h
            </DsTypography>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatsAndActions() {
  return (
    <div className="stats-actions">
      <div className="stats">
        <div className="window-stat">
          <div className="window-stat-item">
            <DsTypography variant="heading3" color="main">
              dd-mm-yy / 00:00
            </DsTypography>
            <DsTypography variant="body-sm-reg" color="secondary">
              Window Start
            </DsTypography>
          </div>
          <div className="window-stat-arrow">
            <DsIcon icon="arrow_forward" size="small" color="secondary" />
          </div>
          <div className="window-stat-item">
            <DsTypography variant="heading3" color="main">
              dd-mm-yy / 00:00
            </DsTypography>
            <DsTypography variant="body-sm-reg" color="secondary">
              Window End
            </DsTypography>
          </div>
        </div>
      </div>
      <div className="actions">
        <DsButtonV3 variant="secondary" size="medium" icon="search" />
        <DsButtonV3 variant="secondary" size="medium" icon="filter_list" />
        <DsButtonV3 variant="secondary" size="medium" icon="more_vert" />
      </div>
    </div>
  );
}

function SelectionPage({
  activeTab,
  onTabChange,
}: {
  activeTab: string;
  onTabChange: (v: string) => void;
}) {
  return (
    <section className="right-panel">
      <div className="selection-header">
        <div className="selection-title">
          <DsTypography variant="heading3" color="main">
            Schedule per device
          </DsTypography>
          <div className="selection-title-description">
            <DsTypography variant="body-sm-reg" color="secondary">
              Set rollout windows for each device.
            </DsTypography>
          </div>
        </div>
        <TimelineCard />
      </div>

      <div className="stage-tabs">
        <DsTabs.Root
          orientation="horizontal"
          size="medium"
          value={activeTab}
          onValueChange={(v) => v && onTabChange(v)}
        >
          <DsTabs.List>
            <DsTabs.Tab value="canary" label="Canary" badge={12} />
            <DsTabs.Tab value="early" label="Early" badge={60} />
            <DsTabs.Tab value="broad" label="Broad" badge={80} />
            <DsTabs.Tab value="full" label="Full" badge={546} />
          </DsTabs.List>
        </DsTabs.Root>
      </div>

      <StatsAndActions />

      <div className="table-container">
        <DsTable
          columns={columns}
          data={devices}
          selectable
          stickyHeader
          bordered
          fullWidth
          rowSize="large"
          emptyState={<DsTypography variant="body-sm-reg" color="secondary">No devices found</DsTypography>}
        />
      </div>
    </section>
  );
}

function WizardStepper() {
  return (
    <footer className="stepper-bar">
      <div className="stepper-content">
        <DsStepper count={steps.length} activeStep={2} orientation="horizontal">
          {steps.map((step, index) => (
            <DsStep index={index} key={index}>
              <DsStepContent index={index} label={step.label} />
            </DsStep>
          ))}
        </DsStepper>
      </div>
      <div className="stepper-next-btn">
        <DsButtonV3 variant="primary" size="small" disabled>
          Next
        </DsButtonV3>
      </div>
    </footer>
  );
}

function App() {
  const [scheduleOption, setScheduleOption] = useState("perDevice");
  const [activeTab, setActiveTab] = useState("canary");

  return (
    <div className="app">
      <ProjectHeader />
      <main className="content">
        <LeftPanel value={scheduleOption} onValueChange={setScheduleOption} />
        <SelectionPage activeTab={activeTab} onTabChange={setActiveTab} />
      </main>
      <WizardStepper />
    </div>
  );
}

export default App;
