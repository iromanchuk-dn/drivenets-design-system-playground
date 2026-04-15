import { useState } from "react";
import {
  DsTabs,
  DsFormControl,
  DsTextInput,
  DsSelect,
  DsToggle,
  DsRadioGroup,
  DsCheckbox,
  DsIcon,
} from "@drivenets/design-system";
import "./App.css";

interface KeyValueEntry {
  id: number;
  name: string;
  type: string;
  expression: string;
  extraText?: string;
  result: string;
}

const METHOD_OPTIONS = [
  { label: "GET", value: "GET" },
  { label: "POST", value: "POST" },
  { label: "PUT", value: "PUT" },
  { label: "PATCH", value: "PATCH" },
  { label: "DELETE", value: "DELETE" },
];

const AUTH_OPTIONS = [
  { label: "None", value: "None" },
  { label: "API Key", value: "API Key" },
  { label: "Bearer Token", value: "Bearer Token" },
  { label: "Basic Auth", value: "Basic Auth" },
];

const TYPE_OPTIONS = [
  { label: "String", value: "String" },
  { label: "Number", value: "Number" },
  { label: "Boolean", value: "Boolean" },
  { label: "Object", value: "Object" },
  { label: "Array", value: "Array" },
];

const CURL_PREVIEW = `curl -X POST https://dap.att.com/workflows/api/abc \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer eyJhbGciOi..." \\
  -d '{
    "deviceId": "RTR-123",
    "location": "Dallas",
    "model": "ASR920"
  }'`;

function CollapsibleSection({
  title,
  defaultOpen = true,
  toggle,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  toggle?: { enabled: boolean; onToggle: (val: boolean) => void };
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="collapsible-section">
      <div className="collapsible-header" onClick={() => setOpen(!open)}>
        <div className="collapsible-header-left">
          <DsIcon
            icon="arrow_drop_down"
            className={`collapsible-arrow${open ? "" : " collapsed"}`}
          />
          <span className="section-title-text">{title}</span>
        </div>
        {toggle && (
          <div
            className="toggle-container"
            onClick={(e) => e.stopPropagation()}
          >
            <DsToggle
              size="small"
              checked={toggle.enabled}
              onChange={() => toggle.onToggle(!toggle.enabled)}
            />
          </div>
        )}
      </div>
      <div className={`collapsible-body${open ? "" : " hidden"}`}>
        {children}
      </div>
    </div>
  );
}

function ExpressionInput({
  expression,
  extraText,
  result,
}: {
  expression: string;
  extraText?: string;
  result: string;
}) {
  return (
    <div className="expression-container">
      <div className="expression-input">
        <div className="expression-tokens">
          <span className="expression-code">{expression}</span>
          {extraText && <span className="expression-extra">{extraText}</span>}
        </div>
        <div className="expression-open-btn">
          <DsIcon icon="open_in_new" size={16} />
        </div>
      </div>
      <div className="result-row">
        <span>
          Result: <span className="result-value">{result}</span>
        </span>
      </div>
    </div>
  );
}

