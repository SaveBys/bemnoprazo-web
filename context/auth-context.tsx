"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getUserData } from "@/services/user.service";
import { userRoleEnum } from "@/types/enums/user-role.enum";
import { UserDataResponse } from "@/types/response/user-data.response";

type AuthContextType = {
  user: UserDataResponse | null;
  loading: boolean;

  isADM: boolean;
  isUserAdm: boolean;
  isEmployee: boolean;
  isAuthenticated: boolean;

  hasRole: (role: userRoleEnum) => boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserDataResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const data = await getUserData();
        setUser(data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  const hasRole = (role: userRoleEnum) => user?.userRole === role;

  const isADM = user?.userRole === userRoleEnum.ADM;
  const isUserAdm = user?.userRole === userRoleEnum.USER_ADM;
  const isEmployee = user?.userRole === userRoleEnum.USER_EMPLOYEE;
  const isAuthenticated = Boolean(user && user?.userRole);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isADM,
        isUserAdm,
        isEmployee,
        hasRole,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
