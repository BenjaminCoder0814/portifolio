import Link from "next/link";
import type { Metadata } from "next";
import PageShell, { LANGS, pickLang, altsFor, H2, P, Callout, Grid, Card } from "@/components/site/PageShell";

const COPY = {
  pt: {
    eyebrow: "Sobre",
    crumb: "Sobre",
    title: "Comecei aos 12 anos porque queria fazer um jogo. Continuei porque descobri o que dá para consertar.",
    lead: "A versão longa da trajetória — o que aconteceu, em que ordem, e o que cada etapa deixou.",
    story: [
      "Meu primeiro código foi aos 12 anos, no Scratch e no Code Buddy. Não foi uma escolha de carreira: eu queria fazer um jogo e descobri que dava. O que ficou daquela fase não foi sintaxe nenhuma — foi a noção de que a tela obedece se você souber explicar o que quer, e que explicar direito é a parte difícil.",
      "Em 2022 entrei num clube de robótica com LEGO e passei um ano ali. Robótica educacional ensina uma coisa que programação de tela demora a ensinar: o mundo físico não aceita quase certo. O sensor lê o que lê, o motor gira o que gira, e o programa que funcionava na bancada falha no chão porque o chão tem atrito. Isso me acostumou a pensar em condições reais antes de pensar em código.",
      "Em 2023 entrei no curso técnico em TI no UNASP e, no mesmo ano, comecei na Zenith Lacres — uma indústria de lacres com mais de vinte anos de mercado. O primeiro trabalho lá não foi de programação: foi rebranding. Identidade visual, site, mídias sociais, e depois a montagem de um estúdio fotográfico interno para produzir o catálogo. Em 2024 isso virou entrada em cinco marketplaces, e a receita digital saiu de zero a dez mil reais em três meses.",
      "Esse período é o que explica tudo que veio depois. Trabalhando no catálogo — cada produto com material, modelo, tamanho, cor — eu aprendi o domínio antes de escrever uma linha de sistema. Quando finalmente propus construir o ERP interno, eu não estava adivinhando como a operação funcionava. Eu tinha fotografado os produtos um por um.",
      "Ainda em 2024 tirei a habilitação de piloto de drone e fiz captação aérea, incluindo cobertura da Porsche Carrera Cup. É a linha mais fora de contexto do meu currículo, e eu mantenho porque ela também ensina engenharia: voar drone é operar sob restrição real — bateria, vento, enquadramento, uma única tomada — e não há refatoração possível depois que a corrida acabou.",
      "Em 2025 entreguei o TCC. O projeto era para ser feito em trio e acabou entregue sozinho: uma plataforma de acompanhamento de treinos, do design ao back-end, aprovada com nota máxima. Foi também onde eu aprendi, relendo o repositório depois, que arquivo de CI não é o mesmo que ter CI — a lição mais útil que eu tirei daquele ano.",
      "Hoje mantenho e evoluo a plataforma interna que a operação da Zenith usa todo dia, curso duas graduações simultâneas — Sistemas de Informação no UNASP e Ciência da Computação na University of the People — e lidero o Cortex, a camada de IA sobre os dados do ERP. E estou procurando a próxima vaga.",
    ],
    hValues: "O que eu levo para qualquer time",
    values: [
      { t: "Eu entro pelo problema, não pelo ticket", d: "Todo software que eu construí nasceu de alguém descrevendo um processo manual que doía. É assim que eu prefiro trabalhar, e é o tipo de time que eu procuro." },
      { t: "Decisão técnica é trade-off explícito", d: "Guardar o saldo em vez de derivar, comprar o tempo real em vez de construir: todas essas escolhas custam algo, e eu prefiro escrever o custo do que fingir que não existe." },
      { t: "Entregue, não só rodando", d: "Funciona na minha máquina é o começo do trabalho. Mobile, erro tratado, alguém não técnico conseguindo usar sem treinamento — é isso que separa demo de sistema." },
      { t: "Escrevo para ser lido", d: "Em português, inglês e espanhol. Documentar decisão é parte de tomá-la; se eu não consigo explicar por que escolhi, provavelmente não escolhi." },
    ],
    hLooking: "O que eu busco",
    looking:
      "Uma posição de Software Engineer (júnior ou estágio), remota ou presencial em São Paulo, incluindo oportunidades internacionais. Prefiro time onde eu consiga ver o problema de negócio por trás da tarefa — porque é onde eu rendo mais e onde eu já provei que entrego.",
    ctaNotes: "Ler as notas técnicas",
    ctaProjects: "Ver os projetos",
    metaTitle: "Sobre — trajetória e valores",
    metaDesc: "A trajetória de Benjamin Maciel: do primeiro código aos 12 anos ao ERP em produção, passando por robótica, rebranding, marketplaces e drone.",
  },
  en: {
    eyebrow: "About",
    crumb: "About",
    title: "I started at 12 because I wanted to make a game. I kept going because I found out what can be fixed.",
    lead: "The long version of the trajectory — what happened, in what order, and what each stage left behind.",
    story: [
      "My first code was at twelve, in Scratch and Code Buddy. It was not a career choice: I wanted to make a game and found out I could. What stayed from that period was not syntax — it was the idea that the screen obeys if you can explain what you want, and that explaining it properly is the hard part.",
      "In 2022 I joined a LEGO robotics club and spent a year there. Educational robotics teaches something screen programming takes much longer to teach: the physical world does not accept almost right. The sensor reads what it reads, the motor turns what it turns, and the program that worked on the bench fails on the floor because the floor has friction. It got me used to thinking about real conditions before thinking about code.",
      "In 2023 I started the technical IT course at UNASP and, that same year, started at Zenith Lacres — an industrial sealing manufacturer with more than twenty years in the market. My first work there was not programming: it was rebranding. Visual identity, website, social media, and then building an in-house photography studio to produce the catalogue. In 2024 that became a launch on five marketplaces, and digital revenue went from zero to ten thousand reais in three months.",
      "That period is what explains everything that came after. Working on the catalogue — every product with a material, a model, a size, a colour — I learned the domain before writing a line of the system. When I finally proposed building the internal ERP, I was not guessing at how the operation worked. I had photographed the products one by one.",
      "Still in 2024 I got my drone pilot licence and did aerial work, including coverage of the Porsche Carrera Cup. It is the most out-of-place line on my CV, and I keep it because it teaches engineering too: flying a drone is operating under real constraints — battery, wind, framing, a single take — and there is no refactor available once the race is over.",
      "In 2025 I delivered my graduation project. It was meant to be a group of three and ended up delivered alone: a workout-tracking platform, from design to back end, passed with the top grade. It is also where I learned, re-reading the repository afterwards, that a CI file is not the same as having CI — the most useful lesson I took from that year.",
      "Today I maintain and extend the internal platform the Zenith operation runs on every day, study two degrees at once — Information Systems at UNASP and Computer Science at University of the People — and lead Cortex, the AI layer over the ERP data. And I am looking for my next role.",
    ],
    hValues: "What I bring to any team",
    values: [
      { t: "I come in through the problem, not the ticket", d: "Every piece of software I have built started with someone describing a manual process that hurt. That is how I prefer to work, and the kind of team I am looking for." },
      { t: "A technical decision is an explicit trade-off", d: "Storing the balance instead of deriving it, buying real-time instead of building it: every one of those choices costs something, and I would rather write the cost down than pretend it is not there." },
      { t: "Shipped, not merely running", d: "It works on my machine is where the work starts. Mobile, handled errors, a non-technical person getting through it without training — that is what separates a demo from a system." },
      { t: "I write to be read", d: "In Portuguese, English and Spanish. Documenting a decision is part of making it; if I cannot explain why I chose something, I probably did not choose it." },
    ],
    hLooking: "What I am looking for",
    looking:
      "A Software Engineer position (junior or internship), remote or on-site in São Paulo, including international opportunities. I would rather join a team where I can see the business problem behind the task — because that is where I do my best work, and where I have already proved I deliver.",
    ctaNotes: "Read the engineering notes",
    ctaProjects: "See the projects",
    metaTitle: "About — trajectory and values",
    metaDesc: "Benjamin Maciel's trajectory: from first code at twelve to an ERP in production, by way of robotics, rebranding, marketplaces and drone work.",
  },
  es: {
    eyebrow: "Sobre mí",
    crumb: "Sobre mí",
    title: "Empecé a los 12 porque quería hacer un juego. Seguí porque descubrí lo que se puede arreglar.",
    lead: "La versión larga de la trayectoria: qué pasó, en qué orden, y qué dejó cada etapa.",
    story: [
      "Mi primer código fue a los doce años, en Scratch y Code Buddy. No fue una elección de carrera: quería hacer un juego y descubrí que podía. Lo que quedó de esa etapa no fue sintaxis, fue la noción de que la pantalla obedece si sabes explicar lo que quieres, y que explicarlo bien es la parte difícil.",
      "En 2022 entré en un club de robótica con LEGO y pasé un año ahí. La robótica educativa enseña algo que la programación de pantalla tarda mucho más en enseñar: el mundo físico no acepta el casi correcto. El sensor lee lo que lee, el motor gira lo que gira, y el programa que funcionaba en la mesa falla en el suelo porque el suelo tiene fricción. Me acostumbró a pensar en condiciones reales antes que en código.",
      "En 2023 empecé el curso técnico en TI en UNASP y, ese mismo año, entré en Zenith Lacres, una industria de precintos con más de veinte años en el mercado. Mi primer trabajo ahí no fue programar: fue rebranding. Identidad visual, sitio, redes sociales, y después el montaje de un estudio fotográfico interno para producir el catálogo. En 2024 eso se volvió entrada en cinco marketplaces, y el ingreso digital pasó de cero a diez mil reales en tres meses.",
      "Ese período explica todo lo que vino después. Trabajando en el catálogo — cada producto con material, modelo, tamaño y color — aprendí el dominio antes de escribir una línea del sistema. Cuando finalmente propuse construir el ERP interno, no estaba adivinando cómo funcionaba la operación. Había fotografiado los productos uno por uno.",
      "También en 2024 saqué la licencia de piloto de drone e hice captación aérea, incluida la cobertura de la Porsche Carrera Cup. Es la línea más fuera de lugar de mi currículum, y la mantengo porque también enseña ingeniería: volar un drone es operar bajo restricción real — batería, viento, encuadre, una sola toma — y no hay refactor posible después de que la carrera terminó.",
      "En 2025 entregué el proyecto de graduación. Debía hacerse en trío y terminó entregado en solitario: una plataforma de seguimiento de entrenamientos, del diseño al back-end, aprobada con nota máxima. Fue también donde aprendí, releyendo el repositorio después, que un archivo de CI no es lo mismo que tener CI — la lección más útil de aquel año.",
      "Hoy mantengo y amplío la plataforma interna que la operación de Zenith usa todos los días, curso dos carreras a la vez — Sistemas de Información en UNASP y Ciencias de la Computación en University of the People — y lidero Cortex, la capa de IA sobre los datos del ERP. Y estoy buscando mi próximo puesto.",
    ],
    hValues: "Lo que llevo a cualquier equipo",
    values: [
      { t: "Entro por el problema, no por el ticket", d: "Todo el software que construí nació de alguien describiendo un proceso manual que dolía. Así prefiero trabajar, y ese es el tipo de equipo que busco." },
      { t: "Una decisión técnica es un trade-off explícito", d: "Guardar el saldo en vez de derivarlo, comprar el tiempo real en vez de construirlo: cada una de esas elecciones cuesta algo, y prefiero escribir el costo a fingir que no existe." },
      { t: "Entregado, no solo funcionando", d: "Funciona en mi máquina es donde empieza el trabajo. Móvil, errores manejados, una persona no técnica logrando usarlo sin capacitación: eso separa una demo de un sistema." },
      { t: "Escribo para ser leído", d: "En portugués, inglés y español. Documentar una decisión es parte de tomarla; si no puedo explicar por qué elegí algo, probablemente no lo elegí." },
    ],
    hLooking: "Qué busco",
    looking:
      "Una posición de Software Engineer (junior o prácticas), remota o presencial en São Paulo, incluidas oportunidades internacionales. Prefiero un equipo donde pueda ver el problema de negocio detrás de la tarea, porque es donde rindo mejor y donde ya probé que entrego.",
    ctaNotes: "Leer las notas técnicas",
    ctaProjects: "Ver los proyectos",
    metaTitle: "Sobre mí — trayectoria y valores",
    metaDesc: "La trayectoria de Benjamin Maciel: del primer código a los doce años al ERP en producción, pasando por robótica, rebranding, marketplaces y drone.",
  },
} as const;

