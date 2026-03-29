"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  email: string | null;
  avatar_url: string | null;
  banner_color: string;
  title: string | null;
  institution: string | null;
  sport: string | null;
  level: string | null;
  location: string | null;
  state: string | null;
  years_experience: number;
  philosophy: string | null;
  bio: string | null;
  roles: string[];
  systems: string[];
  certifications: string[];
  awards: string[];
  conferences: string[];
  recruiting_territories: string[];
  scheme_tags: string[];
  culture_tags: string[];
  side_of_ball: string | null;
  open_to_opportunities: boolean;
  availability_status: string;
  is_verified: boolean;
  is_admin: boolean;
  role: string;
  profile_views: number;
  search_appearances: number;
  created_at: string;
}

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  session: null;
  profile: Profile | null;
  loading: boolean;
  signUp: (email: string, password: string, firstName: string, lastName: string, sport: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading] = useState(false);

  const signUp = async (_email: string, _password: string, _firstName: string, _lastName: string, _sport: string) => {
    // No backend — stub only
    return { error: null };
  };

  const signIn = async (_email: string, _password: string) => {
    // No backend — stub only
    return { error: null };
  };

  const signOut = async () => {
    setUser(null);
    setProfile(null);
  };

  const refreshProfile = async () => {
    // No backend — no-op
  };

  return (
    <AuthContext.Provider value={{ user, session: null, profile, loading, signUp, signIn, signOut, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}

export type { Profile };
