# Bilingual Development Standard

This document explains how to write code, documentation, UI text, prompts, and errors for the Stan Kout AI Career OS in a clean English-Vietnamese workflow.

## 1. Purpose

The project needs to be understandable by AI coding agents and software tools while still serving Vietnamese-English users. The standard is simple:

- Internal technical work uses English.
- User-facing product experience may use Vietnamese or bilingual Vietnamese-English.
- Domain explanations for Vietnamese users should prefer Vietnamese.

## 2. English Vs Vietnamese Usage Rules

Use English for:

- File names
- Folder names
- Function names
- Variable names
- Type names
- API route names
- Database columns
- Internal comments
- Test names
- Branch names
- Commit messages
- Technical architecture docs

Use Vietnamese or bilingual text for:

- UI labels
- Help text
- Client reports
- Consultation explanations
- Real estate study notes
- Glossaries
- Prompt outputs for Vietnamese users
- Feng Shui, Bazi, I Ching, Tu Vi, and symbolic interpretation content

## 3. Naming Conventions

Good code names:

```ts
const birthDate = userInput.birthDate;
const fiveElementsDistribution = calculateFiveElements(chart);
const propertyFacingDirection = analyzeFacingDirection(compassReading);
```

Bad code names:

```ts
const ngaySinh = userInput.ngaySinh;
const nguHanh = tinhNguHanh(chart);
const huongNha = phanTichHuongNha(compassReading);
```

Reason: English identifiers are easier for TypeScript tools, AI agents, future collaborators, and third-party libraries. Vietnamese belongs in UI copy, education content, reports, and prompt outputs.

## 4. UI Label Examples

Vietnamese labels:

```ts
export const viLabels = {
  birthDate: "Ngày sinh",
  birthTime: "Giờ sinh",
  timezone: "Múi giờ",
  calculateChart: "Tính lá số",
  fiveElements: "Ngũ Hành",
  propertyDirection: "Hướng nhà",
};
```

Bilingual labels:

```ts
export const bilingualLabels = {
  birthDate: "Ngày sinh / Birth Date",
  birthTime: "Giờ sinh / Birth Time",
  timezone: "Múi giờ / Timezone",
  calculateChart: "Tính lá số / Calculate Chart",
};
```

Avoid hardcoding repeated labels directly inside components once a localization structure exists. Put labels in locale files such as `lib/i18n/locales/vi.ts` and `lib/i18n/locales/en.ts`.

## 5. Prompt Output Examples

Reusable prompt language rule:

```md
Output language:
- Use Vietnamese as the primary language.
- Keep technical terms in English when they are industry-standard.
- For real estate terms, show English first and Vietnamese explanation in parentheses.
- For metaphysical terms, use Vietnamese first and English explanation when helpful.
```

For Vietnamese users, explanations should be clear, practical, and not overloaded with English unless the English term is important for learning.

## 6. Real Estate Glossary Format

Use English first, then Vietnamese explanation:

```text
Promissory Note (giấy hứa trả nợ): tài liệu trong đó borrower cam kết trả khoản vay cho lender.
Security Instrument (văn bản bảo đảm): tài liệu dùng property làm collateral cho loan.
Earnest Money (tiền đặt cọc thiện chí): khoản tiền buyer đặt để thể hiện ý định mua nghiêm túc.
```

For legal, lending, tax, brokerage, or compliance topics, include a verification reminder when the output could affect a real transaction.

## 7. Symbolic Domain Output Format

For Feng Shui, Bazi, I Ching, Tu Vi, and related symbolic systems, always separate:

1. Observable facts
2. Calculated data
3. Symbolic interpretation
4. Practical recommendation
5. Confidence / uncertainty

Example:

```text
1. Dữ kiện quan sát:
- Cửa chính nằm bên trái ảnh.
- Phòng có nhiều vật chắn gần lối đi.

2. Dữ liệu tính toán:
- Hướng nhà được nhập là Đông Nam.
- Múi giờ dùng cho tính toán là America/New_York.

3. Luận theo biểu tượng:
- Lối đi bị nghẽn có thể tượng trưng cho khí khó lưu thông.
- Đây là diễn giải biểu tượng, không phải kết luận tuyệt đối.

4. Gợi ý thực tế:
- Dọn lối đi.
- Giữ khu vực cửa chính sáng, sạch, dễ mở.

5. Độ tin cậy:
- Trung bình, vì chưa có bản vẽ mặt bằng đầy đủ.
```

## 8. Error Message Rules

User-facing errors should be short, clear, and actionable.

Good:

```ts
"Thiếu giờ sinh. Vui lòng nhập giờ sinh để tiếp tục."
```

Acceptable bilingual version:

```ts
"Thiếu giờ sinh / Missing birth time. Vui lòng nhập giờ sinh để tiếp tục."
```

Technical logs can stay English:

```ts
logger.error("Missing birthTime in Bazi calculation request", { requestId });
```

Do not expose secrets, stack traces, API keys, database URLs, or private client data in user-facing errors.

## 9. Testing Expectations

If localization files are created, add tests or a documented test plan for:

- Vietnamese locale exports correctly.
- English locale exports correctly.
- Default locale falls back to Vietnamese.
- Required common labels are not missing.
- User-facing error messages do not expose technical secrets.

If the repo has no test framework yet, document the test plan instead of claiming tests passed.

## 10. Common Mistakes To Avoid

- Do not rename existing English code identifiers to Vietnamese.
- Do not translate package names, API names, framework terms, or environment variable names.
- Do not mix Vietnamese and English randomly inside internal code.
- Do not hardcode repeated UI text across many components when localization files are available.
- Do not put real secrets in prompts, docs, or `.env.example`.
- Do not present metaphysical interpretation as guaranteed fact.
- Do not claim tests passed unless commands actually ran.

## Recommended Next.js Localization Structure

Use this structure after a Next.js app exists:

```text
lib/i18n/
├── index.ts
└── locales/
    ├── vi.ts
    └── en.ts
```

Example `index.ts`:

```ts
import { en } from "./locales/en";
import { vi } from "./locales/vi";

export const locales = {
  vi,
  en,
};

export type Locale = keyof typeof locales;

export function getLocale(locale: Locale = "vi") {
  return locales[locale] ?? locales.vi;
}
```

