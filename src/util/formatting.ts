import { DateTime } from "luxon";
import { AdminPanelLocale } from "../models/locale";

export const shortDate = (date: DateTime): string => {
  return date.toFormat("dd.MM.yyyy");
};

export const longDateTime = (date: DateTime): string => {
  return date.toFormat("dd.MM.yyyy HH:mm");
};

const locale = process.env.REACT_APP_LOCALE as AdminPanelLocale;
const numberFormatLocale =
  locale === AdminPanelLocale.NO ? "nb-NO" : locale === AdminPanelLocale.SV ? "sv-SE" : "en-US";

export const thousandize = (number: number | null | undefined) =>
  number !== null && number !== undefined
    ? Intl.NumberFormat(numberFormatLocale).format(number)
    : "-";
