import { createContext, useContext, useMemo, useState, type PropsWithChildren } from 'react'

export type AppUser = {
  name: string
  role: 'Community Health Worker'
  facility: string
}

type AppContextValue = {
  user: AppUser
  offline: boolean
  setOffline: (offline: boolean) => void
  logout: () => void
}

const defaultUser: AppUser = {
  name: 'Thandi Mokoena',
  role: 'Community Health Worker',
  facility: 'Gauteng Clinic',
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: PropsWithChildren) {
  const [offline, setOffline] = useState(false)
  const value = useMemo(() => ({
    user: defaultUser,
    offline,
    setOffline,
    logout: () => undefined,
  }), [offline])
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) throw new Error('useAppContext must be used within AppProvider')
  return context
}
