const { useState, useEffect, useRef } = React;

/* ---------------------------------------------------------
   DATA — sourced from resume / LinkedIn
--------------------------------------------------------- */

const NAV_ITEMS = [
  { id: "about", label: "about", num: "01" },
  { id: "experience", label: "experience", num: "02" },
  { id: "skills", label: "skills", num: "03" },
  { id: "projects", label: "projects", num: "04" },
  { id: "education", label: "education", num: "05" },
  { id: "contact", label: "contact", num: "06" },
];

const SKILL_GROUPS = [
  {
    table: "languages",
    rows: [
      { name: "Java", tag: "Daily use", level: 4 },
      { name: "C++", tag: "Working", level: 3 },
      { name: "C", tag: "Working", level: 3 },
      { name: "JavaScript", tag: "Working", level: 3 },
    ],
  },
  {
    table: "backend_and_web",
    rows: [
      { name: "Spring / Spring Boot", tag: "Daily use", level: 4 },
      { name: "HTML / CSS", tag: "Working", level: 3 },
      { name: "Apache Tomcat", tag: "Working", level: 3 },
      { name: "WampServer", tag: "Familiar", level: 2 },
    ],
  },
  {
    table: "databases",
    rows: [
      { name: "MySQL", tag: "Daily use", level: 4 },
      { name: "SQL / Database Design", tag: "Daily use", level: 4 },
      { name: "PostgreSQL", tag: "Working", level: 3 },
      { name: "Oracle", tag: "Familiar", level: 2 },
    ],
  },
  {
    table: "tooling",
    rows: [
      { name: "Git / GitHub", tag: "Daily use", level: 4 },
      { name: "VS Code", tag: "Daily use", level: 4 },
      { name: "Eclipse / NetBeans", tag: "Working", level: 3 },
    ],
  },
];

const EXPERIENCE = [
  {
    hash: "a1c9e0f",
    head: true,
    ref: "HEAD -> main",
    date: "Apr 2026 — Present",
    title: "Software Engineer",
    co: "MapmyIndia",
    place: "New Delhi",
    desc: "Promoted from Software Associate. Working on backend services behind MapmyIndia's mapping and location platform.",
  },
  {
    hash: "7f0b3d2",
    ref: "tag: promoted",
    date: "Feb 2025 — Mar 2026",
    title: "Software Associate",
    co: "MapmyIndia",
    place: "New Delhi",
    desc: "Started as Software Associate — first full-time role after MCA. 1 yr 7 mo at the company in total.",
  },
  {
    hash: "5e21a44",
    date: "Feb 2024 — Jun 2024",
    title: "Java Backend Developer",
    co: "Railworld India Pvt. Ltd.",
    place: "Gurugram, Haryana",
    desc: "Built backend logic in Java, working close to the data layer.",
  },
  {
    hash: "3c88f19",
    date: "Oct 2023 — Dec 2023",
    title: "Java Developer",
    co: "YHills Edutech Pvt. Ltd.",
    place: "Remote, India",
    desc: "Applied Java fundamentals on real assignments during a structured training program.",
  },
  {
    hash: "1a4d0c7",
    date: "Oct 2023 — Nov 2023",
    title: "Java Programmer",
    co: "CodSoft",
    place: "Remote, India",
    desc: "Short, focused programming internship building Java exercises end to end.",
  },
  {
    hash: "0e77b52",
    date: "Oct 2023 — Nov 2023",
    title: "Web Developer",
    co: "OctaNet Services Pvt. Ltd.",
    place: "Remote, India",
    desc: "First taste of professional web development — HTML, CSS and JavaScript on client work.",
  },
];

const PROJECTS = [
  {
    name: "GymNation",
    tag: "Gym Management System",
    desc: "Desktop application that helps gym owners run day-to-day operations — members, staff and admin tasks — from one place instead of paper registers.",
    stack: ["Java", "NetBeans IDE", "MySQL"],
  },
  {
    name: "Red Drop",
    tag: "Blood Bank Management System",
    desc: "Web application concept to modernise how a blood bank or donation centre tracks donors, stock and requests.",
    stack: ["HTML", "CSS", "JavaScript", "Figma"],
  },
  {
    name: "GoDrive",
    tag: "Rental Car Management System",
    desc: "Platform for a car rental business to manage its fleet, reservations, customer records and billing in one workflow.",
    stack: ["HTML", "CSS", "JavaScript"],
  },
];

