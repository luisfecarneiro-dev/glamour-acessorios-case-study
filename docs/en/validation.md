# Validation and interview walkthrough

[Português](../pt-br/validation.md) · [English](../../README.en.md)

## Historical read benchmark

The **September 11, 2026** audit documents a **local PostgreSQL 16** run with RLS enabled and **30 executions per cell**. These numbers are aggregate database query latencies from that run, in milliseconds. The scope excludes HTTP latency, rendering time, and user traffic.

| Test scenario | First page p50 / p95 | Search p50 / p95 |
| --- | --- | --- |
| 1,000 active products | 21.9 / 160.1 | 7.9 / 9.4 |
| 1,500 active products | 15.7 / 17.5 | 10.4 / 12.1 |
| 1,800 active products | 18.2 / 19.9 | 12.3 / 13.6 |

**Source.** I reviewed the internal capacity report and project documentation on GitHub on November 20, 2026. The report records rejection of the next item beyond capacity in the tested scenario. A new benchmark run or a public site measurement would require its own environment and methodology records.

## Package demo

Run `node --test example/catalog-capacity.test.mjs`. Tests cover active and inactive states, repeated updates, rejection above capacity, deactivation that frees a slot, store isolation, and out-of-contract inputs. The example uses synthetic data, validates inputs, and has zero external dependencies.

## In an interview

1. Explain why a capacity rule also needs to apply to restores.
2. Use the 1,000-product row to discuss tail latency, reruns, and sample size.
3. Describe how you would test two concurrent activations competing for the last slot in the real database.
