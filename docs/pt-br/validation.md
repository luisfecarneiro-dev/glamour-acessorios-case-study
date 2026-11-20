# Validação e roteiro de entrevista

[Português](../../README.md) · [English](../en/validation.md)

## Benchmark histórico de leitura

A auditoria de **11/09/2026** documenta um ensaio em **PostgreSQL 16 local**, com RLS ativa e **30 execuções por célula**. Os números abaixo são latências agregadas de consultas desse ensaio, em milissegundos. O recorte exclui latência HTTP, tempo de renderização e tráfego de usuários.

| Cenário de teste | Primeira página p50 / p95 | Busca p50 / p95 |
| --- | --- | --- |
| 1.000 produtos ativos | 21,9 / 160,1 | 7,9 / 9,4 |
| 1.500 produtos ativos | 15,7 / 17,5 | 10,4 / 12,1 |
| 1.800 produtos ativos | 18,2 / 19,9 | 12,3 / 13,6 |

**Fonte.** Relatório interno de capacidade e documentação técnica do projeto, consultados no GitHub em 20/11/2026. O relatório registrou a recusa do item seguinte ao limite no cenário exercitado. Uma nova execução do benchmark ou uma medição pública do site exigiria registrar ambiente e metodologia próprios.

## Demonstração do pacote

Rode `node --test example/catalog-capacity.test.mjs`. Os testes cobrem estados ativo e inativo, repetição da mesma atualização, recusa acima da capacidade, desativação que libera vaga, isolamento por loja e entradas fora do contrato. O exemplo tem dados sintéticos, validação de entrada e zero dependências externas.

## Em uma entrevista

1. Explique por que uma regra de capacidade precisa valer também na restauração.
2. Use a linha de 1.000 produtos para falar de cauda, repetição do teste e tamanho da amostra.
3. Descreva como validaria duas ativações concorrentes disputando a última vaga no banco real.
