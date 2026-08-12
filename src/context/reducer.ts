import type { DashboardContextType, FnDispatchPayload, StructFetchStatus, StructProductList } from './types';

const casesGeneral = {
  SET_PAGE_ACTIVE: (state: DashboardContextType, payload: string) => ({
    ...state,
    pageActive: payload,
  }),
  SET_EXCHANGE_RATE: (state: DashboardContextType, payload: number) => ({
    ...state,
    exchangeRate: payload,
  })
};

const casesProductList = {
    SET_FETCH_STATUS: (state: DashboardContextType, payload: StructFetchStatus) => ({
      ...state,
      fetchProductListStatus: {
        ...state.fetchProductListStatus,
        ...payload,
      },
    }),
    SET_PRODUCT_LIST: (state: DashboardContextType, payload: StructProductList) => ({
      ...state,
      productList: payload,
    }),
    SET_SELECTED_UPDATE_PRODUCT: (state: DashboardContextType, payload: StructProductList) => ({
      ...state,
      selectedEditProduct: {
        ...state.selectedEditProduct,
        ...payload,
      }
    })
}

const cases = {
  ...casesGeneral,
  ...casesProductList,
};

const reducer = (state: DashboardContextType, action: FnDispatchPayload) => {
  try {
    if (import.meta.env.NODE_ENV === 'development') {
      console.log('__Dashboard__CONTEXT__', { ...action }, 'after', cases[action.type](state, action.payload));
    }
    return cases[action.type](state, action.payload);
  } catch (error) {
    console.error(error);
  }
};

export default reducer;
