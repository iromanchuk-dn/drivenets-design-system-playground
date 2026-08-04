import { type ReactNode, useState } from "react";
import {
  DsTabs,
  DsFormControl,
  DsAutocomplete,
  DsIcon,
  DsTypography,
  DsStack,
  DsToggle,
  DsRadioGroup,
  DsCheckbox,
  DsButtonV3,
} from "@drivenets/design-system";
import "./App.css";

/* ────────────────────────────────────────────────────────────────────────────
 * Reusable sub-components
 * ──────────────────────────────────────────────────────────────────────────── */

function SectionHeader({
  title,
  open,
  onToggle,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="section-header-btn"
      role="button"
      tabIndex={0}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onToggle();
      }}
    >
      <DsIcon
        icon="arrow_drop_down"
        size="medium"
        className={`arrow-icon ${open ? "" : "arrow-icon--collapsed"}`}
      />
      <DsTypography variant="heading4">{title}</DsTypography>
    </div>
  );
}

function CollapsibleCard({
  title,
  open,
  onToggle,
  enabled,
  onEnabledChange,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  enabled?: boolean;
  onEnabledChange?: (v: boolean) => void;
  children: ReactNode;
}) {
  return (
    <div className="collapsible-card">
      <div className="card-header">
        <div
          className="card-header-left"
          role="button"
          tabIndex={0}
          onClick={onToggle}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") onToggle();
          }}
        >
          <DsIcon
            icon="arrow_drop_down"
            size="medium"
            className={`arrow-icon ${open ? "" : "arrow-icon--collapsed"}`}
          />
          <DsTypography variant="body-md-md" style={{ flex: 1 }}>
            {title}
          </DsTypography>
        </div>
        {onEnabledChange != null && (
          <DsToggle
            checked={enabled}
            onValueChange={onEnabledChange}
            size="small"
          />
        )}
      </div>
      {open && children}
    </div>
  );
}

function ExpressionInput({
  expression,
  suffix,
  noBorder,
}: {
  expression: string;
  suffix?: string;
  noBorder?: boolean;
}) {
  return (
    <div
      className={`expression-input ${noBorder ? "expression-input--no-border" : ""}`}
    >
      <div className="expression-text">
        <DsTypography variant="code-xs-reg" color="success">
          {expression}
        </DsTypography>
        {suffix && (
          <DsTypography variant="body-xs-reg" color="action-secondary">
            {suffix}
          </DsTypography>
        )}
      </div>
      <div className="expression-icon">
        <DsIcon icon="open_in_new" size="small" color="secondary" />
      </div>
    </div>
  );
}

function ResultPreview({ result }: { result: string }) {
  return (
    <div className="result-preview">
      <DsTypography variant="body-xs-reg" color="secondary">
        Result:{" "}
        <DsTypography variant="body-xs-reg" color="success" asChild>
          <span>{result}</span>
        </DsTypography>
      </DsTypography>
    </div>
  );
}

