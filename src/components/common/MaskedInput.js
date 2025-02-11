import InputMask from 'react-input-mask';
import { NumericFormat } from 'react-number-format';

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
  return (
    <InputMask
      mask="99/99/9999"
      value={value}
      onChange={onChange}
      className={`input-theme ${className || ''}`}
      placeholder="DD/MM/AAAA"
      {...props}
    />
  );
}

export function CpfInput({ value, onChange, className, ...props }) {
  return (
    <InputMask
      mask="999.999.999-99"
      value={value}
      onChange={onChange}
      className={`input-theme ${className || ''}`}
      {...props}
    />
  );
}

export function PhoneInput({ value, onChange, className, ...props }) {
  return (
    <InputMask
      mask="(99) 99999-9999"
      value={value}
      onChange={onChange}
      className={`input-theme ${className || ''}`}
      {...props}
    />
  );
}

export function PisInput({ value, onChange, className, ...props }) {
  return (
    <InputMask
      mask="999.99999.99-9"
      value={value}
      onChange={onChange}
      className={`input-theme ${className || ''}`}
      {...props}
    />
  );
}

export function CurrencyInput({ value, onValueChange, className, ...props }) {
  return (
    <NumericFormat
      value={value}
      onValueChange={(values) => {
        onValueChange(values.floatValue);
      }}
      thousandSeparator="."
      decimalSeparator=","
      prefix="R$ "
      decimalScale={2}
      fixedDecimalScale
      className={`input-theme ${className || ''}`}
      {...props}
    />
  );
} 