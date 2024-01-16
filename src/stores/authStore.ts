// authStore.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AccessToken = {
    access_token: string;
    refresh_token: string;
    scope: string;
    token_type: string;
    expires_in: number;
};

type ViewToken = {
    token: string;
    sid: string;
    rid: string;
    hsServerId?: string;
    isUserPwdExpired?: boolean;
    caches?: {
        baskets?: string;
        lastUpdatedTS?: string;
        multiplewatchlists?: string;
        techchartpreferences?: string;
    };
    ucc?: string;
    greetingName?: string;
    isTrialAccount?: boolean;
    dataCenter?: string;
    searchAPIKey?: string;
    derivativesRiskDisclosure?: string;
    mfAccess?: number;
    dataCenterMap?: null | any;
    dormancyStatus?: string;
};



interface AuthState {
    accessToken: AccessToken | null;
    viewToken: ViewToken | null;
    sessionToken: any;
    setAccessToken: (accessToken: AccessToken) => void;
    setViewToken: (accessToken: ViewToken) => void;
    setSessionToken: (accessToken: any) => void;
    clearTokens: () => void;
}

const useAuthStore = create<AuthState>()(
    persist<AuthState>(
        (set) => ({
            accessToken: null,
            refreshToken: null,
            viewToken: null,
            sessionToken: null,
            setAccessToken: (accessToken: AccessToken) => set({ accessToken }),
            setViewToken: (viewToken: ViewToken) => set({ viewToken }),
            setSessionToken: (sessionToken: any) => set({ sessionToken }),
            clearTokens: () => set({ accessToken: null, viewToken: null,sessionToken: null }),
        }),
        {
            name: 'auth'
        }
    )
);

export default useAuthStore
