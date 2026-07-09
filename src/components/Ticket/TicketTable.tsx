import { useState, type MouseEvent } from "react";
import {
  Box,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import PersonOffOutlinedIcon from "@mui/icons-material/PersonOffOutlined";

import type {
  Ticket,
  TicketPriority,
  TicketStatus,
  TicketUpdate,
} from "../../types/ticket";

import { formatDateTime } from "../../utils/date";
import { useAgents } from "../../hooks/useAgents";
import { useDepartments } from "../../hooks/useDepartments";
import { useIssueTopics } from "../../hooks/useIssueTopics";
import { useRegions } from "../../hooks/useRegions";
import AssignmentHistoryDialog from "../MyTickets/AssignmentHistoryDialog";

const priorityOptions: TicketPriority[] = ["High", "Medium", "Low"];

const statusOptions: TicketStatus[] = [
  "OPEN",
  "IN_PROGRESS",
  "RESOLVED",
  "CLOSED",
];

const priorityColors: Record<TicketPriority, string> = {
  High: "#DC2626",
  Medium: "#D97706",
  Low: "#6B7280",
  Critical: "#960a0a",
};

const statusStyles: Record<
  TicketStatus,
  { bg: string; color: string; label: string }
> = {
  OPEN: { bg: "#FEF3C7", color: "#B45309", label: "Open" },
  IN_PROGRESS: { bg: "#DBEAFE", color: "#1D4ED8", label: "In Progress" },
  RESOLVED: { bg: "#D1FAE5", color: "#047857", label: "Resolved" },
  CLOSED: { bg: "#F3F4F6", color: "#4B5563", label: "Closed" },
};

const columns = [
  "Ticket No",
  "Customer",
  "Issue Topic",
  "Department",
  "City",
  "Priority",
  "Status",
  "SLA",
  "Created At",
  "Action",
];

const editSelectSx = {
  fontSize: 13,
  "& .MuiSelect-select": { py: 0.6 },
};

type SortOrder = "asc" | "desc" | null;

interface TicketTableProps {
  tickets: Ticket[];
  onUpdateTicket: (ticketId: string, updates: TicketUpdate) => void;
  onAssignTicket: (ticketId: string, agent: string | null) => void;
  sortOrder: SortOrder;
  onToggleSort: () => void;
}

const TicketTable = ({
  tickets,
  onUpdateTicket,
  onAssignTicket,
  sortOrder,
  onToggleSort,
}: TicketTableProps) => {
  const { data: issueTopics } = useIssueTopics();
  const { data: departments } = useDepartments();
  const { data: regions } = useRegions();
  const { data: agents } = useAgents();

  const [editingTicketId, setEditingTicketId] = useState<string | null>(null);
  const [draft, setDraft] = useState<TicketUpdate | null>(null);

  const [agentMenuAnchor, setAgentMenuAnchor] = useState<HTMLElement | null>(null);
  const [assigningTicket, setAssigningTicket] = useState<Ticket | null>(null);
  const [historyTicketId, setHistoryTicketId] = useState<string | null>(null);

  const startEdit = (ticket: Ticket) => {
    setEditingTicketId(ticket.id);
    setDraft({
      issueTopic: ticket.issueTopicName ?? "",
      department: ticket.departmentName ?? "",
      city: ticket.city ?? "",
      priority: ticket.priority,
      status: ticket.status,
    });
  };

  const cancelEdit = () => {
    setEditingTicketId(null);
    setDraft(null);
  };

  const saveEdit = () => {
    if (editingTicketId && draft) {
      onUpdateTicket(editingTicketId, draft);
    }
    cancelEdit();
  };

  const openAgentMenu = (e: MouseEvent<HTMLElement>, ticket: Ticket) => {
    setAgentMenuAnchor(e.currentTarget);
    setAssigningTicket(ticket);
  };

  const closeAgentMenu = () => {
    setAgentMenuAnchor(null);
    setAssigningTicket(null);
  };

  const handleAssign = (agent: string | null) => {
    if (assigningTicket) {
      onAssignTicket(assigningTicket.id, agent);
    }
    closeAgentMenu();
  };

  return (
    <>
      <TableContainer
        sx={{
          backgroundColor: "#fff",
          borderRadius: "12px",
          border: "1px solid #E5E7EB",
        }}
      >
        <Table>
          <TableHead>
            <TableRow
              sx={{
                "& th": {
                  borderBottom: "1px solid #E5E7EB",
                },
              }}
            >
              {columns.map((col) => (
                <TableCell
                  key={col}
                  sx={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#6B7280",
                    py: 1.75,
                  }}
                >
                  {col === "Created At" ? (
                    <Box
                      onClick={onToggleSort}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        cursor: "pointer",
                        userSelect: "none",
                        width: "fit-content",
                      }}
                    >
                      {col}
                      {sortOrder === "asc" ? (
                        <ArrowUpwardIcon sx={{ fontSize: 15, color: "#2463FF" }} />
                      ) : sortOrder === "desc" ? (
                        <ArrowDownwardIcon sx={{ fontSize: 15, color: "#2463FF" }} />
                      ) : (
                        <UnfoldMoreIcon sx={{ fontSize: 15, color: "#9CA3AF" }} />
                      )}
                    </Box>
                  ) : (
                    col
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {tickets.map((ticket) => {
              const status = statusStyles[ticket.status];
              const isEditing = editingTicketId === ticket.id;

              return (
                <TableRow
                  key={ticket.id}
                  sx={{
                    "&:last-child td": {
                      borderBottom: 0,
                    },
                    "&:hover": {
                      backgroundColor: "#F9FAFB",
                    },
                  }}
                >
                  <TableCell
                    sx={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#111827",
                    }}
                  >
                    {ticket.ticketNumber}
                  </TableCell>

                  <TableCell
                    sx={{
                      fontSize: 14,
                      color: "#111827",
                    }}
                  >
                    {ticket.customerName}
                  </TableCell>

                  <TableCell
                    sx={{
                      fontSize: 14,
                      color: "#374151",
                      minWidth: 180,
                    }}
                  >
                    {isEditing && draft ? (
                      <Select
                        size="small"
                        fullWidth
                        value={draft.issueTopic}
                        onChange={(e: SelectChangeEvent) =>
                          setDraft({
                            ...draft,
                            issueTopic: e.target.value,
                          })
                        }
                        sx={editSelectSx}
                      >
                        {(issueTopics ?? []).map((option) => (
                          <MenuItem
                            key={option.id}
                            value={option.name}
                            sx={{ fontSize: 14 }}
                          >
                            {option.name}
                          </MenuItem>
                        ))}
                      </Select>
                    ) : (
                      ticket.issueTopicName
                    )}
                  </TableCell>

                  <TableCell
                    sx={{
                      fontSize: 14,
                      color: "#374151",
                      minWidth: 160,
                    }}
                  >
                    {isEditing && draft ? (
                      <Select
                        size="small"
                        fullWidth
                        value={draft.department}
                        onChange={(e: SelectChangeEvent) =>
                          setDraft({
                            ...draft,
                            department: e.target.value,
                          })
                        }
                        sx={editSelectSx}
                      >
                        {(departments ?? []).map((option) => (
                          <MenuItem
                            key={option.id}
                            value={option.name}
                            sx={{ fontSize: 14 }}
                          >
                            {option.name}
                          </MenuItem>
                        ))}
                      </Select>
                    ) : (
                      ticket.departmentName
                    )}
                  </TableCell>

                  <TableCell
                    sx={{
                      fontSize: 14,
                      color: "#374151",
                      minWidth: 130,
                    }}
                  >
                    {isEditing && draft ? (
                      <Select
                        size="small"
                        fullWidth
                        value={draft.city}
                        onChange={(e: SelectChangeEvent) =>
                          setDraft({
                            ...draft,
                            city: e.target.value,
                          })
                        }
                        sx={editSelectSx}
                      >
                        {(regions ?? []).map((option) => (
                          <MenuItem
                            key={option.id}
                            value={option.name}
                            sx={{ fontSize: 14 }}
                          >
                            {option.name}
                          </MenuItem>
                        ))}
                      </Select>
                    ) : (
                      ticket.city
                    )}
                  </TableCell>

                  <TableCell sx={{ minWidth: 110 }}>
                    {isEditing && draft ? (
                      <Select
                        size="small"
                        fullWidth
                        value={draft.priority}
                        onChange={(e: SelectChangeEvent) =>
                          setDraft({
                            ...draft,
                            priority: e.target.value as TicketPriority,
                          })
                        }
                        sx={editSelectSx}
                      >
                        {priorityOptions.map((option) => (
                          <MenuItem
                            key={option}
                            value={option}
                            sx={{ fontSize: 14 }}
                          >
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    ) : (
                      <Typography
                        sx={{
                          fontSize: 13,
                          fontWeight: 700,
                          color: priorityColors[ticket.priority],
                        }}
                      >
                        {ticket.priority}
                      </Typography>
                    )}
                  </TableCell>

                  <TableCell sx={{ minWidth: 150 }}>
                    {isEditing && draft ? (
                      <Select
                        size="small"
                        fullWidth
                        value={draft.status}
                        onChange={(e: SelectChangeEvent) =>
                          setDraft({
                            ...draft,
                            status: e.target.value as TicketStatus,
                          })
                        }
                        sx={editSelectSx}
                      >
                        {statusOptions.map((option) => (
                          <MenuItem
                            key={option}
                            value={option}
                            sx={{ fontSize: 14 }}
                          >
                            {statusStyles[option].label}
                          </MenuItem>
                        ))}
                      </Select>
                    ) : (
                      <Box
                        sx={{
                          display: "inline-block",
                          fontSize: 12,
                          fontWeight: 600,
                          color: status.color,
                          backgroundColor: status.bg,
                          borderRadius: "999px",
                          px: 1.5,
                          py: 0.4,
                        }}
                      >
                        {status.label}
                      </Box>
                    )}
                  </TableCell>

                  <TableCell>
                    {ticket.slaBreached ? (
                      <ErrorIcon sx={{ fontSize: 19, color: "#D97706" }} />
                    ) : (
                      <CheckCircleIcon sx={{ fontSize: 19, color: "#059669" }} />
                    )}
                  </TableCell>

                  <TableCell
                    sx={{
                      fontSize: 13,
                      color: "#6B7280",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {formatDateTime(new Date(ticket.createdAt))}
                  </TableCell>

                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      {isEditing ? (
                        <>
                          <IconButton size="small" onClick={saveEdit}>
                            <CheckIcon sx={{ fontSize: 19, color: "#059669" }} />
                          </IconButton>
                          <IconButton size="small" onClick={cancelEdit}>
                            <CloseIcon sx={{ fontSize: 19, color: "#DC2626" }} />
                          </IconButton>
                        </>
                      ) : (
                        <>
                          <Tooltip title="View department history">
                            <IconButton size="small" onClick={() => setHistoryTicketId(ticket.id)}>
                              <VisibilityOutlinedIcon sx={{ fontSize: 19, color: "#6B7280" }} />
                            </IconButton>
                          </Tooltip>

                          <Tooltip
                            title={
                              ticket.assignedAgentName
                                ? `Assigned to ${ticket.assignedAgentName}`
                                : "Assign agent"
                            }
                          >
                            <IconButton size="small" onClick={(e) => openAgentMenu(e, ticket)}>
                              <SupportAgentOutlinedIcon sx={{ fontSize: 19, color: "#6B7280" }} />
                            </IconButton>
                          </Tooltip>

                          <IconButton size="small" onClick={() => startEdit(ticket)}>
                            <EditOutlinedIcon sx={{ fontSize: 19, color: "#6B7280" }} />
                          </IconButton>
                        </>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}

            {tickets.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  sx={{ textAlign: "center", py: 6 }}
                >
                  <Typography sx={{ fontSize: 14, color: "#6B7280" }}>
                    No tickets match the selected filters.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Menu
        anchorEl={agentMenuAnchor}
        open={Boolean(agentMenuAnchor)}
        onClose={closeAgentMenu}
      >
        <MenuItem
          onClick={() => handleAssign(null)}
          sx={{ fontSize: 14 }}
          selected={assigningTicket?.assignedAgentName === null}
        >
          <ListItemIcon>
            <PersonOffOutlinedIcon sx={{ fontSize: 18, color: "#6B7280" }} />
          </ListItemIcon>
          Unassigned
        </MenuItem>

        {(agents ?? []).map((agent) => (
          <MenuItem
            key={agent.id}
            onClick={() => handleAssign(agent.name)}
            sx={{ fontSize: 14 }}
            selected={assigningTicket?.assignedAgentName === agent.name}
          >
            <ListItemIcon>
              {assigningTicket?.assignedAgentName === agent.name && (
                <CheckIcon sx={{ fontSize: 18, color: "#2463FF" }} />
              )}
            </ListItemIcon>
            {agent.name}
          </MenuItem>
        ))}
      </Menu>

      <AssignmentHistoryDialog
        open={Boolean(historyTicketId)}
        ticketId={historyTicketId}
        onClose={() => setHistoryTicketId(null)}
      />
    </>
  );
};

export default TicketTable;
