import { createContext, useContext, useEffect, useMemo, useState, type PropsWithChildren } from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { supabase, type Profile, type Role } from '../lib/supabase'
import { deleteAccount, getProfile } from '../lib/repositories'

export type AppUser = Profile

type AppContextValue = {
  authUser: User | null
  user: AppUser | null
  authLoading: boolean
  authError: string | null
  offline: boolean
  setOffline: (offline: boolean) => void
  signIn: (email: string, password: string) => Promise<void>
  signUp: (input: { email: string; password: string; fullName: string; role: Role; facility: string }) => Promise<void>
  logout: () => Promise<void>
  removeAccount: () => Promise<void>
  refreshProfile: () => Promise<void>
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: PropsWithChildren) {
  const [offline, setOffline] = useState(false)
  const [authUser, setAuthUser] = useState<User | null>(null)
  const [user, setUser] = useState<AppUser | null>(null)
  const [authLoading, setAuthLoading] = useState(Boolean(supabase))
  const [authError, setAuthError] = useState<string | null>(null)

  const loadProfile = async (session: Session | null) => {
    setAuthUser(session?.user ?? null)
    if (!session) {
      setUser(null)
      return
    }
    try {
      setUser(await getProfile(session.user.id))
      setAuthError(null)
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : 'Unable to load your profile.')
      setUser(null)
    }
  }

  useEffect(() => {
    if (!supabase) {
      return
    }
    let active = true
    void supabase.auth.getSession().then(({ data, error }) => {
      if (!active) return
      if (error) setAuthError(error.message)
      void loadProfile(data.session).finally(() => setAuthLoading(false))
    })
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (active) void loadProfile(session)
    })
    return () => {
      active = false
      listener.subscription.unsubscribe()
    }
  }, [])

  const value = useMemo(() => ({
    authUser,
    user,
    authLoading,
    authError,
    offline,
    setOffline,
    signIn: async (email: string, password: string) => {
      if (!supabase) throw new Error('Unable to reach the authentication service. Please try again.')
      setAuthError(null)
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
    },
    signUp: async ({ email, password, fullName, role, facility }: { email: string; password: string; fullName: string; role: Role; facility: string }) => {
      if (!supabase) throw new Error('Unable to reach the authentication service. Please try again.')
      setAuthError(null)
      const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { full_name: fullName, role, facility } } })
      if (error) throw error
      if (!data.session) throw new Error('Account created. Check your email to confirm your account before signing in.')
    },
    logout: async () => {
      if (!supabase) throw new Error('Unable to reach the authentication service. Please try again.')
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    },
    removeAccount: async () => {
      if (!authUser) throw new Error('You must be signed in to delete your account.')
      await deleteAccount(authUser)
    },
    refreshProfile: async () => {
      if (authUser) setUser(await getProfile(authUser.id))
    },
  }), [authError, authLoading, authUser, offline, user])
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) throw new Error('useAppContext must be used within AppProvider')
  return context
}
