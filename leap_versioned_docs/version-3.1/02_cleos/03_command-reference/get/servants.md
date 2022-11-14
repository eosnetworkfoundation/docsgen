---
tags:
  - AntelopeIO/leap/tree/v3.1.2/docs/02_cleos/03_command-reference/get/servants.md
  - AntelopeIO/leap
  - v3.1.2
title: Servants
---
## Description
Retrieve accounts which are servants of a given account 

## Info

**Command**

```sh
cleos get servants
```
**Output**

```console
Usage: cleos get servants account

Positionals:
  account TEXT                The name of the controlling account
```

## Command

```sh
cleos get servants inita
```

## Output

```json
{
  "controlled_accounts": [
    "tester"
  ]
}
```
