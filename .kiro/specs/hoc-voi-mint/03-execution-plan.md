# Execution Plan

## 1. Delivery Strategy
Chosen strategy: Single milestone cho MVP, sau đó iterate theo feature
Reason: App đơn giản, scope rõ ràng, deliver nhanh rồi cải thiện

## 2. Milestones

### Milestone 1: MVP — Core App (COMPLETED)
- Objective: App hoạt động đầy đủ với 6 màn hình, dữ liệu mẫu, quiz engine
- Scope:
  - 6 màn hình: Home, Topics, Lessons, Quiz, Result, Exams
  - Navigation bằng JS state
  - Quiz engine: multiple_choice + input_number
  - Dữ liệu: 6 chủ đề, 12 bài, 6 đề, 118 câu hỏi
  - Light/dark mode
  - Design system: Claymorphism, Nunito font
  - Deploy trên GitHub Pages
- Done when:
  - [x] Tất cả 6 màn hình render đúng
  - [x] Quiz flow hoạt động end-to-end
  - [x] Light/dark mode chuyển đổi được
  - [x] Font tiếng Việt hiển thị đúng
  - [x] Deploy thành công trên GitHub Pages
- Estimated effort: 1 session

### Milestone 2: Major Upgrade — Full Learning Experience (IN PROGRESS)
- Objective: Rebuild app với 8 màn hình, biệt danh, hành trình, luyện ngẫu nhiên, adaptive difficulty, tiến bộ, hồ sơ
- Scope:
  - 8 màn hình: Home, Chọn chế độ, Chủ đề, Ôn thi, Làm bài, Kết quả, Tiến bộ, Hồ sơ
  - Biệt danh bé + modal đặt tên
  - Hành trình học tập với thanh tiến độ %
  - Luyện ngẫu nhiên
  - Adaptive difficulty (easy/medium/hard)
  - Đồng hồ cho chế độ ôn thi
  - Hint/gợi ý cho câu sai
  - Trang tiến bộ học tập
  - Trang hồ sơ bé với avatar, huy hiệu
  - Bottom nav 4 tab
  - Data model mở rộng (30+ câu hỏi, hint, difficulty per question)
- Done when:
  - Tất cả 8 màn hình hoạt động
  - Quiz flow với adaptive difficulty
  - Luyện ngẫu nhiên hoạt động
  - Tiến bộ tracking trong session
  - Deploy thành công
- Estimated effort: 2-3 sessions

### Milestone 3: UX Polish & Features (PLANNED)
- Objective: Cải thiện trải nghiệm, thêm tính năng mới
- Scope: Tùy theo yêu cầu user
- Done when: User chấp nhận
- Estimated effort: TBD

## 3. Workstreams
| Workstream | Owner | Key Deliverables |
|------------|-------|-----------------|
| UI/UX Design | Kiro + ui-ux-pro-max | Design system, CSS, responsive |
| App Logic | Kiro | Navigation, quiz engine, state |
| Content | duong-euro + Kiro | Câu hỏi Toán lớp 3 |
| Deployment | duong-euro | GitHub Pages setup |

## 4. Dependency and Sequencing

### Must Happen First (blocking)
1. Design system generated (ui-ux-pro-max)
2. Data model defined
3. CSS + HTML structure

### Milestone Internal Sequences
```
Design System → CSS → HTML Structure → JS Data → JS App Logic → Testing → Deploy
```

### Can Run in Parallel
- CSS styling và JS data creation
- Content writing và UI polish

### External Blockers
- Google Fonts availability (low risk)
- GitHub Pages setup (one-time)

## 5. Risks and Mitigations
| Risk | Severity | Mitigation | Owner |
|------|----------|------------|-------|
| Font tiếng Việt lỗi | High | Đã resolve — dùng Nunito | Kiro |
| Nội dung Toán sai | Medium | Review thủ công | duong-euro |
| File quá lớn | Low | Tách data riêng file | Kiro |

## 6. Validation Gates
- [x] M1: App chạy được trên mobile browser
- [x] M1: Quiz flow end-to-end hoạt động
- [x] M1: Deploy thành công trên GitHub Pages
- [ ] M2: Content review hoàn tất
- [ ] M3: UX feedback từ user thực

## 7. Shipping Criteria

### Must be true before release
- App load và hoạt động trên Chrome/Safari mobile
- Tất cả quiz flow hoạt động đúng
- Font tiếng Việt hiển thị đúng
- Không có JS error trong console

### Can be deferred
- Offline support
- Lưu tiến độ lâu dài
- Thêm câu hỏi

## 8. Definition of Done (per task)
A task is done when:
1. Code is written and passes syntax check
2. Feature works in the browser (manual test)
3. No regressions in existing functionality
4. Responsive on 375px width
5. Task is checked off in the task list
