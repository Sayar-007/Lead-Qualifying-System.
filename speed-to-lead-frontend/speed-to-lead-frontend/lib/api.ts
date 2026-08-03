const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export type LeadSource = "web_form" | "facebook_ad" | "instagram_dm" | "manual";

export interface NewLeadInput {
  name: string;
  contact: string;
  source: LeadSource;
  initial_message?: string;
}

export interface NewLeadResponse {
  lead_id: string;
  status: string;
}

export interface ChatTurnOutcome {
  temperature: "hot" | "warm" | "cold";
  intent_summary: string;
  booked: boolean;
  slot_start: string | null;
  owner_notified: boolean;
}

export interface ChatTurnResponse {
  reply: string;
  finalized: boolean;
  outcome?: ChatTurnOutcome;
}

export interface LeadRow {
  id: string;
  name: string;
  contact: string;
  source: LeadSource;
  created_at: string;
  temperature: "unscored" | "hot" | "warm" | "cold";
  intent_summary: string | null;
  booked: boolean;
  slot_start: string | null;
  owner_notified: boolean;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`${res.status} ${res.statusText}: ${body}`);
  }
  return res.json() as Promise<T>;
}

export function createLead(input: NewLeadInput) {
  return request<NewLeadResponse>("/webhook/lead", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function sendChatMessage(leadId: string, message: string) {
  return request<ChatTurnResponse>(`/chat/${leadId}`, {
    method: "POST",
    body: JSON.stringify({ message }),
  });
}

export function fetchLeads() {
  return request<LeadRow[]>("/leads");
}
