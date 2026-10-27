const engToBnMap: Record<string, string> = {
  "0": "০", "1": "১", "2": "২", "3": "৩", "4": "৪",
  "5": "৫", "6": "৬", "7": "৭", "8": "৮", "9": "৯",
};

const bnToEngMap: Record<string, string> = {
  "০": "0", "১": "1", "২": "2", "৩": "3", "৪": "4",
  "৫": "5", "৬": "6", "৭": "7", "৮": "8", "৯": "9",
};

export function toBanglaNumber(value: number | string, formatComma = true): string {
  if (value === undefined || value === null) return "০";
  const numStr = formatComma && !isNaN(Number(value))
    ? Number(value).toLocaleString("en-IN")
    : String(value);

  return numStr.replace(/[0-9]/g, (digit) => engToBnMap[digit] || digit);
}

export function parseBanglaNumber(value: number | string): number {
  if (typeof value === "number") return value;
  if (!value) return 0;
  const englishStr = String(value)
    .replace(/[০-৯]/g, (digit) => bnToEngMap[digit] || digit)
    .replace(/[^0-9.-]+/g, "");
  return parseFloat(englishStr) || 0;
}

export function getTodayBanglaDate(): string {
  try {
    return new Intl.DateTimeFormat("bn-BD", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date());
  } catch {
    return "সোমবার, ২৬ অক্টোবর ২০২৬";
  }
}

export function formatUnitBangla(unit: string, unitBn?: string): string {
  if (unitBn) {
    return unitBn.startsWith("প্রতি") ? unitBn : `প্রতি ${unitBn}`;
  }

  const unitMap: Record<string, string> = {
    kg: "কেজি",
    litre: "লিটার",
    liter: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
    pcs: "পিস",
    packet: "প্যাকেট",
    gm: "গ্রাম",
  };

  const cleanUnit = unit?.toLowerCase().trim() || "";
  if (unitMap[cleanUnit]) {
    return unitMap[cleanUnit];
  }

  return unit?.startsWith("প্রতি") ? unit : `প্রতি ${unit}`;
}