// ---------------------------------------------------------------------------
// Content for the full-page "IDE mode". IMPORTANT: this uses ONLY information
// already present in the portfolio (hero/about pitch, skills, services,
// projects, contact) — no CV / personal data.
//
// Each file is an array of lines; each line is an array of tokens { c, t }
// where `c` is a syntax class (mapped to portfolio colors in CSS) and `t` is
// the literal text. Whitespace is part of the tokens (CSS uses white-space:pre),
// so rendering is fully declarative and XSS-safe (no innerHTML).
// ---------------------------------------------------------------------------

// Token shorthands keep the data readable.
const kw = (t) => ({ c: "kw", t });
const str = (t) => ({ c: "str", t });
const fn = (t) => ({ c: "fn", t });
const vr = (t) => ({ c: "var", t });
const cm = (t) => ({ c: "cm", t });
const num = (t) => ({ c: "num", t });
const ty = (t) => ({ c: "type", t });
const tag = (t) => ({ c: "tag", t });
const at = (t) => ({ c: "attr", t });
const pr = (t) => ({ c: "prop", t });
const p = (t) => ({ c: "punc", t });
const cst = (t) => ({ c: "const", t });
const op = (t) => ({ c: "op", t });
const tx = (t) => ({ c: "plain", t }); // plain text / whitespace
const s = (n = 2) => tx(" ".repeat(n)); // indent helper

export const FILES = [
  {
    name: "README.md",
    lang: "md",
    icon: "md",
    crumb: ["README.md"],
    lines: [
      [kw("# Riccardo Giordanella")],
      [],
      [cm("> Full-stack developer crafting the web")],
      [],
      [kw("## Who")],
      [],
      [tx("Building delightful, functional web experiences")],
      [tx("where "), str("design"), tx(" and "), str("code"), tx(" meet — on "), str("both ends")],
      [tx("of the stack, from pixel-perfect interfaces to")],
      [tx("robust server logic.")],
      [],
      [kw("## Fast facts")],
      [],
      [tx("- "), str("Based in"), tx(": Italy")],
      [tx("- "), str("Experience"), tx(": 2+ years")],
      [tx("- "), str("Status"), tx(": available for new projects")],
    ],
  },

  {
    name: "about.jsx",
    lang: "jsx",
    icon: "js",
    crumb: ["src", "about.jsx"],
    lines: [
      [kw("export"), tx(" "), kw("default"), tx(" "), kw("function"), tx(" "), fn("About"), p("() {")],
      [s(), kw("return"), tx(" "), p("(")],
      [s(4), p("<"), tag("section"), tx(" "), at("id"), op("="), str('"about"'), p(">")],
      [s(6), p("<"), tag("p"), p(">")],
      [s(8), tx("I bring ideas to life on "), p("<"), tag("em"), p(">"), tx("both ends"), p("</"), tag("em"), p(">")],
      [s(8), tx("of the stack — interfaces "), op("&&"), tx(" server logic.")],
      [s(6), p("</"), tag("p"), p(">")],
      [s(6), p("<"), tag("p"), p(">")],
      [s(8), tx("Merging technology "), op("&&"), tx(" creativity for")],
      [s(8), tx("solutions as "), str("functional"), tx(" as they are "), str("beautiful"), tx(".")],
      [s(6), p("</"), tag("p"), p(">")],
      [s(4), p("</"), tag("section"), p(">")],
      [s(), p(");")],
      [p("}")],
    ],
  },

  {
    name: "skills.json",
    lang: "json",
    icon: "json",
    crumb: ["src", "skills.json"],
    lines: [
      [p("{")],
      [s(), pr('"frontend"'), p(": ["), str('"HTML & CSS"'), p(", "), str('"JavaScript"'), p(", "), str('"React"'), p(", "), str('"Bootstrap"'), p("],")],
      [s(), pr('"backend"'), p(":  ["), str('"PHP"'), p(", "), str('"Laravel"'), p(", "), str('"MySQL"'), p("],")],
      [s(), pr('"focus"'), p(":    "), str('"full-stack web"'), p(",")],
      [s(), pr('"stats"'), p(": {")],
      [s(4), pr('"yearsOfExperience"'), p(": "), num("2"), p(",")],
      [s(4), pr('"projectsCompleted"'), p(": "), num("12"), p(",")],
      [s(4), pr('"happyClients"'), p(":      "), num("8")],
      [s(), p("}")],
      [p("}")],
    ],
  },

  {
    name: "services.js",
    lang: "js",
    icon: "js",
    crumb: ["src", "services.js"],
    lines: [
      [cm("// What I do")],
      [kw("export"), tx(" "), kw("const"), tx(" "), vr("services"), tx(" "), op("="), tx(" "), p("[")],
      [s(), p("{ "), pr("title"), p(": "), str('"Web Development"'), p(",       "), pr("icon"), p(": "), str('"🌐"'), p(" },")],
      [s(), p("{ "), pr("title"), p(": "), str('"Frontend Development"'), p(",  "), pr("icon"), p(": "), str('"🎨"'), p(" },")],
      [s(), p("{ "), pr("title"), p(": "), str('"Backend Development"'), p(",   "), pr("icon"), p(": "), str('"⚙️"'), p(" },")],
      [s(), p("{ "), pr("title"), p(": "), str('"Website Optimization"'), p(",  "), pr("icon"), p(": "), str('"⚡"'), p(" },")],
      [s(), p("{ "), pr("title"), p(": "), str('"Responsive Design"'), p(",     "), pr("icon"), p(": "), str('"📱"'), p(" },")],
      [p("];")],
    ],
  },

  {
    name: "projects.js",
    lang: "js",
    icon: "js",
    crumb: ["src", "projects.js"],
    lines: [
      [cm("// Selected work — see the Projects section for live previews")],
      [kw("export"), tx(" "), kw("const"), tx(" "), vr("projects"), tx(" "), op("="), tx(" "), p("[")],
      [s(), str('"Click Food"'), p(",   "), str('"Tic Tac Toe"'), p(",  "), str('"Smart Book"'), p(",")],
      [s(), str('"Portfolio"'), p(",    "), str('"Rehacktor"'), p(",    "), str('"Decagym"'), p(",")],
      [s(), str('"Portfolio v2"'), p(",")],
      [p("]"), p(";")],
      [],
      [vr("projects"), p("."), fn("forEach"), p("("), vr("p"), tx(" "), op("=>"), tx(" "), fn("ship"), p("("), vr("p"), p("));")],
    ],
  },

  {
    name: "contact.ts",
    lang: "ts",
    icon: "js",
    crumb: ["src", "contact.ts"],
    lines: [
      [kw("export"), tx(" "), kw("const"), tx(" "), vr("contact"), p(": "), ty("Contact"), tx(" "), op("="), tx(" "), p("{")],
      [s(), pr("linkedin"), p(":  "), str('"in/riccardo-giordanella"'), p(",")],
      [s(), pr("github"), p(":    "), str('"Riccardo-Giordanella"'), p(",")],
      [s(), pr("location"), p(":  "), str('"Vittoria (RG), Italy"'), p(",")],
      [s(), pr("available"), p(": "), cst("true"), p(",")],
      [p("};")],
    ],
  },
];

