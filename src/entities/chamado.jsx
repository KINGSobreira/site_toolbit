{
  "name": "Chamado",
  "type": "object",
  "properties": {
    "titulo": {
      "type": "string",
      "description": "Título do chamado"
    },
    "descricao": {
      "type": "string",
      "description": "Descrição detalhada do problema"
    },
    "categoria": {
      "type": "string",
      "enum": [
        "hardware",
        "software",
        "rede",
        "email",
        "impressora",
        "acesso",
        "telefonia",
        "outros"
      ],
      "description": "Categoria do chamado"
    },
    "prioridade": {
      "type": "string",
      "enum": [
        "baixa",
        "media",
        "alta",
        "urgente"
      ],
      "default": "media",
      "description": "Nível de prioridade"
    },
    "status": {
      "type": "string",
      "enum": [
        "aberto",
        "em_andamento",
        "aguardando_usuario",
        "resolvido",
        "fechado"
      ],
      "default": "aberto",
      "description": "Status atual do chamado"
    },
    "departamento": {
      "type": "string",
      "description": "Departamento do solicitante"
    },
    "localizacao": {
      "type": "string",
      "description": "Local físico (sala, andar, etc)"
    },
    "atribuido_para": {
      "type": "string",
      "description": "Email do técnico responsável"
    },
    "data_resolucao": {
      "type": "string",
      "format": "date-time",
      "description": "Data e hora da resolução"
    },
    "solucao": {
      "type": "string",
      "description": "Descrição da solução aplicada"
    },
    "anexos": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "URLs dos arquivos anexados"
    },
    "tempo_resposta": {
      "type": "number",
      "description": "Tempo de primeira resposta em minutos"
    },
    "tempo_resolucao": {
      "type": "number",
      "description": "Tempo total de resolução em minutos"
    }
  },
  "required": [
    "titulo",
    "descricao",
    "categoria",
    "prioridade"
  ]
}