import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { BellIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

export function NotificationDropdown({ notifications = [] }) {
  const unreadCount = notifications.length;

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="relative p-2 rounded-theme hover:bg-gray-100 transition-colors">
        <BellIcon className="h-6 w-6 text-text" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-danger rounded-full">
            {unreadCount}
          </span>
        )}
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-80 origin-top-right bg-glass backdrop-blur-theme rounded-theme shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div className="p-4">
            <h3 className="text-lg font-medium text-text mb-4">Notificações</h3>
            {notifications.length > 0 ? (
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <Menu.Item key={notification.id}>
                    {({ active }) => (
                      <Link
                        to="/contas"
                        className={`block p-3 rounded-theme ${
                          active ? 'bg-primary/5' : ''
                        }`}
                      >
                        <div className="flex items-start">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-text">
                              {notification.title}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {notification.message}
                            </p>
                          </div>
                          <span className="text-xs text-gray-400 ml-2">
                            {notification.timeAgo}
                          </span>
                        </div>
                      </Link>
                    )}
                  </Menu.Item>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center">
                Nenhuma notificação no momento
              </p>
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
} 