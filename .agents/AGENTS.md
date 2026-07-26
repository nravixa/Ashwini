# Documentation Knowledge Rule

Whenever you are tasked with generating, modifying, or reviewing code in this repository, you MUST first automatically read and consult any relevant Markdown (`*.md`) documentation files in the project, such as:

- `README.md`
- `project-context.md`
- `performance.md`
- `deployment.md`
- `architecture.md`
- `design-system.md`
- `coding-guidelines.md`
- `ui-guidelines.md`
- `animations.md`
- `threejs.md`
- `lenis.md`
- `gsap.md`
- `tailwind.md`
- `component-guidelines.md`
- `seo.md`
- `branding.md`
- `roadmap.md`
- `requirements.md`

## Behavior
Treat these Markdown files as your primary project context and developer documentation. Use them as the absolute source of truth for:
- Architecture and Folder Structure
- Coding Standards and Component Conventions
- Animation and Performance rules
- Deployment rules
- Brand Guidelines, Typography, Spacing, and Colors
- Accessibility and Responsive constraints

Always ensure generated code strictly follows the guidelines laid out in these files. Never generate code that conflicts with documented standards.

## Conflict Resolution Priority
If two documentation files conflict, prioritize them in the following order:
1. `project-context.md`
2. `requirements.md`
3. `architecture.md`
4. `design-system.md`
5. Remaining documentation.
