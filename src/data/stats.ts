export interface StatItem {
  id: string;
  value: string;
  numericValue?: number;
  suffix?: string;
  label: string;
  subtext: string;
  verified: boolean;
  placeholderLabel?: string;
}

export const statsData: StatItem[] = [
  {
    id: "stat-01",
    value: "00",
    numericValue: 0,
    suffix: "%",
    label: "Organic Traffic Acceleration",
    subtext: "Average compounding visibility growth across search engagements.",
    verified: false,
    placeholderLabel: "AWAITING AUDITED CLIENT METRIC",
  },
  {
    id: "stat-02",
    value: "00",
    numericValue: 0,
    suffix: "M+",
    label: "Paid Media Managed",
    subtext: "Capital deployed across Meta and programmatic ad channels.",
    verified: false,
    placeholderLabel: "AWAITING CONFIRMED CAPITAL SPEND",
  },
  {
    id: "stat-03",
    value: "00",
    numericValue: 0,
    suffix: "x",
    label: "Client Retention Rate",
    subtext: "Long-term partnership continuity across core service disciplines.",
    verified: false,
    placeholderLabel: "AWAITING VERIFIED RETENTION DATA",
  },
];
