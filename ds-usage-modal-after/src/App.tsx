import { useState } from "react";
import {
  DsModal,
  DsButtonV3,
  DsIcon,
  DsTabs,
  DsTable,
  DsTypography,
  type ColumnDef,
} from "@drivenets/design-system";
import "./App.css";

interface DeviceData {
  id: string;
  deviceId: string;
  scheduledWindow: string;
  site: string;
  role: string;
  function: string;
  vendor: string;
  createdDate: string;
}

const columns: ColumnDef<DeviceData>[] = [
  {
    accessorKey: "deviceId",
    header: "Device ID",
    size: 160,
    cell: (info) => (
      <DsTypography variant="body-sm-md">
        {info.getValue() as string}
      </DsTypography>
    ),
  },
  {
    accessorKey: "scheduledWindow",
    header: "Scheduled Window (12/12)",
    size: 240,
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

const deviceData: DeviceData[] = [
  {
    id: "1",
    deviceId: "NYCYNYC8P02",
    scheduledWindow: "10-Feb-26 / 00:00–04:00",
    site: "NYCYNYC8",
    role: "P-AGG",
    function: "SPINE",
    vendor: "DriveNets",
    createdDate: "01-Feb-26 20:22",
  },
  {
    id: "2",
    deviceId: "DLLSDLLS4A01",
    scheduledWindow: "10-Feb-26 / 00:00–04:00",
    site: "DLLSDLLS4",
    role: "PE",
    function: "LEAF",
    vendor: "DriveNets",
    createdDate: "01-Feb-26 20:22",
  },
  {
    id: "3",
    deviceId: "CHCGILCK1A01",
    scheduledWindow: "10-Feb-26 / 04:00–08:00",
    site: "CHCGILCK1",
    role: "P-AGG",
    function: "SPINE",
    vendor: "DriveNets",
    createdDate: "01-Feb-26 20:22",
  },
  {
    id: "4",
    deviceId: "SFOCASFO2P01",
    scheduledWindow: "10-Feb-26 / 04:00–08:00",
    site: "SFOCASFO2",
    role: "PE",
    function: "LEAF",
    vendor: "DriveNets",
    createdDate: "01-Feb-26 20:22",
  },
  {
    id: "5",
    deviceId: "ATLHGATL3A02",
    scheduledWindow: "10-Feb-26 / 08:00–12:00",
    site: "ATLHGATL3",
    role: "P-AGG",
    function: "SPINE",
    vendor: "Nokia",
    createdDate: "01-Feb-26 20:22",
  },
  {
    id: "6",
    deviceId: "MABORMA5P03",
    scheduledWindow: "11-Feb-26 / 00:00–04:00",
    site: "MABORMA5",
    role: "PE",
    function: "SPINE",
    vendor: "DriveNets",
    createdDate: "02-Feb-26 08:15",
  },
  {
    id: "7",
    deviceId: "LSANCALA7A01",
    scheduledWindow: "11-Feb-26 / 04:00–08:00",
    site: "LSANCALA7",
    role: "P-AGG",
    function: "LEAF",
    vendor: "DriveNets",
    createdDate: "02-Feb-26 08:15",
  },
  {
    id: "8",
    deviceId: "STTLWASH6P02",
    scheduledWindow: "11-Feb-26 / 08:00–12:00",
    site: "STTLWASH6",
    role: "PE",
    function: "SPINE",
    vendor: "Nokia",
    createdDate: "02-Feb-26 08:15",
  },
  {
    id: "9",
    deviceId: "DNVRCODN4A03",
    scheduledWindow: "12-Feb-26 / 00:00–04:00",
    site: "DNVRCODN4",
    role: "P-AGG",
    function: "LEAF",
    vendor: "DriveNets",
    createdDate: "02-Feb-26 08:15",
  },
];

function App() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("canary");

  return (
    <div className="app">
      <DsButtonV3 onClick={() => setIsOpen(true)} variant="primary" size="medium">
        Schedule per device
      </DsButtonV3>

      <DsModal open={isOpen} columns={10} onOpenChange={setIsOpen}>
        <DsModal.Header>
          <DsModal.Title>Schedule per device</DsModal.Title>
          <DsButtonV3
            variant="tertiary"
            size="small"
            icon="more_vert"
            aria-label="More actions"
          />
          <DsModal.CloseTrigger />
        </DsModal.Header>

        <DsModal.Body>
          <div className="modal-content">
            <div className="timeline-card">
              <div className="timeline-stats">
                <div className="timeline-stats-text">
                  <DsTypography variant="heading3">4 days, 7 hrs</DsTypography>
                  <DsTypography variant="body-sm-reg" color="secondary">
                    Estimated completion based on stages
                  </DsTypography>
                </div>
                <DsIcon icon="calendar_clock" />
              </div>

              <div className="timeline-legend">
                <div className="timeline-legend-group">
                  <div className="timeline-legend-row">
                    <DsTypography variant="body-sm-reg" color="placeholder">
                      Canary{" "}
                    </DsTypography>
                    <DsTypography variant="body-sm-md" color="secondary">
                      ~4d, 7h
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

                <div className="timeline-legend-group">
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

            <DsTabs.Root
              orientation="horizontal"
              size="medium"
              value={activeTab}
              onValueChange={(val: string | null) =>
                setActiveTab(val ?? "canary")
              }
            >
              <DsTabs.List>
                <DsTabs.Tab value="canary" label="Canary" badge={12} />
                <DsTabs.Tab value="early" label="Early" badge={60} />
                <DsTabs.Tab value="broad" label="Broad" badge={80} />
                <DsTabs.Tab value="full" label="Full" badge={546} />
              </DsTabs.List>
            </DsTabs.Root>

            <div className="stats-actions">
              <div className="stats">
                <div className="stat-block">
                  <DsTypography variant="heading3">
                    10-Feb-26 / 00:00
                  </DsTypography>
                  <DsTypography variant="body-sm-reg" color="secondary">
                    Stage Start
                  </DsTypography>
                </div>
                <div className="stat-arrow">
                  <DsIcon icon="arrow_forward" />
                </div>
                <div className="stat-block">
                  <DsTypography variant="heading3">
                    14-Feb-26 / 07:00
                  </DsTypography>
                  <DsTypography variant="body-sm-reg" color="secondary">
                    Stage End
                  </DsTypography>
                </div>
              </div>

              <div className="actions">
                <DsButtonV3
                  variant="secondary"
                  size="medium"
                  icon="search"
                  aria-label="Search"
                />
                <DsButtonV3
                  variant="secondary"
                  size="medium"
                  icon="filter_list"
                  aria-label="Filter"
                />
                <DsButtonV3
                  variant="secondary"
                  size="medium"
                  icon="more_vert"
                  aria-label="More actions"
                />
              </div>
            </div>

            <DsTable
              columns={columns}
              data={deviceData}
              stickyHeader
              bordered
              fullWidth
              rowSize="large"
            />
          </div>
        </DsModal.Body>
      </DsModal>
    </div>
  );
}

export default App;
