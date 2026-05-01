# UI / UX Guidelines

## Design Intelligence Tool
Dự án này tích hợp **ui-ux-pro-max** skill — bộ công cụ AI design intelligence với:
- 67 UI styles (Glassmorphism, Neumorphism, Brutalism, Bento Grid, v.v.)
- 161 color palettes theo ngành
- 57 font pairings với Google Fonts
- 161 reasoning rules theo loại sản phẩm
- 99 UX guidelines và anti-patterns
- 25 chart types cho dashboards
- Hỗ trợ 15 tech stacks (React, Next.js, Vue, Tailwind, v.v.)

### Cách sử dụng
Khi cần thiết kế UI, dùng slash command trong Kiro:
```
/ui-ux-pro-max Build a dashboard for workflow management
```

Hoặc chạy trực tiếp:
```bash
# Tạo design system hoàn chỉnh
python3 steering/ui-ux-pro-max/scripts/search.py "saas dashboard workflow" --design-system -p "ProjectName"

# Lưu design system để dùng lại
python3 steering/ui-ux-pro-max/scripts/search.py "saas dashboard" --design-system --persist -p "ProjectName"

# Tìm style cụ thể
python3 steering/ui-ux-pro-max/scripts/search.py "minimalism" --domain style

# Tìm font pairing
python3 steering/ui-ux-pro-max/scripts/search.py "professional modern" --domain typography

# Tìm UX guidelines
python3 steering/ui-ux-pro-max/scripts/search.py "animation accessibility" --domain ux

# Stack-specific guidelines
python3 steering/ui-ux-pro-max/scripts/search.py "form validation" --stack nextjs
```

Xem hướng dẫn đầy đủ tại `steering/ui-ux-pro-max/SKILL.md`.

## UX Principles
- Reduce friction for frequent actions
- Make important states explicit (status, progress, gates)
- Give users feedback during async work (loading states, success/error messages)
- Keep error messages actionable (tell user what went wrong and what to do)

## Layout
- Consistent navigation across all pages
- Breadcrumbs for nested pages
- Current state always visible on detail pages

## Forms
- Validate on submit, show inline errors
- Pre-fill defaults where possible
- Disable submit button while processing

## Status Display
- Use color-coded badges for status indicators
- Show gates/checkpoints prominently
- Show version numbers on versioned content

## Pre-Delivery Checklist (from ui-ux-pro-max)
- [ ] No emojis used as icons (use SVG: Heroicons/Lucide)
- [ ] All clickable elements have `cursor-pointer`
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Light mode text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard navigation
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] No horizontal scroll on mobile

## Minimal UI (Round 1)
- Tailwind CSS for styling
- No custom design system (use ui-ux-pro-max generated recommendations)
- Functional over beautiful
- Accessible baseline (semantic HTML, readable contrast)
