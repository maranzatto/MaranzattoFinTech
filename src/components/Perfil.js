import { useState } from 'react';
import { 
  UserCircleIcon, 
  KeyIcon, 
  BellIcon, 
  SwatchIcon,
  CameraIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { Input } from './common/Input';
import { Button } from './common/Button';
import { Card } from './common/Card';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

export default function Perfil() {
  const { theme } = useTheme();
  const { getCurrentUsername } = useAuth();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [activeTab, setActiveTab] = useState('perfil');

  const [profileData, setProfileData] = useState({
    nome: 'João Silva',
    email: 'joao@exemplo.com',
    telefone: '(11) 98765-4321',
    cargo: 'Gerente Financeiro',
    empresa: 'MZFinanças',
    foto: null
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    weeklyReport: true,
    monthlyReport: true
  });

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simula atualização
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSuccessMessage('Perfil atualizado com sucesso!');
    setLoading(false);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData(prev => ({ ...prev, foto: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        {/* Header do Perfil */}
        <div className="p-6 bg-primary/5">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100">
                {profileData.foto ? (
                  <img 
                    src={profileData.foto} 
                    alt="Foto de perfil" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <UserCircleIcon className="w-full h-full text-gray-400" />
                )}
              </div>
              <label className="absolute bottom-0 right-0 p-1.5 bg-white rounded-full shadow-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <CameraIcon className="w-5 h-5 text-gray-600" />
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-2xl font-bold text-gray-900">{profileData.nome}</h1>
              <p className="text-gray-600">{profileData.cargo}</p>
            </div>
          </div>
        </div>

        {/* Navegação das Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex gap-4 px-6">
            {['perfil', 'notificações', 'segurança'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-2 border-b-2 transition-colors capitalize ${
                  activeTab === tab 
                    ? 'border-primary text-primary font-medium'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Conteúdo */}
        <div className="p-6">
          {successMessage && (
            <div className="mb-6 p-4 bg-success/10 text-success rounded-theme flex items-center">
              <CheckCircleIcon className="w-5 h-5 mr-2" />
              {successMessage}
            </div>
          )}

          {activeTab === 'perfil' && (
            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="form-label">Nome Completo</label>
                  <Input
                    type="text"
                    value={profileData.nome}
                    onChange={(e) => setProfileData({ ...profileData, nome: e.target.value })}
                  />
                </div>
                <div>
                  <label className="form-label">Email</label>
                  <Input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="form-label">Telefone</label>
                  <Input
                    type="tel"
                    value={profileData.telefone}
                    onChange={(e) => setProfileData({ ...profileData, telefone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="form-label">Cargo</label>
                  <Input
                    type="text"
                    value={profileData.cargo}
                    onChange={(e) => setProfileData({ ...profileData, cargo: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit" loading={loading}>
                  Salvar Alterações
                </Button>
              </div>
            </form>
          )}

          {activeTab === 'notificações' && (
            <div className="space-y-6">
              {Object.entries(notificationSettings).map(([key, value]) => (
                <label key={key} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </span>
                  <div className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={value}
                      onChange={() => setNotificationSettings(prev => ({
                        ...prev,
                        [key]: !prev[key]
                      }))}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </div>
                </label>
              ))}
            </div>
          )}

          {activeTab === 'segurança' && (
            <form className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="form-label">Senha Atual</label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <div>
                  <label className="form-label">Nova Senha</label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <div>
                  <label className="form-label">Confirmar Nova Senha</label>
                  <Input type="password" placeholder="••••••••" />
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit">
                  Atualizar Senha
                </Button>
              </div>
            </form>
          )}
        </div>
      </Card>
    </div>
  );
} 