# Workflow Guide

Hướng dẫn chi tiết quy trình spec-driven development sử dụng bộ DTax iProject Pack.

## Tổng quan quy trình

Quy trình gồm 8 bước, chia thành 3 giai đoạn:

### Giai đoạn 1: Discovery (trước khi viết spec)
1. Research — tìm hiểu vấn đề và giải pháp
2. Repo Audit — phân tích codebase hiện tại

### Giai đoạn 2: Specification (viết và review spec)
3. Spec Draft — viết 10 file spec
4. Spec Review — Codex review spec
5. Scoring — chấm điểm spec

### Giai đoạn 3: Implementation (build và review code)
6. Implementation — implement theo milestone
7. PR Review — review code vs spec
8. Regression Check — kiểm tra regression

## Bước 1: Research

### Mục đích
Hiểu rõ vấn đề trước khi thiết kế giải pháp.

### Khi nào cần Research vs khi nào bỏ qua

**Cần Research đầy đủ khi:**
- User chỉ có ý tưởng sơ bộ (1-2 câu)
- Chưa rõ giải pháp kỹ thuật
- Cần so sánh các approach

**Chuyển thành Validation khi:**
- User đã cung cấp đặc tả chi tiết (màn hình, UX, tech stack)
- Đã có bối cảnh pháp lý/business rõ ràng
- Đã có scope MVP cụ thể

Khi chuyển thành Validation:
1. Đọc kỹ đặc tả của user
2. Kiểm tra tính nhất quán (không mâu thuẫn nội bộ)
3. Kiểm tra tính khả thi kỹ thuật (stack phù hợp constraints)
4. Liệt kê open questions (nếu có)
5. Lưu vào `artifacts/research-summary.md` với ghi chú "Tổng hợp từ đặc tả user"

**KHÔNG được tự ý thay đổi scope** so với đặc tả user. Nếu thấy scope quá lớn hoặc có vấn đề, hỏi user trước.

### Công cụ
Perplexity, Kiro, hoặc bất kỳ tool nghiên cứu nào.

### Cách làm
1. Mở `prompts/01-research.md`
2. Điền feature idea, target user, constraints
3. Chạy prompt
4. Lưu kết quả vào `artifacts/research-summary.md`

### Output mong đợi
- Mô tả vấn đề rõ ràng
- 2-3 giải pháp kỹ thuật với trade-offs
- Recommended approach
- Danh sách open questions

### Checkpoint
Đọc lại research summary. Nếu vấn đề chưa rõ hoặc giải pháp chưa thuyết phục, lặp lại bước này.

## Bước 2: Repo Audit

### Mục đích
Hiểu codebase hiện tại để spec không mâu thuẫn với thực tế.

### Công cụ
Codex hoặc bất kỳ tool có thể đọc code.

### Cách làm
1. Mở `prompts/02-repo-audit-codex.md`
2. Điền feature name, summary, constraints
3. Cho Codex truy cập repo
4. Chạy prompt
5. Lưu kết quả vào `artifacts/repo-audit.md`

### Đối với dự án greenfield
Nếu chưa có code, bỏ qua bước này hoặc chuyển thành "Stack Validation" — xác nhận stack đã chọn phù hợp với constraints.

### Output mong đợi
- Danh sách modules bị ảnh hưởng
- Patterns cần tái sử dụng
- Technical debt liên quan
- Implementation boundaries

### Checkpoint
Xác nhận rằng spec sẽ không yêu cầu thay đổi kiến trúc lớn mà chưa được tính đến.

## Bước 3: Spec Draft

### Mục đích
Viết bộ spec hoàn chỉnh 10 files.

### Công cụ
Kiro.

### Cách làm
1. Copy templates: `cp -r .kiro/specs/_templates/ .kiro/specs/{feature-slug}/`
2. Tạo `artifacts/` directory
3. Mở `prompts/03-spec-draft-kiro.md`
4. Điền feature info, paste research summary và repo audit
5. Chạy prompt
6. Review từng file output

