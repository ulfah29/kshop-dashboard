import type { Dispatch, ReactNode } from 'react';

/* eslint-disable  @typescript-eslint/no-explicit-any */
export interface StructFetchStatus {
    loading: boolean;
    error: boolean;
    called: boolean;
}

export interface StructProductList {
    id?: string,
    created_at?: string,
    name?: string,
    price_won?: number,
    exchange_rate_won?: number,
    price_idr?: number,
    weight?: number,
    web_shipping_cost?: number,
    local_shipping_cost?: number,
    ems_price?: number,
    packing_fee?: number,
    total_price_product?: number,
    admin_handling_fee?: number,
    total_price_net?: number,
    category?: string,
    merch_group?: string,
}

export interface DashboardStateType {
    fetchProductListStatus: StructFetchStatus;
    pageActive: string;
    productList: StructProductList[];
    exchangeRate: number;
    selectedEditProduct: StructProductList;
}
  
export interface DashboardProviderProps {
    children: ReactNode;
}

export type DashboardActionType =
  | 'SET_PAGE_ACTIVE'
  | 'SET_EXCHANGE_RATE'
  | 'SET_FETCH_STATUS'
  | 'SET_PRODUCT_LIST'
  | 'SET_SELECTED_UPDATE_PRODUCT';

export interface FnDispatchPayload {
    type: DashboardActionType;
    payload?: any;
}

export type FnDispatch = Dispatch<FnDispatchPayload>;

interface DashboardDispatch {
    dispatch: FnDispatch;
}

export type DashboardContextType = DashboardStateType & DashboardDispatch;