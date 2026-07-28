import {readFile} from "node:fs/promises";
import {describe,expect,it} from "vitest";

describe("post-QA visual contracts",()=>{
 it("defines one canonical public composition grid",async()=>{const css=await readFile("src/app/globals.css","utf8");for(const token of ["--page-max","--page-gutter","--content-max","--wide-max","--reading-max"])expect(css).toContain(token)});
 it("keeps the SPACE circuit responsive without horizontal overflow semantics",async()=>{const css=await readFile("src/app/globals.css","utf8");expect(css).toContain(".space-pathway-circuit");expect(css).toContain("overflow-wrap:anywhere");expect(css.indexOf("@media(max-width:1100px){.space-pathway-circuit")).toBeGreaterThan(-1)});
});
