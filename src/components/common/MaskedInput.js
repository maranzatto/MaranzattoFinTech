// Funções auxiliares de formatação
const formatters = {
  phone: (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3');
    }
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  },

  cpf: (value) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  },

  pis: (value) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{3})(\d{5})(\d{2})(\d{1})/, '$1.$2.$3-$4');
  },

  currency: (value) => {
    if (!value && value !== 0) return '';
    
    // Converte para número e formata com 2 casas decimais
    const numberValue = typeof value === 'string' ? 
      Number(value.replace(/\D/g, '')) / 100 : 
      value;

    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numberValue);
  },

  date: (value) => {
    const numbers = value.replace(/\D/g, '');
    
    // Formata como DD/MM/AAAA
    return numbers.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
  }
};

// Funções de validação
const validators = {
  phone: (value) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.length >= 10 && numbers.length <= 11;
  },

  cpf: (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length !== 11) return false;

    // Validação do algoritmo do CPF
    let sum = 0;
    let remainder;

    if (numbers === '00000000000') return false;

    for (let i = 1; i <= 9; i++) {
      sum = sum + parseInt(numbers.substring(i - 1, i)) * (11 - i);
    }

    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(numbers.substring(9, 10))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum = sum + parseInt(numbers.substring(i - 1, i)) * (12 - i);
    }

    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(numbers.substring(10, 11))) return false;

    return true;
  },

  pis: (value) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.length === 11;
  },

  date: (value) => {
    if (!value) return false;
    
    const [day, month, year] = value.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    
    return date instanceof Date && !isNaN(date) &&
           date.getDate() === day &&
           date.getMonth() === month - 1 &&
           date.getFullYear() === year;
  }
};

// Componentes de Input
export function DateInput({ value, onChange, className, ...props }) {
  const handleChange = (e) => {
    let newValue = e.target.value.replace(/\D/g, '');
    
    if (newValue.length > 8) {
      newValue = newValue.substr(0, 8);
    }
    
    const formattedValue = formatters.date(newValue);
    onChange({ target: { value: formattedValue } });
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      className={className}
      placeholder="DD/MM/AAAA"
      maxLength={10}
      {...props}
    />
  );
}

export function CpfInput({ value, onChange, className, onValidate, ...props }) {
  const handleChange = (e) => {
    let newValue = e.target.value.replace(/\D/g, '');
    
    if (newValue.length > 11) {
      newValue = newValue.substr(0, 11);
    }
    
    const formattedValue = formatters.cpf(newValue);
    onChange({ target: { value: formattedValue } });
    
    if (onValidate) {
      onValidate(validators.cpf(formattedValue));
    }
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      className={className}
      placeholder="000.000.000-00"
      maxLength={14}
      {...props}
    />
  );
}

export function PhoneInput({ value, onChange, className, ...props }) {
  const handleChange = (e) => {
    let newValue = e.target.value.replace(/\D/g, '');
    
    if (newValue.length > 11) {
      newValue = newValue.substr(0, 11);
    }
    
    const formattedValue = formatters.phone(newValue);
    onChange({ target: { value: formattedValue } });
  };

  return (
    <input
      type="tel"
      value={value}
      onChange={handleChange}
      className={className}
      placeholder="(00) 00000-0000"
      maxLength={15}
      {...props}
    />
  );
}

export function PisInput({ value, onChange, className, ...props }) {
  const handleChange = (e) => {
    let newValue = e.target.value.replace(/\D/g, '');
    
    if (newValue.length > 11) {
      newValue = newValue.substr(0, 11);
    }
    
    const formattedValue = formatters.pis(newValue);
    onChange({ target: { value: formattedValue } });
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      className={className}
      placeholder="000.00000.00-0"
      maxLength={14}
      {...props}
    />
  );
}

export function CurrencyInput({ value, onValueChange, className, ...props }) {
  const handleChange = (e) => {
    const inputValue = e.target.value.replace(/\D/g, '');
    const numberValue = Number(inputValue) / 100;
    onValueChange(numberValue);
  };

  const handleKeyDown = (e) => {
    // Permite: backspace, delete, tab, escape, enter e .
    if ([46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
        // Permite: Ctrl+A, Command+A
        (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
        // Permite: home, end, left, right, down, up
        (e.keyCode >= 35 && e.keyCode <= 40)) {
      return;
    }
    // Garante que é um número e impede o evento keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) &&
        (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault();
    }
  };

  return (
    <input
      type="text"
      value={formatters.currency(value)}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      className={className}
      placeholder="R$ 0,00"
      {...props}
    />
  );
} 