const EDUCATION = [
  {
    year: "2023",
    degree: "Master of Computer Applications (MCA)",
    school: "Jagran Institute of Management, Kanpur",
    score: "73% · Sep 2021 – Aug 2023",
  },
  {
    year: "2021",
    degree: "Bachelor of Computer Applications (BCA)",
    school: "Jagran College of Arts, Science & Commerce, Kanpur",
    score: "50% · 2018 – Nov 2021",
  },
  {
    year: "2016",
    degree: "Intermediate (12th), CBSE",
    school: "Kanya Kubja Public School, Kanpur",
    score: "50%",
  },
  {
    year: "2014",
    degree: "High School (10th), CBSE",
    school: "Kanya Kubja Public School, Kanpur",
    score: "70%",
  },
];

const CERTS = [
  { name: "Java Programming", org: "Yhills Edutech Pvt. Ltd." },
  { name: "Java, C, C++, HTML", org: "New World Computer Institute" },
  { name: "Advance Diploma in Computer Application", org: "New World Computer Institute" },
  { name: "Student Development Program", org: "Jagran Institute of Management" },
];

const CONTACT = [
  { key: "email", val: "debusahu121@gmail.com", href: "mailto:debusahu121@gmail.com" },
  { key: "phone", val: "+91 96515 41669", href: "tel:+919651541669" },
  { key: "linkedin", val: "linkedin.com/in/divyanshu-sahu-08188019b", href: "https://www.linkedin.com/in/divyanshu-sahu-08188019b/" },
  { key: "github", val: "github.com/DebuSahu", href: "https://github.com/DebuSahu" },
  { key: "location", val: "Kanpur, Uttar Pradesh, India — 208004", href: null },
];

const PHOTO = "assets/profile.png";
const REDUCE_MOTION = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------------------------------------------------------
   HOOKS
--------------------------------------------------------- */

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    if (REDUCE_MOTION) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

function useTypedLine(text, startDelay = 400, speed = 32) {
  const [out, setOut] = useState(REDUCE_MOTION ? text : "");
  const [done, setDone] = useState(REDUCE_MOTION);
  useEffect(() => {
    if (REDUCE_MOTION) return;
    let i = 0;
    let timer;
    const start = setTimeout(function tick() {
      timer = setInterval(() => {
        i++;
        setOut(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(timer);
          setDone(true);
        }
      }, speed);
    }, startDelay);
    return () => {
      clearTimeout(start);
      clearInterval(timer);
    };
  }, [text, startDelay, speed]);
  return [out, done];
}

/* ---------------------------------------------------------
   SMALL PIECES
--------------------------------------------------------- */

function WinBar({ dotColors = ["r", "y", "g"], title }) {
  return (
    <div className="win-bar">
      {dotColors.map((c, i) => (
        <span key={i} className={`win-dot ${c}`} />
      ))}
      <span className="win-title">{title}</span>
    </div>
  );
}

function Level({ n, tag }) {
  return (
    <div className="level">
      {[1, 2, 3, 4].map((i) => (
        <span key={i} className={`level-dot ${i <= n ? "on" : ""}`} />
      ))}
      <span className="level-tag">{tag}</span>
    </div>
  );
}

/* ---------------------------------------------------------
   NAV
--------------------------------------------------------- */

function Nav() {
  const ids = NAV_ITEMS.map((n) => n.id);
  const active = useActiveSection(ids);
  return (
    <header>
      <nav className="nav">
        <a href="#top" className="brand">
          <img className="brand-avatar" src={PHOTO} alt="Divyanshu Sahu" />
          <span>
            <b>Divyanshu</b>Sahu.java
          </span>
        </a>
        <div className="navlinks">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={active === item.id ? "active" : ""}
            >
              <span className="num">{item.num}</span>
              {item.label}
            </a>
          ))}
        </div>
        <a className="nav-cta" href="#contact">
          $ contact --now
        </a>
      </nav>
    </header>
  );
}

