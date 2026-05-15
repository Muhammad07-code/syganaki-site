export const buildWhatsAppLink = (phone, message) => {
  const normalizedPhone = String(phone || '').replace(/[^\d]/g, '');
  return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message || '')}`;
};
