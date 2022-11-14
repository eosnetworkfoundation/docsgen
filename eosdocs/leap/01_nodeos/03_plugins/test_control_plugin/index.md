---
tags:
  - AntelopeIO/leap/tree/v3.2.0-rc1/docs/01_nodeos/03_plugins/test_control_plugin/index.md
  - AntelopeIO/leap
  - v3.2.0-rc1
title: Test Control Plugin
---

## Description

The `test_control_plugin` is designed to cause a graceful shutdown when reaching a particular block in a sequence of blocks produced by a specific block producer. It can be invoked to either shutdown on the **head block** or the **last irreversible block**.

This is intended for testing, to determine exactly when a `nodeos` instance will shutdown.

## Usage

```console
# config.ini
plugin = eosio::test_control_plugin
```
```sh
# command-line
nodeos ... --plugin eosio::test_control_plugin
```

## Options

None

## Dependencies

* [`chain_plugin`](../chain_plugin/index.md)

### Load Dependency Examples

```console
# config.ini
plugin = eosio::chain_plugin
[options]
```
```sh
# command-line
nodeos ... --plugin eosio::chain_plugin [operations] [options]
```
