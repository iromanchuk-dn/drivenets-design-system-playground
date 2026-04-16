import { useState } from "react";
import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";
import {
  DsTable,
  DsTabs,
  DsStepper,
  DsStep,
  DsButton,
  DsIcon,
} from "@drivenets/design-system";
import "./App.css";

// ── Types ──────────────────────────────────────────────────────────

interface DeviceRow {
  id: string;
  deviceId: string;
  site: string;
  role: string;
  function: string;
  vendor: string;
  createdDate: string;
}

// ── Mock Data ──────────────────────────────────────────────────────

const devices: DeviceRow[] = [
  { id: "1", deviceId: "NYCYNYC8P02", site: "NYCYNYC8", role: "P-AGG", function: "SPINE", vendor: "DriveNets", createdDate: "01-Feb-26 20:22" },
  { id: "2", deviceId: "CHCGILMAL01", site: "CHCGILMA", role: "L-AGG", function: "UP-LEAF", vendor: "DriveNets", createdDate: "02-Feb-26 14:15" },
  { id: "3", deviceId: "CHCGILMAL02", site: "CHCGILMA", role: "L-AGG", function: "DOWN-LEAF", vendor: "DriveNets", createdDate: "02-Feb-26 14:16" },
  { id: "4", deviceId: "DLLSTXABM01", site: "DLLSTXAB", role: "M-AGG", function: "SPINE", vendor: "DriveNets", createdDate: "03-Feb-26 18:30" },
  { id: "5", deviceId: "DLLSTXABM02", site: "DLLSTXAB", role: "M-AGG", function: "SPINE", vendor: "DriveNets", createdDate: "03-Feb-26 18:31" },
  { id: "6", deviceId: "SNVLCAXM01", site: "SNVLCAXM", role: "ME10", function: "SPINE", vendor: "DriveNets", createdDate: "04-Feb-26 11:45" },
  { id: "7", deviceId: "SNVLCAXM02", site: "SNVLCAXM", role: "ME100", function: "SPINE", vendor: "DriveNets", createdDate: "04-Feb-26 11:46" },
  { id: "8", deviceId: "ATLNGAMB01", site: "ATLNGAMB", role: "BNG", function: "SPINE", vendor: "Nokia", createdDate: "05-Feb-26 09:10" },
  { id: "9", deviceId: "ATLNGAMB02", site: "ATLNGAMB", role: "BNG", function: "SPINE", vendor: "Nokia", createdDate: "05-Feb-26 09:11" },
];

// ── Column Definitions ─────────────────────────────────────────────

const columnHelper = createColumnHelper<DeviceRow>();

const columns: ColumnDef<DeviceRow, unknown>[] = [
  columnHelper.accessor("deviceId", {
    header: "Device ID",
    size: 160,
    cell: (info) => (
      <span style={{ fontWeight: 500 }}>{info.getValue()}</span>
    ),
  }) as ColumnDef<DeviceRow, unknown>,
  columnHelper.display({
    id: "scheduledWindow",
    header: "Scheduled Window (0/12)",
    size: 240,
    cell: () => (
      <div className="scheduled-window-cell">
        <span className="scheduled-window-cell__text">dd-mm-yyyy, 00:00</span>
        <DsButton design="v1.2" buttonType="tertiary" size="tiny">
          <DsIcon icon="keyboard_arrow_down" size="tiny" />
        </DsButton>
      </div>
    ),
  }) as ColumnDef<DeviceRow, unknown>,
  columnHelper.accessor("site", {
    header: "Site",
    size: 160,
  }) as ColumnDef<DeviceRow, unknown>,
  columnHelper.accessor("role", {
    header: "Role",
    size: 120,
  }) as ColumnDef<DeviceRow, unknown>,
  columnHelper.accessor("function", {
    header: "Function",
    size: 120,
  }) as ColumnDef<DeviceRow, unknown>,
  columnHelper.accessor("vendor", {
    header: "Vendor",
    size: 120,
  }) as ColumnDef<DeviceRow, unknown>,
  columnHelper.accessor("createdDate", {
    header: "Created Date",
    size: 200,
  }) as ColumnDef<DeviceRow, unknown>,
];

// ── Radio Options ──────────────────────────────────────────────────

const rolloutOptions = [
  {
    value: "rollout-after-approval",
    title: "Rollout after approval",
    description: "Start the rollout as soon as all approvals are in.",
  },
  {
    value: "schedule-for-later",
    title: "Schedule for later",
    description: "Start the rollout at a specific time.",
  },
  {
    value: "schedule-per-device",
    title: "Schedule per device",
    description: "Set rollout windows for each device.",
  },
];

// ── Components ─────────────────────────────────────────────────────

function ProjectHeader() {
  return (
    <header className="project-header">
      <DsButton design="v1.2" buttonType="secondary" variant="dark" size="small" className="project-header__close-btn">
        <DsIcon icon="close" size="tiny" />
        Close
      </DsButton>

      <div className="project-header__title-area">
        <span className="project-header__title">Create new rollout</span>
        <span className="project-header__badge">
          <DsIcon icon="edit_note" size="tiny" />
          Draft
        </span>
      </div>

      <div className="project-header__actions">
        <DsButton design="v1.2" buttonType="secondary" variant="dark" size="small" className="project-header__discard-btn">
          Discard
        </DsButton>
        <DsButton design="v1.2" buttonType="primary" variant="dark" size="small" className="project-header__save-btn">
          Save rollout
        </DsButton>
        <DsButton design="v1.2" buttonType="tertiary" variant="dark" size="small" className="project-header__more-btn">
          <DsIcon icon="more_vert" size="tiny" />
        </DsButton>
      </div>
    </header>
  );
}

