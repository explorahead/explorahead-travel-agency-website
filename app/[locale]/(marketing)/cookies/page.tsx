/**
 * Copyright (c) 2024-2026 ExplorAhead. All rights reserved.
 * This file is part of proprietary software. See LICENSE for terms.
 */

"use client";

import { contact, getMailtoLink, getTelLink } from "@/config/contact";
import { motion } from "framer-motion";
import { BarChart, Cookie, ExternalLink, Mail, Phone, Settings, Shield } from "lucide-react";
import { useLocale } from "next-intl";
import Link from "next/link";

export default function CookiePolicyPage() {
  const locale = useLocale();
  const isEnglish = locale === "en";

  const content = isEnglish
    ? {
        hero: {
          title: "Cookie Policy",
          subtitle: "Learn how we use cookies on our website",
        },
        intro: `At ExplorAhead Travel Agency, we care about your privacy. This Cookie Policy explains what cookies are, how we use them on explorahead.com, and how you can manage your preferences. This document has been prepared in accordance with GDPR requirements and the Act on Electronic Services.`,
        sections: [
          {
            icon: Cookie,
            title: "1. What are cookies?",
            content: `Cookies are small text files stored on your device (computer, tablet, smartphone) when browsing websites. Cookies enable device recognition and customization of website content to your individual preferences.

Cookies do not damage your device or allow identification of a specific person – they mainly serve to improve website quality and analyze traffic.`,
          },
          {
            icon: Settings,
            title: "2. What cookies do we use?",
            content: `On explorahead.com we use the following types of cookies:

a) Essential cookies (technical)
Necessary for proper website functioning. They enable navigation and use of basic functions (e.g., session memory, language preferences).
• Storage period: session / up to 12 months
• Legal basis: legitimate interest of the controller (Art. 6(1)(f) GDPR)

b) Functional cookies
Enable remembering your choices (e.g., language, region). They improve website comfort.
• Storage period: up to 12 months
• Legal basis: your consent (Art. 6(1)(a) GDPR)

c) Analytical cookies (Google Analytics)
Serve to analyze website usage (e.g., number of visits, traffic sources, popular pages). They help us understand how users interact with our website and optimize its performance.
• Storage period: up to 24 months
• Legal basis: your consent (Art. 6(1)(a) GDPR)

We do not use marketing or advertising cookies. We do not display personalized ads.`,
          },
          {
            icon: BarChart,
            title: "3. Google Analytics",
            content: `Our website uses Google Analytics – a web analytics tool provided by Google LLC.

Google Analytics collects anonymous information about:
• Number of visits to the website
• Traffic sources (where you came from)
• Time spent on the website
• Pages viewed
• Device type and browser

This data helps us understand how users interact with our website and how we can improve it.

More information about how Google processes data:
https://policies.google.com/privacy

You can block Google Analytics by installing the browser add-on:
https://tools.google.com/dlpage/gaoptout`,
          },
          {
            icon: Shield,
            title: "4. Cookie management",
            content: `4.1. Consent to cookies
During your first visit to the website, we display a banner informing about cookie use. You can:
• Accept all cookies
• Choose only specific cookie categories (via settings)
• Reject all optional cookies

4.2. Withdrawal of consent
You can withdraw consent to cookie use at any time by:
• Changing cookie settings in the banner (available in the footer)
• Deleting cookies from your browser
• Changing browser settings

4.3. Browser settings
Most browsers accept cookies by default. However, you can change settings to:
• Block all cookies
• Block third-party cookies
• Receive notification before saving cookies
• Delete all saved cookies

Instructions for popular browsers:
• Google Chrome: Settings > Privacy and security > Cookies
• Mozilla Firefox: Options > Privacy and security > Cookies
• Safari: Preferences > Privacy > Cookies
• Microsoft Edge: Settings > Privacy and services > Cookies

NOTE: Blocking cookies may affect website functionality – some features may not work properly.`,
          },
          {
            icon: ExternalLink,
            title: "5. Other technologies",
            content: `In addition to cookies, our website may use:

• Local Storage and Session Storage – locally stored data in the browser that allows remembering your preferences

These technologies serve only to improve website functionality and are subject to the same rules as cookies.`,
          },
          {
            icon: Shield,
            title: "6. Personal data protection",
            content: `Data collected through cookies may be considered personal data under GDPR. We process it in accordance with our Privacy Policy.

Data Controller:
EXPLORAHEAD Travel Agency
Email: ${contact.email}
Tax ID (NIP): [TO BE COMPLETED]
Business ID (REGON): [TO BE COMPLETED]

You have all rights specified in GDPR, including:
• Right of access to data
• Right to rectification
• Right to erasure
• Right to restriction of processing
• Right to object

Detailed information can be found in our Privacy Policy: www.explorahead.com/privacy`,
          },
          {
            icon: Mail,
            title: "7. Changes to Cookie Policy",
            content: `We reserve the right to update this Cookie Policy to ensure it always complies with applicable regulations. Each new version will be published on our website with the date of the last change.

The current version of the Cookie Policy is always available at: www.explorahead.com/cookies`,
          },
          {
            icon: Phone,
            title: "8. Contact",
            content: `Have questions about cookies? Contact us:

Email: ${contact.email}
Phone: ${contact.phone}

Last updated: February 2026`,
          },
        ],
        table: {
          title: "Overview of cookies used",
          headers: ["Category", "Example cookies", "Purpose", "Duration", "Provider"],
          rows: [
            {
              category: "Essential cookies",
              examples: "session_id, language_pref, CONSENT",
              purpose: "Session handling, language preferences, website functionality",
              duration: "Session / up to 12 months",
              provider: "ExplorAhead",
            },
            {
              category: "Functional cookies",
              examples: "locale, theme_mode",
              purpose: "Remembering user settings (language, display mode)",
              duration: "Up to 12 months",
              provider: "ExplorAhead",
            },
            {
              category: "Analytical cookies",
              examples: "_ga, _gid",
              purpose: "Website traffic analysis (Google Analytics)",
              duration: "Up to 24 months",
              provider: "Google",
            },
          ],
        },
        settings: {
          title: "Manage cookie settings",
          description:
            "You can change your cookie preferences at any time. Choose which cookie categories you want to accept.",
          button: "Open cookie settings",
          alert: "Cookie management panel will be added soon",
        },
        cta: {
          title: "Questions about cookies?",
          subtitle: "Contact us – we'll be happy to answer all your questions",
        },
        backLink: "← Back to homepage",
      }
    : {
        hero: {
          title: "Polityka plików cookies",
          subtitle: "Dowiedz się, jak wykorzystujemy pliki cookies na naszej stronie",
        },
        intro: `W Biurze Podróży ExplorAhead dbamy o Twoją prywatność. Niniejsza Polityka Cookies wyjaśnia, czym są pliki cookies, w jaki sposób ich używamy na stronie explorahead.com oraz jak możesz zarządzać swoimi preferencjami. Dokument został przygotowany zgodnie z wymogami Rozporządzenia Ogólnego o Ochronie Danych (RODO) oraz ustawy o świadczeniu usług drogą elektroniczną.`,
        sections: [
          {
            icon: Cookie,
            title: "1. Czym są pliki cookies?",
            content: `Pliki cookies (ciasteczka) to małe pliki tekstowe zapisywane na Twoim urządzeniu (komputer, tablet, smartfon) podczas przeglądania stron internetowych. Cookies umożliwiają rozpoznanie urządzenia oraz dostosowanie zawartości strony do Twoich indywidualnych preferencji.

Pliki cookies nie uszkadzają Twojego urządzenia ani nie pozwalają na identyfikację konkretnej osoby – służą głównie do poprawy jakości korzystania ze strony oraz analizy ruchu.`,
          },
          {
            icon: Settings,
            title: "2. Jakie pliki cookies używamy?",
            content: `Na stronie explorahead.com wykorzystujemy następujące rodzaje plików cookies:

a) Cookies niezbędne (techniczne)
Niezbędne do prawidłowego funkcjonowania strony. Umożliwiają poruszanie się po stronie i korzystanie z jej podstawowych funkcji (np. zapamiętanie sesji, preferencji językowych).
• Czas przechowywania: sesja / do 12 miesięcy
• Podstawa prawna: prawnie uzasadniony interes administratora (art. 6 ust. 1 lit. f RODO)

b) Cookies funkcjonalne
Umożliwiają zapamiętanie Twoich wyborów (np. język, region). Poprawiają komfort korzystania ze strony.
• Czas przechowywania: do 12 miesięcy
• Podstawa prawna: Twoja zgoda (art. 6 ust. 1 lit. a RODO)

c) Cookies analityczne (Google Analytics)
Służą do analizy sposobu korzystania ze strony (np. liczba odwiedzin, źródła ruchu, popularne podstrony). Pozwalają nam lepiej zrozumieć, jak użytkownicy korzystają z naszej strony i optymalizować jej działanie.
• Czas przechowywania: do 24 miesięcy
• Podstawa prawna: Twoja zgoda (art. 6 ust. 1 lit. a RODO)

Nie wykorzystujemy cookies marketingowych ani reklamowych. Nie wyświetlamy spersonalizowanych reklam.`,
          },
          {
            icon: BarChart,
            title: "3. Google Analytics",
            content: `Na naszej stronie korzystamy z Google Analytics – narzędzia do analizy ruchu internetowego dostarczanego przez Google LLC.

Google Analytics zbiera anonimowe informacje o:
• Liczbie odwiedzin na stronie
• Źródłach ruchu (skąd trafiasz na naszą stronę)
• Czasie spędzonym na stronie
• Przeglądanych podstronach
• Typie urządzenia i przeglądarki

Dane te pomagają nam zrozumieć, jak użytkownicy korzystają z naszej strony i jak możemy ją ulepszyć.

Więcej informacji o tym, jak Google przetwarza dane:
https://policies.google.com/privacy

Możesz zablokować Google Analytics, instalując dodatek do przeglądarki:
https://tools.google.com/dlpage/gaoptout`,
          },
          {
            icon: Shield,
            title: "4. Zarządzanie plikami cookies",
            content: `4.1. Zgoda na pliki cookies
Podczas pierwszej wizyty na stronie wyświetlamy banner informujący o wykorzystaniu plików cookies. Możesz:
• Zaakceptować wszystkie pliki cookies
• Wybrać tylko określone kategorie cookies (poprzez ustawienia)
• Odrzucić wszystkie opcjonalne pliki cookies

4.2. Cofnięcie zgody
Zgodę na wykorzystanie plików cookies możesz w każdej chwili cofnąć poprzez:
• Zmianę ustawień cookies w bannerze (dostępnym w stopce strony)
• Usunięcie plików cookies z przeglądarki
• Zmianę ustawień przeglądarki

4.3. Ustawienia przeglądarki
Większość przeglądarek domyślnie akceptuje pliki cookies. Możesz jednak zmienić ustawienia, aby:
• Blokować wszystkie cookies
• Blokować cookies stron trzecich
• Otrzymywać powiadomienie przed zapisaniem cookies
• Usunąć wszystkie zapisane cookies

Instrukcje dla popularnych przeglądarek:
• Google Chrome: Ustawienia > Prywatność i bezpieczeństwo > Pliki cookie
• Mozilla Firefox: Opcje > Prywatność i bezpieczeństwo > Ciasteczka
• Safari: Preferencje > Prywatność > Ciasteczka
• Microsoft Edge: Ustawienia > Prywatność i usługi > Pliki cookie

UWAGA: Zablokowanie plików cookies może wpłynąć na funkcjonalność strony – niektóre funkcje mogą nie działać prawidłowo.`,
          },
          {
            icon: ExternalLink,
            title: "5. Inne technologie",
            content: `Oprócz plików cookies, nasza strona może wykorzystywać:

• Local Storage i Session Storage – lokalnie przechowywane dane w przeglądarce, które umożliwiają zapamiętanie Twoich preferencji

Technologie te służą wyłącznie do poprawy funkcjonalności strony i są objęte takimi samymi zasadami jak pliki cookies.`,
          },
          {
            icon: Shield,
            title: "6. Ochrona danych osobowych",
            content: `Dane zbierane za pomocą plików cookies mogą być uznane za dane osobowe w rozumieniu RODO. Przetwarzamy je zgodnie z naszą Polityką Prywatności.

Administrator danych:
Biuro Podróży EXPLORAHEAD
E-mail: ${contact.email}
NIP: [DO UZUPEŁNIENIA]
REGON: [DO UZUPEŁNIENIA]

Przysługują Ci wszystkie prawa określone w RODO, w tym:
• Prawo dostępu do danych
• Prawo do sprostowania danych
• Prawo do usunięcia danych
• Prawo do ograniczenia przetwarzania
• Prawo do wniesienia sprzeciwu

Szczegółowe informacje znajdziesz w Polityce Prywatności: www.explorahead.com/privacy`,
          },
          {
            icon: Mail,
            title: "7. Zmiany w Polityce Cookies",
            content: `Zastrzegamy sobie prawo do aktualizacji niniejszej Polityki Cookies, aby zawsze była zgodna z obowiązującymi przepisami. Każda nowa wersja zostanie opublikowana na naszej stronie internetowej wraz z datą ostatniej zmiany.

Aktualna wersja Polityki Cookies jest zawsze dostępna pod adresem: www.explorahead.com/cookies`,
          },
          {
            icon: Phone,
            title: "8. Kontakt",
            content: `Masz pytania dotyczące plików cookies? Skontaktuj się z nami:

E-mail: ${contact.email}
Telefon: ${contact.phone}

Data ostatniej aktualizacji: Luty 2026`,
          },
        ],
        table: {
          title: "Przegląd wykorzystywanych plików cookies",
          headers: ["Kategoria", "Przykładowe cookies", "Cel", "Czas", "Dostawca"],
          rows: [
            {
              category: "Cookies niezbędne",
              examples: "session_id, language_pref, CONSENT",
              purpose: "Obsługa sesji, preferencje językowe, funkcjonalność strony",
              duration: "Sesja / do 12 miesięcy",
              provider: "ExplorAhead",
            },
            {
              category: "Cookies funkcjonalne",
              examples: "locale, theme_mode",
              purpose: "Zapamiętanie ustawień użytkownika (język, tryb wyświetlania)",
              duration: "Do 12 miesięcy",
              provider: "ExplorAhead",
            },
            {
              category: "Cookies analityczne",
              examples: "_ga, _gid",
              purpose: "Analiza ruchu na stronie (Google Analytics)",
              duration: "Do 24 miesięcy",
              provider: "Google",
            },
          ],
        },
        settings: {
          title: "Zarządzaj ustawieniami cookies",
          description:
            "W każdej chwili możesz zmienić swoje preferencje dotyczące plików cookies. Wybierz, które kategorie cookies chcesz zaakceptować.",
          button: "Otwórz ustawienia cookies",
          alert: "Panel zarządzania cookies zostanie wkrótce dodany",
        },
        cta: {
          title: "Pytania dotyczące plików cookies?",
          subtitle: "Skontaktuj się z nami – chętnie odpowiemy na wszystkie pytania",
        },
        backLink: "← Powrót do strony głównej",
      };

  return (
    <>
      {/* Hero Section */}
      <section className="from-ocean via-ocean-dark to-ocean relative bg-gradient-to-br pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-gold/20 mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl backdrop-blur-sm"
          >
            <Cookie size={40} className="text-gold" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading mb-6 text-4xl md:text-5xl lg:text-6xl"
            style={{ color: "#d4a574" }}
          >
            {content.hero.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto max-w-3xl text-lg text-white/80 md:text-xl"
          >
            {content.hero.subtitle}
          </motion.p>
        </div>
      </section>

      {/* Content Section */}
      <section className="section">
        <div className="container max-w-4xl">
          <div className="bg-sand-light/30 mb-12 rounded-2xl p-8">
            <p className="text-gray-dark leading-relaxed">{content.intro}</p>
          </div>

          <div className="space-y-12">
            {content.sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="rounded-2xl bg-white shadow-md transition-shadow hover:shadow-lg"
                style={{ padding: "3rem" }}
              >
                <div className="flex items-start gap-4" style={{ marginBottom: "2rem" }}>
                  <div className="bg-ocean flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl">
                    <section.icon size={24} className="text-gold" />
                  </div>
                  <h2 className="font-heading text-ocean mt-1 text-2xl">{section.title}</h2>
                </div>
                <div
                  className="text-gray-dark whitespace-pre-line"
                  style={{ marginLeft: "4rem", paddingRight: "2rem", lineHeight: "1.8" }}
                >
                  {section.content}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Cookie Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-16"
          >
            <h3 className="font-heading text-ocean mb-6 text-2xl">{content.table.title}</h3>
            <div className="overflow-x-auto">
              <table className="w-full overflow-hidden rounded-xl bg-white shadow-md">
                <thead className="bg-ocean text-white">
                  <tr>
                    {content.table.headers.map((header, index) => (
                      <th key={index} className="cookie-table-header">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {content.table.rows.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-sand-light/30" : ""}>
                      <td className="cookie-table-cell text-ocean font-medium">{row.category}</td>
                      <td className="cookie-table-cell text-gray-dark font-mono">
                        <span className="cookie-pill bg-sand-light/60">{row.examples}</span>
                      </td>
                      <td className="cookie-table-cell text-gray-dark">{row.purpose}</td>
                      <td className="cookie-table-cell text-gray-dark">
                        <span className="cookie-pill bg-ocean/10">{row.duration}</span>
                      </td>
                      <td className="cookie-table-cell text-gray-dark">
                        <span className="cookie-pill bg-gold/20">{row.provider}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Cookie Settings CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="cookie-settings-section bg-gold/10 border-gold mt-12 rounded-xl border-l-4"
          >
            <div className="flex items-start gap-3">
              <Settings size={24} className="text-gold mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-heading text-ocean mb-2 text-lg">{content.settings.title}</h3>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-gray-dark flex-1">{content.settings.description}</p>
                  <button
                    onClick={() => {
                      alert(content.settings.alert);
                    }}
                    className="cookie-btn bg-ocean hover:bg-ocean-dark flex-shrink-0 text-white"
                  >
                    <Settings size={18} />
                    {content.settings.button}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="cookie-cta-section from-ocean to-ocean-dark mt-12 rounded-2xl bg-gradient-to-br text-center text-white"
          >
            <h3 className="font-heading mb-4 text-2xl">{content.cta.title}</h3>
            <p className="mb-6 text-white/80">{content.cta.subtitle}</p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={getMailtoLink()}
                className="cookie-cta-btn bg-gold hover:bg-gold-dark text-ocean"
              >
                <Mail size={20} />
                {contact.email}
              </a>
              <a
                href={getTelLink()}
                className="cookie-cta-btn bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
              >
                <Phone size={20} />
                {contact.phone}
              </a>
            </div>
          </motion.div>

          {/* Back to Home */}
          <div className="mt-12 text-center">
            <Link
              href="/"
              className="text-ocean hover:text-gold inline-flex items-center gap-2 font-medium transition-colors"
            >
              {content.backLink}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
