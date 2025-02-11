import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { SwatchIcon } from '@heroicons/react/24/outline';

export default function Configuracoes() {
  const { theme, updateTheme } = useTheme();
  const [selectedColor, setSelectedColor] = useState(theme.primary);

  const borderRadiusOptions = [
    { label: 'Pequeno', value: 'sm' },
    { label: 'Médio', value: 'md' },
    { label: 'Grande', value: 'lg' },
    { label: 'Extra Grande', value: 'xl' },
  ];

  const colorPresets = [
    { name: 'Azul', primary: '#0ea5e9', secondary: '#64748b' },
    { name: 'Verde', primary: '#10b981', secondary: '#64748b' },
    { name: 'Roxo', primary: '#8b5cf6', secondary: '#64748b' },
    { name: 'Rosa', primary: '#ec4899', secondary: '#64748b' },
    { name: 'Laranja', primary: '#f97316', secondary: '#64748b' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-theme shadow-lg p-6 backdrop-blur-sm bg-opacity-90">
        <h2 className="text-xl font-semibold text-text mb-4 flex items-center">
          <SwatchIcon className="h-6 w-6 mr-2" />
          Personalização
        </h2>

        {/* Temas Predefinidos */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-text mb-3">Temas</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {colorPresets.map((preset) => (
              <button
                key={preset.name}
                onClick={() => updateTheme(preset)}
                className="flex flex-col items-center p-3 rounded-theme border transition-all hover:shadow-md"
                style={{ borderColor: preset.primary }}
              >
                <div
                  className="w-8 h-8 rounded-full mb-2"
                  style={{ backgroundColor: preset.primary }}
                />
                <span className="text-sm">{preset.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Personalização Avançada */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text mb-2">
              Cor Principal
            </label>
            <input
              type="color"
              value={theme.primary}
              onChange={(e) => updateTheme({ primary: e.target.value })}
              className="w-full h-10 rounded-theme cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-2">
              Cantos Arredondados
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {borderRadiusOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => updateTheme({ borderRadius: option.value })}
                  className={`px-4 py-2 rounded-theme border transition-all ${
                    theme.borderRadius === option.value
                      ? 'border-primary text-primary'
                      : 'border-gray-200 hover:border-primary'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={theme.glassEffect}
                onChange={(e) => updateTheme({ glassEffect: e.target.checked })}
                className="rounded-theme border-gray-300 text-primary focus:ring-primary"
              />
              <span className="text-sm font-medium text-text">Efeito Vidro</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
} 