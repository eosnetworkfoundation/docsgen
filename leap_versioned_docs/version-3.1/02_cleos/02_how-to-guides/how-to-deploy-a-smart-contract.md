---
tags:
  - AntelopeIO/leap/tree/v3.1.2/docs/02_cleos/02_how-to-guides/how-to-deploy-a-smart-contract.md
  - AntelopeIO/leap
  - v3.1.2
title: How-To-Deploy-A-Smart-Contract
---
## Goal

Deploy an Antelope contract

## Before you begin

* Install the currently supported version of `cleos`

* Unlock the wallet which contains the private key of the contract account

## Steps

Execute:

```sh
cleos set contract contract_account contract_folder [wasm-file] [abi-file]
```

Replace the `contract_folder` with the path that points to your contract folder


:::info Default contract name

By default, `cleos` treats the last folder specified in `contract_folder` as the contract name. Therefore, it expects `.wasm` and `.abi` files with that contract name as filename. This can be overridden with the optional `wasm-file` and `abi-file` parameters.

:::

