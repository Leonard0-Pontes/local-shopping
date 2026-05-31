# 🏺 Local Shopping — Vitrine de Artesãos

[![Status](https://img.shields.io/badge/status-MVP-brightgreen)]()
[![License](https://img.shields.io/badge/license-MIT-blue)]()
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)]()
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)]()
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)]()

> Conectando pessoas ao feito à mão — uma plataforma leve e direta para artesãos exibirem seus produtos e clientes realizarem encomendas com um clique.

## 📖 Visão Geral

**Local Shopping** é uma aplicação web *front-end first* que simula um mercado de artesanato local. Artesãos podem se cadastrar, gerenciar seus produtos e receber contato direto via WhatsApp. Clientes navegam por uma vitrine interativa, filtram artesãos por local, experiência e nome, e enviam mensagens prontas para encomendar produtos.

O projeto foi desenvolvido como MVP (Produto Mínimo Viável) com foco em:
- Experiência do usuário limpa e acessível
- Regras de negócio para atualização de produtos (alertas após 60 dias, remoção após 90 dias)
- Armazenamento em memória (simulação de back-end para demonstração)
- Código modularizado, pronto para evoluir para uma API real.

## 🎯 Diagrama de Casos de Uso

O diagrama abaixo (baseado na especificação UML fornecida) ilustra os principais atores e funcionalidades do sistema.

```mermaid
graph TD
    Cliente(["Cliente"])
    Lojista(["Lojista"])
    Suporte(["Suporte"])
    Cliente --> UC_VisualizarProdutos["Visualizar produtos"]
    Cliente --> UC_VisualizarArtesaos["Visualizar artesãos"]
    Cliente --> UC_EnviarMensagemLojista["Enviar mensagem ao lojista"]
    UC_VisualizarProdutos -.-> |<<extend>>| UC_FiltrarProdutos["Filtrar produtos"]
    UC_VisualizarArtesaos -.-> |<<extend>>| UC_FiltrarArtesaos["Filtrar artesãos"]
    Lojista --> UC_CadastrarProduto["Cadastrar produto"]
    Lojista --> UC_GerenciarProdutos["Gerenciar produtos"]
    UC_GerenciarProdutos --> |<<include>>| UC_CadastrarProduto
    UC_GerenciarProdutos --> |<<include>>| UC_EditarProduto["Editar produto"]
    UC_GerenciarProdutos --> |<<include>>| UC_RemoverProduto["Remover produto"]
    Lojista --> UC_VisualizarMensagensProduto["Visualizar mensagens"]
    Lojista --> UC_ResponderMensagemProduto["Responder mensagem"]
    Suporte --> UC_VisualizarNecessidades["Visualizar necessidades"]
    Suporte --> UC_ResponderNecessidades["Responder necessidades"]