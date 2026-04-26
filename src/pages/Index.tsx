import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const OFFICE_IMG = "https://cdn.poehali.dev/projects/d95e9221-1396-4885-92d7-b92ecdd56bad/files/4cc87f0d-b0fc-4669-8f66-dbd35e12df43.jpg";
const LOGO_IMG = "https://cdn.poehali.dev/projects/d95e9221-1396-4885-92d7-b92ecdd56bad/files/7f056c84-de7b-498a-ae7a-b824b0a8f39e.jpg";

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".section-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function useParallax(ref: React.RefObject<HTMLElement>, speed = 0.15) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handle = () => {
      const rect = el.getBoundingClientRect();
      const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * speed;
      const bg = el.querySelector(".parallax-bg") as HTMLElement;
      if (bg) bg.style.transform = `translateY(${offset}px)`;
    };
    window.addEventListener("scroll", handle, { passive: true });
    handle();
    return () => window.removeEventListener("scroll", handle);
  }, []);
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = [
    { label: "Услуги", href: "#services" },
    { label: "О нас", href: "#about" },
    { label: "Клиенты", href: "#clients" },
    { label: "Калькулятор", href: "#calculator" },
    { label: "Контакты", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-dark py-3" : "py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <img src={LOGO_IMG} alt="Global" className="w-9 h-9 rounded-lg object-cover" />
          <span className="font-oswald text-2xl font-bold tracking-widest text-white">
            GL<span className="neon-text">O</span>BAL
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-white/70 hover:text-white transition-colors duration-200 tracking-wide uppercase"
            >
              {l.label}
            </a>
          ))}
        </div>
        <a
          href="#contact"
          className="gradient-neon text-black font-bold text-sm px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity tracking-wide"
        >
          Заказать сайт
        </a>
      </div>
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden grid-lines noise-bg">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-neon/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-cyan-500/8 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 pt-24 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8 text-sm text-neon/90 border border-neon/20">
              <span className="w-2 h-2 rounded-full bg-neon animate-pulse" />
              Специальное предложение — апрель 2026
            </div>

            <h1 className="font-oswald text-5xl md:text-7xl font-bold leading-none mb-6 tracking-tight">
              <span className="text-white">САЙТЫ,</span>
              <br />
              <span className="text-gradient">КОТОРЫЕ</span>
              <br />
              <span className="text-white">ПРОДАЮТ</span>
            </h1>

            <p className="text-white/60 text-lg leading-relaxed mb-4 max-w-lg">
              Разрабатываем современные сайты и выводим бизнес в топ поисковиков.
              Комплексный подход — от идеи до клиентов.
            </p>

            <div className="glass neon-border rounded-2xl p-5 mb-8 max-w-lg">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🔥</span>
                <div>
                  <p className="font-bold text-white text-base mb-1">
                    Закажи сайт сегодня у <span className="neon-text">Global</span> —
                  </p>
                  <p className="text-neon font-semibold text-sm">
                    получи 50% скидку на ведение рекламы первые 3 месяца
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="#calculator"
                className="gradient-neon text-black font-bold px-8 py-4 rounded-full text-base hover:opacity-90 transition-all hover:scale-105 duration-200 shadow-lg"
              >
                Рассчитать стоимость
              </a>
              <a
                href="#services"
                className="glass border border-white/20 text-white font-semibold px-8 py-4 rounded-full text-base hover:border-neon/50 transition-all duration-200"
              >
                Наши услуги
              </a>
            </div>

            <div className="flex gap-8 mt-12">
              {[
                { n: "120+", l: "Проектов" },
                { n: "8 лет", l: "На рынке" },
                { n: "94%", l: "Довольных клиентов" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-oswald text-2xl font-bold neon-text">{s.n}</div>
                  <div className="text-white/50 text-xs mt-0.5">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative rounded-3xl overflow-hidden animate-float">
              <img src={OFFICE_IMG} alt="Команда в работе" className="w-full h-[500px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-background/60 to-transparent" />
            </div>
            <div className="absolute -bottom-4 -left-6 glass neon-border rounded-2xl px-5 py-4">
              <div className="text-xs text-white/50 mb-1">Последний проект</div>
              <div className="font-semibold text-white text-sm">Интернет-магазин одежды</div>
              <div className="text-neon text-xs mt-1">+340% органического трафика</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
        <span className="text-xs tracking-widest uppercase">Листай</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent" />
      </div>
    </section>
  );
}

// ─── TICKER ───────────────────────────────────────────────────────────────────
function Ticker() {
  const items = [
    "Разработка сайтов", "SEO продвижение", "Таргетированная реклама",
    "Контекстная реклама", "SMM продвижение", "UX/UI дизайн",
    "Лендинги", "Корпоративные сайты", "Интернет-магазины",
  ];
  return (
    <div className="relative overflow-hidden py-4 border-y border-white/8 bg-neon/5">
      <div className="flex animate-ticker whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="mx-8 text-sm font-medium text-white/50 uppercase tracking-widest flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-neon inline-block" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── SERVICES ─────────────────────────────────────────────────────────────────
function Services() {
  const services = [
    { icon: "Monitor", title: "Создание сайтов", desc: "Лендинги, корпоративные сайты, интернет-магазины. Современный дизайн и быстрая загрузка.", price: "от 30 000 ₽", tag: "Хит" },
    { icon: "Search", title: "SEO продвижение", desc: "Выводим сайт в топ Яндекс и Google. Увеличиваем органический трафик и видимость в поиске.", price: "от 15 000 ₽/мес", tag: "" },
    { icon: "Instagram", title: "Продвижение в соцсетях", desc: "SMM, таргетированная реклама, ведение аккаунтов. ВКонтакте, Telegram, Instagram.", price: "от 20 000 ₽/мес", tag: "" },
    { icon: "MousePointerClick", title: "Контекстная реклама", desc: "Яндекс Директ и Google Ads. Настройка, ведение и оптимизация рекламных кампаний.", price: "от 10 000 ₽/мес", tag: "" },
    { icon: "BarChart3", title: "Аналитика и аудит", desc: "Полный SEO-аудит, анализ конкурентов, настройка Яндекс.Метрики и сквозной аналитики.", price: "от 8 000 ₽", tag: "" },
    { icon: "Palette", title: "UX/UI Дизайн", desc: "Разработка фирменного стиля, дизайн-системы, прототипирование и пользовательский опыт.", price: "от 25 000 ₽", tag: "Новинка" },
  ];

  return (
    <section id="services" className="py-28 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-neon/5 blur-[100px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="section-reveal mb-16">
          <span className="text-neon text-sm font-semibold uppercase tracking-widest">Что мы делаем</span>
          <h2 className="font-oswald text-5xl font-bold text-white mt-3 mb-4">НАШИ УСЛУГИ</h2>
          <p className="text-white/50 text-lg max-w-xl">Полный цикл работ — от создания сайта до привлечения клиентов</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <div
              key={s.title}
              className="section-reveal glass rounded-2xl p-7 border border-white/8 hover:border-neon/30 transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-neon/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {s.tag && (
                <span className="absolute top-4 right-4 text-xs font-bold gradient-neon text-black px-2.5 py-1 rounded-full">{s.tag}</span>
              )}
              <div className="w-12 h-12 rounded-xl bg-neon/10 flex items-center justify-center mb-5 group-hover:bg-neon/20 transition-colors">
                <Icon name={s.icon} size={22} className="text-neon" />
              </div>
              <h3 className="font-oswald text-xl font-semibold text-white mb-3">{s.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-5">{s.desc}</p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-neon">{s.price}</span>
                <Icon name="ArrowRight" size={16} className="text-white/30 group-hover:text-neon transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── VIDEO ────────────────────────────────────────────────────────────────────
function VideoSection() {
  const [playing, setPlaying] = useState(false);
  return (
    <section className="py-10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="section-reveal relative rounded-3xl overflow-hidden group cursor-pointer" onClick={() => setPlaying(true)}>
          <img src={OFFICE_IMG} alt="Процесс разработки" className="w-full h-[480px] object-cover brightness-40 group-hover:brightness-50 transition-all duration-500" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            {!playing ? (
              <>
                <div className="w-20 h-20 rounded-full glass-dark border-2 border-neon flex items-center justify-center mb-6 animate-glow-pulse group-hover:scale-110 transition-transform duration-300">
                  <Icon name="Play" size={30} className="text-neon ml-1" />
                </div>
                <h3 className="font-oswald text-4xl font-bold text-white mb-3">КАК МЫ РАБОТАЕМ</h3>
                <p className="text-white/60 text-base max-w-md">Смотри за процессом создания сайта — от брифинга до запуска</p>
              </>
            ) : (
              <div className="text-white/60 text-lg font-medium">Видео скоро появится здесь</div>
            )}
          </div>
          <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-neon/60 rounded-tl-lg" />
          <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-neon/60 rounded-tr-lg" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-neon/60 rounded-bl-lg" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-neon/60 rounded-br-lg" />
        </div>
      </div>
    </section>
  );
}

// ─── ABOUT (PARALLAX) ─────────────────────────────────────────────────────────
function About() {
  const sectionRef = useRef<HTMLElement>(null);
  useParallax(sectionRef as React.RefObject<HTMLElement>);

  const facts = [
    { icon: "Rocket", title: "Запуск за 14 дней", desc: "Быстро — не значит плохо. Наш процесс отточен до минуты." },
    { icon: "Shield", title: "Гарантия результата", desc: "Фиксируем KPI в договоре и берём ответственность за результат." },
    { icon: "Users", title: "Команда 15 человек", desc: "Разработчики, дизайнеры, маркетологи — все в одном месте." },
    { icon: "Zap", title: "Технологии 2026", desc: "Используем актуальный стек и следим за трендами индустрии." },
  ];

  return (
    <section ref={sectionRef} id="about" className="relative py-28 overflow-hidden">
      <div
        className="parallax-bg absolute inset-0 -top-20 -bottom-20"
        style={{ backgroundImage: `url(${OFFICE_IMG})`, backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.12) blur(2px)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/80 to-background/95" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="section-reveal">
            <span className="text-neon text-sm font-semibold uppercase tracking-widest">Кто мы</span>
            <h2 className="font-oswald text-5xl font-bold text-white mt-3 mb-6 leading-none">
              МЫ — ЭТО
              <br />
              <span className="text-gradient">БОЛЬШЕ</span>
              <br />
              ЧЕМ АГЕНТСТВО
            </h2>
            <p className="text-white/60 text-base leading-relaxed mb-6">
              <span className="neon-text font-bold">Global</span> — это команда фанатиков своего дела. Мы не просто делаем красивые сайты —
              мы строим цифровые машины для привлечения клиентов.
            </p>
            <p className="text-white/60 text-base leading-relaxed mb-8">
              За 8 лет работы мы реализовали более 120 проектов в разных сферах бизнеса.
              Каждый проект — отдельная история успеха нашего клиента.
            </p>
            <a href="#contact" className="inline-flex items-center gap-2 glass neon-border text-neon font-semibold px-7 py-3.5 rounded-full hover:bg-neon/10 transition-all duration-200">
              Познакомиться с командой
              <Icon name="ArrowRight" size={16} />
            </a>
          </div>

          <div className="grid grid-cols-2 gap-4 section-reveal" style={{ transitionDelay: "200ms" }}>
            {facts.map((f) => (
              <div key={f.title} className="glass rounded-2xl p-5 border border-white/8 hover:border-neon/30 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-lg bg-neon/10 flex items-center justify-center mb-4 group-hover:bg-neon/20 transition-colors">
                  <Icon name={f.icon} size={18} className="text-neon" />
                </div>
                <div className="font-oswald font-semibold text-white text-base mb-2">{f.title}</div>
                <div className="text-white/50 text-xs leading-relaxed">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CLIENTS ──────────────────────────────────────────────────────────────────
type Client = { key: string; label: string; author: string; role: string; review: string; stars: number };

function Clients() {
  const clients: Client[] = [
    { key: "stroy", label: "СТРОЙ ПРО", author: "Дмитрий Ковалёв", role: "Генеральный директор, Строй Про", stars: 5, review: "Global разработали нам корпоративный сайт с каталогом и личным кабинетом. Всё сделали точно в срок, дизайн понравился с первого показа. Трафик вырос на 180% за 2 месяца." },
    { key: "media", label: "МЕДИА ГРУПП", author: "Светлана Орлова", role: "Маркетинг-директор, Медиа Групп", stars: 5, review: "Работаем с Global по SMM и таргетированной рекламе уже год. Количество заявок из соцсетей выросло в 4 раза. Команда всегда на связи и предлагает нестандартные решения." },
    { key: "auto", label: "АВТОЦЕНТР", author: "Алексей Соколов", role: "Директор, АвтоЦентр Premium", stars: 5, review: "Global сделали нам сайт и взяли на SEO-продвижение. За 4 месяца органический трафик вырос в 3 раза. Очень профессиональная команда — рекомендуем без оговорок." },
    { key: "fit", label: "ФИТНЕС КЛУБ", author: "Мария Захарова", role: "Владелец, FitLife Club", stars: 5, review: "Заказали лендинг и настройку Яндекс Директ. Уже в первую неделю пошли звонки. Стоимость лида снизилась в 2 раза по сравнению с предыдущим подрядчиком. Спасибо!" },
    { key: "bank", label: "НОРД БАНК", author: "Игорь Петренко", role: "Руководитель digital, Норд Банк", stars: 5, review: "Сложный корпоративный проект с интеграциями и строгими требованиями к безопасности. Global справились на отлично — выполнили всё в рамках бюджета и сроков." },
    { key: "agro", label: "АГРО ЭКСПОРТ", author: "Николай Быков", role: "Коммерческий директор, АгроЭкспорт", stars: 4, review: "Разработали интернет-магазин с каталогом продукции и формой заказа. Хорошая работа — сайт стал удобным для клиентов, обращения увеличились на 60%." },
    { key: "travel", label: "ЛЮКС ТРЕВЕЛ", author: "Анна Волкова", role: "Основатель, Люкс Тревел", stars: 5, review: "Global помогли нам выйти в топ по ключевым запросам за 3 месяца. Органика теперь даёт 70% всех броней. Это лучшая инвестиция в маркетинг за последние годы." },
    { key: "market", label: "ГОРОДСКОЙ РЫНОК", author: "Павел Сидоров", role: "IT-директор, Городской Рынок", stars: 5, review: "Переделали устаревший сайт в современную платформу. Скорость загрузки выросла в 5 раз, конверсия — на 40%. Работаем с Global уже по третьему проекту." },
    { key: "tech", label: "ТЕХНО ХАБ", author: "Роман Кузнецов", role: "CEO, ТехноХаб", stars: 5, review: "Обратились за разработкой веб-приложения с личным кабинетом. Команда Global погрузилась в бизнес-логику и предложила несколько идей, которые мы сами не додумали." },
    { key: "health", label: "ЗДОРОВЬЕ+", author: "Елена Морозова", role: "Главный врач, Здоровье+", stars: 5, review: "Сделали сайт клиники и запустили рекламу в Яндексе. Запись на приём через сайт выросла на 220% за первый квартал. Очень довольны результатом и сервисом." },
  ];

  const [activeKey, setActiveKey] = useState(clients[2].key);
  const [animating, setAnimating] = useState(false);

  const active = clients.find((c) => c.key === activeKey) ?? clients[0];

  const handleSelect = (key: string) => {
    if (key === activeKey) return;
    setAnimating(true);
    setTimeout(() => {
      setActiveKey(key);
      setAnimating(false);
    }, 250);
  };

  return (
    <section id="clients" className="py-24 relative overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon/3 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="section-reveal text-center mb-14">
          <span className="text-neon text-sm font-semibold uppercase tracking-widest">Нам доверяют</span>
          <h2 className="font-oswald text-4xl font-bold text-white mt-3">НАШИ КЛИЕНТЫ</h2>
          <p className="text-white/40 text-sm mt-2">Нажми на компанию, чтобы прочитать отзыв</p>
        </div>

        <div className="section-reveal grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
          {clients.map((c) => (
            <button
              key={c.key}
              onClick={() => handleSelect(c.key)}
              className={`rounded-xl py-5 px-4 flex items-center justify-center border transition-all duration-300 ${
                activeKey === c.key
                  ? "bg-neon/15 border-neon shadow-[0_0_20px_rgba(0,255,180,0.15)]"
                  : "glass border-white/6 hover:border-neon/30 hover:bg-neon/5"
              }`}
            >
              <span className={`font-oswald font-bold text-sm tracking-widest transition-colors duration-300 ${
                activeKey === c.key ? "text-neon" : "text-white/30"
              }`}>
                {c.label}
              </span>
            </button>
          ))}
        </div>

        <div className="section-reveal max-w-2xl mx-auto">
          <div
            className={`glass rounded-2xl p-8 border border-neon/20 text-center transition-all duration-250 ${
              animating ? "opacity-0 translate-y-3" : "opacity-100 translate-y-0"
            }`}
            style={{ transition: "opacity 0.25s ease, transform 0.25s ease" }}
          >
            <div className="text-2xl mb-4">
              {"⭐".repeat(active.stars)}
            </div>
            <p className="text-white/80 text-base leading-relaxed italic mb-6">
              "{active.review}"
            </p>
            <div className="w-10 h-px bg-neon/40 mx-auto mb-4" />
            <div className="font-semibold text-white">{active.author}</div>
            <div className="text-white/40 text-sm mt-1">{active.role}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CALCULATOR ───────────────────────────────────────────────────────────────
type CalcOption = { label: string; price: number; key: string };

function CalcGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="glass rounded-2xl p-5 border border-white/8">
      <div className="font-oswald font-semibold text-white text-base mb-4">{title}</div>
      {children}
    </div>
  );
}

function ResultRow({ label, value, prefix = "" }: { label: string; value: number; prefix?: string }) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-white/50 truncate mr-2">{label}</span>
      <span className="text-white/80 font-medium whitespace-nowrap">{prefix}{value.toLocaleString("ru-RU")} ₽</span>
    </div>
  );
}

function Calculator() {
  const [siteType, setSiteType] = useState("landing");
  const [pages, setPages] = useState("5");
  const [design, setDesign] = useState("standard");
  const [features, setFeatures] = useState<string[]>([]);
  const [promotion, setPromotion] = useState<string[]>([]);

  const siteTypes: CalcOption[] = [
    { key: "landing", label: "Лендинг", price: 20000 },
    { key: "corporate", label: "Корпоративный сайт", price: 45000 },
    { key: "catalog", label: "Сайт-каталог", price: 60000 },
    { key: "shop", label: "Интернет-магазин", price: 90000 },
    { key: "portal", label: "Веб-портал", price: 150000 },
  ];

  const pageOptions: CalcOption[] = [
    { key: "5", label: "до 5 страниц", price: 0 },
    { key: "10", label: "6–10 страниц", price: 10000 },
    { key: "20", label: "11–20 страниц", price: 20000 },
    { key: "50+", label: "20+ страниц", price: 40000 },
  ];

  const designOptions: CalcOption[] = [
    { key: "template", label: "На шаблоне", price: 0 },
    { key: "standard", label: "Стандартный", price: 15000 },
    { key: "premium", label: "Премиум", price: 35000 },
    { key: "exclusive", label: "Эксклюзивный", price: 70000 },
  ];

  const featureOptions: CalcOption[] = [
    { key: "crm", label: "Интеграция с CRM", price: 12000 },
    { key: "pay", label: "Онлайн-оплата", price: 10000 },
    { key: "cabinet", label: "Личный кабинет", price: 25000 },
    { key: "chat", label: "Онлайн-чат", price: 5000 },
    { key: "multilang", label: "Мультиязычность", price: 18000 },
    { key: "blog", label: "Блог / новости", price: 8000 },
  ];

  const promoOptions: CalcOption[] = [
    { key: "seo3", label: "SEO (3 мес.)", price: 45000 },
    { key: "seo6", label: "SEO (6 мес.)", price: 75000 },
    { key: "context", label: "Контекстная реклама", price: 30000 },
    { key: "smm", label: "SMM (3 мес.)", price: 60000 },
  ];

  const toggle = (arr: string[], setArr: (v: string[]) => void, key: string) =>
    setArr(arr.includes(key) ? arr.filter((k) => k !== key) : [...arr, key]);

  const total = (() => {
    const base = siteTypes.find((t) => t.key === siteType)?.price ?? 0;
    const p = pageOptions.find((o) => o.key === pages)?.price ?? 0;
    const d = designOptions.find((o) => o.key === design)?.price ?? 0;
    const f = featureOptions.filter((o) => features.includes(o.key)).reduce((s, o) => s + o.price, 0);
    const pr = promoOptions.filter((o) => promotion.includes(o.key)).reduce((s, o) => s + o.price, 0);
    return base + p + d + f + pr;
  })();

  const promoTotal = promoOptions.filter((o) => promotion.includes(o.key)).reduce((s, o) => s + o.price, 0);

  return (
    <section id="calculator" className="py-28 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-neon/5 blur-[150px] pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="section-reveal text-center mb-16">
          <span className="text-neon text-sm font-semibold uppercase tracking-widest">Калькулятор</span>
          <h2 className="font-oswald text-5xl font-bold text-white mt-3 mb-4">РАССЧИТАЙ СТОИМОСТЬ</h2>
          <p className="text-white/50 text-base max-w-xl mx-auto">Выбери параметры и узнай стоимость прямо сейчас — без звонков и ожидания</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 section-reveal">
          <div className="lg:col-span-2 space-y-6">
            <CalcGroup title="Тип сайта">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {siteTypes.map((t) => (
                  <button key={t.key} onClick={() => setSiteType(t.key)}
                    className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 border ${siteType === t.key ? "bg-neon/15 border-neon text-neon" : "glass border-white/10 text-white/60 hover:border-white/30 hover:text-white"}`}>
                    <div className="font-semibold">{t.label}</div>
                    <div className={`text-xs mt-0.5 ${siteType === t.key ? "text-neon/70" : "text-white/30"}`}>от {t.price.toLocaleString("ru-RU")} ₽</div>
                  </button>
                ))}
              </div>
            </CalcGroup>

            <CalcGroup title="Количество страниц">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {pageOptions.map((o) => (
                  <button key={o.key} onClick={() => setPages(o.key)}
                    className={`px-4 py-3 rounded-xl text-sm font-medium text-center transition-all duration-200 border ${pages === o.key ? "bg-neon/15 border-neon text-neon" : "glass border-white/10 text-white/60 hover:border-white/30 hover:text-white"}`}>
                    {o.label}
                    {o.price > 0 && <div className={`text-xs mt-0.5 ${pages === o.key ? "text-neon/70" : "text-white/30"}`}>+{o.price.toLocaleString("ru-RU")} ₽</div>}
                  </button>
                ))}
              </div>
            </CalcGroup>

            <CalcGroup title="Уровень дизайна">
              <div className="grid grid-cols-2 gap-2">
                {designOptions.map((o) => (
                  <button key={o.key} onClick={() => setDesign(o.key)}
                    className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 border ${design === o.key ? "bg-neon/15 border-neon text-neon" : "glass border-white/10 text-white/60 hover:border-white/30 hover:text-white"}`}>
                    <div className="font-semibold">{o.label}</div>
                    <div className={`text-xs mt-0.5 ${design === o.key ? "text-neon/70" : "text-white/30"}`}>{o.price === 0 ? "включено" : `+${o.price.toLocaleString("ru-RU")} ₽`}</div>
                  </button>
                ))}
              </div>
            </CalcGroup>

            <CalcGroup title="Дополнительные функции">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {featureOptions.map((o) => (
                  <button key={o.key} onClick={() => toggle(features, setFeatures, o.key)}
                    className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 border ${features.includes(o.key) ? "bg-neon/15 border-neon text-neon" : "glass border-white/10 text-white/60 hover:border-white/30 hover:text-white"}`}>
                    <div className="flex items-start justify-between gap-1">
                      <span className="font-medium leading-tight">{o.label}</span>
                      {features.includes(o.key) && <Icon name="Check" size={14} className="text-neon flex-shrink-0 mt-0.5" />}
                    </div>
                    <div className={`text-xs mt-1 ${features.includes(o.key) ? "text-neon/70" : "text-white/30"}`}>+{o.price.toLocaleString("ru-RU")} ₽</div>
                  </button>
                ))}
              </div>
            </CalcGroup>

            <CalcGroup title="Продвижение в интернете">
              <div className="grid grid-cols-2 gap-2">
                {promoOptions.map((o) => (
                  <button key={o.key} onClick={() => toggle(promotion, setPromotion, o.key)}
                    className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 border ${promotion.includes(o.key) ? "bg-neon/15 border-neon text-neon" : "glass border-white/10 text-white/60 hover:border-white/30 hover:text-white"}`}>
                    <div className="flex items-start justify-between gap-1">
                      <span className="font-medium leading-tight">{o.label}</span>
                      {promotion.includes(o.key) && <Icon name="Check" size={14} className="text-neon flex-shrink-0 mt-0.5" />}
                    </div>
                    <div className={`text-xs mt-1 ${promotion.includes(o.key) ? "text-neon/70" : "text-white/30"}`}>{o.price.toLocaleString("ru-RU")} ₽</div>
                  </button>
                ))}
              </div>
            </CalcGroup>
          </div>

          {/* Sticky result */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 glass neon-border rounded-2xl p-6 space-y-5">
              <div className="text-white/50 text-xs uppercase tracking-widest font-semibold">Ваш расчёт</div>
              <div className="space-y-2">
                <ResultRow label={siteTypes.find((t) => t.key === siteType)?.label ?? ""} value={siteTypes.find((t) => t.key === siteType)?.price ?? 0} />
                {(pageOptions.find((o) => o.key === pages)?.price ?? 0) > 0 && (
                  <ResultRow label="Страницы" value={pageOptions.find((o) => o.key === pages)?.price ?? 0} prefix="+" />
                )}
                {(designOptions.find((o) => o.key === design)?.price ?? 0) > 0 && (
                  <ResultRow label="Дизайн" value={designOptions.find((o) => o.key === design)?.price ?? 0} prefix="+" />
                )}
                {features.map((k) => {
                  const f = featureOptions.find((o) => o.key === k);
                  return f ? <ResultRow key={k} label={f.label} value={f.price} prefix="+" /> : null;
                })}
                {promotion.map((k) => {
                  const f = promoOptions.find((o) => o.key === k);
                  return f ? <ResultRow key={k} label={f.label} value={f.price} prefix="+" /> : null;
                })}
              </div>

              <div className="border-t border-white/10 pt-4">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-white/50 text-sm">Итого</span>
                  <span className="font-oswald text-2xl font-bold text-white">{total.toLocaleString("ru-RU")} ₽</span>
                </div>
                {promoTotal > 0 && (
                  <div className="glass bg-neon/10 rounded-xl p-3 mt-3 border border-neon/20">
                    <div className="text-neon text-xs font-semibold mb-1">🔥 Скидка 50% на рекламу</div>
                    <div className="text-white/60 text-xs">
                      Экономия: <span className="text-neon font-bold">{(promoTotal / 2).toLocaleString("ru-RU")} ₽</span>
                    </div>
                  </div>
                )}
              </div>

              <button className="w-full gradient-neon text-black font-bold py-4 rounded-xl text-base hover:opacity-90 transition-opacity">
                Оставить заявку
              </button>
              <p className="text-white/30 text-xs text-center">Финальная стоимость после брифинга. Без скрытых платежей.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── PROCESS ──────────────────────────────────────────────────────────────────
function Process() {
  const steps = [
    { n: "01", title: "Бриф", desc: "Изучаем ваш бизнес, цели и конкурентов. Составляем техническое задание." },
    { n: "02", title: "Дизайн", desc: "Разрабатываем уникальный дизайн, согласовываем с вами каждый экран." },
    { n: "03", title: "Разработка", desc: "Программируем сайт на современном стеке. Тестируем на всех устройствах." },
    { n: "04", title: "Запуск", desc: "Настраиваем хостинг, домен, аналитику. Публикуем и продвигаем." },
  ];
  return (
    <section className="py-24 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="section-reveal text-center mb-16">
          <span className="text-neon text-sm font-semibold uppercase tracking-widest">Как мы работаем</span>
          <h2 className="font-oswald text-4xl font-bold text-white mt-3">ПРОЦЕСС РАБОТЫ</h2>
        </div>
        <div className="grid md:grid-cols-4 gap-6 section-reveal">
          {steps.map((s, i) => (
            <div key={s.n} className="relative" style={{ transitionDelay: `${i * 100}ms` }}>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-neon/30 to-transparent z-10" />
              )}
              <div className="glass rounded-2xl p-6 border border-white/8 hover:border-neon/30 transition-all duration-300 group h-full">
                <div className="font-oswald text-5xl font-black text-neon/20 group-hover:text-neon/40 transition-colors mb-4">{s.n}</div>
                <h3 className="font-oswald text-lg font-bold text-white mb-3">{s.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────
function Contact() {
  return (
    <section id="contact" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 grid-lines opacity-50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-neon/5 blur-[120px]" />
      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <div className="section-reveal">
          <span className="text-neon text-sm font-semibold uppercase tracking-widest">Начни прямо сейчас</span>
          <h2 className="font-oswald text-5xl md:text-6xl font-bold text-white mt-3 mb-4 leading-none">
            ГОТОВ К<br /><span className="text-gradient">СТАРТУ?</span>
          </h2>
          <p className="text-white/50 text-base mb-10 max-w-lg mx-auto">
            Оставь заявку — обсудим проект, составим план и назовём точную стоимость
          </p>
          <div className="glass rounded-2xl p-8 border border-white/8">
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <input type="text" placeholder="Ваше имя"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 text-sm focus:outline-none focus:border-neon/50 transition-colors" />
              <input type="tel" placeholder="Телефон"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 text-sm focus:outline-none focus:border-neon/50 transition-colors" />
            </div>
            <textarea rows={3} placeholder="Расскажите о вашем проекте..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 text-sm focus:outline-none focus:border-neon/50 transition-colors resize-none mb-4" />
            <button className="w-full gradient-neon text-black font-bold py-4 rounded-xl text-base hover:opacity-90 transition-opacity">
              Отправить заявку — бесплатно
            </button>
          </div>
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-white/40 text-sm">
            <span className="flex items-center gap-2"><Icon name="Phone" size={14} className="text-neon" />+7 (999) 123-45-67</span>
            <span className="flex items-center gap-2"><Icon name="Mail" size={14} className="text-neon" />hello@vave.agency</span>
            <span className="flex items-center gap-2"><Icon name="MapPin" size={14} className="text-neon" />Москва, Россия</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  const navLinks = [
    { label: "Услуги", href: "#services" },
    { label: "О нас", href: "#about" },
    { label: "Клиенты", href: "#clients" },
    { label: "Калькулятор", href: "#calculator" },
    { label: "Контакты", href: "#contact" },
  ];
  return (
    <footer className="border-t border-white/8 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <img src={LOGO_IMG} alt="Global" className="w-9 h-9 rounded-lg object-cover" />
              <span className="font-oswald text-2xl font-bold tracking-widest text-white">GL<span className="neon-text">O</span>BAL</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">Создаём сайты и продвигаем бизнес в интернете. Работаем с 2016 года.</p>
          </div>
          <div>
            <div className="text-white/60 text-xs uppercase tracking-widest font-semibold mb-4">Навигация</div>
            <ul className="space-y-2">
              {navLinks.map((l) => (
                <li key={l.href}><a href={l.href} className="text-white/40 text-sm hover:text-neon transition-colors">{l.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-white/60 text-xs uppercase tracking-widest font-semibold mb-4">Контакты</div>
            <div className="space-y-3">
              <a href="tel:+79991234567" className="flex items-center gap-2 text-white/40 text-sm hover:text-neon transition-colors">
                <Icon name="Phone" size={13} className="text-neon/60" />+7 (999) 123-45-67
              </a>
              <a href="mailto:hello@vave.agency" className="flex items-center gap-2 text-white/40 text-sm hover:text-neon transition-colors">
                <Icon name="Mail" size={13} className="text-neon/60" />hello@vave.agency
              </a>
              <div className="flex gap-3 mt-4">
                {[{ s: "VK" }, { s: "TG" }, { s: "IG" }].map(({ s }) => (
                  <a key={s} href="#" className="w-8 h-8 glass border border-white/10 rounded-lg flex items-center justify-center hover:border-neon/50 hover:bg-neon/10 transition-all duration-200">
                    <span className="text-white/40 text-xs">{s}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <span className="text-white/25 text-xs">© 2026 Global Agency. Все права защищены.</span>
          <span className="text-white/25 text-xs">Политика конфиденциальности · Оферта</span>
        </div>
      </div>
    </footer>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
const Index = () => {
  useReveal();
  return (
    <div className="min-h-screen bg-background text-foreground font-montserrat">
      <Nav />
      <Hero />
      <Ticker />
      <Services />
      <VideoSection />
      <About />
      <Clients />
      <Process />
      <Calculator />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;