
import StatusAlert from '@/components/base/StatusAlert';
import { createContext, useState, ReactNode, FC, Dispatch, SetStateAction, useContext } from 'react';

export interface StatusAlertContextProps {
  status: string | null;
  setStatus: Dispatch<SetStateAction<string | null>>;
  message: string | null;
  setMessage: Dispatch<SetStateAction<string | null>>;
}

const defaultState: StatusAlertContextProps = {
  status: null,
  setStatus: () => { },
  message: null,
  setMessage: () => { },
};

const StatusAlertContext = createContext<StatusAlertContextProps>(defaultState);

export const StatusProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [status, setStatus] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  return (
    <StatusAlertContext.Provider value={{ status, setStatus, message, setMessage }}>
      <StatusAlert />
      {children}
    </StatusAlertContext.Provider>
  );
};

export const useStatusAlertContext = (): StatusAlertContextProps => {
  const context = useContext(StatusAlertContext);
  return context;
};

export default StatusAlertContext;