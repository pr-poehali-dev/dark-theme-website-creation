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
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          videoRef.current?.play();
        } else {
          videoRef.current?.pause();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={sectionRef} className="section-reveal relative rounded-3xl overflow-hidden">
          {/* Placeholder показывается пока не скроллнули до секции */}
          <div className={`absolute inset-0 transition-opacity duration-700 ${visible ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
            <img src={OFFICE_IMG} alt="Процесс разработки" className="w-full h-[480px] object-cover brightness-40" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 rounded-full glass-dark border-2 border-neon flex items-center justify-center mb-6 animate-glow-pulse">
                <Icon name="Play" size={30} className="text-neon ml-1" />
              </div>
              <h3 className="font-oswald text-4xl font-bold text-white mb-3">КАК МЫ РАБОТАЕМ</h3>
              <p className="text-white/60 text-base max-w-md">Процесс создания сайта — от брифинга до запуска</p>
            </div>
          </div>

          {/* Видео — автозапуск при скролле */}
          <video
            ref={videoRef}
            className="w-full h-[480px] object-cover"
            muted
            loop
            playsInline
            poster={OFFICE_IMG}
          >
            {/* Сюда вставить ссылку на видео-файл, например: */}
            {/* <source src="https://your-cdn.com/video.mp4" type="video/mp4" /> */}
          </video>

          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50 pointer-events-none" />

          {/* Подпись поверх видео */}
          <div className={`absolute bottom-8 left-8 right-8 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <div className="glass-dark rounded-2xl px-6 py-4 inline-flex items-center gap-4">
              <div className="w-2.5 h-2.5 rounded-full bg-neon animate-pulse flex-shrink-0" />
              <div>
                <div className="font-oswald font-bold text-white text-lg">КАК МЫ РАБОТАЕМ</div>
                <div className="text-white/50 text-xs">Процесс создания сайта — от брифинга до запуска</div>
              </div>
            </div>
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

// ─── QUIZ CALCULATOR ──────────────────────────────────────────────────────────
type QuizOption = { key: string; label: string; desc?: string; icon: string; price: number };

type QuizStep = {
  id: string;
  question: string;
  hint?: string;
  multi: boolean;
  options: QuizOption[];
};

const QUIZ_STEPS: QuizStep[] = [
  {
    id: "type",
    question: "Какой сайт вам нужен?",
    hint: "Выберите один вариант",
    multi: false,
    options: [
      { key: "landing", label: "Лендинг", desc: "Одностраничный сайт для продукта или услуги", icon: "Layout", price: 20000 },
      { key: "corporate", label: "Корпоративный сайт", desc: "Сайт компании с разделами и контентом", icon: "Building2", price: 45000 },
      { key: "catalog", label: "Сайт-каталог", desc: "Каталог товаров или услуг без оплаты", icon: "BookOpen", price: 60000 },
      { key: "shop", label: "Интернет-магазин", desc: "Полноценный магазин с корзиной и оплатой", icon: "ShoppingCart", price: 90000 },
      { key: "portal", label: "Веб-портал", desc: "Сложный проект с личными кабинетами", icon: "Globe", price: 150000 },
    ],
  },
  {
    id: "pages",
    question: "Сколько страниц нужно?",
    hint: "Выберите один вариант",
    multi: false,
    options: [
      { key: "5", label: "До 5 страниц", desc: "Главная, услуги, контакты", icon: "FileText", price: 0 },
      { key: "10", label: "6–10 страниц", desc: "Полноценный небольшой сайт", icon: "Files", price: 10000 },
      { key: "20", label: "11–20 страниц", desc: "Средний корпоративный сайт", icon: "Layers", price: 20000 },
      { key: "50", label: "20+ страниц", desc: "Крупный сайт с большим контентом", icon: "Database", price: 40000 },
    ],
  },
  {
    id: "design",
    question: "Какой уровень дизайна?",
    hint: "Выберите один вариант",
    multi: false,
    options: [
      { key: "template", label: "На шаблоне", desc: "Быстро и бюджетно", icon: "Copy", price: 0 },
      { key: "standard", label: "Стандартный", desc: "Уникальный дизайн под ваш бренд", icon: "Pencil", price: 15000 },
      { key: "premium", label: "Премиум", desc: "Сложные анимации и детальная проработка", icon: "Star", price: 35000 },
      { key: "exclusive", label: "Эксклюзивный", desc: "Авторский дизайн, WOW-эффект", icon: "Crown", price: 70000 },
    ],
  },
  {
    id: "features",
    question: "Нужны дополнительные функции?",
    hint: "Можно выбрать несколько",
    multi: true,
    options: [
      { key: "crm", label: "Интеграция с CRM", desc: "Заявки сразу в вашу систему", icon: "Link", price: 12000 },
      { key: "pay", label: "Онлайн-оплата", desc: "Приём платежей на сайте", icon: "CreditCard", price: 10000 },
      { key: "cabinet", label: "Личный кабинет", desc: "Регистрация и профиль пользователя", icon: "UserCircle", price: 25000 },
      { key: "chat", label: "Онлайн-чат", desc: "Чат поддержки на сайте", icon: "MessageCircle", price: 5000 },
      { key: "multilang", label: "Мультиязычность", desc: "Сайт на нескольких языках", icon: "Languages", price: 18000 },
      { key: "blog", label: "Блог / новости", desc: "Раздел с публикациями", icon: "Newspaper", price: 8000 },
    ],
  },
  {
    id: "promo",
    question: "Нужно продвижение сайта?",
    hint: "Можно выбрать несколько",
    multi: true,
    options: [
      { key: "seo3", label: "SEO на 3 месяца", desc: "Вывод в топ Яндекс и Google", icon: "TrendingUp", price: 45000 },
      { key: "seo6", label: "SEO на 6 месяцев", desc: "Устойчивый рост органики", icon: "BarChart2", price: 75000 },
      { key: "context", label: "Контекстная реклама", desc: "Яндекс Директ — быстрые заявки", icon: "Target", price: 30000 },
      { key: "smm", label: "SMM на 3 месяца", desc: "Продвижение в соцсетях", icon: "Share2", price: 60000 },
    ],
  },
];

function Calculator() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [animDir, setAnimDir] = useState<"forward" | "back">("forward");
  const [animating, setAnimating] = useState(false);
  const [done, setDone] = useState(false);

  const current = QUIZ_STEPS[step];
  const totalSteps = QUIZ_STEPS.length;
  const progress = ((step) / totalSteps) * 100;

  const selected = answers[current?.id] ?? [];

  const toggleOption = (key: string) => {
    const id = current.id;
    if (current.multi) {
      setAnswers((prev) => {
        const cur = prev[id] ?? [];
        return { ...prev, [id]: cur.includes(key) ? cur.filter((k) => k !== key) : [...cur, key] };
      });
    } else {
      setAnswers((prev) => ({ ...prev, [id]: [key] }));
    }
  };

  const canNext = selected.length > 0 || current?.multi;

  const goTo = (nextStep: number, dir: "forward" | "back") => {
    setAnimDir(dir);
    setAnimating(true);
    setTimeout(() => {
      setStep(nextStep);
      setAnimating(false);
    }, 280);
  };

  const handleNext = () => {
    if (step < totalSteps - 1) {
      goTo(step + 1, "forward");
    } else {
      setAnimating(true);
      setTimeout(() => { setDone(true); setAnimating(false); }, 280);
    }
  };

  const handleBack = () => {
    if (step > 0) goTo(step - 1, "back");
  };

  const handleRestart = () => {
    setAnimating(true);
    setTimeout(() => { setStep(0); setAnswers({}); setDone(false); setAnimating(false); }, 280);
  };

  const calcTotal = () => {
    let total = 0;
    QUIZ_STEPS.forEach((s) => {
      const sel = answers[s.id] ?? [];
      sel.forEach((key) => {
        const opt = s.options.find((o) => o.key === key);
        if (opt) total += opt.price;
      });
    });
    return total;
  };

  const promoTotal = (answers["promo"] ?? []).reduce((s, k) => {
    const opt = QUIZ_STEPS[4].options.find((o) => o.key === k);
    return s + (opt?.price ?? 0);
  }, 0);

  const total = calcTotal();

  const slideClass = animating
    ? animDir === "forward"
      ? "opacity-0 translate-x-8"
      : "opacity-0 -translate-x-8"
    : "opacity-100 translate-x-0";

  return (
    <section id="calculator" className="py-28 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-neon/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="section-reveal text-center mb-12">
          <span className="text-neon text-sm font-semibold uppercase tracking-widest">Калькулятор</span>
          <h2 className="font-oswald text-5xl font-bold text-white mt-3 mb-3">РАССЧИТАЙ СТОИМОСТЬ</h2>
          <p className="text-white/50 text-base">Ответь на 5 вопросов — получи точную стоимость проекта</p>
        </div>

        <div className="section-reveal glass rounded-3xl border border-white/8 overflow-hidden">
          {/* Progress bar */}
          {!done && (
            <div className="h-1 bg-white/5">
              <div
                className="h-full gradient-neon transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          <div className="p-8 md:p-12 lg:p-16">
            {!done ? (
              <div
                className={`transition-all duration-280 ease-out ${slideClass}`}
                style={{ transition: "opacity 0.28s ease, transform 0.28s ease" }}
              >
                {/* Step counter */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    {QUIZ_STEPS.map((_, i) => (
                      <div key={i} className={`rounded-full transition-all duration-300 ${
                        i === step ? "w-8 h-2 gradient-neon" : i < step ? "w-2 h-2 bg-neon/60" : "w-2 h-2 bg-white/15"
                      }`} />
                    ))}
                  </div>
                  <span className="text-white/30 text-sm font-medium">{step + 1} / {totalSteps}</span>
                </div>

                {/* Question */}
                <h3 className="font-oswald text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                  {current.question}
                </h3>
                {current.hint && (
                  <p className="text-white/40 text-sm mb-10">{current.hint}</p>
                )}

                {/* Options */}
                <div className={`grid gap-4 mb-10 ${
                  current.options.length <= 4
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                }`}>
                  {current.options.map((opt) => {
                    const isSelected = selected.includes(opt.key);
                    return (
                      <button
                        key={opt.key}
                        onClick={() => toggleOption(opt.key)}
                        className={`group relative text-left p-5 lg:p-6 rounded-2xl border transition-all duration-200 ${
                          isSelected
                            ? "bg-neon/10 border-neon shadow-[0_0_30px_rgba(59,130,246,0.2)]"
                            : "glass border-white/8 hover:border-white/25 hover:bg-white/5"
                        }`}
                      >
                        <div className="flex flex-col gap-4">
                          <div className="flex items-start justify-between">
                            <div className={`w-11 h-11 lg:w-14 lg:h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${
                              isSelected ? "bg-neon/20" : "bg-white/5 group-hover:bg-white/10"
                            }`}>
                              <Icon name={opt.icon} size={20} className={isSelected ? "text-neon" : "text-white/40"} />
                            </div>
                            {isSelected && (
                              <div className="w-6 h-6 rounded-full gradient-neon flex items-center justify-center flex-shrink-0">
                                <Icon name="Check" size={13} className="text-black" />
                              </div>
                            )}
                          </div>
                          <div>
                            <div className={`font-oswald font-semibold text-base lg:text-lg mb-1 transition-colors ${isSelected ? "text-neon" : "text-white"}`}>
                              {opt.label}
                            </div>
                            {opt.desc && (
                              <div className="text-white/40 text-xs lg:text-sm leading-snug">{opt.desc}</div>
                            )}
                          </div>
                          {opt.price > 0 && (
                            <div className={`text-sm font-bold ${isSelected ? "text-neon" : "text-white/30"}`}>
                              +{opt.price.toLocaleString("ru-RU")} ₽
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={handleBack}
                    className={`flex items-center gap-2 text-sm font-medium transition-all duration-200 ${
                      step === 0 ? "opacity-0 pointer-events-none" : "text-white/50 hover:text-white"
                    }`}
                  >
                    <Icon name="ArrowLeft" size={16} />
                    Назад
                  </button>

                  <button
                    onClick={handleNext}
                    disabled={!canNext && selected.length === 0}
                    className={`flex items-center gap-2 px-7 py-3 rounded-full font-bold text-sm transition-all duration-200 ${
                      canNext || selected.length > 0
                        ? "gradient-neon text-black hover:opacity-90 hover:scale-105"
                        : "bg-white/10 text-white/30 cursor-not-allowed"
                    }`}
                  >
                    {step === totalSteps - 1 ? "Узнать стоимость" : "Далее"}
                    <Icon name="ArrowRight" size={16} />
                  </button>
                </div>
              </div>
            ) : (
              /* Result screen */
              <div
                className={`transition-all duration-280 ease-out ${slideClass}`}
                style={{ transition: "opacity 0.28s ease, transform 0.28s ease" }}
              >
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
                  {/* Left: header + summary */}
                  <div>
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-14 h-14 gradient-neon rounded-2xl flex items-center justify-center flex-shrink-0">
                        <Icon name="CheckCircle" size={28} className="text-black" />
                      </div>
                      <div>
                        <h3 className="font-oswald text-3xl lg:text-4xl font-bold text-white">Ваш расчёт готов!</h3>
                        <p className="text-white/40 text-sm mt-0.5">На основе ваших ответов</p>
                      </div>
                    </div>

                    <div className="space-y-1">
                      {QUIZ_STEPS.map((s) => {
                        const sel = answers[s.id] ?? [];
                        if (sel.length === 0) return null;
                        return sel.map((key) => {
                          const opt = s.options.find((o) => o.key === key);
                          if (!opt) return null;
                          return (
                            <div key={key} className="flex justify-between items-center py-3 border-b border-white/5">
                              <span className="text-white/60 flex items-center gap-2.5 text-sm">
                                <span className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                                  <Icon name={opt.icon} size={13} className="text-neon/70" />
                                </span>
                                {opt.label}
                              </span>
                              <span className={`text-sm font-semibold ${opt.price === 0 ? "text-white/40" : "text-white"}`}>
                                {opt.price === 0 ? "включено" : `${opt.price.toLocaleString("ru-RU")} ₽`}
                              </span>
                            </div>
                          );
                        });
                      })}
                    </div>
                  </div>

                  {/* Right: total + CTA */}
                  <div className="lg:sticky lg:top-28">
                    <div className="glass rounded-2xl p-7 border border-neon/25 mb-5">
                      <div className="text-white/50 text-xs uppercase tracking-widest font-semibold mb-4">Итоговая стоимость</div>
                      <div className="font-oswald text-5xl font-bold text-white mb-2">{total.toLocaleString("ru-RU")} ₽</div>
                      <p className="text-white/30 text-xs mb-5">Финальная стоимость уточняется после брифинга</p>
                      {promoTotal > 0 && (
                        <div className="glass bg-neon/10 rounded-xl p-4 border border-neon/20 mb-5">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-lg">🔥</span>
                            <span className="text-neon text-sm font-bold">Скидка 50% на рекламу</span>
                          </div>
                          <div className="text-white/50 text-xs">
                            Ваша экономия: <span className="text-neon font-bold">{(promoTotal / 2).toLocaleString("ru-RU")} ₽</span>
                          </div>
                        </div>
                      )}
                      <a href="#contact" className="block w-full gradient-neon text-black font-bold py-4 rounded-xl text-base text-center hover:opacity-90 transition-opacity mb-3">
                        Оставить заявку
                      </a>
                      <button onClick={handleRestart} className="w-full glass border border-white/15 text-white/60 font-semibold py-3.5 rounded-xl text-sm hover:border-white/30 hover:text-white transition-all">
                        Пересчитать
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
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