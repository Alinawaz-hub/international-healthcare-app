import { defineQuery } from "./query.utils";

export const DOCTOR_QUERY_KEYS = {
  appointments: defineQuery({
    path: "doctors",
    queryKey: ["appointment-doctors"],
  }),
};

export const CLINIC_QUERY_KEYS = {
  clinics: defineQuery<{ clinics: any[] }, undefined, undefined>({
    path: "admin/clinics",
    queryKey: ["clinics"],
  }),
};

export const SERVICES_QUERY_KEYS = {
  services: defineQuery<{ services: any[] }, undefined, undefined>({
    path: "services",
    queryKey: ["services"],
  }),
};

export const PATIENT_QUERY_KEYS = {
  appointments: defineQuery<
    { appointments: any[] },
    { patientId: string },
    undefined
  >({
    path: (params) => `patients/${params.patientId}/appointments`,
    queryKey: (params) => ["patient-appointments", params.patientId],
    requiresParams: true,
  }),
};
