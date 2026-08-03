# AC Living Visual Engine 3.0

## Mục đích

Living Visual Engine biến hệ thống art direction hiện có thành một lớp hình ảnh sống, có thể điều khiển từ AC / Studio mà không thay đổi business architecture. Engine không tạo nội dung, credential, media hay service mới. CONDITION vẫn chịu service gating hiện tại.

Nguyên tắc cốt lõi:

- Chuyển động phải hỗ trợ phân cấp thông tin, không cạnh tranh với nội dung.
- Auto Contrast luôn có quyền ưu tiên đối với khả năng đọc.
- Public render chỉ đọc Published. Full-page Studio preview có thể đọc Working Draft trong development.
- Global → Page → Locale → Section vẫn là thứ tự inheritance duy nhất.
- Mọi giá trị được Zod giới hạn; Studio không nhận CSS, URL, class hay script tùy ý.

## Kiến trúc

Engine mở rộng `VisualSettings` bằng bốn nhóm semantic:

1. `motion`: trạng thái, theme, intensity, speed, parallax và hover energy.
2. `ambient`: glow field, drift, node network, noise và line sweep.
3. `grid`: architectural/market/spatial/editorial/HUD grid, scan và radar.
4. `transition`: editorial/depth/scan/spatial section transition và light pass.

`surface` có thêm depth, edge glow, hover lift và response. `textEffects` có thêm motion treatment, motion speed và reveal. Những field mới đều có default để cấu hình Visual Director V1 cũ được migrate khi parse, không cần chỉnh file dữ liệu thủ công.

Renderer gồm:

- `LivingVisualEnvironment`: markup trang trí `aria-hidden`, không tham gia layout hoặc pointer input.
- `living-visual-engine.css`: các primitive dùng CSS transform/opacity, media query responsive, reduced-motion và print fallback.
- `VisualPageScope`: cấp CSS variables và `data-visual-*` attributes từ cấu hình đã resolve.
- `VisualPreviewBridge`: tiếp tục cập nhật Working Draft qua same-origin `postMessage`; không đổi public Published state.

## Motion tokens và giới hạn an toàn

| Nhóm | Khoảng an toàn | Ý nghĩa |
| --- | --- | --- |
| Motion intensity | 0–100 | Mức hiện diện tổng thể; profile mặc định dùng 18–38. |
| Motion speed | 0.5–2 | Hệ số tốc độ, không cho tốc độ cực đoan. |
| Parallax strength | 0–24px | Biên độ chiều sâu nhỏ, không làm thay đổi layout. |
| Ambient drift | 12–120s | Chuyển động nền chậm. |
| Grid opacity | 0–35% | Tránh grid lấn nội dung. |
| Node density | 0–12 | Giới hạn số điểm trang trí. |
| Scan speed | 4–30s | Scan có nhịp chậm và opacity thấp. |
| Transition duration | 0.2–1.5s | Không cho transition kéo dài gây cản trở. |
| Transition distance | 0–48px | Chuyển động ngắn, không gây “bay” layout. |
| Text motion | 4–40s | Chỉ dịch chuyển paint layer, không đổi nội dung. |

## Preset library

- `cinematic-calm`: chuyển động rất chậm, ít node, phù hợp About hoặc nội dung cần tập trung.
- `property-intelligence`: profile master-brand cho Homepage.
- `market-network`: nhịp ngang, market grid và node context cho DEAL.
- `spatial-field`: field, orientation grid và radar nhẹ cho SPACE.
- `editorial-archive`: column grid, motion thấp cho Search, Articles, Guides và Videos.
- `hud-minimal`: report-like, ít ambient; được chuẩn bị cho CONDITION nhưng không kích hoạt service công khai.
- `motion-off`: tắt motion, ambient, grid và transition ở scope đã chọn.

Các preset cũ (`editorial-clear`, `cyber-glass`, `immersive-backdrop`, `high-contrast`, `service-default`) vẫn được giữ.

## Page themes mặc định

- Homepage: `property-intelligence` — architectural grid, data node nhẹ, horizontal scan rất mờ.
- DEAL: `market-network` — bố cục chuyển động ngang, brass signal, context network.
- SPACE: `spatial-field` — layered grid, directional scan và radar nhẹ.
- About: `calm` — chuyển động chậm, không node network.
- Search / Articles / Guides / Videos: `editorial-archive` — column grid và transition ngắn.
- CONDITION: `hud-minimal` chỉ tồn tại trong hệ thống nội bộ/preview; service gating không thay đổi.

## Text FX

Text motion là phần mở rộng của semantic target hiện có (`heading`, `body`, `eyebrow`, `cta`, `muted`, `accent`). Các treatment:

- `gradient-drift`
- `light-sweep`
- `soft-pulse`
- `signal-flicker`
- `none`

Text FX không được ghi đè `autoContrast`. Motion preset chỉ điều khiển paint, opacity hoặc filter ở mức nhẹ.

## Accessibility và performance

- Environment là `aria-hidden="true"` và `pointer-events:none`.
- `prefers-reduced-motion: reduce` tắt animation, scan và light pass.
- Print tắt toàn bộ environment.
- Chuyển động liên tục ưu tiên `transform` và `opacity`; không dùng timer loop hay React re-render.
- Section reveal dùng CSS view timeline như progressive enhancement. Browser không hỗ trợ vẫn render nội dung đầy đủ.
- Mobile giảm radar, node và hover lift; không tạo horizontal overflow.
- Story Backdrop scroll-pan, media fit và Auto Contrast không bị thay thế.

## Quy trình owner trong Visual Director

1. Chọn Page, Override scope và Section.
2. Chọn một composition preset hoặc điều chỉnh nhóm Living Motion, Ambient Field, Grid / HUD, Section Transitions, Surface Depth và Text Motion.
3. Xem Composition preview để kiểm tra token nhanh.
4. Xem Full Page để kiểm tra đúng route/locale bằng Working Draft.
5. `Save Draft` chỉ lưu draft.
6. `Publish` mới cập nhật public renderer.
7. Dùng `motion-off` hoặc tắt `Motion enabled` khi một scope không cần chuyển động.

## QA checklist

- EN/VI parity và `html lang` đúng.
- Public không đọc Draft; preview không ghi vào Published.
- CONDITION không xuất hiện trong public navigation hoặc search.
- Keyboard/focus/CTA không bị overlay chặn.
- Reduced motion không còn animation liên tục.
- Auto Contrast giữ text đọc được trên Story Backdrop và surface.
- Không horizontal overflow ở 390px.
- Không lỗi console/hydration.
- Lint, typecheck, test, production build và `git diff --check` đều pass trước checkpoint.
