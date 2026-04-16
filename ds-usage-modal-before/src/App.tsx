import { useState } from "react";
import "./App.css";

interface DeviceRow {
  deviceId: string;
  scheduledWindow: string;
  site: string;
  role: string;
  function: string;
  vendor: string;
  createdDate: string;
}

const devices: DeviceRow[] = [
  {
    deviceId: "NYCYNYC8P02",
    scheduledWindow: "10-Feb-26 / 00:00–04:00",
    site: "NYCYNYC8",
    role: "P-AGG",
    function: "SPINE",
    vendor: "DriveNets",
    createdDate: "01-Feb-26 20:22",
  },
  {
    deviceId: "CHCGILMAL01",
    scheduledWindow: "11-Feb-26 / 01:00–05:00",
    site: "CHCGILMA",
    role: "L-AGG",
    function: "UP-LEAF",
    vendor: "DriveNets",
    createdDate: "02-Feb-26 14:15",
  },
  {
    deviceId: "CHCGILMAL02",
    scheduledWindow: "11-Feb-26 / 01:00–05:00",
    site: "CHCGILMA",
    role: "L-AGG",
    function: "DOWN-LEAF",
    vendor: "DriveNets",
    createdDate: "02-Feb-26 14:16",
  },
  {
    deviceId: "DLLSTXABM01",
    scheduledWindow: "12-Feb-26 / 02:00–06:00",
    site: "DLLSTXAB",
    role: "M-AGG",
    function: "SPINE",
    vendor: "DriveNets",
    createdDate: "03-Feb-26 18:30",
  },
  {
    deviceId: "DLLSTXABM02",
    scheduledWindow: "12-Feb-26 / 02:00–06:00",
    site: "DLLSTXAB",
    role: "M-AGG",
    function: "SPINE",
    vendor: "DriveNets",
    createdDate: "03-Feb-26 18:31",
  },
  {
    deviceId: "SNVLCAXM01",
    scheduledWindow: "13-Feb-26 / 00:00–02:00",
    site: "SNVLCAXM",
    role: "ME10",
    function: "SPINE",
    vendor: "DriveNets",
    createdDate: "04-Feb-26 11:45",
  },
  {
    deviceId: "SNVLCAXM02",
    scheduledWindow: "13-Feb-26 / 00:00–02:00",
    site: "SNVLCAXM",
    role: "ME100",
    function: "SPINE",
    vendor: "DriveNets",
    createdDate: "04-Feb-26 11:46",
  },
  {
    deviceId: "ATLNGAMB01",
    scheduledWindow: "14-Feb-26 / 03:00–07:00",
    site: "ATLNGAMB",
    role: "BNG",
    function: "SPINE",
    vendor: "Nokia",
    createdDate: "05-Feb-26 09:10",
  },
  {
    deviceId: "ATLNGAMB02",
    scheduledWindow: "14-Feb-26 / 03:00–07:00",
    site: "ATLNGAMB",
    role: "BNG",
    function: "SPINE",
    vendor: "Nokia",
    createdDate: "05-Feb-26 09:11",
  },
];

const stages = [
  { label: "Canary", count: "12 Devices" },
  { label: "Early", count: "60 Devices" },
  { label: "Broad", count: "80 Devices" },
  { label: "Full", count: "546 Devices" },
];

function MoreVerticalIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="4" r="1.5" fill="currentColor" />
      <circle cx="10" cy="10" r="1.5" fill="currentColor" />
      <circle cx="10" cy="16" r="1.5" fill="currentColor" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M15 5L5 15M5 5l10 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CalendarClockIcon() {
  return (
    <svg width="18" height="19" viewBox="0 0 18 19" fill="none">
      <path
        d="M13 2.5H5a4 4 0 00-4 4v6a4 4 0 004 4h8a4 4 0 004-4v-6a4 4 0 00-4-4z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path d="M6 1v3M12 1v3M1 7.5h16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="12.5" cy="13" r="2.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M12.5 12v1l.75.75" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function ArrowForwardIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M4 10h12m0 0l-4-4m4 4l-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M13 13l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M3 5h14M5 10h10M7 15h6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="1.5" fill="currentColor" />
      <circle cx="5" cy="10" r="1.5" fill="currentColor" />
      <circle cx="15" cy="10" r="1.5" fill="currentColor" />
    </svg>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="modal">
      {/* Title Bar */}
      <div className="title-bar">
        <span className="title-bar__title">Schedule per device</span>
        <div className="title-bar__actions">
          <button className="icon-btn" aria-label="More actions">
            <MoreVerticalIcon />
          </button>
          <button className="icon-btn" aria-label="Close">
            <CloseIcon />
          </button>
        </div>
      </div>

      <div className="selection-page">
        {/* Timeline */}
        <div className="timeline">
          <div className="timeline__summary">
            <div className="timeline__summary-row">
              <div className="timeline__summary-text">
                <span className="timeline__duration">4 days, 7 hrs</span>
                <span className="timeline__subtitle">
                  Estimated completion based on stages
                </span>
              </div>
              <div className="timeline__icon">
                <CalendarClockIcon />
              </div>
            </div>
          </div>
          <div className="timeline__legend">
            <div className="timeline__legend-group timeline__legend-group--left">
              <div className="timeline__legend-row">
                <span className="timeline__legend-label">Canary</span>
                <span className="timeline__legend-value">~4d, 7h</span>
              </div>
              <div className="timeline__legend-row">
                <span className="timeline__legend-label">Early</span>
                <span className="timeline__legend-value">~0h</span>
              </div>
            </div>
            <div className="timeline__legend-group">
              <div className="timeline__legend-row">
                <span className="timeline__legend-label">Broad</span>
                <span className="timeline__legend-value">~0h</span>
              </div>
              <div className="timeline__legend-row">
                <span className="timeline__legend-label">Full</span>
                <span className="timeline__legend-value">~0h</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stage Tabs */}
        <div className="stage-tabs">
          {stages.map((stage, index) => (
            <div
              key={stage.label}
              className={`stage-tab${activeTab === index ? " stage-tab--active" : ""}`}
              onClick={() => setActiveTab(index)}
            >
              <div className="stage-tab__content">
                <span className="stage-tab__label">{stage.label}</span>
                <span className="stage-tab__badge">{stage.count}</span>
              </div>
              <div className="stage-tab__underline" />
            </div>
          ))}
        </div>

        {/* Stats and Actions */}
        <div className="stats-actions">
          <div className="stats">
            <div className="stats__date-block">
              <span className="stats__date-value">10-Feb-26 / 00:00</span>
              <span className="stats__date-label">Stage Start</span>
            </div>
            <div className="stats__arrow">
              <ArrowForwardIcon />
            </div>
            <div className="stats__date-block">
              <span className="stats__date-value">14-Feb-26 / 07:00</span>
              <span className="stats__date-label">Stage End</span>
            </div>
          </div>
          <div className="actions">
            <button className="action-btn" aria-label="Search">
              <SearchIcon />
            </button>
            <button className="action-btn" aria-label="Filter">
              <FilterIcon />
            </button>
            <button className="action-btn" aria-label="More">
              <RefreshIcon />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Device ID</th>
                <th>Scheduled Window (12/12)</th>
                <th>Site</th>
                <th>Role</th>
                <th>Function</th>
                <th>Vendor</th>
                <th>Created Date</th>
              </tr>
            </thead>
            <tbody>
              {devices.map((device) => (
                <tr key={device.deviceId}>
                  <td>{device.deviceId}</td>
                  <td>{device.scheduledWindow}</td>
                  <td>{device.site}</td>
                  <td>{device.role}</td>
                  <td>{device.function}</td>
                  <td>{device.vendor}</td>
                  <td>{device.createdDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
