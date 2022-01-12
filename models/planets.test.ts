import { assertEquals, assertNotEquals  } from "https://deno.land/std/testing/asserts.ts";

Deno.test("example", ()=>{
  assertEquals("deno", "deno")
});

Deno.test({
  name: "example 2",
  fn(){
    assertNotEquals("deno", "node")
  }
})

Deno.test({
  name: "example 3",
  sanitizeOps: false,
  fn(){
    setTimeout(console.log, 10000);
  }
})