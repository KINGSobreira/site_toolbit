import React from "react";
import { Badge } from "@/components/ui/badge";
import { Circle, Clock, AlertCircle, CheckCircle, XCircle } from "lucide-react";

const statusConfig = {
  aberto: {
    label: "Aberto",
    color: "bg-blue-100 text-blue-800 border-blue-200",
    icon: Circle
  },
  em_andamento: {
    label: "Em Andamento",
    color: "bg-amber-100 text-amber-800 border-amber-200",
    icon: Clock
  },
  aguardando_usuario: {
    label: "Aguardando",
    color: "bg-purple-100 text-purple-800 border-purple-200",
    icon: AlertCircle
  },
  resolvido: {
    label: "Resolvido",
    color: "bg-green-100 text-green-800 border-green-200",
    icon: CheckCircle
  },
  fechado: {
    label: "Fechado",
    color: "bg-slate-100 text-slate-800 border-slate-200",
    icon: XCircle
  }
};

export default function StatusBadge({ status }) {
  const config = statusConfig[status] || statusConfig.aberto;
  const Icon = config.icon;

  return (
    <Badge className={`${config.color} border flex items-center gap-1 w-fit`}>
      <Icon className="w-3 h-3" />
      {config.label}
    </Badge>
  );
}