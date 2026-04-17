/**
 * Copyright (c) 2024-2026 ExplorAhead. All rights reserved.
 * This file is part of proprietary software. See LICENSE for terms.
 */

"use client";

import { contact, getMailtoLink, getTelLink } from "@/config/contact";
import { motion } from "framer-motion";
import {
  Clock,
  Database,
  FileText,
  Lock,
  Mail,
  Phone,
  RefreshCw,
  Shield,
  Users,
} from "lucide-react";
import { useLocale } from "next-intl";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  const locale = useLocale();
  const isEnglish = locale === "en";

  const content = isEnglish
    ? {
        hero: {
          title: "Privacy Policy",
          subtitle:
            "We respect your privacy and place special emphasis on the security of your personal data",
        },
        intro: `At ExplorAhead Travel Agency, we respect your privacy and place special emphasis on the security of your personal data. This Privacy Policy explains how we collect, use, and protect your information, in accordance with the requirements of the General Data Protection Regulation (GDPR).`,
        sections: [
          {
            icon: Database,
            title: "1. Who is the Controller of Your Personal Data?",
            content: `The Controller, i.e., the entity that decides how your personal data will be used, is EXPLORAHEAD Travel Agency.

Email: ${contact.email}
Tax ID (NIP): [TO BE COMPLETED]
Business ID (REGON): [TO BE COMPLETED]`,
          },
          {
            icon: FileText,
            title: "2. What Data Do We Collect and Why?",
            content: `We only collect data that is necessary to provide our services. Your data is processed for the following purposes:

Travel Consulting Services:
• Data type: First name and last name, email address, phone number, date of birth, travel preferences (destination, dates, accommodation, attractions).
• Purpose: Preparation of offers, travel plans, and flight and accommodation proposals.
• Legal basis: Performance of a contract or pre-contractual actions (Art. 6(1)(b) GDPR).

Handling Complaints and Claims:
• Data type: First name and last name, email address, service-related data.
• Purpose: Processing complaints and defense against potential claims.
• Legal basis: Legal obligation (Art. 6(1)(c) GDPR) and legitimate interest of the Controller (Art. 6(1)(f) GDPR).

Contact and Ongoing Support:
• Data type: Email address, phone number.
• Purpose: Responding to inquiries and providing service information.
• Legal basis: Legitimate interest of the Controller (Art. 6(1)(f) GDPR).

Marketing Purposes:
• Data type: Email address.
• Purpose: Sending newsletters and travel opportunity information.
• Legal basis: Your voluntary consent (Art. 6(1)(a) GDPR). You can withdraw your consent at any time.`,
          },
          {
            icon: Clock,
            title: "3. How Long Do We Store Your Data?",
            content: `We store your data only for the time necessary to fulfill specific purposes:

• Travel and consulting services: Data related to the service is stored for 2 years from the end of cooperation, unless a legal obligation (e.g., accounting) requires a longer period (5 years for settlement documents).
• Legal obligations (taxes, accounting): For 5 years, counting from the end of the calendar year in which the tax payment deadline expired.
• Defense against claims: Until the statute of limitations for potential claims arising from the contract expires (in accordance with the Civil Code).
• Marketing: Until you withdraw your consent or object.`,
          },
          {
            icon: Users,
            title: "4. Who May We Share Your Data With?",
            content: `Your data is safe with us. We do not sell, rent, or exchange your personal data with third parties for their own marketing purposes.

Your data may only be shared to the necessary extent with the following categories of recipients:

• Data processors acting on our behalf: Trusted IT service providers, hosting companies, and accounting firms that support our ongoing operations under data processing agreements.
• Government authorities or other authorized entities: Only in cases where the obligation to share data arises directly from legal provisions (e.g., border controls, tax offices).`,
          },
          {
            icon: Shield,
            title: "5. Your Rights Related to Personal Data",
            content: `In accordance with GDPR provisions, you have the following rights regarding your personal data:

• Right of access to data: You have the right to obtain information about whether we process your personal data and, if so, to what extent.
• Right to rectification: If your data is incorrect or incomplete, you have the right to request its correction or completion.
• Right to erasure: You have the right to request the deletion of your data if there is no longer a legal basis for its processing.
• Right to restriction of processing: In certain situations, you have the right to request that we limit the use of your data to storage only.
• Right to data portability: You have the right to receive your data in a structured, commonly used format and to transfer it to another controller.
• Right to object: You have the right to object to the processing of your data if we do so based on our legitimate interest (e.g., for analytical purposes).
• Right to withdraw consent: If we process data based on your consent (e.g., newsletter), you can withdraw it at any time. This does not affect the lawfulness of processing carried out before the withdrawal.
• Right to lodge a complaint: If you believe that we are processing your data in violation of regulations, you have the right to lodge a complaint with the supervisory authority – the President of the Personal Data Protection Office (UODO).

How can you exercise your rights? Simply contact us at: ${contact.email}`,
          },
          {
            icon: Lock,
            title: "6. Data Security",
            content: `We ensure that your data is completely secure. We have implemented modern technical measures and organizational procedures that protect information from accidental loss, unauthorized access, or modification. We continuously monitor our IT infrastructure for potential threats to provide you with the highest level of digital protection.`,
          },
          {
            icon: RefreshCw,
            title: "7. Changes to the Privacy Policy",
            content: `We reserve the right to update this Privacy Policy to ensure it always complies with applicable regulations. Each new version will be published on our website with the date of the last change. In the event of key amendments, we will inform you directly by email.

Last updated: February 2026`,
          },
        ],
        cta: {
          title: "Have questions about data protection?",
          subtitle: "Contact us – we'll be happy to answer all your questions",
        },
        backLink: "← Back to homepage",
      }
    : {
        hero: {
          title: "Polityka Prywatności",
          subtitle:
            "Szanujemy Twoją prywatność i kładziemy szczególny nacisk na bezpieczeństwo Twoich danych osobowych",
        },
        intro: `W Biurze Podróży ExplorAhead szanujemy Twoją prywatność i kładziemy szczególny nacisk na bezpieczeństwo Twoich danych osobowych. Niniejsza Polityka prywatności wyjaśnia, w jaki sposób zbieramy, wykorzystujemy i chronimy Twoje informacje, zgodnie z wymogami Rozporządzenia Ogólnego o Ochronie Danych (RODO).`,
        sections: [
          {
            icon: Database,
            title: "1. Kto jest administratorem Twoich danych osobowych?",
            content: `Administratorem, czyli podmiotem decydującym o tym, jak będą wykorzystywane Twoje dane osobowe, jest biuro Podróży EXPLORAHEAD.

E-mail: ${contact.email}
NIP: [DO UZUPEŁNIENIA]
REGON: [DO UZUPEŁNIENIA]`,
          },
          {
            icon: FileText,
            title: "2. Jakie dane zbieramy i dlaczego?",
            content: `Zbieramy tylko te dane, które są niezbędne do świadczenia naszych usług. Twoje dane przetwarzane są w następujących celach:

Świadczenie usług doradztwa podróżniczego:
• Rodzaj danych: Imię i nazwisko, adres e-mail, numer telefonu, data urodzenia, preferencje podróżne (destynacja, daty, zakwaterowanie, atrakcje).
• Cel: Przygotowanie ofert, planów podróży oraz propozycje lotów i zakwaterowania.
• Podstawa prawna: Wykonanie umowy lub działania przed jej zawarciem (art. 6 ust. 1 lit. b RODO).

Obsługa reklamacji i roszczeń:
• Rodzaj danych: Imię i nazwisko, adres e-mail, dane dotyczące usługi.
• Cel: Rozpatrywanie reklamacji oraz obrona przed ewentualnymi roszczeniami.
• Podstawa prawna: Obowiązek prawny (art. 6 ust. 1 lit. c RODO) oraz uzasadniony interes Administratora (art. 6 ust. 1 lit. f RODO).

Kontakt i bieżąca obsługa:
• Rodzaj danych: Adres e-mail, numer telefonu.
• Cel: Odpowiadanie na zapytania i przekazywanie informacji o usługach.
• Podstawa prawna: Uzasadniony interes Administratora (art. 6 ust. 1 lit. f RODO).

Cele marketingowe:
• Rodzaj danych: Adres e-mail.
• Cel: Wysyłanie newslettera i informacji o okazjach podróżniczych.
• Podstawa prawna: Twoja dobrowolna zgoda (art. 6 ust. 1 lit. a RODO). W każdej chwili możesz wycofać swoją zgodę.`,
          },
          {
            icon: Clock,
            title: "3. Jak długo przechowujemy Twoje dane?",
            content: `Twoje dane przechowujemy tylko przez czas niezbędny do realizacji konkretnych celów:

• Realizacja podróży i doradztwa: Dane związane z usługą przechowujemy przez 2 lata od zakończenia współpracy, chyba że obowiązek prawny (np. księgowy) wymaga dłuższego okresu (5 lat dla dokumentów rozliczeniowych).
• Obowiązki prawne (podatki, księgowość): Przez okres 5 lat, licząc od końca roku kalendarzowego, w którym upłynął termin płatności podatku.
• Obrona przed roszczeniami: Do czasu przedawnienia ewentualnych roszczeń wynikających z umowy (zgodnie z przepisami Kodeksu Cywilnego).
• Marketing: Do momentu, w którym wycofasz swoją zgodę lub zgłosisz sprzeciw.`,
          },
          {
            icon: Users,
            title: "4. Komu możemy udostępnić Twoje dane?",
            content: `Twoje dane są u nas bezpieczne. Nie sprzedajemy, nie wynajmujemy ani nie wymieniamy Twoich danych osobowych z podmiotami trzecimi w ich własnych celach marketingowych.

Twoje dane mogą być udostępniane wyłącznie w niezbędnym zakresie następującym kategoriom odbiorców:

• Podmioty przetwarzające dane w naszym imieniu: Zaufani dostawcy usług IT, firmy hostingowe oraz biura księgowe, które wspierają nas w bieżącej działalności na podstawie umów powierzenia przetwarzania danych.
• Organy państwowe lub inne uprawnione podmioty: Wyłącznie w przypadkach, gdy obowiązek udostępnienia danych wynika bezpośrednio z przepisów prawa (np. kontrole graniczne, urzędy skarbowe).`,
          },
          {
            icon: Shield,
            title: "5. Twoje prawa związane z danymi osobowymi",
            content: `Zgodnie z przepisami RODO, przysługują Ci następujące prawa w odniesieniu do Twoich danych osobowych:

• Prawo dostępu do danych: Masz prawo uzyskać informację, czy przetwarzamy Twoje dane osobowe, a jeśli tak, to w jakim zakresie.
• Prawo do sprostowania danych: Jeśli Twoje dane są nieprawidłowe lub niekompletne, masz prawo żądać ich poprawienia lub uzupełnienia.
• Prawo do usunięcia danych: Masz prawo żądać usunięcia swoich danych, jeśli nie ma już podstawy prawnej do ich przetwarzania.
• Prawo do ograniczenia przetwarzania: W określonych sytuacjach masz prawo żądać, abyśmy ograniczyli wykorzystanie Twoich danych wyłącznie do ich przechowywania.
• Prawo do przenoszenia danych: Masz prawo otrzymać swoje dane w ustrukturyzowanym, powszechnie używanym formacie oraz przesłać je innemu administratorowi.
• Prawo do wniesienia sprzeciwu: Masz prawo wnieść sprzeciw wobec przetwarzania Twoich danych, jeśli robimy to na podstawie naszego uzasadnionego interesu (np. w celach analitycznych).
• Prawo do wycofania zgody: Jeśli przetwarzamy dane na podstawie Twojej zgody (np. newsletter), możesz ją wycofać w każdej chwili. Nie wpływa to na zgodność z prawem działań podjętych przed jej wycofaniem.
• Prawo wniesienia skargi: Jeśli uznasz, że przetwarzamy Twoje dane niezgodnie z przepisami, masz prawo wnieść skargę do organu nadzorczego – Prezesa Urzędu Ochrony Danych Osobowych (UODO).

Jak możesz skorzystać ze swoich praw? Wystarczy, że skontaktujesz się z nami pod adresem e-mail: ${contact.email}`,
          },
          {
            icon: Lock,
            title: "6. Bezpieczeństwo danych",
            content: `Dbamy o to, aby Twoje dane były w pełni bezpieczne. Wdrożyliśmy nowoczesne środki techniczne oraz procedury organizacyjne, które chronią informacje przed przypadkową utratą, nieuprawnionym dostępem lub zmianą. Stale monitorujemy naszą infrastrukturę IT pod kątem potencjalnych zagrożeń, aby zapewnić Ci najwyższy poziom ochrony cyfrowej.`,
          },
          {
            icon: RefreshCw,
            title: "7. Zmiany w Polityce Prywatności",
            content: `Zastrzegamy sobie prawo do aktualizacji niniejszej Polityki prywatności, aby zawsze była zgodna z obowiązującymi przepisami. Każda nowa wersja zostanie opublikowana na naszej stronie internetowej wraz z datą ostatniej zmiany. W przypadku wprowadzenia kluczowych poprawek, poinformujemy Cię o nich bezpośrednio drogą mailową.

Data ostatniej aktualizacji: Luty 2026`,
          },
        ],
        cta: {
          title: "Masz pytania dotyczące ochrony danych?",
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
            <Shield size={40} className="text-gold" />
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

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="cookie-cta-section from-ocean to-ocean-dark mt-16 rounded-2xl bg-gradient-to-br text-center text-white"
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