export async function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = pickLang(params.lang);
  const c = COPY[lang];
  return {
    title: c.metaTitle,
    description: c.metaDesc,
    alternates: altsFor(lang, "/sobre"),
    openGraph: { title: c.metaTitle, description: c.metaDesc },
  };
}

export default function SobrePage({ params }: { params: { lang: string } }) {
  const lang = pickLang(params.lang);
  const c = COPY[lang];

  return (
    <PageShell
      lang={lang}
      eyebrow={c.eyebrow}
      title={c.title}
      lead={c.lead}
      crumbs={[{ label: c.crumb }]}
      width="760px"
      footer={
        <div className="flex flex-wrap gap-4 font-mono text-sm">
          <Link href={`/${lang}/projetos`} className="text-[#00d4ff] hover:underline">
            {c.ctaProjects} →
          </Link>
          <Link href={`/${lang}/notas`} className="text-[#00d4ff] hover:underline">
            {c.ctaNotes} →
          </Link>
        </div>
      }
    >
      <article className="text-[17px]">
        {c.story.map((p) => (
          <P key={p.slice(0, 30)}>{p}</P>
        ))}
      </article>

      <H2 id="valores">{c.hValues}</H2>
      <Grid>
        {c.values.map((v) => (
          <Card key={v.t} title={v.t}>
            {v.d}
          </Card>
        ))}
      </Grid>

      <H2 id="busco">{c.hLooking}</H2>
      <Callout>{c.looking}</Callout>
    </PageShell>
  );
}
