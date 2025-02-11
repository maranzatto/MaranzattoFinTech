import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  HomeIcon, 
  WalletIcon, 
  BanknotesIcon, 
  ArrowTrendingUpIcon,
  Bars3Icon,
  XMarkIcon,
  Cog6ToothIcon,
  UserIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { NotificationDropdown } from '../common/NotificationDropdown';
import { BreadCrumb } from '../common/BreadCrumb';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Movimentações', href: '/movimentacoes', icon: WalletIcon },
  { name: 'Contas', href: '/contas', icon: BanknotesIcon },
  { name: 'Salários', href: '/salarios', icon: ArrowTrendingUpIcon },
  { name: 'Perfil', href: '/perfil', icon: UserIcon },
  { name: 'Configurações', href: '/configuracoes', icon: Cog6ToothIcon },
];

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { logout, getCurrentUsername } = useAuth();
  const [notifications, setNotifications] = useState([]);

  // Detecta se é dispositivo móvel
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Simula a verificação de contas próximas ao vencimento
  useEffect(() => {
    const checkUpcomingBills = () => {
      // Aqui você faria uma chamada à API para buscar as contas
      // Por enquanto, vamos simular algumas notificações
      const mockNotifications = [
        {
          id: 1,
          title: 'Conta próxima ao vencimento',
          message: 'Aluguel - Vence em 3 dias (R$ 1.500,00)',
          timeAgo: '1h atrás'
        },
        {
          id: 2,
          title: 'Conta vencendo hoje',
          message: 'Internet - Vence hoje (R$ 100,00)',
          timeAgo: '2h atrás'
        }
      ];
      setNotifications(mockNotifications);
    };

    checkUpcomingBills();
    // Em produção, você pode querer atualizar periodicamente
    const interval = setInterval(checkUpcomingBills, 5 * 60 * 1000); // A cada 5 minutos

    return () => clearInterval(interval);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setMobileMenuOpen(!mobileMenuOpen);
    } else {
      setSidebarOpen(!sidebarOpen);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: theme.background }}>
      {/* Overlay para mobile */}
      {isMobile && mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Header Mobile */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white shadow-sm z-30 px-4">
        <div className="flex items-center justify-between h-full">
          <h1 className="text-xl font-bold" style={{ color: theme.text }}>
            Finanças
          </h1>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-theme hover:bg-opacity-10"
            style={{ backgroundColor: `${theme.primary}10` }}
          >
            <Bars3Icon className="h-6 w-6" style={{ color: theme.primary }} />
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-50 transform transition-all duration-200 ease-in-out flex flex-col
          ${isMobile ? 'w-64' : sidebarOpen ? 'w-64' : 'w-20'} 
          ${isMobile ? (mobileMenuOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'}
          ${isMobile ? 'bg-white shadow-lg' : 'bg-glass backdrop-blur-theme'}
          border-r border-gray-200/20`}
      >
        {/* Header Desktop */}
        <div className={`flex h-16 items-center justify-between px-4 ${isMobile ? 'mt-0' : 'mt-0'}`}>
          <div className="flex flex-col">
            <h1 
              className={`text-xl font-bold transition-all duration-200 ${
                (isMobile || sidebarOpen) ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'
              }`} 
              style={{ color: theme.text }}
            >
              Finanças
            </h1>
            {sidebarOpen && (
              <span className="text-sm text-gray-500 truncate">
                Olá, {getCurrentUsername()}
              </span>
            )}
          </div>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-theme hover:bg-opacity-10 transition-colors"
            style={{ backgroundColor: `${theme.primary}10` }}
          >
            {isMobile ? (
              <XMarkIcon className="h-6 w-6" style={{ color: theme.primary }} />
            ) : sidebarOpen ? (
              <ChevronLeftIcon className="h-6 w-6" style={{ color: theme.primary }} />
            ) : (
              <ChevronRightIcon className="h-6 w-6" style={{ color: theme.primary }} />
            )}
          </button>
        </div>

        {/* Container para navegação e botão de logout */}
        <div className="flex flex-col flex-1 justify-between">
          {/* Navigation */}
          <nav className="mt-5 px-2 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => isMobile && setMobileMenuOpen(false)}
                  className={`group flex items-center px-2 py-2 text-base font-medium rounded-theme transition-all
                    ${isActive ? 'text-white' : 'hover:bg-opacity-10'}
                    ${(isMobile || sidebarOpen) ? '' : 'justify-center'}`}
                  style={{
                    backgroundColor: isActive ? theme.primary : `${theme.primary}00`,
                    color: isActive ? 'white' : theme.text,
                  }}
                  title={(!isMobile && !sidebarOpen) ? item.name : ''}
                >
                  <item.icon
                    className={`flex-shrink-0 h-6 w-6 transition-all ${
                      isActive ? 'text-white' : ''
                    } ${(isMobile || sidebarOpen) ? 'mr-4' : 'mr-0'}`}
                  />
                  <span 
                    className={`transition-all duration-200 ${
                      (isMobile || sidebarOpen) ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'
                    }`}
                  >
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Botão de Logout */}
          <div className="p-2 mb-4">
            <button
              onClick={handleLogout}
              className={`w-full group flex items-center px-2 py-2 text-base font-medium rounded-theme transition-all
                hover:bg-danger hover:text-white
                ${(isMobile || sidebarOpen) ? '' : 'justify-center'}`}
              style={{ color: theme.danger }}
            >
              <ArrowRightOnRectangleIcon
                className={`flex-shrink-0 h-6 w-6 transition-all group-hover:text-white
                  ${(isMobile || sidebarOpen) ? 'mr-4' : 'mr-0'}`}
              />
              <span 
                className={`transition-all duration-200 group-hover:text-white
                  ${(isMobile || sidebarOpen) ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'}`}
              >
                Sair
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div 
        className={`flex-1 transition-all duration-200 w-full
          ${isMobile ? 'ml-0 mt-16' : sidebarOpen ? 'ml-64' : 'ml-20'}
        `}
      >
        <main className="p-6 pb-12 h-[calc(100vh-4rem)] md:h-screen overflow-auto w-full">
          {/* Header com Breadcrumb e Notificações */}
          <div className="flex justify-between items-center mb-6">
            <BreadCrumb />
            <NotificationDropdown notifications={notifications} />
          </div>

          <div className="max-w-full mx-auto h-full space-y-8 pb-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 