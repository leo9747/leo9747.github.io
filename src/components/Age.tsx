"use client";

import { useEffect, useState } from "react";

// 14 November 2001 (month is zero-indexed).
const BIRTH = new Date(2001, 10, 14);

function ageFrom(birth: Date): number {
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const monthDiff = now.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

export default function Age() {
  const [age, setAge] = useState<number | null>(null);
  useEffect(() => setAge(ageFrom(BIRTH)), []);
  return <span suppressHydrationWarning>{age ?? "—"}</span>;
}
