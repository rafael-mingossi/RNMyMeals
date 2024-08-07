import React from 'react';
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import {Session} from '@supabase/supabase-js';
import {supabase} from '@services';
import {Tables} from '@types';

type AuthData = {
  session: Session | null;
  loading: boolean;
  profile: Tables<'profiles'> | null;
  userLogOut: () => void;
};

const AuthContext = createContext<AuthData>({
  session: null,
  loading: true,
  profile: null,
  userLogOut: () => {},
});

const AuthProvider = ({children}: PropsWithChildren) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Tables<'profiles'> | null>(null);

  async function userLogOut() {
    setSession(null);
    setProfile(null);
    await supabase.auth.signOut();
  }

  useEffect(() => {
    const fetchSession = async () => {
      const {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        data: {session},
      } = await supabase.auth.getSession();

      setSession(session);
      if (session) {
        // fetch profile
        const {data} = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        setProfile(data || null);
        console.log('USER API CALLED AUTH PROVIDER');
      }

      setLoading(false);
    };

    fetchSession().then(() => {});

    supabase.auth.onAuthStateChange((_event, userSession) => {
      setSession(userSession);
    });
  }, []);

  return (
    <AuthContext.Provider value={{session, loading, profile, userLogOut}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
