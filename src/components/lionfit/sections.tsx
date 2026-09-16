import { useEffect, useState, type ReactNode } from "react";
import {
  ArrowRight,
  ChevronRight,
  Clock3,
  Dumbbell,
  Instagram,
  MapPin,
  Menu,
  MessageCircle,
  ShieldCheck,
  Snowflake,
  Sparkles,
  Star,
  Trophy,
  Users,
  Volleyball,
  Waves,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import logoAsset from "@/assets/lionfit-logo.jpg";
import heroImage from "@/assets/lionfit-hero.jpg";
import beachImage from "@/assets/lion-beach.jpg";

const WHATSAPP = "https://wa.me/5588999215094";
const defaultMessage = "Olá! Vim pelo site da LionFIT e gostaria de saber mais sobre os planos.";
const whatsappLink = (message = defaultMessage) => `${WHATSAPP}?text=${encodeURIComponent(message)}`;
const instagram = "https://www.instagram.com/ctlionfit/";
const maps = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("CT LionFIT, R. Jacinto Cruz, 02 - de Agosto, Morada Nova - CE, 62940-000");

const navigation = [
  ["Início", "inicio"], ["A Academia", "academia"], ["Planos", "planos"],
  ["Estrutura", "estrutura"], ["Horários", "horarios"], ["Lion Beach", "lion-beach"], ["Contato", "contato"],
];

export function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);
  return <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-xl">
    <div className="site-container grid h-20 grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-3 lg:flex">
      <a href="#inicio" aria-label="CT LionFIT - Início" className="flex min-w-0 items-center gap-3 lg:mr-auto">
        <img src={logoAsset} alt="Logo CT LionFIT" className="h-12 w-12 shrink-0 object-cover" width="48" height="48" />
        <span className="font-display text-xl font-black uppercase text-foreground">CT <span className="text-primary">LionFIT</span></span>
      </a>
      <nav aria-label="Navegação principal" className="hidden items-center gap-6 xl:flex">
        {navigation.map(([label, id]) => <a key={id} href={`#${id}`} className="text-xs font-bold uppercase text-muted-foreground transition-colors hover:text-primary">{label}</a>)}
      </nav>
      <Button asChild variant="brand" size="lg" className="hidden lg:inline-flex xl:ml-5"><a href={whatsappLink()} target="_blank" rel="noreferrer">Quero treinar <ArrowRight /></a></Button>
      <Button asChild variant="ghost" size="icon" className="lg:hidden"><a href={whatsappLink()} target="_blank" rel="noreferrer" aria-label="Falar no WhatsApp"><MessageCircle /></a></Button>
      <Button variant="outline" size="icon" className="lg:hidden" onClick={() => setOpen(v => !v)} aria-expanded={open} aria-label={open ? "Fechar menu" : "Abrir menu"}>{open ? <X /> : <Menu />}</Button>
    </div>
    {open && <nav aria-label="Menu móvel" className="border-t border-border bg-background px-5 py-5 lg:hidden">
      <div className="grid gap-1">{navigation.map(([label,id]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className="flex items-center justify-between border-b border-border/60 py-3 font-display text-lg font-bold uppercase">{label}<ChevronRight className="text-primary" /></a>)}</div>
    </nav>}
  </header>;
}

