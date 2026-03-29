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

  const buildProfile = (email: string, firstName: string, lastName: string, sport: string): Profile => ({
    id: `mock-${Date.now()}`,
    first_name: firstName,
    last_name: lastName,
    email,
    avatar_url: null,
    banner_color: "#0F172A",
    title: "Coaching Professional",
    institution: null,
    sport,
    level: null,
    location: null,
    state: null,
    years_experience: 0,
    philosophy: null,
    bio: null,
    roles: [],
    systems: [],
    certifications: [],
    awards: [],
    conferences: [],
    recruiting_territories: [],
    scheme_tags: [],
    culture_tags: [],
    side_of_ball: null,
    open_to_opportunities: true,
    availability_status: "open",
    is_verified: false,
    is_admin: false,
    role: "coach",
    profile_views: 0,
    search_appearances: 0,
    created_at: new Date().toISOString(),
  });

  const signUp = async (email: string, password: string, firstName: string, lastName: string, sport: string) => {
    if (!email || !password || !firstName || !lastName) {
      return { error: { message: "All fields are required." } };
    }
    const mockUser: User = { id: `user-${Date.now()}`, email };
    const mockProfile = buildProfile(email, firstName, lastName, sport);
    setUser(mockUser);
    setProfile(mockProfile);
    return { error: null };
  };

  const signIn = async (email: string, password: string) => {
    if (!email || !password) {
      return { error: { message: "Email and password are required." } };
    }
    const mockUser: User = { id: `user-${Date.now()}`, email };
    const firstName = email.split("@")[0].split(".")[0];
    const lastName = email.split("@")[0].split(".")[1] || "Coach";
    const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
    const mockProfile = buildProfile(email, capitalize(firstName), capitalize(lastName), "football");
    setUser(mockUser);
    setProfile(mockProfile);
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
