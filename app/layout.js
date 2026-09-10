import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingContact from "@/components/layout/FloatingContact";
import AppProviders from "@/components/providers/AppProviders";
import { createMetadata } from "@/lib/metadata";
import { organizationSchema, websiteSchema, JsonLd } from "@/lib/schema";
import CookieConsent from "@/components/layout/CookieConsent";
import AnalyticsScripts from "@/components/layout/AnalyticsScripts";
import { validateConfig } from "@/lib/config";

validateConfig();

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata = createMetadata({
  title: null,
  description:
    "Hotel Çözümleri; Hotelio otel yönetim yazılımı, otel tekstili, kapı sistemleri, temizlik ürünleri, web sitesi, sosyal medya ve SPA çözümlerini tek çatı altında sunar.",
});

export default function RootLayout({ children }) {
  return (
    <html lang="tr" className={`${jakarta.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <AppProviders>
          <JsonLd data={organizationSchema()} />
          <JsonLd data={websiteSchema()} />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingContact />
          <CookieConsent />
          <AnalyticsScripts />
        </AppProviders>
      </body>
    </html>
  );
}
