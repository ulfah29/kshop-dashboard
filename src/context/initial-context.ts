const DEF_FETCH_STATUS = {
    loading: true,
    error: false,
    called: false,
};

export const PAGE_ACTIVE = {
    0: 'LANDING',
    1: 'MERCHLISTS',
}
  
const initialContext = {
    fetchProductListStatus: DEF_FETCH_STATUS,
    pageActive: PAGE_ACTIVE[0],
    productList: [],
    exchangeRate: 0,
    selectedEditProduct: {},
};

export default initialContext;