function LeftPanel() {
  const [selected, setSelected] = useState("schedule-per-device");

  return (
    <aside className="left-panel">
      {rolloutOptions.map((option) => (
        <div
          key={option.value}
          className={`radio-card${selected === option.value ? " radio-card--selected" : ""}`}
          onClick={() => setSelected(option.value)}
        >
          <div className="radio-card__radio">
            <div className="radio-card__radio-circle" />
          </div>
          <div className="radio-card__content">
            <p className="radio-card__title">{option.title}</p>
            <p className="radio-card__description">{option.description}</p>
          </div>
        </div>
      ))}
    </aside>
  );
}

function SelectionHeader() {
  return (
    <div className="selection-header">
      <div className="selection-header__info">
        <h2 className="selection-header__title">Schedule per device</h2>
        <p className="selection-header__subtitle">
          Set rollout windows for each device.
        </p>
      </div>

      <div className="timeline-card">
        <div className="timeline-card__stat">
          <div className="timeline-card__stat-header">
            <div>
              <p className="timeline-card__stat-value">0 days, 0 hrs</p>
              <p className="timeline-card__stat-label">
                Estimated completion based on stages
              </p>
            </div>
            <div className="timeline-card__stat-icon">
              <DsIcon icon="calendar_month" size="small" />
            </div>
          </div>
        </div>

        <div className="timeline-card__legend">
          <div className="timeline-card__legend-section timeline-card__legend-section--bordered">
            <div className="timeline-card__legend-row">
              <span className="timeline-card__legend-label">Canary </span>
              <span className="timeline-card__legend-value">~0h</span>
            </div>
            <div className="timeline-card__legend-row">
              <span className="timeline-card__legend-label">Early </span>
              <span className="timeline-card__legend-value">~0h</span>
            </div>
          </div>
          <div className="timeline-card__legend-section">
            <div className="timeline-card__legend-row">
              <span className="timeline-card__legend-label">Broad</span>
              <span className="timeline-card__legend-value">~0h</span>
            </div>
            <div className="timeline-card__legend-row">
              <span className="timeline-card__legend-label">Full</span>
              <span className="timeline-card__legend-value">~0h</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StageTabs() {
  const [activeTab, setActiveTab] = useState("canary");

  return (
    <div className="stage-tabs">
      <DsTabs.Root value={activeTab} onValueChange={(v) => setActiveTab(v ?? "canary")}>
        <DsTabs.List>
          <DsTabs.Tab value="canary" label="Canary" badge="12 Devices" />
          <DsTabs.Tab value="early" label="Early" badge="60 Devices" />
          <DsTabs.Tab value="broad" label="Broad" badge="80 Devices" />
          <DsTabs.Tab value="full" label="Full" badge="546 Devices" />
        </DsTabs.List>
      </DsTabs.Root>
    </div>
  );
}

function StatsAndActions() {
  return (
    <div className="stats-actions">
      <div className="stats">
        <div className="stat-block">
          <p className="stat-block__value">dd-mm-yy / 00:00</p>
          <p className="stat-block__label">Window Start</p>
        </div>
        <div className="stats__arrow">
          <DsIcon icon="arrow_forward" size="small" />
        </div>
        <div className="stat-block">
          <p className="stat-block__value">dd-mm-yy / 00:00</p>
          <p className="stat-block__label">Window End</p>
        </div>
      </div>

      <div className="actions">
        <DsButton design="v1.2" buttonType="secondary" variant="ghost" size="medium">
          <DsIcon icon="search" size="small" />
        </DsButton>
        <DsButton design="v1.2" buttonType="secondary" variant="ghost" size="medium">
          <DsIcon icon="filter_list" size="small" />
        </DsButton>
        <DsButton design="v1.2" buttonType="secondary" variant="ghost" size="medium">
          <DsIcon icon="refresh" size="small" />
        </DsButton>
      </div>
    </div>
  );
}

function DeviceTable() {
  return (
    <div className="device-table">
      <DsTable
        columns={columns}
        data={devices}
        selectable
        showSelectAllCheckbox
        stickyHeader
        rowSize="medium"
      />
    </div>
  );
}

function WizardStepper() {
  return (
    <div className="wizard-stepper">
      <DsStepper
        orientation="horizontal"
        count={4}
        activeStep={2}
        actions={
          <DsButton design="v1.2" buttonType="primary" size="small" disabled>
            Next
          </DsButton>
        }
      >
        <DsStep index={0}>Select templates</DsStep>
        <DsStep index={1}>Configure scope</DsStep>
        <DsStep index={2}>Launch Options</DsStep>
        <DsStep index={3}>Review and submit</DsStep>
      </DsStepper>
    </div>
  );
}

// ── Main App ───────────────────────────────────────────────────────

function App() {
  return (
    <div className="app-layout">
      <ProjectHeader />

      <div className="content-area">
        <div className="page-header">
          <h1 className="page-header__title">Rollout options</h1>
          <p className="page-header__subtitle">
            Choose how and when to deploy updates across your network. | See
            relevant <a href="#">Templets</a>
          </p>
        </div>

        <div className="page-body">
          <LeftPanel />

          <div className="selection-page">
            <SelectionHeader />
            <StageTabs />
            <StatsAndActions />
            <DeviceTable />
          </div>
        </div>
      </div>

      <WizardStepper />
    </div>
  );
}

export default App;
