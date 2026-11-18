// Mock auth client for static UI
import { BASE_URL } from "@/constants/BaseUrl";

// Define the custom signup data type
export interface CustomSignUpData {
  email: string;
  password: string;
  name: string;
  userType: "DOCTOR" | "PATIENT";
  website?: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: string;
  address?: {
    country: string;
    state: string;
    city: string;
    zipCode?: string;
  };
  profilePhoto?: string;
  image?: string;
  licenseNumber?: string;
  taxIdNumber?: string;
  npiNumber?: string;
  licenseStatus?: string;
  specialization?: string;
  experience?: string;
  [key: string]: any; 
}

// Mock session type
export interface MockSession {
  user: {
    id: string;
    email: string;
    name: string;
    userType: "DOCTOR" | "PATIENT";
    profilePhoto?: string;
    image?: string;
    website?: string;
    phone?: string;
    dateOfBirth?: string;
    gender?: string;
    address?: {
      country: string;
      state: string;
      city: string;
      zipCode?: string;
    };
    licenseNumber?: string;
    taxIdNumber?: string;
    npiNumber?: string;
    licenseStatus?: string;
    specialization?: string;
    experience?: string;
  };
}

// Mock auth client
export const authClient = {
  signIn: async (params: any) => {
    console.log("Mock signIn called with:", params);
    return { success: true };
  },
  signOut: async () => {
    console.log("Mock signOut called");
    return { success: true };
  },
  signUp: async (params: any) => {
    console.log("Mock signUp called with:", params);
    return { success: true };
  },
  requestPasswordReset: async (params: any) => {
    console.log("Mock requestPasswordReset called with:", params);
    return { success: true };
  }
};

// Mock functions
export const signIn = authClient.signIn;
export const signOut = authClient.signOut;
export const signUp = authClient.signUp;
export const requestPasswordReset = authClient.requestPasswordReset;

// Mock session management
let mockSession: MockSession | null = null;

export const getSession = async (): Promise<MockSession | null> => {
  return mockSession;
};

export const useSession = () => {
  return {
    data: mockSession,
    isLoading: false,
    error: null
  };
};