function KeyValueEntry({
  keyLabel,
  valueType,
  expression,
  expressionSuffix,
  result,
  showRequired,
}: {
  keyLabel: string;
  valueType: string;
  expression: string;
  expressionSuffix?: string;
  result: string;
  showRequired?: boolean;
}) {
  return (
    <div className="card-inner">
      <DsStack direction="column" gap="8px">
        <div className="kv-row">
          <div className="kv-key">
            <DsFormControl label="Key" hideLabel>
              <DsAutocomplete
                options={[{ value: keyLabel, label: keyLabel }]}
                placeholder={keyLabel}
              />
            </DsFormControl>
          </div>
          <DsAutocomplete
            options={[
              { value: "String", label: "String" },
              { value: "Number", label: "Number" },
              { value: "Boolean", label: "Boolean" },
            ]}
            placeholder={valueType}
            style={{ width: 120 }}
          />
          <DsButtonV3
            variant="tertiary"
            icon="delete"
            size="small"
            aria-label="Delete"
            className="kv-delete"
          />
        </div>
        <ExpressionInput
          expression={expression}
          suffix={expressionSuffix}
        />
        <ResultPreview result={result} />
        {showRequired && (
          <DsCheckbox label="Required" />
        )}
      </DsStack>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
 * Main App
 * ──────────────────────────────────────────────────────────────────────────── */

function App() {
  const [activeTab, setActiveTab] = useState("request");

  const [configOpen, setConfigOpen] = useState(true);
  const [queryParamsOpen, setQueryParamsOpen] = useState(true);
  const [headersOpen, setHeadersOpen] = useState(true);
  const [bodyOpen, setBodyOpen] = useState(true);
  const [previewOpen, setPreviewOpen] = useState(true);

  const [queryParamsEnabled, setQueryParamsEnabled] = useState(true);
  const [headersEnabled, setHeadersEnabled] = useState(true);
  const [bodyEnabled, setBodyEnabled] = useState(true);

  const [bodyType, setBodyType] = useState<string | null>("key-value");

  return (
    <div className="api-call-panel">
      {/* ── Header ── */}
      <header className="panel-header">
        <div className="panel-title-bar">
          <DsStack direction="row" gap="8px" alignItems="center">
            <div className="api-call-badge">
              <DsIcon
                icon="patient_list"
                size="small"
                style={{ color: "white" }}
              />
            </div>
            <DsTypography variant="body-sm-md">API call</DsTypography>
          </DsStack>
          <DsButtonV3
            variant="tertiary"
            icon="close"
            size="small"
            aria-label="Close"
          />
        </div>

        <div className="panel-breadcrumb">
          <DsIcon icon="shoppingmode" size="small" />
          <DsTypography variant="body-xs-reg" color="action-secondary">
            DAP &gt; Component &gt; Network
          </DsTypography>
        </div>

        <div className="panel-tabs">
          <DsTabs.Root
            value={activeTab}
            onValueChange={(v) => setActiveTab(v ?? "request")}
          >
            <DsTabs.List>
              <DsTabs.Tab value="general" label="General" />
              <DsTabs.Tab value="request" label="Request" />
              <DsTabs.Tab value="responses" label="Responses" />
            </DsTabs.List>
          </DsTabs.Root>
        </div>
      </header>

      {/* ── Request tab content ── */}
      <div className="panel-content">
        {/* Configuration */}
        <SectionHeader
          title="Configuration"
          open={configOpen}
          onToggle={() => setConfigOpen((o) => !o)}
        />
        {configOpen && (
          <DsStack direction="column" gap="16px" className="section-fields">
            <DsFormControl label="URL Base">
              <DsAutocomplete
                options={[
                  {
                    value: "https://dap.att.com/workflows/",
                    label: "https://dap.att.com/workflows/",
                  },
                ]}
                placeholder="https://dap.att.com/workflows/"
              />
            </DsFormControl>
            <DsFormControl label="URL Path">
              <DsAutocomplete
                options={[{ value: "/api/abc", label: "/api/abc" }]}
                placeholder="/api/abc"
              />
            </DsFormControl>
            <DsFormControl label="Method">
              <DsAutocomplete
                options={[
                  { value: "GET", label: "GET" },
                  { value: "POST", label: "POST" },
                  { value: "PUT", label: "PUT" },
                  { value: "DELETE", label: "DELETE" },
                  { value: "PATCH", label: "PATCH" },
                ]}
                placeholder="POST"
              />
            </DsFormControl>
            <DsFormControl label="Authentication">
              <DsAutocomplete
                options={[
                  { value: "api-key", label: "API Key" },
                  { value: "bearer", label: "Bearer Token" },
                  { value: "basic", label: "Basic Auth" },
                  { value: "none", label: "None" },
                ]}
                placeholder="API Key"
              />
            </DsFormControl>
            <DsFormControl label="Content Type">
              <DsAutocomplete
                options={[
                  { value: "application/json", label: "Application/json" },
                  { value: "text/plain", label: "Text/plain" },
                  {
                    value: "multipart/form-data",
                    label: "Multipart/form-data",
                  },
                  {
                    value: "application/x-www-form-urlencoded",
                    label: "Application/x-www-form-urlencoded",
                  },
                ]}
                placeholder="Application/json"
              />
            </DsFormControl>
          </DsStack>
        )}

        {/* Query Params */}
        <CollapsibleCard
          title="Query Params (1)"
          open={queryParamsOpen}
          onToggle={() => setQueryParamsOpen((o) => !o)}
          enabled={queryParamsEnabled}
          onEnabledChange={setQueryParamsEnabled}
        >
          <KeyValueEntry
            keyLabel="Work order id"
            valueType="String"
            expression="{{task1.outputs.items[0].name}}"
            result="DriveNets"
          />
          <DsButtonV3
            variant="secondary"
            size="small"
            icon="add"
            className="add-btn"
          >
            Add query parametr
          </DsButtonV3>
        </CollapsibleCard>

        {/* Headers */}
        <CollapsibleCard
          title="Headers (1)"
          open={headersOpen}
          onToggle={() => setHeadersOpen((o) => !o)}
          enabled={headersEnabled}
          onEnabledChange={setHeadersEnabled}
        >
          <KeyValueEntry
            keyLabel="Work order id"
            valueType="String"
            expression="{{task1.outputs.items[0].name}}"
            expressionSuffix="+10"
            result="DriveNets"
          />
          <DsButtonV3
            variant="secondary"
            size="small"
            icon="add"
            className="add-btn"
          >
            Add header
          </DsButtonV3>
        </CollapsibleCard>

        {/* Body */}
        <CollapsibleCard
          title="Body"
          open={bodyOpen}
          onToggle={() => setBodyOpen((o) => !o)}
          enabled={bodyEnabled}
          onEnabledChange={setBodyEnabled}
        >
          <DsRadioGroup.Root
            value={bodyType}
            onValueChange={setBodyType}
            className="body-type-radios"
          >
            <DsRadioGroup.Item value="key-value" label="Key - Value" />
            <DsRadioGroup.Item value="schema" label="Schema" />
          </DsRadioGroup.Root>

          <KeyValueEntry
            keyLabel="Work order id"
            valueType="String"
            expression="{{task1.outputs.items[0].name}}"
            result="DriveNets"
            showRequired
          />
          <DsButtonV3
            variant="secondary"
            size="small"
            icon="add"
            className="add-btn"
          >
            Add attribute
          </DsButtonV3>
        </CollapsibleCard>

        {/* Preview */}
        <CollapsibleCard
          title="Preview"
          open={previewOpen}
          onToggle={() => setPreviewOpen((o) => !o)}
        >
          <div className="preview-code">
            <pre>
              <DsTypography variant="code-xs-reg" color="success">
                {`curl -X POST https://dap.att.com/workflows/api/abc \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer eyJhbGciOi..." \\
  -d '{
    "deviceId": "RTR-123",
    "location": "Dallas",
    "model": "ASR920"
  }'`}
              </DsTypography>
            </pre>
            <div className="expression-icon">
              <DsIcon icon="open_in_new" size="small" color="secondary" />
            </div>
          </div>
        </CollapsibleCard>
      </div>
    </div>
  );
}

export default App;
