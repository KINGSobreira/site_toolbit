import React from "react";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, Minus, ArrowUp, AlertTriangle } from "lucide-react";

const prioridadeConfig = {
  baixa: {
    label: "Baixa",
    color: "bg-slate-100 text-slate-700 border-slate-300",
    icon: ArrowDown
  },
  media: {
    label: "Média",
    color: "bg-yellow-100 text-yellow-800 border-yellow-300",
    icon: Minus
  },
  alta: {
    label: "Alta",
    color: "bg-orange-100 text-orange-800 border-orange-300",
    icon: ArrowUp
  },
  urgente: {
    label: "Urgente",
    color: "bg-red-100 text-red-800 border-red-300",
    icon: AlertTriangle
  }
};

export default function PrioridadeBadge({ prioridade }) {
  const config = prioridadeConfig[prioridade] || prioridadeConfig.media;
  const Icon = config.icon;

  return (
    <Badge className={`${config.color} border flex items-center gap-1 w-fit`}>
      <Icon className="w-3 h-3" />
      {config.label}
    </Badge>
  );
}