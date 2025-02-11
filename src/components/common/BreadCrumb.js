import { Link, useLocation } from 'react-router-dom';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';

const routeNames = {
  '/dashboard': 'Dashboard',
  '/movimentacoes': 'Movimentações',
  '/contas': 'Contas',
  '/salarios': 'Salários',
  '/perfil': 'Perfil',
  '/configuracoes': 'Configurações',
};

export function BreadCrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav>
      <ol className="flex items-center space-x-2 text-sm">
        <li>
          <Link 
            to="/dashboard" 
            className="flex items-center text-text hover:text-primary transition-colors"
          >
            <HomeIcon className="h-4 w-4 mr-1" />
            Início
          </Link>
        </li>
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;

          return (
            <li key={to} className="flex items-center">
              <ChevronRightIcon className="h-4 w-4 text-gray-400 mr-2" />
              {last ? (
                <span className="font-medium text-primary">
                  {routeNames[to] || value}
                </span>
              ) : (
                <Link 
                  to={to}
                  className="text-text hover:text-primary transition-colors"
                >
                  {routeNames[to] || value}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
} 