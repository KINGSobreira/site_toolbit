import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import StatusBadge from "./StatusBadge";
import PrioridadeBadge from "./PrioridadeBadge";
import { User, MapPin, Tag } from "lucide-react";
import { motion } from "framer-motion";

const categoriaLabels = {
  hardware: "Hardware",
  software: "Software",
  rede: "Rede",
  email: "E-mail",
  impressora: "Impressora",
  acesso: "Acesso",
  telefonia: "Telefonia",
  outros: "Outros"
};

export default function ChamadoCard({ chamado, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card 
        className="cursor-pointer hover:shadow-lg transition-all duration-300 border-slate-200 bg-white"
        onClick={() => onClick && onClick(chamado)}
      >
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start gap-3">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-slate-900 mb-2 truncate">{chamado.titulo}</h3>
              <div className="flex flex-wrap gap-2">
                <StatusBadge status={chamado.status} />
                <PrioridadeBadge prioridade={chamado.prioridade} />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-slate-600 line-clamp-2">{chamado.descricao}</p>
          
          <div className="flex flex-wrap gap-3 text-xs text-slate-500">
            <div className="flex items-center gap-1">
              <Tag className="w-3 h-3" />
              <span>{categoriaLabels[chamado.categoria]}</span>
            </div>
            {chamado.departamento && (
              <div className="flex items-center gap-1">
                <User className="w-3 h-3" />
                <span>{chamado.departamento}</span>
              </div>
            )}
            {chamado.localizacao && (
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>{chamado.localizacao}</span>
              </div>
            )}
          </div>

          <div className="pt-2 border-t border-slate-100 text-xs text-slate-400">
            Criado em {format(new Date(chamado.created_date), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}