function KeyValueCard({
  entries,
  showRequired,
}: {
  entries: KeyValueEntry[];
  showRequired?: boolean;
}) {
  return (
    <div className="kv-card">
      <div className="kv-entries">
        {entries.map((entry) => (
          <div key={entry.id}>
            <div className="kv-row">
              <div className="kv-name-input">
                <DsTextInput
                  size="small"
                  value={entry.name}
                  readOnly
                />
              </div>
              <div className="kv-type-select">
                <DsSelect
                  size="small"
                  options={TYPE_OPTIONS}
                  value={entry.type}
                  onValueChange={() => {}}
                />
              </div>
              <div className="kv-delete-btn">
                <DsIcon icon="delete" size={20} />
              </div>
            </div>
            <ExpressionInput
              expression={entry.expression}
              extraText={entry.extraText}
              result={entry.result}
            />
            {showRequired && (
              <div className="required-checkbox-row">
                <DsCheckbox label="Required" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function AddButton({
  label,
  onClick,
}: {
  label: string;
  onClick?: () => void;
}) {
  return (
    <button className="add-button" onClick={onClick}>
      <DsIcon icon="add" size={16} />
      {label}
    </button>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState("request");
  const [method, setMethod] = useState("POST");
  const [auth, setAuth] = useState("API Key");
  const [queryParamsEnabled, setQueryParamsEnabled] = useState(true);
  const [headersEnabled, setHeadersEnabled] = useState(true);
  const [bodyEnabled, setBodyEnabled] = useState(true);
  const [bodyType, setBodyType] = useState("key-value");

  const queryParams: KeyValueEntry[] = [
    {
      id: 1,
      name: "Work order id",
      type: "String",
      expression: "{{task1.outputs.items[0].name}}",
      result: "DriveNets",
    },
  ];

  const headers: KeyValueEntry[] = [
    {
      id: 1,
      name: "Work order id",
      type: "String",
      expression: "{{task1.outputs.items[0].name}}",
      extraText: "+10",
      result: "DriveNets",
    },
  ];

  const bodyAttrs: KeyValueEntry[] = [
    {
      id: 1,
      name: "Work order id",
      type: "String",
      expression: "{{task1.outputs.items[0].name}} ",
      result: "DriveNets",
    },
  ];

  return (
    <div className="api-call-panel">
      {/* ── Header ── */}
      <div className="panel-header">
        <div className="panel-title-bar">
          <div className="panel-title-left">
            <div className="panel-icon">
              <DsIcon icon="patient_list" size={20} />
            </div>
            <span style={{ fontWeight: 500, fontSize: 14, color: "#2c3a4b" }}>
              API call
            </span>
          </div>
          <div className="panel-title-right">
            <div className="version-badge">
              <span>Version: 000.0009</span>
              <DsIcon icon="arrow_drop_down" size={20} />
            </div>
            <DsIcon
              icon="close"
              size={20}
              style={{ padding: 10, cursor: "pointer" }}
            />
          </div>
        </div>
        <div className="breadcrumb-bar">
          <DsIcon icon="shoppingmode" size={16} />
          <span>DAP &gt; Component &gt; Network</span>
        </div>
        <DsTabs.Root
          value={activeTab}
          onValueChange={(v) => v && setActiveTab(v)}
          size="small"
        >
          <DsTabs.List>
            <DsTabs.Tab value="general" label="General" />
            <DsTabs.Tab value="request" label="Request" />
            <DsTabs.Tab value="responses" label="Responses" />
          </DsTabs.List>
        </DsTabs.Root>
      </div>

      {/* ── Content ── */}
      <div className="panel-content">
        {activeTab === "request" && (
          <>
            {/* Configuration accordion header */}
            <div className="config-title-row">
              <DsIcon icon="arrow_drop_down" />
              <span className="config-title-text">Configuration</span>
            </div>

            {/* Configuration form fields */}
            <div className="config-section">
              <DsFormControl label="URL Base">
                <DsFormControl.TextInput
                  size="small"
                  value="https://dap.att.com/workflows/"
                  readOnly
                />
              </DsFormControl>

              <DsFormControl label="URL Path">
                <DsFormControl.TextInput
                  size="small"
                  value="/api/abc"
                  readOnly
                />
              </DsFormControl>

              <DsFormControl label="Method">
                <DsFormControl.Select
                  size="small"
                  options={METHOD_OPTIONS}
                  value={method}
                  onValueChange={(v) => setMethod(v)}
                />
              </DsFormControl>

              <DsFormControl label="Authentication">
                <DsFormControl.Select
                  size="small"
                  options={AUTH_OPTIONS}
                  value={auth}
                  onValueChange={(v) => setAuth(v)}
                />
              </DsFormControl>

              <DsFormControl label="Content Type">
                <DsFormControl.TextInput
                  size="small"
                  value="Application/json"
                  readOnly
                />
              </DsFormControl>
            </div>

            {/* Collapsible sections */}
            <div className="sections-wrapper">
              {/* Query Params */}
              <CollapsibleSection
                title="Query Params (1)"
                toggle={{
                  enabled: queryParamsEnabled,
                  onToggle: setQueryParamsEnabled,
                }}
              >
                <KeyValueCard entries={queryParams} />
                <AddButton label="Add query parametr" />
              </CollapsibleSection>

              {/* Headers */}
              <CollapsibleSection
                title="Headers (1)"
                toggle={{
                  enabled: headersEnabled,
                  onToggle: setHeadersEnabled,
                }}
              >
                <KeyValueCard entries={headers} />
                <AddButton label="Add header" />
              </CollapsibleSection>

              {/* Body */}
              <CollapsibleSection
                title="Body"
                toggle={{
                  enabled: bodyEnabled,
                  onToggle: setBodyEnabled,
                }}
              >
                <div className="body-type-row">
                  <DsRadioGroup.Root
                    value={bodyType}
                    onValueChange={(v) => v && setBodyType(v)}
                    style={{ display: "flex", gap: 16 }}
                  >
                    <DsRadioGroup.Item value="key-value" label="Key - Value" />
                    <DsRadioGroup.Item value="schema" label="Schema" />
                  </DsRadioGroup.Root>
                </div>
                <KeyValueCard entries={bodyAttrs} showRequired />
                <AddButton label="Add attribute" />
              </CollapsibleSection>

              {/* Preview */}
              <CollapsibleSection title="Preview">
                <div className="preview-code">
                  <pre>{CURL_PREVIEW}</pre>
                  <div className="preview-open-btn">
                    <DsIcon icon="open_in_new" size={16} />
                  </div>
                </div>
              </CollapsibleSection>
            </div>
          </>
        )}

        {activeTab === "general" && (
          <div style={{ padding: 24, color: "#4c5f76" }}>
            General configuration content
          </div>
        )}

        {activeTab === "responses" && (
          <div style={{ padding: 24, color: "#4c5f76" }}>
            Responses configuration content
          </div>
        )}
      </div>
    </div>
  );
}
