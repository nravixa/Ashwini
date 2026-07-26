import { PHONE_NUMBER } from "./contact";

export const WHATSAPP_NUMBER = PHONE_NUMBER;

export const WHATSAPP_MESSAGE =
  "Hi! I visited your website and would like to book an appointment. Could you please share the available slots?";

export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;

export const getWhatsAppUrl = (messageText: string) => {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(messageText)}`;
};

export * from "./contact";
