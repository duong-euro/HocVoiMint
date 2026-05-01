# Open Questions

## Resolved

| ID | Question | Type | Resolution | Date Resolved |
|----|----------|------|------------|---------------|
| Q-01 | Dùng framework hay vanilla JS? | Eng | Vanilla JS — đơn giản, không build tool. See D-01. | 2026-05-01 |
| Q-02 | Font nào hỗ trợ tiếng Việt? | UX | Nunito — sau 3 lần thử (Comic Neue, Fredoka đều lỗi). See D-04. | 2026-05-01 |
| Q-03 | Có cần dark mode không? (design system khuyên avoid) | Product | Có — user yêu cầu rõ ràng, override design system. See D-08. | 2026-05-01 |
| Q-04 | Single file hay multi-file? | Eng | Multi-file — single file quá lớn, tool gặp lỗi ghi. See D-07. | 2026-05-01 |
| Q-05 | Tên app là gì? | Product | "Học Với Mint" — theo yêu cầu user. See D-09. | 2026-05-01 |
| Q-06 | Bảng màu nào? | UX | Blue primary (#3B82F6) + warm background (#FEF7ED). See D-06. | 2026-05-01 |

## Still Open (non-blocking)

| ID | Question | Type | Blocking? | Owner | Notes |
|----|----------|------|-----------|-------|-------|
| Q-07 | Có cần lưu tiến độ lâu dài không? | Product | No | duong-euro | Hiện chỉ session stats. Có thể thêm localStorage hoặc backend sau |
| Q-08 | Có cần thêm loại câu hỏi mới? | Product | No | duong-euro | Hiện có MC + input_number. Có thể thêm drag-drop, matching, etc. |
| Q-09 | Có cần gamification? | Product | No | duong-euro | Huy hiệu, streak, leaderboard — deferred |
| Q-10 | Nội dung Toán đã chính xác 100% chưa? | Content | No | duong-euro | Cần review bởi người có kiến thức Toán lớp 3 |
| Q-11 | Có cần PWA / offline mode? | Eng | No | duong-euro | Hiện cần internet cho Google Fonts |

## Notes
- Resolved questions should reference the corresponding decision in the decision log
- New questions should be added here as they arise during implementation
