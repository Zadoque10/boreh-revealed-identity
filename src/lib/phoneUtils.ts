/**
 * Utilitários para validação e formatação de telefones brasileiros
 */

/**
 * Remove todos os caracteres não numéricos do telefone
 */
export const cleanPhone = (phone: string): string => {
  return phone.replace(/\D/g, "");
};

/**
 * Valida se o telefone é um número brasileiro válido
 * Aceita: (11) 99999-9999, 11999999999, +5511999999999, etc.
 */
export const isValidBrazilianPhone = (phone: string): boolean => {
  const cleaned = cleanPhone(phone);
  
  // Remove código do país se presente (+55)
  const phoneWithoutCountry = cleaned.startsWith("55") 
    ? cleaned.slice(2) 
    : cleaned;
  
  // Telefone brasileiro deve ter 10 ou 11 dígitos (com DDD)
  // 10 dígitos: telefone fixo (DDD + 8 dígitos)
  // 11 dígitos: celular (DDD + 9 dígitos começando com 9)
  if (phoneWithoutCountry.length < 10 || phoneWithoutCountry.length > 11) {
    return false;
  }
  
  // Verifica se é celular (11 dígitos e começa com 9 após o DDD)
  if (phoneWithoutCountry.length === 11) {
    const ddd = phoneWithoutCountry.slice(0, 2);
    const number = phoneWithoutCountry.slice(2);
    
    // DDD válido (11-99, exceto alguns números reservados)
    const validDDD = /^[1-9][1-9]$/.test(ddd);
    // Celular deve começar com 9
    const validCellphone = number.startsWith("9");
    
    return validDDD && validCellphone;
  }
  
  // Telefone fixo (10 dígitos)
  if (phoneWithoutCountry.length === 10) {
    const ddd = phoneWithoutCountry.slice(0, 2);
    const validDDD = /^[1-9][1-9]$/.test(ddd);
    return validDDD;
  }
  
  return false;
};

/**
 * Formata telefone para exibição: (11) 99999-9999
 */
export const formatPhone = (phone: string): string => {
  const cleaned = cleanPhone(phone);
  
  // Remove código do país se presente
  const phoneWithoutCountry = cleaned.startsWith("55") 
    ? cleaned.slice(2) 
    : cleaned;
  
  if (phoneWithoutCountry.length === 11) {
    // Celular: (11) 99999-9999
    return phoneWithoutCountry.replace(
      /(\d{2})(\d{5})(\d{4})/,
      "($1) $2-$3"
    );
  }
  
  if (phoneWithoutCountry.length === 10) {
    // Fixo: (11) 9999-9999
    return phoneWithoutCountry.replace(
      /(\d{2})(\d{4})(\d{4})/,
      "($1) $2-$3"
    );
  }
  
  // Se não tiver tamanho válido, retorna limpo
  return phoneWithoutCountry;
};

/**
 * Normaliza telefone para formato padrão: 5511999999999 (com código do país)
 */
export const normalizePhone = (phone: string): string => {
  const cleaned = cleanPhone(phone);
  
  // Se já começar com 55, retorna como está
  if (cleaned.startsWith("55")) {
    return cleaned;
  }
  
  // Adiciona código do país
  return `55${cleaned}`;
};

/**
 * Aplica máscara de telefone enquanto o usuário digita
 */
export const applyPhoneMask = (value: string): string => {
  const cleaned = cleanPhone(value);
  
  // Limita a 11 dígitos (DDD + 9 dígitos do celular)
  const limited = cleaned.slice(0, 11);
  
  if (limited.length <= 2) {
    return limited;
  }
  
  if (limited.length <= 7) {
    return `(${limited.slice(0, 2)}) ${limited.slice(2)}`;
  }
  
  return `(${limited.slice(0, 2)}) ${limited.slice(2, 7)}-${limited.slice(7)}`;
};
