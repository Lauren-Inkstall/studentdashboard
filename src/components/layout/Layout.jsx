import React from 'react';
import { SidebarProvider } from '../../context/SidebarContext';
import SpaceBackground from './SpaceBackground';
import AppNavbar from './Navbar';
import Sidebar from './Sidebar';
import PageWrapper from './PageWrapper';
import '../../styles/Layout.css';

const Layout = ({ children }) => {
  return (
    <SidebarProvider>
      <SpaceBackground>
        <div className="app-container min-h-screen flex flex-col">
          <AppNavbar className="flex-shrink-0" />
          <div className="main-content-wrapper flex-1 flex overflow-hidden">
            <Sidebar className="flex-shrink-0" />
            <PageWrapper className="flex-1 overflow-auto">
              {children}
              <footer className="dashboard-footer mt-auto py-4">
                <small>&copy; {new Date().getFullYear()} Past Paper Tracker</small>
              </footer>
            </PageWrapper>
          </div>
        </div>
      </SpaceBackground>
    </SidebarProvider>
  );
};

export default Layout;
