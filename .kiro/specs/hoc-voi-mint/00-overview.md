# Overview

## Feature
hoc-voi-mint

## Objective
Xây dựng ứng dụng web mobile-first giúp học sinh lớp 3 ôn tập và luyện thi môn Toán. App chạy độc lập trên trình duyệt điện thoại của phụ huynh, không cần backend, không cần đăng nhập. Trải nghiệm đơn giản, thân thiện trẻ em, bám sát chương trình SGK Toán lớp 3.

## Status
- [x] Draft
- [x] In Review
- [x] Approved
- [x] In Progress
- [ ] Done

## Owners
- Product: duong-euro
- Engineering: Kiro AI
- Design: ui-ux-pro-max (Claymorphism style)
- QA: Manual

## Hard Constraints
- Single-page app, file tĩnh (HTML + CSS + JS), không backend
- Mobile-first, tối ưu 375px
- Không dùng framework JS (vanilla JS)
- Không dùng localStorage bắt buộc (graceful fallback)
- Font phải hỗ trợ tiếng Việt đầy đủ
- Không dùng emoji làm icon UI (chỉ SVG)
- Không dùng màu tím gradient kiểu SaaS AI

## Linked Files
- `01-feature-spec.md` — functional requirements and user flows
- `02-technical-spec.md` — architecture, data model, state machine
- `03-execution-plan.md` — milestones, sequencing, risks
- `04-task-list.md` — actionable implementation tasks
- `05-decision-log.md` — architectural and scope decisions
- `06-test-plan.md` — test strategy and concrete test cases
- `07-rollout-plan.md` — deployment and verification
- `08-open-questions.md` — resolved and deferred questions
- `09-codex-review.md` — review findings

## Linked Artifacts
- `design-system/vui-hoc-toan-3/MASTER.md` — design system source of truth

## Summary
### Problem
Phụ huynh cần một công cụ đơn giản để con (lớp 3) ôn tập Toán trên điện thoại. Các app hiện có thường phức tạp, cần đăng ký, hoặc không bám sát SGK Việt Nam.

### Proposed Outcome
App web tĩnh, mở trình duyệt là dùng được ngay. Có hệ thống chủ đề, bài luyện, đề ôn thi học kỳ với câu hỏi Toán lớp 3 thực tế. Chấm điểm tức thì, giải thích đáp án, cho phép ôn lại phần sai.

### Main Risks
- Nội dung câu hỏi có thể chưa phủ hết chương trình → Mitigation: cấu trúc dữ liệu mở rộng, dễ thêm câu hỏi
- Font tiếng Việt bị lỗi hiển thị → Mitigation: đã test và chọn Nunito (hỗ trợ Vietnamese đầy đủ)
- Không có backend nên không lưu tiến độ lâu dài → Mitigation: ghi nhận trong deferred scope

### Deferred Scope (explicitly not in this round)
- Đăng nhập / tài khoản người dùng
- Lưu tiến độ học tập lâu dài (localStorage hoặc backend)
- Hệ thống gamification (huy hiệu, streak, leaderboard)
- Nội dung các môn khác ngoài Toán
- Admin panel quản lý câu hỏi
- PWA / offline mode
- Âm thanh / hiệu ứng âm thanh
