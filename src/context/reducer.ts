import type { DashboardContextType, FnDispatchPayload, StructFetchStatus } from './types';

const casesGeneral = {
  SET_FETCH_STATUS: (state: DashboardContextType, payload: StructFetchStatus) => ({
    ...state,
    fetchProductListStatus: {
      ...state.fetchProductListStatus,
      ...payload,
    },
  }),
  SET_PAGE_ACTIVE: (state: DashboardContextType, payload: string) => ({
    ...state,
    pageActive: payload,
  })
};

const cases = {
  ...casesGeneral,

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
