# Technical decisions

[Português](../pt-br/decisions.md) · [English](../../README.en.md)

## Capacity as a domain rule

I framed the expansion around counting products that participate in the active catalog. The UI, imports, and restore actions can all reach the same capacity decision. A UI-only check, an alternative discussed here, would make the rule depend on the entry path. A persistent implementation needs to treat competition for the last slot as a consistency problem.

## Measure before structural changes

The audit recorded query plans at the volume observed at the time and query measurements at several sizes in a local database. The plan helps explain how the database reaches its result. The local benchmark helps identify where the decision might need revisiting. The historical record kept the existing indexes within this scope.

## Limits of the argument

Varying the product count changes the question answered by the benchmark. Data distribution, caching, and concurrency affect latency. One smaller size showed a larger tail value than a bigger size in this run. A controlled repeat is needed before attributing that difference to product count.