/* ---------------------------------------------------------
   HERO
--------------------------------------------------------- */

function Hero() {
  const query = "SELECT role, focus FROM developer WHERE name = 'Divyanshu Sahu';";
  const [typed, done] = useTypedLine(query, 500, 26);

  return (
    <section id="top" className="hero">
      <div className="container hero-grid">
        <div>
          <div className="hero-kicker">
            <span className="pulse" />
            open to backend / full-stack roles
          </div>

          <div className="win">
            <WinBar title="DivyanshuSahu.java" />
            <div className="win-body code-lines">
              <div className="code-line"><span className="ln">1</span><code><span className="tok-kw">package</span> com.divyanshu;</code></div>
              <div className="code-line"><span className="ln">2</span><code>&nbsp;</code></div>
              <div className="code-line"><span className="ln">3</span><code><span className="tok-com">// Software Developer — Java · Spring Boot · SQL</span></code></div>
              <div className="code-line"><span className="ln">4</span><code><span className="tok-kw">public class</span> <span className="tok-type">DivyanshuSahu</span> <span className="tok-kw">implements</span> <span className="tok-type">SoftwareDeveloper</span> {"{"}</code></div>
              <div className="code-line"><span className="ln">5</span><code>&nbsp;&nbsp;<span className="tok-kw">private</span> String location = <span className="tok-str">"Kanpur, Uttar Pradesh, India"</span>;</code></div>
              <div className="code-line"><span className="ln">6</span><code>&nbsp;&nbsp;<span className="tok-kw">private</span> String role     = <span className="tok-str">"Software Engineer @ MapmyIndia"</span>;</code></div>
              <div className="code-line"><span className="ln">7</span><code>&nbsp;&nbsp;<span className="tok-kw">private</span> <span className="tok-type">int</span>    experience = 2; <span className="tok-com">// years, and counting</span></code></div>
              <div className="code-line"><span className="ln">8</span><code>&nbsp;</code></div>
              <div className="code-line"><span className="ln">9</span><code>&nbsp;&nbsp;<span className="tok-kw">public</span> String[] <span className="tok-fn">stack</span>() {"{"}</code></div>
              <div className="code-line"><span className="ln">10</span><code>&nbsp;&nbsp;&nbsp;&nbsp;<span className="tok-kw">return</span> {"{"} <span className="tok-str">"Java"</span>, <span className="tok-str">"Spring Boot"</span>, <span className="tok-str">"MySQL"</span>, <span className="tok-str">"PostgreSQL"</span> {"}"};</code></div>
              <div className="code-line"><span className="ln">11</span><code>&nbsp;&nbsp;{"}"}</code></div>
              <div className="code-line"><span className="ln">12</span><code>{"}"}</code></div>
            </div>
          </div>

          <h1 className="hero-headline">
            Backend code on one side, <span className="teal">the schema underneath</span> it on the other.
          </h1>
          <p className="hero-desc">
            MCA graduate now working as a Software Engineer at MapmyIndia. Comfortable moving
            between Java / Spring Boot on the application side and MySQL / PostgreSQL on the
            data side — I like knowing exactly what a query costs before I write the code that calls it.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#projects">view projects →</a>
            <a className="btn btn-ghost" href="#contact">get in touch</a>
            <a className="btn btn-ghost" href="assets/resume.pdf" target="_blank" rel="noreferrer">download resume ↓</a>
          </div>
        </div>

        <div className="hero-side">
          <div className="idcard">
            <div className="idcard-top">
              <span>EMP_ID · 000247</span>
              <span className="badge-ok">● ACCESS GRANTED</span>
            </div>
            <div className="idcard-body">
              <img className="idcard-photo" src={PHOTO} alt="Divyanshu Sahu" />
              <div>
                <div className="idcard-name">Divyanshu Sahu</div>
                <div className="idcard-role">Software Engineer, MapmyIndia</div>
                <div className="idcard-loc">Kanpur, UP · IST (GMT+5:30)</div>
              </div>
            </div>
            <div className="idcard-strip">
              <span>ISSUED 2026</span>
              <span>DEPT: BACKEND / DB</span>
            </div>
          </div>

          <div className="win terminal">
            <WinBar title="psql — career_db" />
            <div className="win-body">
              <div className="term-line">
                <span className="term-prompt">divyanshu@kanpur</span>
                <span className="term-cmd">:~$ psql -d career_db</span>
              </div>
              <div className="term-line" style={{ marginTop: 10 }}>
                <span className="term-prompt">career_db=# </span>
                <span className="term-cmd">{typed}</span>
                {!done && <span className="caret" />}
              </div>
              {done && (
                <pre className="term-result" style={{ marginTop: 10 }}>
{`   role              |          focus
--------------------+----------------------------
 `}<span className="term-highlight">Software Engineer </span>{` | Java backend · databases
(1 row)`}
                </pre>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------
   ABOUT
--------------------------------------------------------- */

function About() {
  return (
    <section id="about">
      <div className="container">
        <div className="reveal">
          <div className="eyebrow">01 · about</div>
          <h2 className="section-title">Who's <span className="dim">running this instance</span></h2>
          <p className="section-sub">A short read on how I got here and what I actually spend my time doing.</p>
        </div>
        <div className="about-grid">
          <div className="about-text reveal">
            <p>
              I finished my <strong>MCA at Jagran Institute of Management</strong> in 2023 and went
              straight into Java internships before landing at <strong>MapmyIndia</strong>, where I've
              been for the past year and a half — first as a Software Associate, now as a Software Engineer.
            </p>
            <p>
              Most of my work sits in the backend: Java and Spring Boot for the application layer,
              MySQL and PostgreSQL underneath it. I like the database half as much as the code half —
              designing a schema properly usually saves more debugging time than any clever controller logic.
            </p>
            <p>
              Outside of the job stack, I've picked up HTML, CSS and JavaScript along the way, so I can
              take a feature from a database table to a working page when a project needs that.
            </p>
          </div>
          <div className="facts reveal">
            <div className="fact"><div className="fact-k">BASE_LOCATION</div><div className="fact-v">Kanpur, UP, IN</div></div>
            <div className="fact"><div className="fact-k">CURRENT_ROLE</div><div className="fact-v">Software Engineer</div></div>
            <div className="fact"><div className="fact-k">EXPERIENCE</div><div className="fact-v">~2 yrs (incl. internships)</div></div>
            <div className="fact"><div className="fact-k">DEGREE</div><div className="fact-v">MCA, 2023</div></div>
            <div className="fact"><div className="fact-k">CORE_STACK</div><div className="fact-v">Java · Spring Boot</div></div>
            <div className="fact"><div className="fact-k">DATA_STACK</div><div className="fact-v">MySQL · PostgreSQL</div></div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------
   EXPERIENCE
--------------------------------------------------------- */

function Experience() {
  return (
    <section id="experience">
      <div className="container">
        <div className="reveal">
          <div className="eyebrow">02 · experience</div>
          <h2 className="section-title">git log <span className="dim">--author="Divyanshu"</span></h2>
          <p className="section-sub">Six roles, reverse-chronological, exactly like a log you'd actually run.</p>
        </div>
        <div className="gitlog">
          {EXPERIENCE.map((c, i) => (
            <div className={`commit reveal ${c.head ? "head" : ""}`} key={c.hash}>
              <div className="commit-meta">
                <span className="commit-hash">commit {c.hash}</span>
                {c.ref && <span className="commit-ref">{c.ref}</span>}
                <span>{c.date}</span>
              </div>
              <p className="commit-title">
                {c.title} <span className="co">@ {c.co}</span>
              </p>
              <p className="commit-desc">{c.desc} · {c.place}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------
   SKILLS
--------------------------------------------------------- */

function Skills() {
  return (
    <section id="skills">
      <div className="container">
        <div className="reveal">
          <div className="eyebrow">03 · skills</div>
          <h2 className="section-title">Schema: <span className="dim">what I work with</span></h2>
          <p className="section-sub">Grouped like tables in a database — because that's more honest than a wall of logos.</p>
        </div>
        <div className="schema">
          {SKILL_GROUPS.map((g) => (
            <div className="schema-table reveal" key={g.table}>
              <div className="schema-head">
                <span className="tname">TABLE:</span> {g.table}
                <span className="trows">{g.rows.length} rows</span>
              </div>
              <table className="skills">
                <thead>
                  <tr>
                    <th style={{ width: "46%" }}>skill</th>
                    <th>usage</th>
                  </tr>
                </thead>
                <tbody>
                  {g.rows.map((r) => (
                    <tr key={r.name}>
                      <td className="skill-name">
                        <span className="pk">●</span>
                        {r.name}
                      </td>
                      <td>
                        <Level n={r.level} tag={r.tag} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------
   PROJECTS
--------------------------------------------------------- */

function Projects() {
  return (
    <section id="projects">
      <div className="container">
        <div className="reveal">
          <div className="eyebrow">04 · projects</div>
          <h2 className="section-title">Tables I've <span className="dim">built from scratch</span></h2>
          <p className="section-sub">Academic and self-driven builds — each one pairs a real workflow with the database behind it.</p>
        </div>
        <div className="projects-grid">
          {PROJECTS.map((p) => (
            <div className="project-card reveal" key={p.name}>
              <div className="project-head">
                <span className="db-icon">▤</span> TABLE · {p.name.toLowerCase().replace(/\s+/g, "_")}
              </div>
              <div className="project-body">
                <div>
                  <div className="project-name">{p.name}</div>
                  <div className="eyebrow" style={{ margin: "6px 0 0" }}>{p.tag}</div>
                </div>
                <p className="project-desc">{p.desc}</p>
                <div className="project-stack">
                  {p.stack.map((s) => (
                    <span className="chip" key={s}>{s}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------
   EDUCATION + CERTS
--------------------------------------------------------- */

function Education() {
  return (
    <section id="education">
      <div className="container">
        <div className="reveal">
          <div className="eyebrow">05 · education</div>
          <h2 className="section-title">Records <span className="dim">on file</span></h2>
          <p className="section-sub">Degrees first, certifications alongside — dates and scores exactly as issued.</p>
        </div>
        <div className="edu-grid">
          <div className="reveal">
            {EDUCATION.map((e) => (
              <div className="edu-row" key={e.degree}>
                <div className="edu-year">{e.year}</div>
                <div>
                  <div className="edu-degree">{e.degree}</div>
                  <div className="edu-school">{e.school}</div>
                  <div className="edu-score">{e.score}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="certs win reveal">
            <WinBar title="certifications.log" />
            {CERTS.map((c) => (
              <div className="cert-item" key={c.name}>
                <span className="mark">✓</span>
                <div>
                  {c.name}
                  <span className="cert-org">{c.org}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------
   CONTACT + FOOTER
--------------------------------------------------------- */

function Contact() {
  return (
    <section id="contact">
      <div className="container">
        <div className="reveal">
          <div className="eyebrow">06 · contact</div>
          <h2 className="section-title">$ contact --show</h2>
          <p className="section-sub">Kanpur-based, happy to work IST hours or hybrid/remote. Reach out directly below.</p>
        </div>
        <div className="contact-wrap reveal">
          <WinBar title="~/contact" />
          <div className="contact-body">
            {CONTACT.map((c) => (
              <div className="contact-row" key={c.key}>
                <span className="contact-arrow">→</span>
                <span className="contact-key">{c.key}</span>
                {c.href ? (
                  <a className="contact-val" href={c.href} target="_blank" rel="noreferrer">{c.val}</a>
                ) : (
                  <span className="contact-val">{c.val}</span>
                )}
              </div>
            ))}
          </div>
          <div className="contact-cursor">
            divyanshu@kanpur:~$ <span className="caret" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      built with <span className="amber">React</span> · no ORM was harmed · © {new Date().getFullYear()} Divyanshu Sahu
    </footer>
  );
}

/* ---------------------------------------------------------
   APP
--------------------------------------------------------- */

function App() {
  useReveal();
  return (
    <>
      <Nav />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Education />
      <Contact />
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
