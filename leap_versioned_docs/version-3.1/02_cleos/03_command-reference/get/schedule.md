---
tags:
  - AntelopeIO/leap/tree/v3.1.2/docs/02_cleos/03_command-reference/get/schedule.md
  - AntelopeIO/leap
  - v3.1.2
title: Schedule
---
## Description

Retrieve the producer schedule


## Options
- `-h` - --help                   Print this help message and exit

- `-j`- --json                   Output in JSON format


## Example

```sh
cleos get schedule
```

This command simply returns the current producer schedule. 

```console
active schedule version 0
    Producer      Producer key
    ============= ==================
    eosio         EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV

pending schedule empty

proposed schedule empty
```
