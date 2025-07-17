export interface Booking {
    services: { name: string; description: string; price: string }[];
    date: string;
    time: string;
    contact: {
      name: string;
      surname: string;
      email: string;
      phone: string;
      plate: string;
    };
  }