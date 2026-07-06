import { useState, type MouseEvent } from "react";
import { Box, Button, IconButton, Popover, Typography } from "@mui/material";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import type { DateRange } from "../../types/ticket";
import { endOfDay, formatDate, isSameDay, startOfDay } from "../../utils/date";

const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const buildMonthGrid = (viewMonth: Date): (Date | null)[] => {
  const year = viewMonth.getFullYear();
  const month = viewMonth.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startOffset = new Date(year, month, 1).getDay();

  const cells: (Date | null)[] = Array.from({ length: startOffset }, () => null);
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push(new Date(year, month, day));
  }
  return cells;
};

interface DateRangePickerProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
}

const DateRangePicker = ({ value, onChange }: DateRangePickerProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [viewMonth, setViewMonth] = useState(
    new Date(value.start.getFullYear(), value.start.getMonth(), 1)
  );
  const [draftStart, setDraftStart] = useState<Date | null>(value.start);
  const [draftEnd, setDraftEnd] = useState<Date | null>(value.end);

  const open = Boolean(anchorEl);

  const handleOpen = (e: MouseEvent<HTMLElement>) => {
    setViewMonth(new Date(value.start.getFullYear(), value.start.getMonth(), 1));
    setDraftStart(value.start);
    setDraftEnd(value.end);
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleDayClick = (day: Date) => {
    if (!draftStart || draftEnd) {
      setDraftStart(startOfDay(day));
      setDraftEnd(null);
      return;
    }

    if (day < draftStart) {
      setDraftEnd(endOfDay(draftStart));
      setDraftStart(startOfDay(day));
    } else {
      setDraftEnd(endOfDay(day));
    }
  };

  const handleApply = () => {
    if (draftStart && draftEnd) {
      onChange({ start: draftStart, end: draftEnd });
    }
    handleClose();
  };

  const handleMonthShift = (delta: number) => {
    setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + delta, 1));
  };

  const isInRange = (day: Date) => {
    if (!draftStart) return false;
    const end = draftEnd ?? draftStart;
    return day >= startOfDay(draftStart) && day <= endOfDay(end);
  };

  const isEndpoint = (day: Date) =>
    Boolean(
      (draftStart && isSameDay(day, draftStart)) || (draftEnd && isSameDay(day, draftEnd))
    );

  const cells = buildMonthGrid(viewMonth);

  return (
    <>
      <Box
        onClick={handleOpen}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          border: "1px solid #E5E7EB",
          borderRadius: "8px",
          px: 1.5,
          py: 0.9,
          minWidth: 240,
          cursor: "pointer",
          "&:hover": { borderColor: "#D1D5DB" },
        }}
      >
        <CalendarTodayOutlinedIcon sx={{ fontSize: 17, color: "#6B7280" }} />
        <Typography sx={{ fontSize: 14, color: "#111827" }}>
          {formatDate(value.start)} - {formatDate(value.end)}
        </Typography>
      </Box>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        slotProps={{ paper: { sx: { mt: 1 } } }}
      >
        <Box sx={{ p: 2, width: 300 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 1.5,
            }}
          >
            <IconButton size="small" onClick={() => handleMonthShift(-1)}>
              <ChevronLeftIcon fontSize="small" />
            </IconButton>

            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
              {viewMonth.toLocaleString("en-US", { month: "long", year: "numeric" })}
            </Typography>

            <IconButton size="small" onClick={() => handleMonthShift(1)}>
              <ChevronRightIcon fontSize="small" />
            </IconButton>
          </Box>

          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", mb: 0.5 }}>
            {weekdays.map((wd) => (
              <Typography
                key={wd}
                sx={{ fontSize: 11, color: "#9CA3AF", textAlign: "center", fontWeight: 600 }}
              >
                {wd}
              </Typography>
            ))}
          </Box>

          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", rowGap: 0.5 }}>
            {cells.map((day, idx) =>
              day ? (
                <Box
                  key={day.toISOString()}
                  onClick={() => handleDayClick(day)}
                  sx={{
                    height: 32,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "8px",
                    fontSize: 13,
                    cursor: "pointer",
                    color: isEndpoint(day) ? "#fff" : "#111827",
                    backgroundColor: isEndpoint(day)
                      ? "#2463FF"
                      : isInRange(day)
                        ? "#E8EFFF"
                        : "transparent",
                    "&:hover": {
                      backgroundColor: isEndpoint(day) ? "#2463FF" : "#F3F4F6",
                    },
                  }}
                >
                  {day.getDate()}
                </Box>
              ) : (
                <Box key={`empty-${idx}`} />
              )
            )}
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 2 }}>
            <Button
              onClick={handleClose}
              sx={{ textTransform: "none", fontSize: 13, color: "#6B7280" }}
            >
              Cancel
            </Button>

            <Button
              onClick={handleApply}
              disabled={!draftStart || !draftEnd}
              variant="contained"
              sx={{
                textTransform: "none",
                fontSize: 13,
                backgroundColor: "#2463FF",
                boxShadow: "none",
                "&:hover": { backgroundColor: "#1E53E5", boxShadow: "none" },
              }}
            >
              Apply
            </Button>
          </Box>
        </Box>
      </Popover>
    </>
  );
};

export default DateRangePicker;
