"use client"

import dynamic from "next/dynamic";
const ListOrderComponnets = dynamic(() => import("@/app/list-order"));

export default function Home() {
  return (
    <div className="py-10">
      <ListOrderComponnets />
    </div>
  );
}
