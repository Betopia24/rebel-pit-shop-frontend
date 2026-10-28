export type ScheduleDate = string;
export type ScheduleISODateTime = string;

export type DashboardScheduleSessionType = "group_class" | "personal_training" | "consultation";

export type DashboardScheduleSessionStatus = "scheduled" | "confirmed" | "completed" | "cancelled";

export type DashboardScheduleIndicator = "gold" | "amber" | "green" | "blue" | "muted";

export interface DashboardScheduleCoach {
  id: string;
  name: string;
}

export interface DashboardScheduleItem {
    id: string;
    title: string;
    type: DashboardScheduleSessionType;
    status: DashboardScheduleSessionStatus;
    startsAt: ScheduleISODateTime;
    durationMinutes: number;
    coach: DashboardScheduleCoach | null;
    indicator: DashboardScheduleIndicator;
}

export interface DashboardScheduleData {
    date: ScheduleDate;
    timezone: string;
    items: readonly DashboardScheduleItem[];
    updatedAt: ScheduleISODateTime | null;
}

export type DashboardScheduleStatus = "loading" | "success" | "empty" | "error";

export interface ScheduleItemProps {
    item: DashboardScheduleItem;
    timezone: string;
    className?: string;
}

export interface ScheduleCalendarProps {
    selectedDate: ScheduleDate;
    onDateChange?: (date: ScheduleDate) => void;
    datesWithSessions?: readonly ScheduleDate[];
    timezone: string;
    disabled?: boolean;
    className?: string;
}

export interface TodayScheduleProps {
    data: DashboardScheduleData | null;
    status: DashboardScheduleStatus;
    selectedDate: ScheduleDate;
    onDateChange?: (date: ScheduleDate) => void;
    datesWithSessions?: readonly ScheduleDate[];
    onRetry?: () => void;
    error?: string | null;
    className?: string;
}