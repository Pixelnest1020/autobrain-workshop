import { Icon, icons } from "lucide-react";
import "./globals.css";

export const metadata = {
  title: "AutoBrain Car Care | The Multi Brand Car Division",
  description: "360° Multi-brand car workshop: Denting & Painting, Detailing, Cashless Claims, and Buy/Sell.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased bg-neutral-950 text-neutral-100">
        {children}
      </body>
    </html>
  );
}