import { appointments, healthCenters, physician, referrals } from "@/lib/demo-data";

export type AdapterResult<T> = Promise<{ ok: true; data: T } | { ok: false; error: string }>;

async function withTimeout<T>(task: () => Promise<T>, timeoutMs = 1200): AdapterResult<T> {
  try {
    const timeout = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error("adapter_timeout")), timeoutMs);
    });
    const data = await Promise.race([task(), timeout]);
    return { ok: true, data };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "adapter_unknown_error" };
  }
}

export interface CitizenIdentityAdapter {
  verifyDemoOtp(mobile: string, otp: string): AdapterResult<{ userId: string; mobile: string }>;
}

export interface PhysicianAssignmentAdapter {
  getAssignedPhysician(userId: string): AdapterResult<typeof physician>;
}

export interface HealthCenterAdapter {
  getAssignedCenter(userId: string): AdapterResult<(typeof healthCenters)[number]>;
}

export interface AppointmentAdapter {
  listAppointments(userId: string): AdapterResult<typeof appointments>;
}

export interface ReferralAdapter {
  listReferrals(userId: string): AdapterResult<typeof referrals>;
}

export const mockAdapters = {
  identity: {
    verifyDemoOtp: (mobile: string, otp: string) =>
      withTimeout(async () => {
        if (otp !== "123456" && otp.toLowerCase() !== "demo") {
          throw new Error("demo_otp_invalid");
        }
        return { userId: "00000000-0000-4000-8000-000000000001", mobile };
      }),
  } satisfies CitizenIdentityAdapter,
  physician: {
    getAssignedPhysician: () => withTimeout(async () => physician),
  } satisfies PhysicianAssignmentAdapter,
  center: {
    getAssignedCenter: () => withTimeout(async () => healthCenters[0]),
  } satisfies HealthCenterAdapter,
  appointments: {
    listAppointments: () => withTimeout(async () => appointments),
  } satisfies AppointmentAdapter,
  referrals: {
    listReferrals: () => withTimeout(async () => referrals),
  } satisfies ReferralAdapter,
};

export const productionAdapters = {
  identity: "placeholder_for_ministry_identity_api",
  physician: "placeholder_for_ministry_assignment_api",
  center: "placeholder_for_ministry_health_center_api",
  appointments: "placeholder_for_ministry_appointment_api",
  referrals: "placeholder_for_ministry_referral_api",
};

