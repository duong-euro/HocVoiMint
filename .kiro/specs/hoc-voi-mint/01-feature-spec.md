# Feature Spec

## 1. Summary
- Feature name: Học Với Mint — Ôn tập Toán lớp 3
- Feature slug: hoc-voi-mint
- Owner: duong-euro
- Status: In Progress
- Last updated: 2026-05-01

## 2. Background
Phụ huynh Việt Nam cần công cụ cho con lớp 3 ôn tập Toán trên điện thoại. Lấy cảm hứng từ VUIHOC — bám sát SGK, có luyện tập, chấm điểm, hệ thống kiến thức trọng tâm và đề ôn tập học kỳ. App phải cực kỳ đơn giản vì người dùng chính là trẻ 8-9 tuổi.

## 3. Goals
- G-1: Trẻ lớp 3 có thể tự ôn tập Toán theo chủ đề mà không cần hướng dẫn phức tạp
- G-2: Phủ các mảng kiến thức trọng tâm Toán lớp 3 (số, phép tính, nhân chia, hình học, đo lường, toán lời văn)
- G-3: Có đề ôn thi học kỳ 1 và học kỳ 2 với chấm điểm tức thì
- G-4: Giao diện thân thiện trẻ em, chữ to, nút to, thao tác ít

## 4. Non-Goals (explicit)
- NG-1: Không phủ 100% chương trình Toán lớp 3 — chỉ cần cấu trúc mở rộng tốt
- NG-2: Không làm dashboard phức tạp kiểu admin
- NG-3: Không cần đăng nhập hoặc lưu tiến độ lâu dài
- NG-4: Không cần backend hoặc database
- NG-5: Không cần gamification (huy hiệu, streak)

## 5. Users / Actors
### Primary User
- Who: Học sinh lớp 3 (8-9 tuổi)
- Context: Dùng điện thoại của phụ huynh, thường vào buổi tối hoặc cuối tuần
- Desired outcome: Ôn tập Toán vui vẻ, hiểu bài, làm đúng nhiều câu

### Secondary User
- Who: Phụ huynh
- Context: Mở app cho con, đôi khi xem kết quả
- Desired outcome: Con ôn tập hiệu quả, không cần hướng dẫn nhiều

## 6. User Flows
### Flow A: Ôn theo chủ đề
1. Mở app → Home screen
2. Bấm "Ôn theo chủ đề" → Topic List
3. Chọn 1 chủ đề → Lesson List
4. Chọn 1 bài → Quiz Screen
5. Làm từng câu: chọn đáp án / nhập số → Bấm "Kiểm tra"
6. Xem feedback đúng/sai + giải thích → Bấm "Câu tiếp theo"
7. Hoàn thành → Result Screen
8. Chọn: Làm lại / Ôn phần sai / Về danh sách

### Flow B: Làm đề ôn thi
1. Mở app → Home screen
2. Bấm "Ôn học kỳ 1" hoặc "Ôn học kỳ 2" → Exam List (filtered)
3. Chọn 1 đề → Quiz Screen
4. Làm bài tương tự Flow A
5. Kết quả ghi rõ "Kết quả đề ôn thi"

### Flow C: Dùng bottom navigation
1. Bấm tab "Chủ đề" → Topic List
2. Bấm tab "Đề thi" → Exam List (tất cả)
3. Bấm tab "Trang chủ" → Home

## 7. Functional Requirements
### Navigation
- FR-1: App có 6 màn hình: Home, Topic List, Lesson List, Quiz, Result, Exam List
- FR-2: Điều hướng bằng JS state, không cần router framework
- FR-3: Có nút back rõ ràng ở các màn hình con
- FR-4: Có bottom navigation 3 tab: Trang chủ, Chủ đề, Đề thi

### Home Screen
- FR-5: Header có logo + nút đổi theme
- FR-6: Lời chào ngắn với mascot
- FR-7: 3 nút lớn: Ôn theo chủ đề, Ôn HK1, Ôn HK2
- FR-8: Section "Thành tích hôm nay" (session stats)
- FR-9: Section "Bài nên học tiếp" (3 gợi ý)

### Topic & Lesson
- FR-10: 6 chủ đề dạng card lớn với icon, mô tả, số bài, badge HK
- FR-11: Mỗi bài có tiêu đề, độ khó (Dễ/Vừa/Nâng cao), số câu, nút Bắt đầu

### Quiz
- FR-12: Hiển thị từng câu một với thanh tiến độ
- FR-13: Hỗ trợ 2 loại: multiple_choice (4 đáp án) và input_number
- FR-14: Sau kiểm tra: hiển thị đúng/sai + giải thích, không tự chuyển câu
- FR-15: Có nút: Kiểm tra, Câu tiếp theo, Thoát bài

### Result
- FR-16: Hiển thị số đúng/tổng, phần trăm, nhận xét
- FR-17: Danh sách câu sai với đáp án đúng và giải thích
- FR-18: 3 nút: Làm lại, Ôn phần sai, Về danh sách
- FR-19: Đề ôn thi ghi rõ "Kết quả đề ôn thi"

### Theme
- FR-20: Light mode và dark mode, có nút chuyển
- FR-21: Lưu preference vào localStorage (graceful fallback)

### Data
- FR-22: Dữ liệu mẫu trong JS: 6 chủ đề, 12 bài, 6 đề, mỗi bài 5-8 câu
- FR-23: Câu hỏi Toán lớp 3 thực tế

## 8. Non-Functional Requirements
- NFR-1: Performance — Load dưới 2s trên 3G, không có API call
- NFR-2: Accessibility — Touch target 44px+, focus-visible, prefers-reduced-motion, aria-label
- NFR-3: Responsive — Hoạt động tốt ở 375px, 768px, 1024px, 1440px
- NFR-4: Maintainability — Dữ liệu tách riêng file, dễ thêm câu hỏi/chủ đề

## 9. Edge Cases
- EC-1: Người dùng bấm Kiểm tra khi chưa chọn đáp án → Không làm gì
- EC-2: Người dùng bấm Kiểm tra khi input rỗng → Không làm gì
- EC-3: Người dùng thoát giữa bài → Quay về danh sách, không lưu tiến độ
- EC-4: localStorage không khả dụng → Theme mặc định light, không crash
- EC-5: Tất cả câu đúng → Result hiển thị "Xuất sắc!", không có section câu sai

## 10. Dependencies
- Runtime: Trình duyệt hiện đại (Chrome, Safari, Firefox)
- Framework: Không (vanilla JS)
- External: Google Fonts (Nunito)

## 11. Risks and Assumptions
### Risks
| Risk | Severity | Mitigation |
|------|----------|------------|
| Font không hỗ trợ tiếng Việt | High | Đã test, chọn Nunito |
| Nội dung câu hỏi sai kiến thức | Medium | Review thủ công, cấu trúc dễ sửa |
| Trẻ không biết thao tác | Medium | Nút to, chữ to, flow đơn giản |

### Assumptions
- A-1: Trẻ dùng điện thoại của phụ huynh, có internet để load font
- A-2: Phụ huynh có thể hướng dẫn ban đầu
- A-3: Nội dung Toán lớp 3 tương đối ổn định qua các năm

## 12. Success Metrics
- SM-1: Trẻ có thể tự hoàn thành 1 bài quiz mà không cần hỗ trợ
- SM-2: App load và hoạt động mượt trên điện thoại phổ thông
- SM-3: Tất cả câu hỏi có đáp án đúng và giải thích hợp lý