### 10 files cần tạo

| File | Nội dung chính |
|------|---------------|
| `00-overview.md` | Objective, constraints, risks, deferred scope |
| `01-feature-spec.md` | Goals, non-goals, user flows, FRs, edge cases, success metrics |
| `02-technical-spec.md` | Architecture, data model, state machine, routes, APIs, adapters |
| `03-execution-plan.md` | Milestones, sequencing, risks, shipping criteria |
| `04-task-list.md` | Tasks grouped by milestone with subtasks and done criteria |
| `05-decision-log.md` | Key decisions with options and rationale |
| `06-test-plan.md` | Unit tests, integration tests, manual QA checklist |
| `07-rollout-plan.md` | Setup, preconditions, rollback plan |
| `08-open-questions.md` | Resolved and still-open questions |
| `09-codex-review.md` | Review metadata and checklist (findings filled later) |

### Tiêu chí chất lượng
- Mọi functional requirement phải testable
- Mọi API endpoint phải có request/response/error shapes
- Data model phải đủ cụ thể để copy vào schema file
- Task list phải đủ cụ thể để developer bắt đầu mà không cần hỏi thêm
- Deferred items phải được liệt kê rõ ràng

### Checkpoint
Đọc lại toàn bộ spec. Kiểm tra cross-references giữa các files bằng `codex-review-checklist.md`.

## Bước 4: Spec Review

### Mục đích
Phát hiện lỗi, thiếu sót, và mâu thuẫn trong spec trước khi implement.

### Hai cách thực hiện

#### Cách 1: Review bằng Codex (khuyến nghị)
1. Mở `prompts/04-spec-review-codex.md`
2. Mở Codex (hoặc tool review AI bên ngoài)
3. Cung cấp tất cả spec files cho Codex
4. Cung cấp baseline scope và constraints
5. Chạy prompt
6. Ghi findings vào `09-codex-review.md`

#### Cách 2: Self-review bằng Kiro
Nếu không dùng Codex, yêu cầu Kiro tự review:
1. Nói: "Tự review spec theo prompts/04-spec-review-codex.md"
2. Kiro sẽ đọc tất cả spec files và đối chiếu với checklist
3. Ghi findings vào `09-codex-review.md`

**Lưu ý:** Self-review có hạn chế (người viết = người review). Nên dùng Codex cho production spec.

### Phân loại findings
- **Critical** — blocking, phải sửa trước khi implement
- **High** — nên sửa trước khi implement
- **Medium** — sửa trong quá trình implement
- **Low** — nice to have

### Checkpoint
Tất cả Critical và High findings phải được resolve. Cập nhật spec files nếu cần.

## Bước 5: Scoring

### Mục đích
Đánh giá chất lượng spec bằng rubric khách quan.

### Công cụ
`docs/spec-evaluation-framework.md`.

### Cách làm
1. Mở evaluation framework
2. Chấm điểm từng mục (0-5):
   - A. Problem Framing
   - B. Scope Discipline
   - C. Domain Completeness
   - D. Technical Realism
   - E. Execution Readiness
   - F. Reviewability
   - G. Change Resilience
3. Ghi điểm vào `09-codex-review.md` (phần Evaluation Scores)
4. Chạy stress tests từ evaluation framework

### Ngưỡng chấp nhận
- Tổng >= 30/35
- Không mục core nào dưới 4 (Problem Framing, Scope Discipline, Technical Realism, Execution Readiness)

### Nếu không đạt
Quay lại Bước 3 (Spec Draft) để cải thiện các mục yếu. Ghi lại lý do và thay đổi trong decision log.

## Bước 6: Implementation

### Mục đích
Build code theo spec, milestone by milestone.

### Công cụ
Kiro.

### Cách làm
1. Mở `prompts/05-implementation-kiro.md`
2. Chỉ định milestone hiện tại
3. Liệt kê tasks từ `04-task-list.md`
4. Chạy prompt
5. Verify done criteria cho từng task
6. Chạy tests từ `06-test-plan.md`
7. Check off tasks trong task list

