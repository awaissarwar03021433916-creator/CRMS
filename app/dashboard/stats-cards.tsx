"use client";

import { motion } from "framer-motion";

type Props = {
  stats: {
    totalEmployees: number;
    activeEmployees: number;
    pendingDocuments: number;
    approvedDocuments: number;
  };
};

const cards = [
  { key: "totalEmployees", label: "Total Employees", icon: "👥" },
  { key: "activeEmployees", label: "Active Employees", icon: "✅" },
  { key: "pendingDocuments", label: "Pending Documents", icon: "⏳" },
  { key: "approvedDocuments", label: "Approved Documents", icon: "📄" },
] as const;

export default function StatsCards({ stats }: Props) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
      {cards.map((card, index) => (
        <motion.div
          key={card.key}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.08 }}
          className="rounded-2xl border border-white/30 bg-white/60 p-6 shadow-xl backdrop-blur-lg"
        >
          <div className="text-2xl">{card.icon}</div>
          <p className="mt-3 text-2xl font-bold text-gray-900">{stats[card.key]}</p>
          <p className="text-sm text-gray-600">{card.label}</p>
        </motion.div>
      ))}
    </div>
  );
}
