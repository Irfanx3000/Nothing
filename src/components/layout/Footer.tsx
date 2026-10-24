import { Container } from "@/components/ui/Container";
import { navLinks } from "@/config/navigation";
import { RollLabel } from "@/components/layout/Navbar";
import { siteConfig } from "@/config/site";
import { sectionThemes } from "@/config/sections";
import { services } from "@/data/services";
import { socialLinks } from "@/data/socialLinks";

export function Footer() {
  const socials = socialLinks.filter((s) => s.href);
  return (
    <footer data-theme={sectionThemes.footer} className="pt-24 pb-10">
      <Container>
        <a href="#contact" className="block font-display text-mega font-semibold transition-colors hover:text-clay">
          Say hello<span className="text-clay">.</span>
        </a>
        <div className="mt-20 grid gap-10 border-t border-page-line pt-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-xl font-semibold">{siteConfig.shortName}<span className="text-clay">.</span></p>
            <p className="mt-3 max-w-xs text-sm text-page-muted">{siteConfig.description}</p>
          </div>
          <nav aria-label="Footer">
            <p className="eyebrow text-page-muted">Navigate</p>
            <ul className="mt-4 space-y-2 text-sm">{navLinks.map((l) => <li key={l.href}><a href={l.href} className="inline-block hover:text-clay focus-visible:text-clay"><RollLabel text={l.label} /></a></li>)}</ul>
          </nav>
          <div>
            <p className="eyebrow text-page-muted">Services</p>
            <ul className="mt-4 space-y-2 text-sm">{services.map((s) => <li key={s.id}><a href="#services" className="hover:text-clay">{s.title}</a></li>)}</ul>
          </div>
          <div>
            <p className="eyebrow text-page-muted">Contact</p>
            <a href={`mailto:${siteConfig.email}`} className="mt-4 block text-sm hover:text-clay">{siteConfig.email}</a>
            {socials.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-3 text-sm">{socials.map((s) => <li key={s.label}><a href={s.href} target="_blank" rel="noreferrer" className="hover:text-clay">{s.label}</a></li>)}</ul>
            )}
          </div>
        </div>
        <p className="mt-16 text-xs text-page-muted">© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
      </Container>
    </footer>
  );
}
