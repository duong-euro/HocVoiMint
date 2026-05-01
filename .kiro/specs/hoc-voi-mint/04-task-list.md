# Task List

## Milestone 1: MVP — Core App (COMPLETED)

### 1.1 Design System & CSS
- [x] Chạy ui-ux-pro-max --design-system --persist
- [x] Search thêm domain: color, typography, ux, style, stack
- [x] Tạo css/styles.css với Claymorphism style
- [x] Implement light/dark mode CSS variables
- [x] Fix font tiếng Việt (Comic Neue → Fredoka → Nunito)
- [x] Thêm focus-visible, touch targets, safe-area, prefers-reduced-motion
- Done: CSS hoàn chỉnh, responsive 375px+, 2 theme, font tiếng Việt OK

### 1.2 Data Layer
- [x] Định nghĩa data model: TOPICS, LESSONS, EXAMS, QUESTIONS
- [x] Tạo 6 chủ đề với icon, color, mô tả
- [x] Tạo 12 bài luyện (2-3 bài/chủ đề)
- [x] Tạo 6 đề ôn thi (3 HK1 + 3 HK2)
- [x] Viết 118 câu hỏi Toán lớp 3 thực tế (6-8 câu/bài)
- [x] Verify data integrity (tất cả lesson/exam có questions)
- Done: js/data.js hoàn chỉnh, syntax OK, data integrity verified

### 1.3 App Logic
- [x] Implement state management (global state object)
- [x] Implement screen navigation (navigate, goBack, updateBottomNav)
- [x] Implement renderHome (greeting, actions, stats, suggestions)
- [x] Implement renderTopics (card list với icon, color, badge)
- [x] Implement renderLessons (bài theo chủ đề, difficulty badge)
- [x] Implement renderExams (đề ôn thi, filter by semester)
- [x] Implement renderQuiz (progress bar, question, choices, input, feedback)
- [x] Implement renderResult (score circle, wrong list, actions)
- [x] Implement quiz engine (startQuiz, checkAnswer, nextQuestion, finishQuiz)
- [x] Implement review wrong questions flow
- [x] Implement theme toggle + localStorage persistence
- Done: Tất cả 6 màn hình hoạt động, quiz flow end-to-end OK

### 1.4 HTML Entry Point
- [x] Tạo index.html với navbar, bottom nav, app container
- [x] SVG logo "Học Với Mint"
- [x] Accessible markup (aria-label, role, aria-hidden)
- [x] Load CSS + JS files
- Done: index.html hoàn chỉnh

### 1.5 Deployment
- [x] Push code lên GitHub (duong-euro/HocVoiMint)
- [x] Bật GitHub Pages
- [x] Verify trang hoạt động
- Done: https://duong-euro.github.io/HocVoiMint/ live

### 1.6 Spec Documentation (retroactive)
- [x] Tạo 00-overview.md
- [x] Tạo 01-feature-spec.md
- [x] Tạo 02-technical-spec.md
- [x] Tạo 03-execution-plan.md
- [x] Tạo 04-task-list.md
- [x] Tạo 05-decision-log.md
- [x] Tạo 06-test-plan.md
- [x] Tạo 07-rollout-plan.md
- [x] Tạo 08-open-questions.md
- [x] Tạo 09-codex-review.md
- Done: Bộ spec 10 file hoàn chỉnh

## Milestone 2: Content Expansion (PLANNED)

### 2.1 Thêm câu hỏi
- [ ] Mỗi bài luyện có ít nhất 10 câu (hiện 6-8)
- [ ] Thêm dạng câu hỏi mới nếu cần
- [ ] Review nội dung Toán cho chính xác
- Done: Mỗi bài ≥ 10 câu, nội dung chính xác

### 2.2 Milestone 2 Testing
- [ ] Verify tất cả câu hỏi mới có đáp án đúng
- [ ] Manual QA: làm thử mỗi bài
- Done: Tất cả câu hỏi verified

## Milestone 3: UX Polish & New Features (PLANNED)

### 3.1 Tính năng mới
- [ ] TBD — chờ yêu cầu từ user
- Done: TBD

## Discovery / Spec
- [x] Confirm scope
- [x] Confirm non-goals
- [x] Complete spec documentation
- [ ] Complete Codex spec review
