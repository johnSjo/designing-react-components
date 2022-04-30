import { createContext, PropsWithChildren, useState } from 'react';

class useStateWrapper<T> {
  wrapped(e: T) {
    return useState<T>(e);
  }
}

interface IAuthContext {
  readonly loggedInUser: ReturnType<useStateWrapper<string>['wrapped']>[0];
  readonly setLoggedInUser: ReturnType<useStateWrapper<string>['wrapped']>[1];
}

export const AuthContext = createContext<IAuthContext | null>(null);

interface IAuthProviderConfig {
  readonly initialLoggedInUser: string;
}

export function AuthProvider({
  children,
  initialLoggedInUser,
}: PropsWithChildren<IAuthProviderConfig>) {
  const [loggedInUser, setLoggedInUser] = useState(initialLoggedInUser);
  return (
    <AuthContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {children}
    </AuthContext.Provider>
  );
}