export function Hero() {
  return <section id="inicio" className="relative isolate min-h-[760px] overflow-hidden pt-20 md:min-h-[820px]">
    <img src={heroImage} alt="Atleta treinando levantamento terra em uma academia moderna" width="1920" height="1280" fetchPriority="high" className="absolute inset-0 -z-20 h-full w-full object-cover object-[66%_center]" />
    <div className="absolute inset-0 -z-10 bg-hero-overlay" />
    <div className="site-container flex min-h-[680px] items-center py-20 md:min-h-[740px]">
      <div className="max-w-3xl">
        <div className="mb-7 flex items-center gap-3"><span className="h-px w-10 bg-primary"/><span className="eyebrow">Morada Nova · Ceará</span></div>
        <h1 className="font-display text-6xl font-black uppercase leading-[.88] text-foreground sm:text-7xl md:text-8xl lg:text-[7rem]">Seu objetivo.<br/><span className="text-primary">Nosso foco.</span></h1>
        <p className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-xl">Treine em um ambiente completo, climatizado e preparado para você evoluir.</p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="brand" size="xl"><a href={whatsappLink()} target="_blank" rel="noreferrer">Quero treinar <ArrowRight /></a></Button>
          <Button asChild variant="heroOutline" size="xl"><a href="#planos">Ver planos</a></Button>
        </div>
        <div className="mt-12 grid max-w-2xl gap-px overflow-hidden border-y border-border/70 bg-border/60 sm:grid-cols-3">
          {[ [Snowflake,"Ambiente climatizado"], [Dumbbell,"Equipamentos de qualidade"], [ShieldCheck,"Equipe preparada"] ].map(([Icon,label]) => { const C = Icon as typeof Snowflake; return <div key={String(label)} className="flex items-center gap-3 bg-background/80 px-5 py-4 backdrop-blur"><C className="text-primary"/><span className="text-xs font-bold uppercase">{String(label)}</span></div>})}
        </div>
      </div>
    </div>
    <a href="#academia" aria-label="Conhecer a academia" className="absolute bottom-8 right-6 hidden items-center gap-3 text-xs font-bold uppercase text-muted-foreground transition hover:text-primary md:flex"><span className="h-px w-12 bg-primary"/> Explore a LionFIT</a>
  </section>;
}

const aboutItems = ["Ambiente amplo", "Ambiente climatizado", "Equipamentos em ótimo estado", "Boa organização", "Espaços bem divididos", "Equipe preparada", "Banheiros limpos"];
export function About() {
  return <section id="academia" className="section-pad bg-surface">
    <div className="site-container grid gap-14 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
      <div data-reveal="left"><SectionLabel>Conheça a LionFIT</SectionLabel><h2 className="section-title">Mais que treino.<br/><span className="text-primary">Uma nova rotina.</span></h2><p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">Mais do que uma academia, um espaço para você cuidar do corpo, superar limites e construir novos hábitos.</p></div>
      <div data-reveal="right" className="grid gap-px bg-border sm:grid-cols-2">{aboutItems.map((item,index) => <div key={item} className={`group flex min-h-24 items-center gap-4 bg-background px-6 py-5 ${index === aboutItems.length-1 ? "sm:col-span-2" : ""}`}><span className="font-display text-2xl font-black text-primary">{String(index+1).padStart(2,"0")}</span><span className="font-bold uppercase">{item}</span></div>)}</div>
    </div>
  </section>;
}

export function TrustStrip() {
  return <section aria-label="Indicadores de confiança" className="border-y border-border bg-primary text-primary-foreground"><div className="site-container grid md:grid-cols-3">{[["4,8 ★","Avaliação no Google"],["25+","Avaliações de clientes"],["FOCO","Na sua evolução"]].map(([value,label],i)=><div key={label} className={`py-8 text-center ${i ? "border-t border-primary-foreground/20 md:border-l md:border-t-0" : ""}`}><strong className="font-display text-4xl font-black">{value}</strong><p className="mt-1 text-xs font-bold uppercase">{label}</p></div>)}</div></section>;
}

