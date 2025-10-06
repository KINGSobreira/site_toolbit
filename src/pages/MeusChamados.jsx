import React, { useState, useEffect } from "react";
import { Chamado } from "@/entities/Chamado";
import { User } from "@/entities/User";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, X } from "lucide-react";
import ChamadoCard from "../components/chamados/ChamadoCard";
import StatusBadge from "../components/chamados/StatusBadge";
import PrioridadeBadge from "../components/chamados/PrioridadeBadge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { motion, AnimatePresence } from "framer-motion";

export default function MeusChamados() {
  const [chamados, setChamados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [selectedChamado, setSelectedChamado] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [categoriaFilter, setCategoriaFilter] = useState("todas");

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    if (id && chamados.length > 0) {
      const chamado = chamados.find(c => c.id === id);
      if (chamado) setSelectedChamado(chamado);
    }
  }, [chamados]);

  const loadData = async () => {
    try {
      const userData = await User.me();
      setUser(userData);
      
      const chamadosData = await Chamado.filter(
        { created_by: userData.email },
        "-created_date"
      );
      setChamados(chamadosData);
    } catch (error) {
      console.error("Erro ao carregar chamados:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredChamados = chamados.filter(chamado => {
    const matchSearch = chamado.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       chamado.descricao.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === "todos" || chamado.status === statusFilter;
    const matchCategoria = categoriaFilter === "todas" || chamado.categoria === categoriaFilter;
    return matchSearch && matchStatus && matchCategoria;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
            Meus Chamados
          </h1>
          <p className="text-slate-600">Acompanhe o status de suas solicitações</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-slate-200"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                placeholder="Buscar chamados..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Tabs value={statusFilter} onValueChange={setStatusFilter}>
              <TabsList className="bg-slate-100">
                <TabsTrigger value="todos">Todos</TabsTrigger>
                <TabsTrigger value="aberto">Abertos</TabsTrigger>
                <TabsTrigger value="em_andamento">Em Andamento</TabsTrigger>
                <TabsTrigger value="resolvido">Resolvidos</TabsTrigger>
              </TabsList>
            </Tabs>

            <Select value={categoriaFilter} onValueChange={setCategoriaFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas</SelectItem>
                <SelectItem value="hardware">Hardware</SelectItem>
                <SelectItem value="software">Software</SelectItem>
                <SelectItem value="rede">Rede</SelectItem>
                <SelectItem value="email">E-mail</SelectItem>
                <SelectItem value="impressora">Impressora</SelectItem>
                <SelectItem value="acesso">Acesso</SelectItem>
                <SelectItem value="telefonia">Telefonia</SelectItem>
                <SelectItem value="outros">Outros</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-48 bg-white rounded-lg animate-pulse border border-slate-200" />
            ))}
          </div>
        ) : filteredChamados.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-lg border border-slate-200">
            <p className="text-slate-500">Nenhum chamado encontrado</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence>
              {filteredChamados.map((chamado) => (
                <ChamadoCard
                  key={chamado.id}
                  chamado={chamado}
                  onClick={setSelectedChamado}
                />
              ))}
            </AnimatePresence>
          </div>
        )}

        <Dialog open={!!selectedChamado} onOpenChange={() => setSelectedChamado(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            {selectedChamado && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl">{selectedChamado.titulo}</DialogTitle>
                </DialogHeader>
                
                <div className="space-y-6 mt-4">
                  <div className="flex flex-wrap gap-2">
                    <StatusBadge status={selectedChamado.status} />
                    <PrioridadeBadge prioridade={selectedChamado.prioridade} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">Descrição</h3>
                    <p className="text-slate-600 whitespace-pre-wrap">{selectedChamado.descricao}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-slate-500">Categoria</p>
                      <p className="font-medium">{selectedChamado.categoria}</p>
                    </div>
                    {selectedChamado.departamento && (
                      <div>
                        <p className="text-sm text-slate-500">Departamento</p>
                        <p className="font-medium">{selectedChamado.departamento}</p>
                      </div>
                    )}
                    {selectedChamado.localizacao && (
                      <div>
                        <p className="text-sm text-slate-500">Localização</p>
                        <p className="font-medium">{selectedChamado.localizacao}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-slate-500">Criado em</p>
                      <p className="font-medium">
                        {format(new Date(selectedChamado.created_date), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                      </p>
                    </div>
                  </div>

                  {selectedChamado.solucao && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h3 className="font-semibold text-green-900 mb-2">Solução</h3>
                      <p className="text-green-800">{selectedChamado.solucao}</p>
                    </div>
                  )}

                  {selectedChamado.anexos && selectedChamado.anexos.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-2">Anexos</h3>
                      <div className="space-y-2">
                        {selectedChamado.anexos.map((url, index) => (
                          <a
                            key={index}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block p-3 bg-slate-50 rounded hover:bg-slate-100 transition-colors"
                          >
                            Anexo {index + 1}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}