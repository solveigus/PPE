import React from 'react';
import { DarkModeProvider } from './DarkModeContext';
import MainContent from './MainContent';

//This component is the basis of all of the pages
export default function Layout({
  children,
  title,
  description
}) {
  return (// use to apply the darkmode to hole the pages (to see our patern page, go to the MainContent page)
    <DarkModeProvider>
      <MainContent
        title={title}
        description={description}
      >
        {children}
      </MainContent>
    </DarkModeProvider>
  );
}