### Quy tắc
- Implement đúng theo spec, không thêm bớt
- Nếu cần thay đổi spec, cập nhật spec trước rồi mới implement
- Ghi mọi deviation vào decision log
- Không chuyển sang milestone tiếp cho đến khi milestone hiện tại pass done gate

### Checkpoint sau mỗi milestone
Sau khi hoàn thành mỗi milestone, cập nhật các file spec sau:
1. `04-task-list.md` — check off `[x]` tất cả tasks đã hoàn thành trong milestone
2. `03-execution-plan.md` — check off validation gate của milestone vừa hoàn thành
3. `00-overview.md` — cập nhật status (In Progress khi bắt đầu M1, Done khi hoàn thành M cuối)
4. `07-rollout-plan.md` — check off preconditions đã đạt được
5. `09-codex-review.md` — ghi findings mới phát hiện trong quá trình implement
6. `05-decision-log.md` — ghi bất kỳ decision mới nào phát sinh

Không chuyển sang milestone tiếp cho đến khi các file trên đã được cập nhật.

## Bước 7: PR Review

### Mục đích
Verify code khớp với spec.

### Công cụ
Codex.

### Cách làm
1. Mở `prompts/06-pr-review-codex.md`
2. Cung cấp diff và spec references
3. Chạy prompt
4. Resolve findings trước khi merge

## Bước 8: Regression Check

### Mục đích
Đảm bảo thay đổi không phá vỡ chức năng hiện có.

### Công cụ
Codex.

### Cách làm
1. Mở `prompts/07-regression-check-codex.md`
2. Cung cấp diff và regression risk areas từ test plan
3. Chạy prompt
4. Resolve bất kỳ regression risk nào được phát hiện

## Mẹo sử dụng

### Khi nào cần lặp lại bước
- Research chưa rõ vấn đề → lặp lại Research
- Spec review phát hiện lỗi kiến trúc → quay lại Spec Draft
- Scoring dưới 30 → cải thiện spec rồi score lại
- Implementation phát hiện spec thiếu → cập nhật spec, ghi decision log

### Khi nào bỏ qua bước
- Dự án greenfield → bỏ Repo Audit hoặc chuyển thành Stack Validation
- Feature nhỏ → có thể gộp Research + Spec Draft
- Không dùng benchmark → bỏ Scoring

### File nào quan trọng nhất
1. `02-technical-spec.md` — quyết định implementation có rõ ràng không
2. `04-task-list.md` — quyết định developer có bắt đầu được không
3. `06-test-plan.md` — quyết định chất lượng có đo được không

## UI/UX Design Intelligence

Bộ pack tích hợp sẵn **ui-ux-pro-max** skill. Khi cần thiết kế UI trong bước Implementation:

### Tạo design system trước khi code UI
```bash
python3 steering/ui-ux-pro-max/scripts/search.py "{product_type} {industry}" --design-system -p "ProjectName"
```

### Lưu design system để dùng lại
```bash
python3 steering/ui-ux-pro-max/scripts/search.py "{query}" --design-system --persist -p "ProjectName"
```

Tạo `design-system/MASTER.md` làm source of truth cho toàn bộ UI.

### Tạo override cho từng page
```bash
python3 steering/ui-ux-pro-max/scripts/search.py "{query}" --design-system --persist -p "ProjectName" --page "dashboard"
```

### Workflow tích hợp
1. Trước khi code UI → chạy `--design-system` để lấy recommendations
2. Lưu với `--persist` nếu dự án có nhiều pages
3. Khi code từng page → đọc `design-system/MASTER.md`, check page override
4. Trước khi deliver → chạy Pre-Delivery Checklist trong `ui-ux-guidelines.md`

Xem hướng dẫn đầy đủ tại `.kiro/steering/ui-ux-pro-max/SKILL.md`.
