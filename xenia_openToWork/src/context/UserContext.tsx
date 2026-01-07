'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  name: string;
  email: string;
  id: string;
}

interface UserContextType {
  user: User | null;
  myEvents: string[];
  login: (userData: User) => void;
  register: (userData: User) => void;
  logout: () => void;
  addEvent: (eventId: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [myEvents, setMyEvents] = useState<string[]>([]);

  useEffect(() => {
    // Load from local storage on mount
    const storedUser = localStorage.getItem('xenia_user');
    const storedEvents = localStorage.getItem('xenia_events');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedEvents) {
      setMyEvents(JSON.parse(storedEvents));
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('xenia_user', JSON.stringify(userData));
  };

  const register = (userData: User) => {
    setUser(userData);
    localStorage.setItem('xenia_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setMyEvents([]);
    localStorage.removeItem('xenia_user');
    localStorage.removeItem('xenia_events');
  };

  const addEvent = (eventId: string) => {
    if (!myEvents.includes(eventId)) {
      const updatedEvents = [...myEvents, eventId];
      setMyEvents(updatedEvents);
      localStorage.setItem('xenia_events', JSON.stringify(updatedEvents));
    }
  };

  return (
    <UserContext.Provider value={{ user, myEvents, login, register, logout, addEvent }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
