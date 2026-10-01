import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { footerLinks, socials } from "@/lib/data";

const contacts = [
  {
    icon: "/assets/footer/icon-location.svg",
    label: (
      <>
        Warehouse 4, 5th Street,
        <br />
        Al Quoz, Al Quoz 3, Dubai
      </>
    ),
    href: "https://maps.google.com/?q=Warehouse+4,+5th+Street,+Al+Quoz+3,+Dubai",
  },
  { icon: "/assets/footer/icon-phone.svg", label: "+971 50 461 7277", href: "tel:+971504617277" },
  { icon: "/assets/footer/icon-mail.svg", label: "info@domain.com", href: "mailto:info@domain.com" },
];

/** Figma "Footer" (206:402). */
export function SiteFooter() {
  return (
    <footer id="contact" data-section="footer" className="container-lumino relative mt-16 pb-8 md:mt-[88px] lg:mt-[140px]">
      <span aria-hidden className="absolute inset-x-[var(--gutter)] -top-14 hidden h-px bg-white/4 lg:block" />
      <div className="flex flex-col gap-12 md:grid md:grid-cols-2 lg:flex lg:flex-row lg:flex-wrap lg:justify-between xl:flex-nowrap xl:justify-start xl:gap-[250px]">
        <div className="flex max-w-[383px] flex-col gap-8">
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="text-base leading-6 tracking-[0.08px] text-white/72 sm:leading-7">
              Lumino lets you buy digital currencies in grocery stores and convenience stores. Buy it, redeem it, spend it.
              Its like an ITunes song card for Bitcoin, Litecoin, Dogecoin and others.
            </p>
          </div>
          <ul className="flex items-center gap-5 max-lg:-ml-1.5 max-lg:gap-1" aria-label="Social media">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Lumino on ${social.label}`}
                  className="block rounded-full transition-opacity hover:opacity-75 max-lg:flex max-lg:size-11 max-lg:items-center max-lg:justify-center"
                >
                  <Image src={social.icon} alt="" width={32} height={32} className="size-8" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-labelledby="footer-company" className="flex flex-col gap-6">
          <h2 id="footer-company" className="text-base leading-[normal] font-semibold tracking-[0.08px] text-white">
            Company
          </h2>
          <ul className="flex flex-col gap-6 max-lg:-my-[9px] max-lg:gap-1">
            {footerLinks.map((link) => (
              <li key={link}>
                <Link href="#main" className="text-base leading-[26px] tracking-[0.08px] text-white/72 transition-colors hover:text-white max-lg:inline-flex max-lg:min-h-11 max-lg:min-w-11 max-lg:items-center">
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-6">
          <h2 className="text-base leading-[normal] font-semibold tracking-[0.08px] text-white">Contact Us</h2>
          <address className="flex flex-col gap-4 not-italic max-lg:-my-[9px] max-lg:gap-1">
            {contacts.map((contact) => (
              <a
                key={contact.href}
                href={contact.href}
                className="flex items-center gap-2 text-base leading-[26px] tracking-[0.08px] whitespace-nowrap max-lg:min-h-11 text-white/72 transition-colors hover:text-white"
              >
                <Image src={contact.icon} alt="" width={20} height={20} className="size-5 shrink-0" />
                <span>{contact.label}</span>
              </a>
            ))}
          </address>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-5">
        <span aria-hidden className="h-px w-full bg-white/4" />
        <div className="flex flex-col gap-2 text-base leading-[26px] tracking-[0.08px] text-white/80 max-md:items-start md:flex-row md:gap-6 md:max-lg:items-center">
          <p>© 2023 Lumino All rights reserved.</p>
          <p>
            <Link href="#main" className="transition-colors hover:text-white max-lg:inline-flex max-lg:min-h-11 max-lg:items-center">
              Terms of Use
            </Link>
            <span aria-hidden> | </span>
            <Link href="#main" className="transition-colors hover:text-white max-lg:inline-flex max-lg:min-h-11 max-lg:items-center">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
