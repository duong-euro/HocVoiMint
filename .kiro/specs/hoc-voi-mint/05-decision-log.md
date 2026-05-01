# Decision Log

| ID | Decision | Options Considered | Chosen Option | Why | Impact | Date | Owner |
|----|----------|--------------------|---------------|-----|--------|------|-------|
| D-01 | Tech stack | React, Vue, Vanilla JS | Vanilla JS | Đơn giản nhất, không cần build tool, mở file là chạy | Toàn bộ architecture | 2026-05-01 | Kiro |
| D-02 | Hosting | Vercel, Netlify, GitHub Pages | GitHub Pages | Miễn phí, tích hợp sẵn với GitHub repo, đủ cho static site | Deployment | 2026-05-01 | duong-euro |
| D-03 | Lưu tiến độ | localStorage, IndexedDB, Backend | Session only + localStorage cho theme | MVP không cần persistence, giữ đơn giản. Theme lưu localStorage với graceful fallback | Data persistence | 2026-05-01 | Kiro |
| D-04 | Font chữ | Baloo 2 + Comic Neue, Fredoka + Nunito, Nunito only | Nunito (cả heading + body) | Baloo 2 và Comic Neue không hỗ trợ tiếng Việt đầy đủ. Fredoka cũng bị lỗi. Nunito bo tròn, thân thiện, Vietnamese OK | Typography toàn app | 2026-05-01 | Kiro |
| D-05 | Design style | Glassmorphism, Neumorphism, Claymorphism, Flat | Claymorphism | ui-ux-pro-max recommend cho children's/education app. Soft 3D, playful, chunky — phù hợp trẻ em | UI toàn app | 2026-05-01 | Kiro |
| D-06 | Color palette | Indigo (#4F46E5), Blue (#3B82F6), Teal | Blue (#3B82F6) primary + warm background (#FEF7ED) | User yêu cầu không dùng tím gradient SaaS. Blue ấm hơn, kết hợp nền kem tạo cảm giác thân thiện | Colors toàn app | 2026-05-01 | Kiro |
| D-07 | File structure | Single HTML file, Multi-file | Multi-file (HTML + CSS + JS riêng) | Single file quá lớn, tool gặp lỗi khi ghi. Multi-file dễ maintain, dễ đọc | Project structure | 2026-05-01 | Kiro |
| D-08 | Dark mode | Có, Không (anti-pattern cho kids app) | Có | Design system khuyên avoid dark mode cho kids app, nhưng user yêu cầu rõ ràng → ưu tiên yêu cầu user | Theme system | 2026-05-01 | Kiro |
| D-09 | Tên app | Vui học Toán 3, Học Với Mint | Học Với Mint | User yêu cầu đổi tên | Branding | 2026-05-01 | duong-euro |

## Notes
- D-04 trải qua 3 lần thay đổi: Comic Neue → Fredoka → Nunito, mỗi lần do phát hiện lỗi tiếng Việt
- D-08 là trường hợp yêu cầu user override khuyến nghị design system
