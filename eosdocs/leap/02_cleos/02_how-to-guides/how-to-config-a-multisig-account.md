---
tags:
  - AntelopeIO/leap/tree/v3.2.0-rc1/docs/02_cleos/02_how-to-guides/how-to-config-a-multisig-account.md
  - AntelopeIO/leap
  - v3.2.0-rc1
title: How-To-Config-A-Multisig-Account
---
## Goal

Setup an account that require multiple signatures for signning a transaction

## Before you begin

* You have an account

* You have enough resoruces allocated to execute the transaction

* Install the currently supported version of `cleos`

* Understand the following:
  * What is an account
  * What is a transaction


## Steps

```sh
cleos set account permission multisig active '{\"threshold\" : 1, \"accounts\" :[{\"permission\":{\"actor\":\"eosio\",\"permission\":\"active\"},\"weight\":1},{\"permission\":{\"actor\":\"customera\",\"permission\":\"active\"},\"weight\":1}]}' owner -p multisig@owner"
```
