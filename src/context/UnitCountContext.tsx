import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UnitCountContextData {
  userData: UserData;
  loginData: LoginData;
  updateUserData: (
    id: string,
    password: string,
    name: string,
    phonenum: string,
  ) => void;
  updateLoginData: (id: string, password: string) => void;
  clearUserData: () => void;
  clearLoginData: () => void;
}

interface UserData {
  id: string;
  password: string;
  name: string;
  phonenum: string;
}

interface UnitCountContextProviderProps {
  children: ReactNode;
}

interface LoginData {
  id: string;
  password: string;
}

const UnitCountContext = createContext<UnitCountContextData | undefined>(
  undefined,
);

const UnitCountContextProvider: React.FC<UnitCountContextProviderProps> = ({
  children,
}) => {
  const [userData, setUserData] = useState<UserData>({
    id: '',
    password: '',
    name: '',
    phonenum: '',
  });

  const updateUserData = (
    id: string,
    password: string,
    name: string,
    phonenum: string,
  ) => {
    setUserData({
      id,
      password,
      name,
      phonenum,
    });
  };

  const [loginData, setLoginData] = useState<LoginData>({
    id: '',
    password: '',
  });

  const updateLoginData = (id: string, password: string) => {
    setLoginData({
      id,
      password,
    });
  };

  const clearUserData = () => {
    setUserData({
      id: '',
      password: '',
      name: '',
      phonenum: '',
    });
  };

  const clearLoginData = () => {
    setLoginData({
      id: '',
      password: '',
    });
  };

  return (
    <UnitCountContext.Provider
      value={{
        userData,
        updateUserData,
        loginData,
        updateLoginData,
        clearUserData,
        clearLoginData,
      }}>
      {children}
    </UnitCountContext.Provider>
  );
};

const useCount = (): UnitCountContextData => {
  const context = useContext(UnitCountContext);
  if (!context) {
    throw new Error('프로바이더 내부에서 생성해야됨 님아');
  }
  return context;
};

export { UnitCountContextProvider, useCount };
