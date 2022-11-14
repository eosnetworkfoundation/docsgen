---
tags:
  - eosnetworkfoundation/eos-system-contracts/tree/v3.1.1/docs/01_key-concepts/03_cpu.md
  - eosnetworkfoundation/eos-system-contracts
  - v3.1.1
title: CPU as system resource
---

The system resource CPU provides processing power to blockchain accounts. The amount of CPU an account has is measured in microseconds and it is referred to as `cpu bandwidth` on the `cleos get account` command output. The `cpu bandwidth` represents the amount of processing time an account has at its disposal when actions sent to its contract are executed by the blockchain. When a transaction is executed by the blockchain it consumes CPU and NET, therefore sufficient CPU must be staked in order for transactions to complete.

For more details about EOSIO staking refer to the following:
* [Staking Mechanism](https://developers.eos.io/welcome/latest/overview/technical_features#staking-mechanism).
* [Staking on EOSIO-based blockchains](05_stake.md)
