# Test Plan

## 1. Scope
Verify all baseline functionality:
- 6 màn hình render đúng và điều hướng hoạt động
- Quiz engine: chọn đáp án, nhập số, kiểm tra, feedback, chuyển câu
- Result: tính điểm đúng, hiển thị câu sai, ôn lại phần sai
- Theme toggle hoạt động
- Responsive trên mobile (375px)
- Font tiếng Việt hiển thị đúng

## 2. Test Types
- [ ] Unit tests — Deferred (không có test framework cho vanilla JS hiện tại)
- [ ] Integration tests — Deferred (không có API)
- [ ] UI/flow tests — Manual QA
- [ ] Regression tests — Manual sau mỗi thay đổi
- [x] Manual QA — Primary test method
- [x] Syntax check — `node -c` cho JS files
- [x] Data integrity check — Verify tất cả lesson/exam có questions

## 3. Test Framework
- Test runner: Manual + `node -c` syntax check
- HTTP testing: N/A
- Database: N/A
- Filesystem: N/A
- Cleanup strategy: N/A

## 4. Data Integrity Tests

### 4.1 Data Completeness
| ID | Test | Input | Expected |
|----|------|-------|----------|
| D-01 | Tất cả TOPICS có id unique | TOPICS array | 6 unique ids |
| D-02 | Tất cả LESSONS reference valid topicId | LESSONS array | Mỗi topicId tồn tại trong TOPICS |
| D-03 | Tất cả LESSONS có questions | LESSONS + QUESTIONS | QUESTIONS[lesson.id] exists và length > 0 |
| D-04 | Tất cả EXAMS có questions | EXAMS + QUESTIONS | QUESTIONS[exam.id] exists và length > 0 |
| D-05 | Multiple choice có đúng 4 choices | QUESTIONS | Mỗi MC question có choices.length === 4 |
| D-06 | Answer index hợp lệ | QUESTIONS | MC: answer 0-3, input: answer là number |

### 4.2 Math Content Accuracy
| ID | Test | Input | Expected |
|----|------|-------|----------|
| M-01 | Đáp án phép cộng đúng | Câu hỏi cộng | Kết quả tính tay khớp answer |
| M-02 | Đáp án phép trừ đúng | Câu hỏi trừ | Kết quả tính tay khớp answer |
| M-03 | Đáp án nhân chia đúng | Câu hỏi nhân/chia | Kết quả tính tay khớp answer |
| M-04 | Đáp án hình học đúng | Câu hỏi chu vi/diện tích | Công thức áp dụng đúng |

## 5. Manual QA Checklist

### Navigation
- [ ] Home → Topics → chọn topic → Lessons → chọn bài → Quiz → Result
- [ ] Home → Ôn HK1 → Exams (filtered HK1) → chọn đề → Quiz → Result
- [ ] Home → Ôn HK2 → Exams (filtered HK2) → chọn đề → Quiz → Result
- [ ] Bottom nav: Trang chủ, Chủ đề, Đề thi — chuyển đúng
- [ ] Nút Back hoạt động đúng ở mọi màn hình con
- [ ] Logo click → về Home

### Quiz Flow
- [ ] Multiple choice: chọn đáp án → highlight selected
- [ ] Multiple choice: bấm Kiểm tra → hiện đúng/sai + giải thích
- [ ] Multiple choice: sau kiểm tra, không chọn lại được
- [ ] Input number: nhập số → bấm Kiểm tra → hiện đúng/sai
- [ ] Input number: input rỗng → bấm Kiểm tra → không xảy ra gì
- [ ] Chưa chọn đáp án MC → bấm Kiểm tra → không xảy ra gì
- [ ] Câu tiếp theo hoạt động
- [ ] Câu cuối → "Xem kết quả"
- [ ] Thoát bài → về danh sách phù hợp

### Result
- [ ] Số đúng/tổng hiển thị chính xác
- [ ] Phần trăm tính đúng
- [ ] Nhận xét phù hợp (Xuất sắc/Khá tốt/Cần ôn thêm)
- [ ] Danh sách câu sai hiển thị đúng
- [ ] "Làm lại" → quiz lại cùng bài
- [ ] "Ôn phần sai" → quiz chỉ câu sai
- [ ] "Về danh sách" → lessons hoặc exams
- [ ] Đề ôn thi → ghi "Kết quả đề ôn thi"

### Theme
- [ ] Nút toggle chuyển light ↔ dark
- [ ] Tất cả elements hiển thị đúng ở cả 2 mode
- [ ] Refresh trang → giữ theme đã chọn

### Responsive
- [ ] 375px (iPhone SE): không horizontal scroll, nút bấm được
- [ ] 768px (tablet): layout OK
- [ ] 1024px+: content centered, max-width 480px

### Accessibility
- [ ] Tab navigation hoạt động
- [ ] Focus visible trên keyboard nav
- [ ] aria-label trên icon buttons
- [ ] Text contrast đủ 4.5:1

## 6. Regression Risk Areas
- Quiz engine: thay đổi render logic có thể break event binding
- CSS theme: thêm style mới có thể conflict với dark mode
- Data: thêm câu hỏi có thể có format sai

## 7. Release Verification
- Smoke checks: Mở trang, bấm qua 6 màn hình, làm 1 bài quiz
- Data checks: Verify số topics/lessons/exams/questions đúng
- Rollback confidence: Revert commit trên GitHub
