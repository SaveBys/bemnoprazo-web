"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getUserData } from "@/services/user.service";
import { userRoleEnum } from "@/types/enums/user-role.enum";
import { UserDataResponse } from "@/types/response/user-data.response";
import { usePathname } from "next/navigation";

type AuthContextType = {
  user: UserDataResponse | null;
  loading: boolean;

  isADM: boolean;
  isUserAdm: boolean;
  isEmployee: boolean;
  isAuthenticated: boolean;

  hasRole: (role: userRoleEnum) => boolean;
  setUsarData: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserDataResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  const setUsarData = async () => {
    try {
      const data = await getUserData();
      setUser(data);
    } catch {
      setUser(null);
    }
  };

  const hasRole = (role: userRoleEnum) => user?.userRole === role;

  const isAuthenticated = Boolean(user);
  const isADM = user?.userRole === userRoleEnum.ADM && isAuthenticated;
  const isUserAdm = user?.userRole === userRoleEnum.USER_ADM && isAuthenticated;
  const isEmployee = user?.userRole === userRoleEnum.USER_EMPLOYEE && isAuthenticated;

  useEffect(() => {
    async function loadUser() {
      if (pathname.startsWith("/user")) {
        setLoading(false);
        return;
      }

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
  }, [pathname]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isADM,
        isUserAdm,
        isEmployee,
        isAuthenticated,
        hasRole,
        setUsarData,
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
