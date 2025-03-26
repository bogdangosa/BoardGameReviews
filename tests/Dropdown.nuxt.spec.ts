// tests/components/SomeComponents.nuxt.spec.ts
import { mountSuspended } from "@nuxt/test-utils/runtime";
import { Dropdown } from "#components";
// @vitest-environment nuxt
import { test, expect } from "vitest";

test("can mount dropdown component", async () => {
  const component = await mountSuspended(Dropdown);
  expect(component.html()).toContain("option");
});

test("can select option", async () => {
  const component = await mountSuspended(Dropdown);
  await component.find("option").trigger("click");
  expect(component.html()).toContain("selected");
});
