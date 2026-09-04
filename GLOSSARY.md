# Bilingual glossary — EN → VI

The rule the case studies are authored against, so a new one starts consistent.

## Direction

Vietnamese is the primary reading language. Translate everything a person would
read on screen or say in a meeting. Keep in English only what lives in the
database or in a rule identifier.

## Stays English (identifiers — never translated)

- **State constants** in `SCREAMING_SNAKE_CASE`: `DRAFT`, `PENDING_REVIEW`,
  `NEED_INFO`, `PENDING_APPROVAL`, `APPROVED`, `WAITING_SIGNATURE`, `COMPLETED`,
  `WITHDRAWN`, `REJECTED`, `EXPIRED`, `SUBMITTED`, `ENROLLED`, `WAITLISTED`,
  `DROPPED`, `OFFERED`, `REMOVED`, `SELECTING`, `HELD`, `PENDING_PAYMENT`,
  `CONFIRMED`, `CANCELLED_BY_RENTER`, `CLOSED_BY_OWNER`, `NO_SHOW`.
  In a state-machine figure, gloss each once in a VI-only `<p class="dg-key">`.
- **Rule / artifact ids**: `BR-*`, `AC-*`, `TC-*`, `UC-*`, `US-*`, `CD-*`,
  `RF-*`, record ids like `DT-2026-0187`, course codes `L101` / `B215`.
- **Entity / field / table names**: `Order`, `OrderLine`, `res.groups`,
  `sla_due_at`, `workflow_version`, `idempotency_key`, ERD attribute lists.
- **Keywords**: Gherkin (`Given`/`When`/`Then`/`And`), SQL, logic operators
  (`AND`, `OR`, `UNION`, `ANY`, `ALL`), `×` on a gateway.
- **File names** in a wireframe (`quote.pdf`).
- **Named features** cited by that exact name in a rule: `Check Workflow`,
  `Save & Activate`, `Version Compare`, `Submit`, `Book`.
- **Acronyms**: BRD, SRS, FRD, ERD, BPMN, UAT, PBAC, SoD, SLA, TTL, RACI,
  FDD, SIS.

## Kept English + one first-use gloss

| Term | Gloss (once) |
|---|---|
| business rule | quy tắc nghiệp vụ |
| acceptance criteria | tiêu chí nghiệm thu |
| user story | — (kept) |
| wireframe | — (kept) |
| audit log / audit trail | ghi audit log |
| section (a class section) | (lớp học phần) |
| waiver | miễn tiên quyết |
| escalation | — (kept, never "leo thang") |
| actor | — (kept) |
| override | ghi đè |
| PBAC | phân quyền theo từng dự án |
| SoD | Separation of Duties — tách bạch trách nhiệm |
| TTL | thời hạn giữ chỗ |
| concurrency | tương tranh |

## Fixed Vietnamese renderings

| EN | VI |
|---|---|
| elicitation | khai thác yêu cầu |
| discovery (phase) | giai đoạn khảo sát |
| pain point | điểm nghẽn (never "điểm đau") |
| specification | đặc tả |
| settlement / reconciliation | đối soát |
| slot | khung giờ |
| price tier | bậc giá |
| traceability matrix | ma trận truy vết |
| registrar | phòng đào tạo |
| hold | giữ chỗ |
| co-led (a small team) | cùng phụ trách (never "đồng chủ trì") |
| flow | luồng |
| end to end | trọn vẹn (never "đầu-cuối") |

## Orthography

Use the `-oá` form: `khoá`, `hoá`, `huỷ` — not `khóa` / `hóa`. Straight
quotes, not curly.

## Register

`mình` on the personal homepage, `tôi` in the case-study documents. Keep every
VI heading no longer than its English sibling.
