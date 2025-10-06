import React, { useState, useEffect } from "react";
import { Chamado } from "@/entities/Chamado";
import { User } from "@/entities/User";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Plus, Ticket, Clock, CheckCircle, AlertCircle } from "lucide-react";
import StatCard from "../components/dashboard/StatCard";
import ChamadoCard from "../components/chamados/ChamadoCard";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [chamados, setChamados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const userData = await User.me();
      setUser(userData);
      
      const chamadosData = await Chamado.list("-created_date", 100);
      setChamados(chamadosData);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  const meusChamados = user ? chamados.filter(c => c.created_by === user.email) : [];
  const chamadosAbertos = meusChamados.filter(c => c.status === "aberto" || c.status === "em_andamento");
  const chamadosResolvidos = meusChamados.filter(c => c.status === "resolvido" || c.status === "fechado");
  const chamadosUrgentes = meusChamados.filter(c => c.prioridade === "urgente" || c.prioridade === "alta");

  const handleChamadoClick = (chamado) => {
    navigate(createPageUrl("MeusChamados") + `?id=${chamado.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
              Dashboard
            </h1>
            <p className="text-slate-600">Bem-vindo ao sistema de chamados</p>
          </div>
          <Link to={createPageUrl("NovoChamado")}>
            <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300">
              <Plus className="w-5 h-5 mr-2" />
              Novo Chamado
            </Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total de Chamados"
            value={meusChamados.length}
            icon={Ticket}
            color="bg-blue-500"
            trend="Todos os seus chamados"
            delay={0.1}
          />
          <StatCard
            title="Em Aberto"
            value={chamadosAbertos.length}
            icon={Clock}
            color="bg-amber-500"
            trend="Aguardando resolução"
            delay={0.2}
          />
          <StatCard
            title="Resolvidos"
            value={chamadosResolvidos.length}
            icon={CheckCircle}
            color="bg-green-500"
            trend="Finalizados"
            delay={0.3}
          />
          <StatCard
            title="Urgentes"
            value={chamadosUrgentes.length}
            icon={AlertCircle}
            color="bg-red-500"
            trend="Prioridade alta"
            delay={0.4}
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-slate-200"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-900">Chamados Recentes</h2>
            <Link to={createPageUrl("MeusChamados")}>
              <Button variant="outline" size="sm">Ver Todos</Button>
            </Link>
          </div>

          {loading ? (
            <div className="grid gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-slate-100 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : meusChamados.length === 0 ? (
            <div className="text-center py-12">
              <Ticket className="w-16 h-16 mx-auto text-slate-300 mb-4" />
              <p className="text-slate-500 mb-4">Você ainda não tem chamados</p>
              <Link to={createPageUrl("NovoChamado")}>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Criar Primeiro Chamado
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {meusChamados.slice(0, 6).map((chamado) => (
                <ChamadoCard
                  key={chamado.id}
                  chamado={chamado}
                  onClick={handleChamadoClick}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}