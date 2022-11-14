---
tags:
  - AntelopeIO/leap/tree/v3.2.0-rc1/docs/02_cleos/03_command-reference/wallet/unlock.md
  - AntelopeIO/leap
  - v3.2.0-rc1
title: Unlock
---
## Description
Unlocks a wallet

## Positionals
None
## Options
- `-n, --name` _TEXT_ - The name of the wallet to unlock.
- `--password` _TEXT_ - The password returned by wallet create.
## Usage
To unlock a wallet, specify the password provided when it was created.

```sh
cleos wallet unlock -n second-wallet --password PW5Ji6JUrLjhKAVn68nmacLxwhvtqUAV18J7iycZppsPKeoGGgBEw
```

## Outputs


```console
Unlocked: 'second-wallet'
```
