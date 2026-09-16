import { createFileRoute } from "@tanstack/react-router";
import { About, Features, FinalCTA, Footer, Header, Hero, InstagramCTA, LionBeach, Location, Plans, Schedule, Testimonials, TrustStrip, WhatsAppButton } from "@/components/lionfit/sections";
import { ScrollEffects } from "@/components/lionfit/ScrollEffects";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CT LionFIT | Academia em Morada Nova - CE" },
      { name: "description", content: "Academia CT LionFIT em Morada Nova, CE: ambiente climatizado, equipamentos de qualidade, equipe preparada e planos para sua rotina." },
      { property: "og:title", content: "CT LionFIT | Academia em Morada Nova - CE" },
      { property: "og:description", content: "Força, disciplina e estrutura para sua evolução. Conheça a CT LionFIT em Morada Nova." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "HealthClub", name: "CT LionFIT", telephone: "+55 88 9364-4658", address: { "@type": "PostalAddress", streetAddress: "R. Jacinto Cruz, 02 - de Agosto", addressLocality: "Morada Nova", addressRegion: "CE", postalCode: "62940-000", addressCountry: "BR" }, sameAs: ["https://www.instagram.com/ctlionfit/"] }) }],
  }),
  component: Index,
});

function Index() {
  return <><Header/><main><Hero/><About/><TrustStrip/><Plans/><Features/><ScrollEffects/><Schedule/><Testimonials/><LionBeach/><Location/><InstagramCTA/><FinalCTA/></main><Footer/><WhatsAppButton/></>;
}
