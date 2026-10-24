import { Mail, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/contact/ContactForm";
import { siteConfig } from "@/config/site";
import { sectionThemes } from "@/config/sections";
import { animationConfig } from "@/config/animations";
import { useGsapScope } from "@/hooks/useGsapScope";
import { revealChildren } from "@/components/animations/gsapUtils";

export function ContactSection() {
  const ref = useGsapScope<HTMLElement>((scope, mm) => {
    mm.add(animationConfig.motion, () => revealChildren(scope));
  });
  return (
    <section id="contact" ref={ref} data-theme={sectionThemes.contact} aria-labelledby="contact-title" className="relative py-24 lg:py-40">
      <Container className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading index="04" eyebrow="Contact" id="contact-title" title={<>Let&apos;s build<br /><span className="italic font-light text-moss">something good.</span></>} />
          <p data-reveal className="mt-6 max-w-sm text-page-muted">Tell us about your project. We reply to every enquiry personally.</p>
          <ul data-reveal className="mt-10 flex flex-col gap-3">
            <li>
              <a href={`mailto:${siteConfig.email}`} className="inline-flex items-center gap-3 text-lg font-semibold hover:text-clay">
                <Mail className="h-5 w-5" aria-hidden /> {siteConfig.email}
              </a>
            </li>
            {siteConfig.whatsapp && (
              <li>
                <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 text-lg font-semibold hover:text-clay">
                  <MessageCircle className="h-5 w-5" aria-hidden /> WhatsApp
                </a>
              </li>
            )}
          </ul>
        </div>
        <div data-reveal className="lg:col-span-7">
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
