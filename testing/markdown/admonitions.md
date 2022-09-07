Additional EOSIO Resources:
* [EOSIO Utilities](10_utilities/index.md) - Utilities that complement the EOSIO software.  

[//]: # (THIS IS A COMMENT REMOVING BROKEN LINKS)  
[//]: # (Upgrade-Guide-20_upgrade-guide/index.md-EOSIO-version/protocol-upgrade-guide.)  
[//]: # (Release Notes 30_release-notes/index.md  - All release notes for this EOSIO version.)  

[[info | What's Next?]]
| [Install the EOSIO Software](00_install/index.md) before exploring the sections above.

## Description

The `wallet_api_plugin` exposes functionality from the [`wallet_plugin`](../wallet_plugin/index.md) to the RPC API interface managed by the [`http_plugin`](../../../01_nodeos/03_plugins/http_plugin/index.md).

[[caution | Caution]]
| This plugin exposes wallets. Therefore, running this plugin on a publicly accessible node is not recommended. As of 1.2.0, the `wallet_api_plugin` is only available through `keosd`. It is no longer supported by `nodeos`.

## Usage

[[info | Default address:port]]
| If no optional arguments are used (i.e. `--url` or `--wallet-url`), `cleos` attempts to connect to a local `nodeos` or `keosd` running at localhost `127.0.0.1` and default port `8888`.

* You can also create a JSON snippet that uses clear text JSON for `data` field.

[[info]]
| Be aware that if a clear text `data` field is used, cleos need to fetch copies of required ABIs using `nodeos` API. That operation has a performance overhead on `nodeos`

```JSON
{
  "expiration": "2019-08-01T07:15:49",
  "ref_block_num": 34881,
  "ref_block_prefix": 2972818865,
  "max_net_usage_words": 0,
  "max_cpu_usage_ms": 0,
  "delay_sec": 0,
  "context_free_actions": [],
  "actions": [{
      "account": "eosio.token",
      "name": "transfer",
      "authorization": [{
          "actor": "han",
          "permission": "active"
        }
      ],
      "data": {
        "from": "han",
        "to": "eosio",
        "quantity": "0.0001 SYS",
        "memo": "m"
      }
    }
  ],
  "transaction_extensions": [],
  "context_free_data": []
}
```

[[caution]]
Nothing under here to add

# No Looping
