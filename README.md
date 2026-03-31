# 🧪 UX Stress Test Agent

**MMDS-integrated persona simulation tool for the Macromill Design System.**

Simulates real users under realistic stress conditions against any design input — HTML prototypes, Figma frames, screenshots, or code — and generates interactive risk reports mapped to MMDS tokens and components.

> 🟡 **Status:** Work in Progress (v1)

---

## How It Works

| Step | What happens |
|------|-------------|
| **1. Design Input** | Paste code, describe a screen, or drop a file. MMDS tokens are auto-detected. |
| **2. User Task + Personas** | Define what the user is trying to do, then pick from 11 personas or write your own. |
| **3. Simulation** | Claude generates raw first-person monologues per persona attempting the task. |
| **4. Risk Report** | Interactive tabbed report: Monologues / Issues / Matrix / What Worked. |

## Personas

**Macromill** — Survey Respondent · Research Client · Survey Editor Power User

**Accessibility** — Skeptical Elder · Screen Reader · Color Blind

**Situational Stress** — Speed Runner · First-Timer · Cognitively Overloaded

**Technical** — Keyboard Power User · Internationalist

## MMDS Integration

- **Staff theme** — styled with MMDS tokens (`#0067cf`, `#162331`, Hiragino Sans, 8px radius)
- **Token auto-detection** — scans pasted HTML for `--color-text-medium`, component names, hit area violations
- **Report references** — issue cards show MMDS token badges + component badges alongside WCAG refs
- **Figma MCP** — skill version pulls live tokens via `get_variable_defs`

## Bilingual

Full EN/JA support — toggle in the app header. UI, personas, and AI-generated reports switch language instantly.

## Files

| File | Description |
|------|-------------|
| `index.jsx` | Interactive React app (runs as Claude artifact) |