const plans = [
  ["Diária","20,00"],["Semanal","60,00"],["Quinzenal","80,00"],["3x Semana","90,00"],["Estudantil","90,00"],["S. Calçados","90,00"],["Mensal","110,00"],["Amigo 1+1","105,00"],["Amigo 1+2","100,00"],["Amigo 1+3","95,00"],["Trimestral","285,00"],["Semestral","510,00"],["Anual","900,00"],
];
export function Plans() {
  return <section id="planos" className="section-pad bg-background"><div className="site-container"><div data-reveal className="max-w-2xl"><SectionLabel>Planos LionFIT</SectionLabel><h2 className="section-title">Escolha seu <span className="text-primary">plano</span></h2><p className="section-copy">Encontre a opção que melhor combina com sua rotina.</p></div>
    <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">{plans.map(([name,price],index)=>{const [whole,cents] = (price ?? "0,00").split(","); return <article key={name} className={`plan-card group relative flex min-h-52 flex-col border border-border bg-card p-5 transition duration-300 hover:-translate-y-1 hover:border-primary ${index === 12 ? "md:col-span-3 lg:col-span-4 lg:grid lg:min-h-0 lg:grid-cols-[1fr_auto_auto] lg:items-center lg:gap-10" : ""}`}><p className="font-display text-lg font-black uppercase text-card-foreground">{name}</p><div className="mt-4 flex items-start text-primary lg:mt-4"><span className="mr-1 mt-2 text-xs font-black">R$</span><span className="font-display text-4xl font-black sm:text-5xl">{whole}</span><span className="mt-2 text-sm font-black">,{cents}</span></div><Button asChild variant="plan" className="mt-auto w-full lg:mt-4"><a href={whatsappLink(`Olá! Tenho interesse no plano ${name} da LionFIT. Gostaria de mais informações.`)} target="_blank" rel="noreferrer">Quero esse plano</a></Button></article>})}</div>
  </div></section>;
}

const features = [[Snowflake,"Ambiente climatizado"],[Waves,"Espaço amplo"],[Dumbbell,"Equipamentos em ótimo estado"],[Sparkles,"Espaços bem divididos"],[Users,"Equipe preparada"],[ShieldCheck,"Ambiente organizado"]];
export function Features() { return <section id="estrutura" className="section-pad bg-surface"><div className="site-container"><div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]"><div data-reveal="left"><SectionLabel>Nossos diferenciais</SectionLabel><h2 className="section-title">Estrutura para você <span className="text-primary">evoluir</span></h2><p className="section-copy">Um ambiente pensado para você treinar com conforto, organização e foco.</p></div><div data-reveal="right" className="grid gap-px bg-border sm:grid-cols-2">{features.map(([Icon,label])=>{const C=Icon as typeof Snowflake;return <div key={String(label)} className="feature-item bg-background p-6"><C className="mb-8 h-8 w-8 text-primary" strokeWidth={1.7}/><h3 className="font-display text-lg font-black uppercase">{String(label)}</h3></div>})}</div></div></div></section> }

