import type { Dispatch, ReactNode } from 'react';

/* eslint-disable  @typescript-eslint/no-explicit-any */
export interface FnDispatchPayload {
    type: string;
    payload?: any;
}

export type FnDispatch = Dispatch<FnDispatchPayload>;

export interface StructFetchStatus {
    loading: boolean;
    error: boolean;
    called: boolean;
}

export interface DashboardStateType {
    fetchProductListStatus: StructFetchStatus;
    pageActive: string;
}
  
export interface DashboardProviderProps {
    children: ReactNode;
}

interface DashboardDispatch {
    dispatch: FnDispatch;
}

export type DashboardContextType = DashboardStateType & DashboardDispatch;