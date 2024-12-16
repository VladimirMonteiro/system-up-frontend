import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import Home from './home/Home';
import Ferramentas from './ferramentas/Ferramentas';
import Client from './cliente/Client';

const NAVIGATION = [
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'ferramentas',
    title: 'Ferramentas',
    icon: <ShoppingCartIcon />,
  },
  {
    segment: 'clientes',
    title: 'Clientes',
    icon: <ShoppingCartIcon />,
  },
  {
    segment: 'alugueis',
    title: 'Alugueis',
    icon: <ShoppingCartIcon />,
  },
  {
    segment: 'Alugar equipamento',
    title: 'Alugar equipamento',
    icon: <ShoppingCartIcon />,
  },
  {
    segment: 'relatórios',
    title: 'Relatórios',
    icon: <ShoppingCartIcon />,
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

// Componente para renderizar o conteúdo da página baseado no pathname atual
function DemoPageContent() {
  const location = useLocation();
  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Typography>Content for {location.pathname}</Typography>
    </Box>
  );
}

// Função principal para o layout do Dashboard
export default function DashboardLayoutBranding(props) {
  const { window, children } = props;
  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        title: 'Up Locações',
      }}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        {/* Define as rotas e o conteúdo das páginas */}
    
      {children}
      
       
       
      </DashboardLayout>
    </AppProvider>
  );
}

DashboardLayoutBranding.propTypes = {
  window: PropTypes.func,
  children: PropTypes.node,
};



