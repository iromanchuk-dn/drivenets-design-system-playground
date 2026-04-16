import "./App.css";
import {
  DsButton,
  DsIcon,
  DsTag,
  DsSelect,
  DsTypography,
} from "@drivenets/design-system";

const stages = [
  {
    name: "Canary",
    devices: 12,
    date: "10-Feb-26 04:00 UTC",
    dwell: "60 min. dwell",
    pause: "Pause at 10% / 5 devices",
  },
  {
    name: "Early",
    devices: 60,
    date: "11-Feb-26 04:00 UTC",
    dwell: "120 min. dwell",
    pause: "Pause at 10% / 5 devices",
  },
  {
    name: "Broad",
    devices: 80,
    date: "11-Feb-26 08:00 UTC",
    dwell: "180 min. dwell",
    pause: "Pause at 10% / 5 devices",
  },
  {
    name: "Full",
    devices: 546,
    date: "12-Feb-26 04:00 UTC",
    dwell: "240 min. dwell",
    pause: "Pause at 10% / 5 devices",
  },
];

const durationRows = [
  { label: "Canary", value: "~0h" },
  { label: "Early", value: "~0h" },
  { label: "Broad", value: "~0h" },
  { label: "Full", value: "~0h" },
];

const wizardSteps = [
  { label: "Select templates", completed: true },
  { label: "Configure scope", completed: true },
  { label: "Launch Options", completed: true },
  { label: "Review and submit", active: true },
];

function StageCard({
  name,
  devices,
  date,
  dwell,
  pause,
}: {
  name: string;
  devices: number;
  date: string;
  dwell: string;
  pause: string;
}) {
  return (
    <div className="stage-card">
      <div className="stage-card-header">
        <DsTypography variant="body-sm-md">{name}</DsTypography>
      </div>
      <div className="stage-card-body">
        <div className="stage-card-row">
          <DsIcon icon="devices" size="small" />
          <DsTypography
            variant="body-sm-reg"
            style={{ color: "var(--color-font-action)" }}
          >
            {devices} Devices scheduled
          </DsTypography>
        </div>
        <div className="stage-card-row">
          <DsIcon icon="calendar_clock" size="small" />
          <DsTypography variant="body-sm-reg" style={{ color: "var(--color-font-secondary)" }}>
            {date}
          </DsTypography>
        </div>
        <div className="stage-card-row">
          <DsIcon icon="schedule" size="small" />
          <DsTypography variant="body-sm-reg" style={{ color: "var(--color-font-secondary)" }}>
            {dwell}
          </DsTypography>
        </div>
        <div className="stage-card-row">
          <DsIcon icon="pause_circle" size="small" />
          <DsTypography variant="body-sm-reg" style={{ color: "var(--color-font-secondary)" }}>
            {pause}
          </DsTypography>
        </div>
      </div>
    </div>
  );
}

