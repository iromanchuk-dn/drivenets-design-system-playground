import "./App.css";
import {
  DsWorkspaceLayout,
  DsButtonV3,
  DsTypography,
  DsStatusBadgeV2,
  DsIcon,
  DsFormControl,
  DsTag,
  DsStepper,
  DsStep,
  DsStepContent,
} from "@drivenets/design-system";
import { useState } from "react";

const steps = [
  { label: "Select templates" },
  { label: "Configure scope" },
  { label: "Launch Options" },
  { label: "Review and submit" },
];

interface StageCardProps {
  title: string;
  devices: number;
  schedule: string;
  dwell: string;
}

function StageCard({ title, devices, schedule, dwell }: StageCardProps) {
  return (
    <div className="stage-card">
      <div className="stage-card-header">
        <DsTypography variant="body-sm-md">{title}</DsTypography>
      </div>
      <div className="stage-card-body">
        <div className="stage-card-row">
          <DsIcon icon="audio_video_receiver" size="small" />
          <DsTypography variant="body-sm-reg" color="action">
            {devices} Devices scheduled
          </DsTypography>
        </div>
        <div className="stage-card-row">
          <DsIcon icon="calendar_clock" size="small" />
          <DsTypography variant="body-sm-reg" color="secondary">
            {schedule}
          </DsTypography>
        </div>
        <div className="stage-card-row">
          <DsIcon icon="schedule" size="small" />
          <DsTypography variant="body-sm-reg" color="secondary">
            {dwell}
          </DsTypography>
        </div>
        <div className="stage-card-row">
          <DsIcon icon="pause_circle" size="small" />
          <DsTypography variant="body-sm-reg" color="secondary">
            Pause at 10% / 5 devices
          </DsTypography>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [activeStep] = useState(3);

  return (
    <DsWorkspaceLayout>
      <DsWorkspaceLayout.Header>
        <div className="header-layout">
          <div className="header-left">
            <DsButtonV3 variant="secondary" color="light" size="small" icon="close">
              Close
            </DsButtonV3>
          </div>
          <div className="header-center">
            <DsTypography variant="body-sm-reg" color="var(--font-on-action)">
              Create new rollout
            </DsTypography>
            <DsStatusBadgeV2 phase="in-review" label="Draft" size="small" />
          </div>
          <div className="header-right">
            <DsButtonV3 variant="secondary" color="light" size="small">
              Discard
            </DsButtonV3>
            <DsButtonV3 variant="primary" color="light" size="small">
              Submit for approval
            </DsButtonV3>
            <DsButtonV3 variant="tertiary" color="light" size="small" icon="more_vert" />
          </div>
        </div>
      </DsWorkspaceLayout.Header>

      <DsWorkspaceLayout.Content>
        <div className="content-wrapper">
          <DsTypography variant="heading2">Rollout summary</DsTypography>

          {/* Rollout details */}
          <div className="section">
            <DsTypography variant="heading3">Rollout details</DsTypography>
            <div className="details-row">
              <DsFormControl label="Rollout name">
                <DsFormControl.TextInput readOnly value="New Rollout" />
              </DsFormControl>
              <DsFormControl label="Total devices">
                <DsFormControl.TextInput readOnly value="698" />
              </DsFormControl>
              <DsFormControl label="Health checks">
                <DsFormControl.TextInput readOnly value="Config Commit success" />
              </DsFormControl>
              <div className="templates-section">
                <DsFormControl label="Selected templates" />
                <div className="templates-tags">
                  <DsTag label="BGP Peer" size="small" />
                  <DsTag label="BGP Template" size="small" />
                  <DsTag label="ACL Standard" size="small" />
                </div>
              </div>
            </div>
          </div>

          {/* Stage Configuration */}
          <div className="section">
            <div className="stage-header">
              <DsTypography variant="heading3">Stage Configuration</DsTypography>
              <div className="schedule-hint">
                <DsIcon icon="calendar_clock" size="small" color="information-main" />
                <DsTypography variant="body-sm-reg" color="placeholder">
                  Start of first time window
                </DsTypography>
              </div>
            </div>
            <div className="stage-cards">
              <StageCard
                title="Canary"
                devices={12}
                schedule="10-Feb-26 04:00 UTC"
                dwell="60 min. dwell"
              />
              <StageCard
                title="Early"
                devices={60}
                schedule="11-Feb-26 04:00 UTC"
                dwell="120 min. dwell"
              />
              <StageCard
                title="Broad"
                devices={80}
                schedule="11-Feb-26 08:00 UTC"
                dwell="180 min. dwell"
              />
              <StageCard
                title="Full"
                devices={546}
                schedule="12-Feb-26 04:00 UTC"
                dwell="240 min. dwell"
              />
              <div className="stage-divider" />
              <div className="total-duration-card">
                <div className="total-duration-header">
                  <DsTypography variant="body-sm-md">Total Duration</DsTypography>
                  <DsTypography variant="body-sm-reg">~4d 7h</DsTypography>
                </div>
                <div className="total-duration-body">
                  <div className="duration-row">
                    <DsTypography variant="body-sm-reg" color="secondary">
                      Canary
                    </DsTypography>
                    <DsTypography variant="body-sm-reg" color="secondary">
                      ~0h
                    </DsTypography>
                  </div>
                  <div className="duration-row">
                    <DsTypography variant="body-sm-reg" color="secondary">
                      Early
                    </DsTypography>
                    <DsTypography variant="body-sm-reg" color="secondary">
                      ~0h
                    </DsTypography>
                  </div>
                  <div className="duration-row">
                    <DsTypography variant="body-sm-reg" color="secondary">
                      Broad
                    </DsTypography>
                    <DsTypography variant="body-sm-reg" color="secondary">
                      ~0h
                    </DsTypography>
                  </div>
                  <div className="duration-row">
                    <DsTypography variant="body-sm-reg" color="secondary">
                      Full
                    </DsTypography>
                    <DsTypography variant="body-sm-reg" color="secondary">
                      ~0h
                    </DsTypography>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Review & Approval */}
          <div className="section">
            <DsTypography variant="heading3">Review & Approval</DsTypography>
            <DsFormControl label="Approver">
              <DsFormControl.Description>
                Rollout will not start until approved
              </DsFormControl.Description>
              <DsFormControl.TextInput placeholder="add approver..." />
            </DsFormControl>
          </div>
        </div>
      </DsWorkspaceLayout.Content>

      <DsWorkspaceLayout.Footer>
        <DsStepper
          orientation="horizontal"
          count={steps.length}
          activeStep={activeStep}
        >
          {steps.map((step, index) => (
            <DsStep index={index} key={index}>
              <DsStepContent index={index} label={step.label} />
            </DsStep>
          ))}
        </DsStepper>
      </DsWorkspaceLayout.Footer>
    </DsWorkspaceLayout>
  );
}

export default App;
