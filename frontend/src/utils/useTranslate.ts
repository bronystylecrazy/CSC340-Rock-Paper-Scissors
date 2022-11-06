import ThaiPack from "../locales/th.json";

export const useTranslate = (pack: "th" | "en") => {
  const resources = {
    th: ThaiPack,
  };
  return (key: string) => {
    return ((resources as any)[pack] as any)[key] || key;
  };
};
