export type BookingProvider = { name:string; url:string } | null;
export function getBookingProvider():BookingProvider { const url=process.env.NEXT_PUBLIC_BOOKING_URL; return url?{name:"external",url}:null }
