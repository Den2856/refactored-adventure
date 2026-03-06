import type { ReactNode } from "react";

type Col = {
  key: string;
  title: ReactNode;
  align?: "left" | "right" | "center";
};

const thBase = "px-4 py-3 text-b-text-2 text-secondary font-medium";
const alignClass: Record<NonNullable<Col["align"]>, string> = {
  left: "text-left",
  right: "text-right",
  center: "text-center",
};

export function TableHead({ columns }: { columns: Col[] }) {
  return (
    <thead className="bg-gray-h">
      <tr className="text-left">
        {columns.map((c) => (
          <th
            key={c.key}
            className={[thBase, c.align ? alignClass[c.align] : ""].filter(Boolean).join(" ")}
          >
            {c.title}
          </th>
        ))}
      </tr>
    </thead>
  );
}