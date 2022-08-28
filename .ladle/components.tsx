import React from 'react';
import { GlobalProvider, ThemeState } from '@ladle/react';
import { useEffect } from 'react';
import './tailwind.css';
import { Layout } from '../src/utils/Layout';

export const Provider: GlobalProvider = ({ children, globalState }) => {
  useEffect(() => {
    if (globalState.theme === ThemeState.Dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [globalState.theme]);

  return <Layout>{children}</Layout>;
};
