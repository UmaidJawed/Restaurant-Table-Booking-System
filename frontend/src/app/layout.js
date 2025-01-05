import "./globals.css";

export const metadata = {
  title: "This is My table booking app",
  description: "Restuarent Booking App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
