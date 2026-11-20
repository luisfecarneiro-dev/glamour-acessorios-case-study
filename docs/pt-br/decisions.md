# Decisões técnicas

[Português](../../README.md) · [English](../en/decisions.md)

## Capacidade como regra de domínio

Defini a expansão em torno da contagem de produtos que participam do catálogo ativo. Interface, importação e restauração podem chegar à mesma decisão de capacidade. A alternativa discutida no caso é validar apenas na interface, o que tornaria a regra dependente do caminho de entrada. Uma implementação persistente precisa tratar a disputa pela última vaga como um problema de consistência.

## Medição antes de mudanças estruturais

A auditoria registrou planos de execução com o volume observado na ocasião e medições de consulta em um banco local em diferentes volumes. O plano ajuda a ver como o banco chegou ao resultado. O ensaio local ajuda a ver em que ponto a decisão merece ser reavaliada. O registro histórico preservou os índices existentes para o recorte estudado.

## Limite do argumento

Variar o número de produtos muda a pergunta respondida pelo ensaio. Distribuição dos dados, cache e concorrência alteram latência. O valor de cauda em um tamanho menor foi maior que em outro maior neste ensaio. Isso pede repetição controlada antes de atribuir a diferença à quantidade de produtos.
