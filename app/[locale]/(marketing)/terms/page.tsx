/**
 * Copyright (c) 2024-2026 ExplorAhead. All rights reserved.
 * This file is part of proprietary software. See LICENSE for terms.
 */

"use client";

import { contact, getMailtoLink, getTelLink } from "@/config/contact";
import { motion } from "framer-motion";
import {
  AlertCircle,
  BookOpen,
  Clock,
  Copyright,
  CreditCard,
  FileText,
  List,
  Lock,
  Mail,
  Phone,
  Scale,
  Shield,
} from "lucide-react";
import { useLocale } from "next-intl";
import Link from "next/link";

export default function TermsOfServicePage() {
  const locale = useLocale();
  const isEnglish = locale === "en";

  const content = isEnglish
    ? {
        hero: {
          title: "Terms of Service",
          subtitle: "Terms and conditions for travel consulting services (Travel Design)",
        },
        intro: `These Terms of Service set out the rules and conditions for providing travel consulting services (Travel Design) by ExplorAhead. The Agency declares that it is not a tour operator within the meaning of the Act of November 24, 2017 on tourism events. The Client enters into contracts with suppliers (flights, hotels) in their own name and on their own account.`,
        sections: [
          {
            icon: FileText,
            title: "§1. General Provisions",
            content: `The owner of the ExplorAhead online agency is: [YOUR DATA / COMPANY]
Tax ID (NIP): [TO BE COMPLETED]
Email: ${contact.email}

The Agency provides travel consulting services (Travel Design). The Agency declares that it is not a tour operator within the meaning of the Act of November 24, 2017 on tourism events.

The Client enters into contracts with suppliers (flights, hotels) in their own name and on their own account.`,
          },
          {
            icon: BookOpen,
            title: "§2. Definitions",
            content: `• Client – a natural person using the Agency's Services
• Agency – ExplorAhead, entity providing travel consulting services
• Services – services provided by the Agency, according to the Price List available on the Website, including in particular: preparation of Travel Plans
• Travel Plan (Travel Design) – a digital product (PDF) containing personalized travel recommendations, routes, and booking links
• Price List – a list of fees for preparing personalized travel plans, available on the Website www.explorahead.com. The Price List defines the Agency's remuneration for the Travel Design Service and is not a component of the price of tickets or reservations made by the Client
• Website – the Agency's website available at www.explorahead.com
• Offer – a preliminary trip outline prepared by the Agency, containing approximate costs and proposed solutions. The Offer is for informational purposes only and does not constitute a commercial offer within the meaning of law. The final trip price depends on variable prices of Components from external suppliers
• Components – individual travel services making up the trip (in particular: airline tickets, accommodation, insurance, transfers, entrance tickets), which the Client books and pays for independently based on the Agency's recommendations
• Payment – payment of fees for the Agency's Services`,
          },
          {
            icon: List,
            title: "§3. Types of Services",
            content: `The Service Provider provides the following services:

Dream Finder (initial consultation):
• 60-minute online/phone consultation
• Analysis of Client's preferences and budget
• 3–5 destination proposals with descriptions
• Written summary after consultation
Price: 149 PLN. If the "Dream Plan" package is ordered within 7 days, the amount is deducted from its price.

Dream Plan (complete travel plan):
• Detailed day-by-day schedule
• Flight and hotel recommendations
• Two rounds of revisions before departure
• Email support
Prices: up to 4 days – 249 PLN; 5–10 days – 399 PLN; 11–14 days – 549 PLN; over 14 days – individual price. Limit: 4 people.

Travel Companion (support during travel):
• Access to advisor via WhatsApp/SMS throughout the trip (max. 14 days)
• Help with sudden plan changes
Price: 199 PLN. Service available only in combination with the "Dream Plan" package.

Express Service (urgent plan):
• Plan preparation within max. 3 business days
• Basic support in the first 24h of departure
Price: 299 PLN. Available only for trips up to 10 days.

Premium Package (comprehensive package):
• Combination of "Dream Plan" (5–10 days) and "Travel Companion" services
Price: 499 PLN.

Detailed scope of Services and the current Price List are available on the Website.`,
          },
          {
            icon: Clock,
            title: "§4. Service Delivery",
            content: `The Service consists of preparing a Travel Plan in digital form (PDF).

Preparation time for the initial plan is 72 business hours from the date of payment posting or sending payment confirmation.

The Client has 72 business hours to review the plan.

The service price includes 2 rounds of revisions (change of hotel, flight, or attraction proposals).

Definition of revision rounds:
• One round of revisions includes one email exchange in which the Client submits all comments regarding the Plan (e.g., change of hotels, attractions, flights, schedule)
• The Agency implements all comments submitted in that round and sends an updated version of the Plan
• Each subsequent round of revisions after the first two is billed as a separate service

The Client undertakes to verify the correctness of contact data.

The Agency is not responsible for non-delivery of the plan due to reasons on the Client's side (e.g., incorrect email address).`,
          },
          {
            icon: CreditCard,
            title: "§5. Payments and Contract Conclusion",
            content: `Payment methods for Services: BLIK (BLIK phone transfer) or bank transfer to account number.

Agency's bank account number:
03 1140 2004 0000 3702 7919 9431

The travel consulting service contract is concluded upon the Service Provider receiving full payment of 100% of the service price.

After making a bank transfer payment, the Client should send the Agency payment confirmation. Otherwise, the Agency will commence the Service only after the funds appear in the bank account.

The Service will be performed only after payment.

As the payment title, the Client should include their first and last name.

The remuneration covers only the consulting service. Travel Component costs (tickets, accommodation) are paid by the Client directly to suppliers.

The Client consents to immediate commencement of the service (preparation of a personalized Travel Plan) before the expiry of the 14-day withdrawal period. Therefore, they lose the right to withdraw from the contract once the service is fully performed.`,
          },
          {
            icon: AlertCircle,
            title: "§6. Liability and Complaints",
            content: `The Agency declares that it does not accept any funds from the Client intended to pay for travel Components (flights, accommodation, insurance, etc.). All payments for these elements are made by the Client independently and directly to their suppliers. The Agency is not responsible for the payment process between the Client and third parties.

The Agency does not guarantee price stability or availability of offers (flights, hotels) between sending the plan and the Client making the reservation.

The Agency is not responsible for non-performance or improper performance of services by third parties (e.g., airlines, hotels, car rentals). Any complaints regarding the quality of these services, flight cancellations, schedule changes, or accommodation standards should be directed by the Client directly to the supplier of that service.

It is recommended that the Client independently purchase travel insurance and trip cancellation insurance.

The Travel Plan prepared by the Agency is for informational and recommendation purposes only. The Agency provides professional knowledge and proposals, while final decisions regarding trip execution, selection of specific offers, and timing of reservations belong exclusively to the Client.

Pursuant to Art. 38 point 3 of the Consumer Rights Act, the Client is not entitled to withdraw from the contract after the Service has commenced, as the subject of the service is a digital product prepared according to the Client's individualized specification.

If the Client believes that the consulting Service itself (the Plan) was improperly performed (e.g., contains gross logistical errors), they have the right to submit a complaint by email to ${contact.email}

The Agency will process the complaint within 14 days of receipt. The response will be sent to the Client's email address.

In case of non-performance of the Service by the Agency, the Client will receive a refund for unperformed Services within 7 business days.

The Agency undertakes to be responsible for non-performance or improper performance of the Service unless it is caused by:
• Action or omission of the Client
• Action or omission of third parties not involved in Agency-Client contact, if such actions/omissions could not have been foreseen/avoided
• Action or omission of Service Providers
• Force majeure (random or natural event beyond the Agency's control, for example: war, riots, epidemic, accident, natural disaster, death)

The Agency makes every effort to ensure that the prepared Offer fully complies with the Client's guidelines. However, if the Client's expectations (e.g., budget or timing) are impossible to fulfill due to current market conditions or Component unavailability, the Agency will prepare a proposal closest to the original assumptions or immediately inform the Client of the inability to perform the Service. Such action is considered proper performance of the consulting Service.

If the Client determines that the received Travel Plan is non-compliant with the contract (e.g., contains date errors or locations significantly different from arrangements), the Client has the right to submit a complaint.

Complaints should be sent electronically to email address ${contact.email}

Complaints regarding service defects (e.g., incorrect dates in the Travel Plan, lack of route coherence) should include a description of the non-compliance and an attachment with the Travel Plan. The Agency will process it within 14 days.`,
          },
          {
            icon: Copyright,
            title: "§7. Copyright",
            content: `The Travel Plan is a protected work and is intended solely for the Client's private use. Its publication, resale, or sharing with third parties is prohibited.`,
          },
          {
            icon: Lock,
            title: "§8. Cookies",
            content: (
              <>
                The Agency&apos;s website uses cookies to ensure comfort of using the service and
                traffic analysis. Detailed information about the purpose of data processing by
                cookies and the possibility of disabling them can be found in the Privacy Policy at:{" "}
                <Link
                  href="/privacy"
                  className="text-ocean hover:text-gold underline transition-colors"
                >
                  www.explorahead.com/privacy
                </Link>
              </>
            ),
          },
          {
            icon: Shield,
            title: "§9. Personal Data Protection (GDPR)",
            content: (
              <>
                The administrator of Clients&apos; personal data is ExplorAhead Travel Agency.
                {"\n\n"}
                Processing of data for marketing purposes (e.g., newsletter sending) takes place
                only with consent.
                {"\n\n"}
                Providing personal data is voluntary, however, its absence will prevent the Agency
                from preparing an Offer and performing the Service.
                {"\n\n"}
                Each Client has the right to access their data, rectification, erasure, restriction
                of processing, and data portability.
                {"\n\n"}
                Detailed information about data processing can be found in the Privacy Policy
                available at:{" "}
                <Link
                  href="/privacy"
                  className="text-ocean hover:text-gold underline transition-colors"
                >
                  www.explorahead.com/privacy
                </Link>
              </>
            ),
          },
          {
            icon: Scale,
            title: "§10. Final Provisions",
            content: `Polish law is the governing law for these Terms.

In matters not regulated in these Terms, the following provisions apply:
• Consumer Rights Act of May 30, 2014 (Journal of Laws 2014, item 827, as amended)
• Act on Providing Services by Electronic Means of July 18, 2002 (Journal of Laws 2002, No. 144, item 1204, as amended)
• Act on Out-of-Court Consumer Dispute Resolution of September 23, 2016 (Journal of Laws 2016, item 1823)
• Civil Code Act of April 23, 1964 (Journal of Laws 1964, No. 16, item 93, as amended)
• and other applicable provisions of Polish law

Effective date: February 2026`,
          },
        ],
        notice: {
          title: "Important Information",
          content: `Use of ExplorAhead services constitutes acceptance of these Terms. Please read them carefully before ordering a service. If you have any questions, we are at your disposal.`,
        },
        cta: {
          title: "Questions about the Terms?",
          subtitle: "Contact us – we'll be happy to clarify any doubts",
        },
        backLink: "← Back to homepage",
      }
    : {
        hero: {
          title: "Regulamin świadczenia usług",
          subtitle: "Warunki świadczenia usług doradztwa podróżniczego (Travel Design)",
        },
        intro: `Niniejszy Regulamin określa zasady i warunki świadczenia usług doradztwa podróżniczego (Travel Design) przez ExplorAhead. Biuro oświadcza, że nie jest organizatorem turystyki w rozumieniu ustawy z dnia 24 listopada 2017 r. o imprezach turystycznych. Klient zawiera umowy z dostawcami (loty, hotele) we własnym imieniu i na własny rachunek.`,
        sections: [
          {
            icon: FileText,
            title: "§1. Postanowienia ogólne",
            content: `Właścicielem biura internetowego ExplorAhead jest: [TWOJE DANE / FIRMA]
NIP: [DO UZUPEŁNIENIA]
E-mail: ${contact.email}

Biuro świadczy usługi doradztwa podróżniczego (Travel Design). Biuro oświadcza, że nie jest organizatorem turystyki w rozumieniu ustawy z dnia 24 listopada 2017 r. o imprezach turystycznych.

Klient zawiera umowy z dostawcami (loty, hotele) we własnym imieniu i na własny rachunek.`,
          },
          {
            icon: BookOpen,
            title: "§2. Definicje",
            content: `• Klient – osoba fizyczna korzystająca z Usług Biura
• Biuro – ExplorAhead, podmiot świadczący usługi doradztwa podróżniczego
• Usługi – usługi świadczone przez Biuro, zgodnie z Cennikiem dostępnym na Stronie internetowej, obejmujące w szczególności: sporządzanie Planu podróży
• Plan Podróży (Travel Design) – produkt cyfrowy (PDF) zawierający spersonalizowane rekomendacje turystyczne, trasy oraz linki do rezerwacji
• Cennik – zestawienie opłat za przygotowanie spersonalizowanych planów podróży, dostępne na Stronie internetowej www.explorahead.com. Cennik określa wynagrodzenie Biura za świadczoną Usługę Travel Designu i nie stanowi składowej ceny biletów ani rezerwacji dokonywanych przez Klienta
• Strona internetowa – strona internetowa Biura dostępna pod adresem www.explorahead.com
• Oferta – przygotowanie przez Biuro wstępny zarys podróży, zawierające przybliżone koszty i propozycje rozwiązań. Oferta ma charakter wyłącznie informacyjny i nie stanowi oferty handlowej w rozumieniu przepisów prawa. Finalna cena wyjazdu jest zależna od zmiennych cen Składników u dostawców zewnętrznych
• Składniki – poszczególne usługi turystyczne tworzące podróż (w szczególności: bilety lotnicze, zakwaterowanie, ubezpieczenie, transfery, bilety wstępu), które Klient rezerwuje i opłaca samodzielnie na podstawie rekomendacji Biura
• Płatność – uiszczenie należności za Usługi Biura`,
          },
          {
            icon: List,
            title: "§3. Rodzaje usług",
            content: `Usługodawca świadczy następujące usługi:

Dream Finder (konsultacja wstępna):
• 60-minutowa konsultacja online/telefoniczna
• Analiza preferencji i budżetu Klienta
• 3–5 propozycji miejsc docelowych z opisem
• Podsumowanie pisemne po konsultacji
Cena: 149 PLN. W przypadku zamówienia pakietu „Dream Plan" w ciągu 7 dni, kwota zostaje potrącona z jego ceny.

Dream Plan (kompletny plan podróży):
• Szczegółowy harmonogram dnia po dniu
• Rekomendacje lotów i hoteli
• Dwie tury poprawek przed wyjazdem
• Wsparcie e-mailowe
Ceny: do 4 dni – 249 PLN; 5–10 dni – 399 PLN; 11–14 dni – 549 PLN; powyżej 14 dni – cena indywidualna. Limit: 4 osoby.

Travel Companion (wsparcie w trakcie podróży):
• Dostęp do doradcy przez WhatsApp/SMS przez cały czas podróży (max. 14 dni)
• Pomoc w nagłych zmianach planu
Cena: 199 PLN. Usługa dostępna wyłącznie w połączeniu z pakietem „Dream Plan".

Express Service (pilny plan):
• Przygotowanie planu w ciągu max. 3 dni roboczych
• Podstawowe wsparcie w pierwszych 24h wyjazdu
Cena: 299 PLN. Dostępne tylko dla podróży do 10 dni.

Premium Package (pakiet kompleksowy):
• Połączenie usług „Dream Plan" (5–10 dni) i „Travel Companion"
Cena: 499 PLN.

Szczegółowy zakres Usług oraz aktualny Cennik są dostępne na Stronie.`,
          },
          {
            icon: Clock,
            title: "§4. Realizacja usługi",
            content: `Usługa polega na przygotowaniu Planu Podróży w formie cyfrowej (PDF).

Czas przygotowania wstępnego planu wynosi 72 godziny robocze od dnia zaksięgowania wpłaty bądź wysłania potwierdzenia płatności.

Klient ma 72 godziny robocze na zapoznanie się z planem.

W cenie usługi Klientowi przysługują 2 tury poprawek (zmiana propozycji hoteli, lotów lub atrakcji).

Definicja tur poprawek:
• Jedna tura poprawek obejmuje jedną wymianę wiadomości e-mail w której klient zgłasza wszystkie uwagi dotyczące Planu (np. zmiana hoteli, atrakcji, lotów, harmonogramu)
• Biuro realizuje wszystkie uwagi zgłoszone w danej turze i przesyła zaktualizowaną wersję Planu
• Każda kolejna tura poprawek po dwóch pierwszych rozliczana jako usługa

Klient zobowiązuje się do sprawdzenia poprawności danych kontaktowych.

Biuro nie ponosi odpowiedzialności za brak dostarczenia planu z przyczyn leżących po stronie Klienta (np. błędny adres e-mail).`,
          },
          {
            icon: CreditCard,
            title: "§5. Płatności i zawarcie umowy",
            content: `Metody płatności za Usługi to: BLIK (przelew na telefon BLIK) lub przelew bankowy na numer konta.

Numer konta bankowego Biura:
03 1140 2004 0000 3702 7919 9431

Umowa o świadczenie usługi doradztwa podróżniczego zostaje zawarta z chwilą otrzymania przez Usługodawcę pełnej zapłaty w wysokości 100% ceny usługi.

Po dokonaniu Płatności przelewem na numer konta, Klient powinien wysłać Biuru potwierdzenie przelewu. W innym przypadku Biuro przystąpi do wykonania Usługi dopiero po pojawieniu się należności na koncie bankowym.

Usługa zostanie wykonana dopiero po jej opłaceniu.

Jako tytuł płatności Klient powinien umieścić swoje imię i nazwisko.

Wynagrodzenie obejmuje wyłącznie usługę doradczą. Koszty Składników Podróży (bilety, noclegi) są płatne przez Klienta bezpośrednio u dostawców.

Klient wyraża zgodę na natychmiastowe rozpoczęcie świadczenia usługi (przygotowanie spersonalizowanego Planu Podróży) przed upływem 14-dniowego terminu do odstąpienia od umowy. W związku z tym traci prawo do odstąpienia od umowy od chwili pełnego wykonania usługi.`,
          },
          {
            icon: AlertCircle,
            title: "§6. Odpowiedzialność i reklamacje",
            content: `Biuro oświadcza, że nie przyjmuje od Klienta żadnych środków pieniężnych przeznaczonych na opłacenie Składników podróży (lotów, noclegów, ubezpieczeń itp.). Wszystkie płatności za te elementy Klient wykonuje samodzielnie i bezpośrednio u ich dostawców. Biuro nie ponosi odpowiedzialności za proces płatności pomiędzy Klientem a podmiotami trzecimi.

Biuro nie gwarantuje niezmienności cen oraz dostępności ofert (lotów, hoteli) pomiędzy momentem wysłania planu a dokonaniem rezerwacji przez Klienta.

Biuro nie ponosi odpowiedzialności za niewykonane lub nienależyte wykonanie usług przez podmioty trzecie (np. linie lotnicze, hotele, wypożyczalnie aut). Wszelkie reklamacje dotyczące jakości tych usług, odwołania lotów, zmian terminów czy standardu zakwaterowania Klient powinien kierować bezpośrednio do dostawcy danej Usługi.

Zaleca się, aby Klient we własnym zakresie wykupił ubezpieczenie turystyczne oraz ubezpieczenie od kosztów rezygnacji.

Przygotowany przez Biuro Plan podróży ma charakter wyłącznie informacyjny oraz rekomendacyjny. Biuro dostarcza profesjonalną wiedzę i propozycje, natomiast ostateczne decyzje dotyczące realizacji wyjazdu, wyboru konkretnych ofert oraz momentu dokonania rezerwacji należą wyłącznie do Klienta.

Zgodnie z art. 38 pkt 3 Ustawy o prawach konsumenta, Klientowi nie przysługuje prawo do odstąpienia od umowy po rozpoczęciu świadczenia Usługi, gdyż przedmiotem świadczenia jest produkt cyfrowy przygotowany według zindywidualizowanej specyfikacji Klienta.

Jeśli Klient uważa, że sama Usługa doradcza (Plan) została wykonana nienależycie (np. zawiera rażące błędy logistyczne), ma prawo złożyć reklamację drogą mailową na adres ${contact.email}

Biuro rozpatrzy reklamację w terminie 14 dni od jej otrzymania. Odpowiedź zostanie przesłana na adres e-mail Klienta.

W przypadku niewykonania Usługi przez Biuro, Klient otrzyma zwrot pieniędzy za niewykonane Usługi do 7 dni roboczych.

Biuro zobowiązuje się odpowiadać za niewykonanie lub nienależyte wykonanie Usługi chyba, że jest ono spowodowane:
• Działaniem lub zaniechaniem Klienta
• Działaniem lub zaniechaniem osób trzecich, nieuczestniczących w kontakcie Biuro - Klient, jeżeli tych działań/zaniechań nie można było przewidzieć/uniknąć
• Działaniem lub zaniechaniem Usługodawców
• Siłą wyższą (zdarzenie o charakterze przypadkowym lub naturalnym/żywiołowym, na które Biuro nie ma wpływu, na przykład: wojna, zamieszki, epidemia, wypadek, katastrofa naturalna, śmierć)

Biuro dokłada wszelkich starań, aby przygotowana Oferta była w pełni zgodna z wytycznymi Klienta. Jeżeli jednak oczekiwania Klienta (np. budżetowe lub terminowe) są niemożliwe do zrealizowania ze względu na aktualną sytuację rynkową lub brak dostępności Składników, Biuro przygotuje propozycję najbardziej zbliżoną do pierwotnych założeń lub niezwłocznie poinformuje Klienta o braku możliwości wykonania Usługi. Takie działanie uznaje się za należyte wykonanie Usługi doradczej.

W przypadku stwierdzenia przez Klienta, że otrzymany Plan Podróży jest niezgodny z umową (np. zawiera błędy w datach lub lokalizacjach rażąco odbiegających od ustaleń), Klientowi przysługuje prawo do złożenia reklamacji.

Reklamacje należy przesłać drogą elektroniczną na adres email ${contact.email}

Reklamacja dotycząca wad usługi (np. błędne daty w Planie Podróży, brak spójności trasy) powinna zawierać opis niezgodności oraz załącznik z Planem Podróży. Biuro rozpatrzy ją w ciągu 14 dni.`,
          },
          {
            icon: Copyright,
            title: "§7. Prawa autorskie",
            content: `Plan Podróży jest utworem chronionym i jest przeznaczony wyłącznie do prywatnego użytku Klienta. Zakazuje się jego publikowania, odsprzedaży lub udostępniania osobom trzecim.`,
          },
          {
            icon: Lock,
            title: "§8. Pliki cookies",
            content: (
              <>
                Strona internetowa Biura wykorzystuje pliki cookies w celu zapewnienia komfortu
                korzystania z usługi oraz analizy ruchu. Szczegółowe informacje o celu przetwarzania
                danych przez cookies oraz możliwość ich wyłączenia znajdziesz w Polityce Prywatności
                pod adresem:{" "}
                <Link
                  href="/privacy"
                  className="text-ocean hover:text-gold underline transition-colors"
                >
                  www.explorahead.com/privacy
                </Link>
              </>
            ),
          },
          {
            icon: Shield,
            title: "§9. Ochrona danych osobowych (RODO)",
            content: (
              <>
                Administratorem danych osobowych Klientów jest Biuro Podróży ExplorAhead.
                {"\n\n"}
                Przetwarzanie danych w celach marketingowych (np. wysyłka newslettera) odbywa się
                wyłącznie za zgodą.
                {"\n\n"}
                Podanie danych osobowych jest dobrowolne, jednakże ich brak uniemożliwi Biuru
                przygotowanie Oferty oraz realizację Usługi.
                {"\n\n"}
                Każdemu Klientowi przysługuje prawo dostępu do swoich danych, ich sprostowania,
                usunięcia, ograniczenia przetwarzania, prawo do przenoszenia danych.
                {"\n\n"}
                Szczegółowe informacje o przetwarzaniu danych znajdziesz w Polityce Prywatności
                dostępnej pod adresem:{" "}
                <Link
                  href="/privacy"
                  className="text-ocean hover:text-gold underline transition-colors"
                >
                  www.explorahead.com/privacy
                </Link>
              </>
            ),
          },
          {
            icon: Scale,
            title: "§10. Postanowienia końcowe",
            content: `Prawem właściwym dla niniejszego Regulaminu jest prawo polskie.

W sprawach nieuregulowanych w niniejszym Regulaminie mają zastosowanie przepisy:
• Ustawy o prawach konsumenta z dnia 30 maja 2014 r. (Dz.U. 2014 poz. 827 z późn. zm.)
• Ustawy o świadczeniu usług drogą elektroniczną z dnia 18 lipca 2002 r. (Dz.U. 2002 nr 144 poz. 1204 z późn. zm.)
• Ustawy o pozasądowym rozwiązywaniu sporów konsumenckich z dnia 23 września 2016 r. (Dz.U. 2016 poz. 1823)
• Ustawy Kodeksu Cywilnego z dnia 23 kwietnia 1964 r. (Dz.U. 1964 nr 16 poz. 93 z późn. zm.)
• Oraz inne właściwe przepisy prawa polskiego

Data wejścia w życie: Luty 2026`,
          },
        ],
        notice: {
          title: "Ważna informacja",
          content: `Korzystanie z usług ExplorAhead oznacza akceptację niniejszego Regulaminu. Prosimy o uważne zapoznanie się z jego treścią przed zamówieniem usługi. W razie pytań jesteśmy do Państwa dyspozycji.`,
        },
        cta: {
          title: "Pytania dotyczące Regulaminu?",
          subtitle: "Skontaktuj się z nami – chętnie wyjaśnimy wszelkie wątpliwości",
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
            <Scale size={40} className="text-gold" />
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

          {/* Important Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gold/10 border-gold mt-16 rounded-xl border-l-4 p-6"
          >
            <div className="flex items-start gap-3">
              <AlertCircle size={24} className="text-gold mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-heading text-ocean mb-2 text-lg">{content.notice.title}</h3>
                <p className="text-gray-dark">{content.notice.content}</p>
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
