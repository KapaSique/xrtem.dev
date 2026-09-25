import type { Metadata } from "next";
import { ProfcosmeticCase } from "./ProfcosmeticCase";

export const metadata: Metadata = {
  title: "Profcosmetic — внутренняя система и дизайн-концепт",
  description: "Кейс Profcosmetic: дизайн-концепт, аналитика для владельца и интеграция с 1С.",
};

export default function Page() {
  return <ProfcosmeticCase />;
}
