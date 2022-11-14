---
tags:
  - AntelopeIO/leap/tree/v3.2.0-rc1/docs/01_nodeos/03_plugins/db_size_api_plugin/index.md
  - AntelopeIO/leap
  - v3.2.0-rc1
title: Db Size Api Plugin
---
## Description

The `db_size_api_plugin` retrieves analytics about the blockchain.

* free_bytes
* used_bytes
* size
* indices

<!--
## Usage

```console
# Not available
```
-->

## Options

None

## Dependencies

* [`chain_plugin`](../chain_plugin/index.md)
* [`http_plugin`](../http_plugin/index.md)

### Load Dependency Examples

```console
# config.ini
plugin = eosio::chain_plugin
[options]
plugin = eosio::http_plugin
[options]
```
```sh
# command-line
nodeos ... --plugin eosio::chain_plugin [operations] [options]  \
           --plugin eosio::http_plugin [options]
```
