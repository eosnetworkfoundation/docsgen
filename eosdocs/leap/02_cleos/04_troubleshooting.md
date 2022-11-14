---
tags:
  - AntelopeIO/leap/tree/v3.2.0-rc1/docs/02_cleos/04_troubleshooting.md
  - AntelopeIO/leap
  - v3.2.0-rc1
title: Cleos Troubleshooting
---

## Cannot connect to RPC endpoint

Check if your local `nodeos` is running by visiting the following URL in your browser:

```sh
curl http://localhost:8888/v1/chain/get_info
```

If you are trying to connect a remote `nodeos` API endpoint, try to visit the API endpoint with the following suffix:

```sh
http://API_ENDPOINT:PORT/v1/chain/get_info
```

Replace API_ENDPOINT and PORT with your remote `nodeos` API endpoint detail

## "Missing Authorizations"

That means you are not using the required authorizations. Most likely you are not using correct Antelope account or permission level to sign the transaction