// Files shown in the sidebar/tabs, keyed by name for quick lookup.
export const FILES_BY_NAME = Object.fromEntries(FILES.map((f) => [f.name, f]));

// ---------------------------------------------------------------------------
// "Go Live" terminal — purely scenographic dev-server log, portfolio-flavored.
// { d } is the delay before the line starts typing, `cls` the color class.
// ---------------------------------------------------------------------------
export const TERMINAL_STEPS = [
  { d: 200, cls: "t-dim", pre: "> ", text: "npm run dev" },
  { d: 500, cls: "t-info", pre: "", text: "VITE v7.0  ready in 342 ms" },
  { d: 350, cls: "t-ok", pre: "  ➜  ", text: "Local:   http://localhost:5173/" },
  { d: 250, cls: "t-dim", pre: "  ➜  ", text: "Network: use --host to expose" },
  { d: 500, cls: "t-dim", pre: "> ", text: "npm run build" },
  { d: 450, cls: "t-info", pre: "", text: "vite v7.0 building for production..." },
  { d: 400, cls: "t-info", pre: "", text: "transforming modules..." },
  { d: 500, cls: "t-warn", pre: "", text: "optimizing assets & webp images..." },
  { d: 450, cls: "t-info", pre: "", text: "rendering chunks..." },
  { d: 500, cls: "t-ok", pre: "✓ ", text: "built in 2.05s" },
  { d: 350, cls: "t-ok", pre: "", text: "portfolio ready — opening preview." },
];

// ---------------------------------------------------------------------------
// Boot intro — the "npm run build" sequence played after all files are written
// on first load. `d` is the pause AFTER the line before the next one starts.
// ---------------------------------------------------------------------------
export const BOOT_BUILD_STEPS = [
  { d: 450, cls: "t-cmd", pre: "$ ", text: "npm run build" },
  { d: 400, cls: "t-info", pre: "", text: "vite v7.0  building for production..." },
  { d: 300, cls: "t-dim", pre: "", text: "transforming 171 modules..." },
  { d: 350, cls: "t-dim", pre: "", text: "rendering chunks..." },
  { d: 400, cls: "t-warn", pre: "", text: "optimizing webp assets  10.0 MB → 0.64 MB" },
  { d: 300, cls: "t-dim", pre: "", text: "dist/index.html                 1.80 kB" },
  { d: 300, cls: "t-dim", pre: "", text: "dist/assets/index.css          72.3 kB │ gzip: 14 kB" },
  { d: 350, cls: "t-dim", pre: "", text: "dist/assets/index.js          434.8 kB │ gzip: 134 kB" },
  { d: 500, cls: "t-ok", pre: "✓ ", text: "built in 2.05s" },
  { d: 350, cls: "t-ok", pre: "", text: "portfolio compiled successfully 🎉" },
];

// Data for the reveal card, sourced from the portfolio.
export const PROFILE = {
  name: "Riccardo Giordanella",
  role: "Full-stack developer · crafting the web",
  tagline: "Building delightful, functional web experiences where design and code meet.",
  location: "Vittoria (RG), Italy",
  stack: ["React", "Laravel", "JavaScript", "PHP", "MySQL"],
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/riccardo-giordanella-173195197/" },
    { label: "GitHub", href: "https://github.com/Riccardo-Giordanella" },
  ],
};
