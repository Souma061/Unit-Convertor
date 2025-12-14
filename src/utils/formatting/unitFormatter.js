export function formatUnit(unit, style = "symbol") {
  if (style === "symbol") return unit.symbol;
  if (style === "name") return unit.name;

  return unit.symbol;
}


export function getCurrencySymbol(code) {
  const symbolMap = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    INR: "₹",
    JPY: "¥",
    CNY: "¥",
    KRW: "₩",
    RUB: "₽",
    AUD: "A$",
    CAD: "C$",
    NZD: "NZ$",
    SGD: "S$",
    HKD: "HK$",
    MXN: "Mex$",
    BRL: "R$",
    ZAR: "R",
    CHF: "CHF",
    SEK: "kr",
    NOK: "kr",
    DKK: "kr",
    PLN: "zł",
    TRY: "₺",
    THB: "฿",
    IDR: "Rp",
    PHP: "₱",
    MYR: "RM",
    VND: "₫",
    AED: "د.إ",
    SAR: "﷼",
    EGP: "£",
    NGN: "₦",
    KES: "KSh"
  };

  return symbolMap[code] || code;
}


