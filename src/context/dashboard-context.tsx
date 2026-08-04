import { createContext, useContext, useReducer } from 'react';
import reducer from './reducer';
import initialContext from './initial-context';
import type { DashboardContextType, DashboardProviderProps } from './types';

const getInitialContext = () => initialContext;

const DashboardContext = createContext<DashboardContextType>({ ...initialContext, dispatch: () => {} });

const useDashboardContext = () => useContext(DashboardContext);

const DashboardProvider = (props: DashboardProviderProps) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, {}, getInitialContext);

  const value = {
    ...state,
    dispatch,
  };

  return <DashboardContext.Provider {...{ value }}>{children}</DashboardContext.Provider>;
};

export { DashboardProvider, DashboardContext, useDashboardContext };