function WizardStep({
  label,
  stepNumber,
  completed,
  active,
  showLine,
}: {
  label: string;
  stepNumber: number;
  completed?: boolean;
  active?: boolean;
  showLine?: boolean;
}) {
  const circleClass = completed
    ? "wizard-step-circle wizard-step-circle--completed"
    : active
      ? "wizard-step-circle wizard-step-circle--active"
      : "wizard-step-circle wizard-step-circle--pending";

  return (
    <div className={`wizard-step ${active ? "wizard-step--active" : ""}`}>
      <div className={circleClass}>
        {completed ? (
          <DsIcon icon="check" size="small" />
        ) : (
          stepNumber
        )}
      </div>
      <div className="wizard-step-content">
        <DsTypography
          variant="body-sm-md"
          className="wizard-step-label"
          style={active ? { color: "var(--color-font-action)" } : undefined}
        >
          {label}
        </DsTypography>
        {showLine && <div className="wizard-step-line" />}
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="page">
      {/* Header Bar */}
      <header className="header">
        <DsButton
          design="v1.2"
          buttonType="secondary"
          variant="dark"
          size="tiny"
          className="header-close"
        >
          <DsIcon icon="close" size="small" />
          Close
        </DsButton>

        <div className="header-center">
          <span className="header-title">Create new rollout</span>
          <div className="header-draft-badge">
            <DsIcon icon="edit_note" size="small" />
            Draft
          </div>
        </div>

        <div className="header-actions">
          <DsButton design="v1.2" buttonType="secondary" variant="dark" size="tiny">
            Discard
          </DsButton>
          <DsButton design="v1.2" buttonType="primary" variant="dark" size="tiny">
            Submit for approval
          </DsButton>
          <DsButton design="v1.2" buttonType="tertiary" variant="dark" size="tiny" className="header-btn-icon">
            <DsIcon icon="more_vert" size="small" />
          </DsButton>
        </div>
      </header>

      {/* Main Content */}
      <main className="content">
        <div className="content-header">
          <DsTypography variant="heading2">Rollout summary</DsTypography>
        </div>

        <div className="content-sections">
          {/* Rollout Details */}
          <section className="section">
            <DsTypography variant="heading3" className="section-title">
              Rollout details
            </DsTypography>

            <div className="details-row">
              <div className="detail-field">
                <DsTypography
                  variant="body-sm-md"
                  className="detail-field-label"
                  style={{ color: "var(--color-font-secondary)" }}
                >
                  Rollout name
                </DsTypography>
                <DsTypography variant="body-sm-reg" className="detail-field-value">
                  New Rollout
                </DsTypography>
              </div>

              <div className="detail-field">
                <DsTypography
                  variant="body-sm-md"
                  className="detail-field-label"
                  style={{ color: "var(--color-font-secondary)" }}
                >
                  Total devices
                </DsTypography>
                <DsTypography variant="body-sm-reg" className="detail-field-value">
                  698
                </DsTypography>
              </div>

              <div className="detail-field">
                <DsTypography
                  variant="body-sm-md"
                  className="detail-field-label"
                  style={{ color: "var(--color-font-secondary)" }}
                >
                  Health checks
                </DsTypography>
                <DsTypography variant="body-sm-reg" className="detail-field-value">
                  Config Commit success
                </DsTypography>
              </div>

              <div className="templates-field">
                <DsTypography
                  variant="body-sm-md"
                  className="templates-label"
                  style={{ color: "var(--color-font-secondary)" }}
                >
                  Selected templates
                </DsTypography>
                <div className="templates-tags">
                  <DsTag label="BGP Peer" />
                  <DsTag label="BGP Template" />
                  <DsTag label="ACL Standard" />
                </div>
              </div>
            </div>
          </section>

          {/* Stage Configuration */}
          <section className="section">
            <div className="stage-header">
              <DsTypography variant="heading3">Stage Configuration</DsTypography>
              <div className="stage-hint">
                <DsIcon icon="calendar_clock" size="small" />
                <DsTypography
                  variant="body-sm-reg"
                  style={{ color: "var(--color-font-placeholder)" }}
                >
                  Start of first time window
                </DsTypography>
              </div>
            </div>

            <div className="stage-cards">
              {stages.map((stage) => (
                <StageCard key={stage.name} {...stage} />
              ))}

              <div className="stage-divider">
                <div className="stage-divider-line" />
              </div>

              <div className="duration-card">
                <div className="duration-card-header">
                  <DsTypography variant="body-sm-md">Total Duration</DsTypography>
                  <DsTypography variant="body-sm-reg">~4d 7h</DsTypography>
                </div>
                <div className="duration-card-body">
                  {durationRows.map((row) => (
                    <div key={row.label} className="duration-row">
                      <DsTypography
                        variant="body-sm-reg"
                        style={{ color: "var(--color-font-secondary)" }}
                      >
                        {row.label}
                      </DsTypography>
                      <DsTypography
                        variant="body-sm-reg"
                        style={{ color: "var(--color-font-secondary)" }}
                      >
                        {row.value}
                      </DsTypography>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Review & Approval */}
          <section className="section approval-section">
            <DsTypography variant="heading3" className="section-title">
              Review &amp; Approval
            </DsTypography>

            <div className="approver-field">
              <DsTypography variant="body-sm-md" className="approver-label">
                Approver
              </DsTypography>
              <DsTypography
                variant="body-xs-reg"
                className="approver-description"
                style={{ color: "var(--color-font-secondary)" }}
              >
                Rollout will not start until approved
              </DsTypography>
              <DsSelect
                options={[]}
                placeholder="add approver..."
                value=""
              />
            </div>
          </section>
        </div>
      </main>

      {/* Wizard Footer */}
      <footer className="wizard-footer">
        {wizardSteps.map((step, index) => (
          <WizardStep
            key={step.label}
            label={step.label}
            stepNumber={index + 1}
            completed={step.completed}
            active={step.active}
            showLine={!step.active}
          />
        ))}
        <div className="wizard-spacer" />
      </footer>
    </div>
  );
}

export default App;