export function Schedule() { const hours=[["Segunda a sexta","05:00","23:00"],["Sábado","08:00","17:00"],["Domingo","08:00","12:00"]]; return <section id="horarios" className="section-pad overflow-hidden bg-background"><div className="site-container grid gap-14 lg:grid-cols-[.8fr_1.2fr] lg:items-center"><div data-reveal="left"><SectionLabel>Horário de funcionamento</SectionLabel><h2 className="section-title">Seu treino no <span className="text-primary">seu horário</span></h2><p className="section-copy">Da primeira série do dia ao último treino da noite.</p><Clock3 className="mt-8 h-16 w-16 text-primary" strokeWidth={1.3}/></div><div data-reveal="right" className="border-y border-border">{hours.map(([day,open,close])=><div key={day} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-5 border-b border-border py-7 last:border-0"><h3 className="min-w-0 font-display text-xl font-black uppercase sm:text-2xl">{day}</h3><div className="shrink-0 text-right"><span className="font-display text-2xl font-black text-primary sm:text-4xl">{open}</span><span className="mx-2 text-xs font-bold uppercase text-muted-foreground">às</span><span className="font-display text-2xl font-black sm:text-4xl">{close}</span></div></div>)}</div></div></section> }

const reviews=["Ótimos equipamentos e profissionais, espaço amplo e climatizado.","Banheiros sempre limpinhos e os aparelhos de exercícios sempre limpos.","Academia bem equipada e com ótima climatização!","Tive as melhores experiências, foi a única que consegui me manter focada e que realmente consegui mudar o físico e o mental, ambiente acolhedor e com ótima estrutura...","Melhor academia da cidade. Maquinários novos, personalizados e ambiente muito agradável."];
export function Testimonials(){return <section className="section-pad bg-surface"><div className="site-container"><div data-reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><SectionLabel>Avaliações de clientes</SectionLabel><h2 className="section-title">O que nossos <span className="text-primary">alunos dizem</span></h2></div><div className="flex items-end gap-3"><strong className="font-display text-6xl font-black text-primary">4,8</strong><div className="pb-2"><div className="flex text-primary" aria-label="4,8 de 5 estrelas">{[1,2,3,4,5].map(n=><Star key={n} className="h-4 w-4 fill-current"/>)}</div><span className="text-xs font-bold uppercase text-muted-foreground">de 5 no Google</span></div></div></div><div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{reviews.map((review,i)=><blockquote data-reveal key={review} className={`border-l-2 border-primary bg-background p-6 ${i===3?"lg:col-span-2":""}`}><div className="mb-5 flex text-primary">{[1,2,3,4,5].map(n=><Star key={n} className="h-4 w-4 fill-current"/>)}</div><p className="leading-relaxed text-foreground">“{review}”</p><footer className="mt-5 text-xs font-bold uppercase text-muted-foreground">Avaliação de cliente</footer></blockquote>)}</div></div></section>}

export function LionBeach(){return <section id="lion-beach" className="relative isolate min-h-[620px] overflow-hidden"><img src={beachImage} alt="Prática de beach tennis em arena de areia" loading="lazy" width="1600" height="1008" className="absolute inset-0 -z-20 h-full w-full object-cover"/><div className="absolute inset-0 -z-10 bg-beach-overlay"/><div className="site-container flex min-h-[620px] items-end py-20"><div className="max-w-xl"><div className="mb-5 flex gap-3 text-primary"><Volleyball/><span className="eyebrow">Outro espaço da família Lion</span></div><h2 className="font-display text-6xl font-black uppercase leading-none sm:text-8xl">Lion <span className="text-primary">Beach</span></h2><p className="mt-5 text-2xl font-bold">Mais esporte, mais movimento.</p><p className="mt-3 text-muted-foreground">Um espaço da mesma empresa voltado para Beach Tennis e Vôlei de Areia.</p><Button asChild variant="brand" size="xl" className="mt-8"><a href={instagram} target="_blank" rel="noreferrer">Conheça a Lion Beach <ArrowRight/></a></Button></div></div></section>}

export function Location(){return <section id="contato" className="section-pad bg-background"><div className="site-container grid gap-10 lg:grid-cols-2"><div><SectionLabel>Onde estamos</SectionLabel><h2 className="section-title">Treine no coração de <span className="text-primary">Morada Nova</span></h2><div className="mt-10 space-y-6"><Info icon={<MapPin/>} title="CT LionFIT">R. Jacinto Cruz, 02 - de Agosto<br/>Morada Nova - CE · CEP 62940-000</Info><Info icon={<MessageCircle/>} title="Telefone / WhatsApp">(88) 99921-5094</Info></div><div className="mt-9 flex flex-col gap-3 sm:flex-row"><Button asChild variant="brand" size="lg"><a href={maps} target="_blank" rel="noreferrer"><MapPin/> Como chegar</a></Button><Button asChild variant="outline" size="lg"><a href={whatsappLink()} target="_blank" rel="noreferrer"><MessageCircle/> WhatsApp</a></Button></div></div><div className="min-h-96 overflow-hidden border border-border grayscale transition duration-500 hover:grayscale-0"><iframe title="Mapa com localização da CT LionFIT" src={`https://www.google.com/maps?q=${encodeURIComponent("CT LionFIT, R. Jacinto Cruz, Morada Nova - CE")}&z=16&output=embed`} className="h-full min-h-96 w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade"/></div></div></section>}

export function InstagramCTA(){return <section className="border-y border-border bg-surface py-16"><div className="site-container flex flex-col justify-between gap-8 md:flex-row md:items-center"><div className="flex items-start gap-5"><Instagram className="h-11 w-11 shrink-0 text-primary"/><div><h2 className="font-display text-3xl font-black uppercase sm:text-4xl">Acompanhe a LionFIT</h2><p className="mt-2 max-w-2xl text-muted-foreground">Veja nossos treinos, novidades, estrutura e acompanhe a rotina da LionFIT.</p></div></div><Button asChild variant="outline" size="xl" className="shrink-0"><a href={instagram} target="_blank" rel="noreferrer">Seguir no Instagram <ArrowRight/></a></Button></div></section>}

export function FinalCTA(){return <section className="relative overflow-hidden bg-primary py-24 text-primary-foreground"><div className="absolute -right-16 top-1/2 -translate-y-1/2 font-display text-[18rem] font-black leading-none text-primary-foreground/5" aria-hidden="true">LF</div><div data-reveal className="site-container relative"><Trophy className="mb-8 h-12 w-12"/><h2 className="max-w-4xl font-display text-6xl font-black uppercase leading-[.9] sm:text-8xl">Pronto para começar?</h2><p className="mt-6 text-lg font-semibold">Escolha seu plano e dê o próximo passo na sua evolução.</p><div className="mt-9 flex flex-col gap-3 sm:flex-row"><Button asChild variant="inverse" size="xl"><a href={whatsappLink()} target="_blank" rel="noreferrer"><MessageCircle/> Falar no WhatsApp</a></Button><Button asChild variant="inverseOutline" size="xl"><a href="#planos">Ver planos</a></Button></div></div></section>}

export function Footer(){return <footer className="bg-background py-14"><div className="site-container"><div className="grid gap-10 border-b border-border pb-12 md:grid-cols-2 lg:grid-cols-4"><div><img src={logoAsset} alt="CT LionFIT" width="80" height="80" className="h-20 w-20 object-cover"/><p className="mt-4 max-w-xs text-sm text-muted-foreground">Força, disciplina e estrutura para sua evolução.</p></div><div><FooterTitle>Contato</FooterTitle><p className="footer-copy">R. Jacinto Cruz, 02 - de Agosto<br/>Morada Nova - CE</p><a href={whatsappLink()} className="mt-3 block text-sm font-bold text-primary">(88) 99921-5094</a></div><div><FooterTitle>Horários</FooterTitle><p className="footer-copy">Seg–Sex · 05:00–23:00<br/>Sábado · 08:00–17:00<br/>Domingo · 08:00–12:00</p></div><div><FooterTitle>Conecte-se</FooterTitle><div className="flex gap-3"><Button asChild variant="outline" size="icon"><a href={instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram/></a></Button><Button asChild variant="outline" size="icon"><a href={whatsappLink()} target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle/></a></Button><Button asChild variant="outline" size="icon"><a href={maps} target="_blank" rel="noreferrer" aria-label="Localização"><MapPin/></a></Button></div><a href="#lion-beach" className="mt-5 inline-block text-sm font-bold uppercase text-muted-foreground hover:text-primary">Lion Beach →</a></div></div><div className="flex flex-col justify-between gap-2 pt-6 text-xs font-bold uppercase text-muted-foreground sm:flex-row"><span>© {new Date().getFullYear()} CT LionFIT</span><span>Morada Nova · Ceará</span></div></div></footer>}

export function WhatsAppButton(){return <a href={whatsappLink()} target="_blank" rel="noreferrer" aria-label="Falar com a LionFIT no WhatsApp" className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center bg-whatsapp text-whatsapp-foreground shadow-strong transition hover:-translate-y-1 hover:brightness-110"><MessageCircle className="h-7 w-7"/></a>}

function SectionLabel({children}:{children:ReactNode}){return <div className="mb-5 flex items-center gap-3"><span className="h-px w-8 bg-primary"/><span className="eyebrow">{children}</span></div>}
function Info({icon,title,children}:{icon:ReactNode,title:string,children:ReactNode}){return <div className="flex gap-4"><span className="mt-1 text-primary">{icon}</span><div><h3 className="font-display text-lg font-black uppercase">{title}</h3><p className="mt-1 leading-relaxed text-muted-foreground">{children}</p></div></div>}
function FooterTitle({children}:{children:ReactNode}){return <h3 className="mb-4 font-display text-sm font-black uppercase text-primary">{children}</h3>}
