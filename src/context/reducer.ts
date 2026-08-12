import type { DashboardStateType, FnDispatchPayload, StructFetchStatus, StructProductList } from './types';

type DashboardActionType = FnDispatchPayload['type'];

type CaseHandler = (
  state: DashboardStateType,
  payload?: any
) => DashboardStateType;

const casesGeneral = {
  SET_PAGE_ACTIVE: (state: DashboardStateType, payload: string) => ({
    ...state,
    pageActive: payload,
  }),
  SET_EXCHANGE_RATE: (state: DashboardStateType, payload: number) => ({
    ...state,
    exchangeRate: payload,
  })
};

const casesProductList = {
    SET_FETCH_STATUS: (state: DashboardStateType, payload: StructFetchStatus) => ({
      ...state,
      fetchProductListStatus: {
        ...state.fetchProductListStatus,
        ...payload,
      },
    }),
    SET_PRODUCT_LIST: (state: DashboardStateType, payload: StructProductList[]) => ({
      ...state,
      productList: payload,
    }),
    SET_SELECTED_UPDATE_PRODUCT: (state: DashboardStateType, payload: StructProductList) => ({
      ...state,
      selectedEditProduct: {
        ...state.selectedEditProduct,
        ...payload,
      }
    })
}

const cases: Record<DashboardActionType, CaseHandler> = {
  ...casesGeneral,
  ...casesProductList,
};

const reducer = (state: DashboardStateType, action: FnDispatchPayload) => {
  try {
    if (import.meta.env.NODE_ENV === 'development') {
      console.log('__Dashboard__CONTEXT__', { ...action }, 'after', cases[action.type](state, action.payload));
    }
    return cases[action.type](state, action.payload);
  } catch (error) {
    console.error(error);
    return state;
  }
};

export default reducer;
