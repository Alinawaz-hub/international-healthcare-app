import {
  createTypedFetchHook,
  createTypedInvalidationHook,
} from "@/lib/query/query.utils";
import {
  DOCTOR_QUERY_KEYS,
  CLINIC_QUERY_KEYS,
  SERVICES_QUERY_KEYS,
  PATIENT_QUERY_KEYS,
} from "./query.keys";
import { userQueries } from "./modules/user-queries";

const QUERY_KEYS = {
  ...DOCTOR_QUERY_KEYS,
  ...CLINIC_QUERY_KEYS,
  ...SERVICES_QUERY_KEYS,
  ...PATIENT_QUERY_KEYS,
};

export const useTypedFetch = createTypedFetchHook(QUERY_KEYS);
export const useTypedInvalidation = createTypedInvalidationHook(QUERY_KEYS);

export { QUERY_KEYS };

// Export userQueries separately for modular usage
export { userQueries };
