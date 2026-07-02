import { getRequestConfig } from "next-intl/server";

const locales = ["de", "en", "ru", "uk"];

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = locales.includes(requested ?? "") ? requested! : "de";

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
