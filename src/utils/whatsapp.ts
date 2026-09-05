export const PRIMARY_WHATSAPP = '250783553278';
export const SECONDARY_WHATSAPP = '250788724724';

export function createWhatsAppLink(message: string, phone: string = PRIMARY_WHATSAPP): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encoded}`;
}

export function getGeneralWhatsAppLink(): string {
  return createWhatsAppLink("Hello IAN'S Travel & Tours, I would like assistance with planning my travel.");
}

export function getFlightEnquiryWhatsAppLink(details: {
  departureCity: string;
  destinationCity: string;
  tripType: string;
  departureDate: string;
  returnDate?: string;
  travelers: { adults: number; children: number; infants: number };
  preferredClass: string;
  customerName: string;
}): string {
  const totalTravelers = details.travelers.adults + details.travelers.children + details.travelers.infants;
  const msg = `Hello IAN'S Travel & Tours, I would like help booking a flight:
• Customer: ${details.customerName}
• Route: ${details.departureCity} ➔ ${details.destinationCity}
• Trip Type: ${details.tripType.toUpperCase()}
• Departure: ${details.departureDate}${details.returnDate ? `\n• Return: ${details.returnDate}` : ''}
• Travelers: ${totalTravelers} (${details.travelers.adults} Adults${details.travelers.children ? `, ${details.travelers.children} Children` : ''}${details.travelers.infants ? `, ${details.travelers.infants} Infants` : ''})
• Class: ${details.preferredClass.toUpperCase()}

Please provide flight options and rates.`;
  return createWhatsAppLink(msg);
}

export function getTourWhatsAppLink(tourTitle: string): string {
  const msg = `Hello IAN'S Travel & Tours, I would like information about the tour: "${tourTitle}". Could you please share available dates, customization options, and quotation?`;
  return createWhatsAppLink(msg);
}

export function getQuoteWhatsAppLink(service: string, name: string): string {
  const msg = `Hello IAN'S Travel & Tours, my name is ${name || 'Traveler'}. I would like to request a quotation for: ${service}.`;
  return createWhatsAppLink(msg);
}
