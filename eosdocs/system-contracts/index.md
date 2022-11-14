---
tags:
  - eosnetworkfoundation/eos-system-contracts/tree/v3.1.1/docs/index.md
  - eosnetworkfoundation/eos-system-contracts
  - v3.1.1
title: Overview
---

The EOSIO blockchain platform is unique in that the features and characteristics of the blockchain built on it are flexible, that is, they can be changed, or modified completely to suit each business case requirement. Core blockchain features such as consensus, fee schedules, account creation and modification, token economics, block producer registration, voting, multi-sig, etc., are implemented inside smart contracts which are deployed on the blockchain built on the EOSIO platform.

## System contracts defined in eosio.contracts

Block.one implements and maintains EOSIO open source platform which contains, as an example, the system contracts encapsulating the base functionality for an EOSIO based blockchain.

1. [eosio.bios](/system-contracts/latest/reference/Classes/classeosiobios_1_1bios)
2. [eosio.system](/system-contracts/latest/reference/Classes/classeosiosystem_1_1system__contract)
3. [eosio.msig](/system-contracts/latest/reference/Classes/classeosio_1_1multisig)
4. [eosio.token](/system-contracts/latest/reference/Classes/classeosio_1_1token)
5. [eosio.wrap](/system-contracts/latest/reference/Classes/classeosio_1_1wrap)

## Key Concepts Implemented by eosio.system

1. [System](01_key-concepts/01_system.md)
2. [RAM](01_key-concepts/02_ram.md)
3. [CPU](01_key-concepts/03_cpu.md)
4. [NET](01_key-concepts/04_net.md)
5. [Stake](01_key-concepts/05_stake.md)
6. [Vote](01_key-concepts/06_vote.md)

## Build and deploy
To build and deploy the system contract follow the instruction from [Build and deploy](03_build-and-deploy.md) section.
