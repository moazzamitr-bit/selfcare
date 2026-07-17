import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChatComposer, CitationCard, EmergencyAlert, EscalationDialog } from "@/components/app/assistant-parts";
import { AppointmentCard, ReferralTimeline } from "@/components/app/workflow-cards";
import { appointments, referrals } from "@/lib/demo-data";

describe("assistant components", () => {
  it("submits chat composer text", async () => {
    const onSend = vi.fn();
    render(<ChatComposer onSend={onSend} />);
    await userEvent.type(screen.getByPlaceholderText("سؤال خود را بنویسید..."), "پزشک خانواده چیست؟");
    await userEvent.click(screen.getByRole("button", { name: /ارسال/ }));
    expect(onSend).toHaveBeenCalledWith("پزشک خانواده چیست؟");
  });

  it("renders citations and emergency alert", () => {
    render(
      <>
        <CitationCard citation={{ document_id: "1", title: "منبع", section: "بخش", version: "v1", updated_at: "2026-07-01" }} />
        <EmergencyAlert />
      </>,
    );
    expect(screen.getByText("منبع")).toBeInTheDocument();
    expect(screen.getByText(/منتظر پاسخ آنلاین نمانید/)).toBeInTheDocument();
  });

  it("shows escalation dialog trigger", () => {
    render(<EscalationDialog />);
    expect(screen.getByRole("button", { name: /ارتباط با پشتیبانی/ })).toBeInTheDocument();
  });
});

describe("workflow components", () => {
  it("renders appointment status", () => {
    render(<AppointmentCard appointment={appointments[0]} />);
    expect(screen.getByText("اولین ملاقات سلامت")).toBeInTheDocument();
  });

  it("renders referral timeline", () => {
    render(<ReferralTimeline referral={referrals[0]} />);
    expect(screen.getByText("ثبت ارجاع")).toBeInTheDocument();
    expect(screen.getByText("تعیین نوبت تخصصی")).toBeInTheDocument();
  });
});

