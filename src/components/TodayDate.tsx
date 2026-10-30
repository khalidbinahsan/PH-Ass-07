"use client";

import { useSyncExternalStore } from "react";
import { getTodayBanglaDate } from "@/utils/bangla";

const subscribe = () => () => {};

// Date is read only in the browser; the server/prerender renders an empty placeholder.
export default function TodayDate() {
  const date = useSyncExternalStore(subscribe, getTodayBanglaDate, () => "");
  return <span>{date || " "}</span>;
}
