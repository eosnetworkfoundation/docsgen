[EOSIO Javascript](../index.md) / [Exports](../index.md) / JsonRpc

# Class: JsonRpc

Make RPC calls

## Implements

- [`AuthorityProvider`](../interfaces/ApiInterfaces.AuthorityProvider.md)
- [`AbiProvider`](../interfaces/ApiInterfaces.AbiProvider.md)

## Table of contents

### Constructors

- [constructor](JsonRpc.md#constructor)

### Properties

- [endpoint](JsonRpc.md#endpoint)
- [fetchBuiltin](JsonRpc.md#fetchbuiltin)

### Methods

- [db\_size\_get](JsonRpc.md#db_size_get)
- [fetch](JsonRpc.md#fetch)
- [getRawAbi](JsonRpc.md#getrawabi)
- [getRequiredKeys](JsonRpc.md#getrequiredkeys)
- [get\_abi](JsonRpc.md#get_abi)
- [get\_account](JsonRpc.md#get_account)
- [get\_block](JsonRpc.md#get_block)
- [get\_block\_header\_state](JsonRpc.md#get_block_header_state)
- [get\_code](JsonRpc.md#get_code)
- [get\_currency\_balance](JsonRpc.md#get_currency_balance)
- [get\_currency\_stats](JsonRpc.md#get_currency_stats)
- [get\_info](JsonRpc.md#get_info)
- [get\_producer\_schedule](JsonRpc.md#get_producer_schedule)
- [get\_producers](JsonRpc.md#get_producers)
- [get\_raw\_code\_and\_abi](JsonRpc.md#get_raw_code_and_abi)
- [get\_scheduled\_transactions](JsonRpc.md#get_scheduled_transactions)
- [get\_table\_by\_scope](JsonRpc.md#get_table_by_scope)
- [get\_table\_rows](JsonRpc.md#get_table_rows)
- [history\_get\_actions](JsonRpc.md#history_get_actions)
- [history\_get\_controlled\_accounts](JsonRpc.md#history_get_controlled_accounts)
- [history\_get\_key\_accounts](JsonRpc.md#history_get_key_accounts)
- [history\_get\_transaction](JsonRpc.md#history_get_transaction)
- [push\_transaction](JsonRpc.md#push_transaction)
- [send\_transaction](JsonRpc.md#send_transaction)
- [send\_transaction2](JsonRpc.md#send_transaction2)

## Constructors

### constructor

• **new JsonRpc**(`endpoint`, `args?`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `endpoint` | `string` |  |
| `args` | `Object` | * `fetch`:    * browsers: leave `null` or `undefined`    * node: provide an implementation |
| `args.fetch?` | (`input?`: `string` \| `Request`, `init?`: `RequestInit`) => `Promise`<`Response`\> | - |

#### Defined in

src/eosjs-jsonrpc.ts:31

## Properties

### endpoint

• **endpoint**: `string`

#### Defined in

src/eosjs-jsonrpc.ts:21

___

### fetchBuiltin

• **fetchBuiltin**: (`input?`: `string` \| `Request`, `init?`: `RequestInit`) => `Promise`<`Response`\>

#### Type declaration

▸ (`input?`, `init?`): `Promise`<`Response`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `input?` | `string` \| `Request` |
| `init?` | `RequestInit` |

##### Returns

`Promise`<`Response`\>

#### Defined in

src/eosjs-jsonrpc.ts:22

## Methods

### db\_size\_get

▸ **db_size_get**(): `Promise`<`any`\>

Raw call to `/v1/db_size/get`

#### Returns

`Promise`<`any`\>

#### Defined in

src/eosjs-jsonrpc.ts:239

___

### fetch

▸ **fetch**(`path`, `body`): `Promise`<`any`\>

Post `body` to `endpoint + path`. Throws detailed error information in `RpcError` when available.

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `body` | `any` |

#### Returns

`Promise`<`any`\>

#### Defined in

src/eosjs-jsonrpc.ts:43

___

### getRawAbi

▸ **getRawAbi**(`accountName`): `Promise`<[`BinaryAbi`](../interfaces/ApiInterfaces.BinaryAbi.md)\>

calls `/v1/chain/get_raw_code_and_abi` and pulls out unneeded raw wasm code

#### Parameters

| Name | Type |
| :------ | :------ |
| `accountName` | `string` |

#### Returns

`Promise`<[`BinaryAbi`](../interfaces/ApiInterfaces.BinaryAbi.md)\>

#### Implementation of

AbiProvider.getRawAbi

#### Defined in

src/eosjs-jsonrpc.ts:123

___

### getRequiredKeys

▸ **getRequiredKeys**(`args`): `Promise`<`string`[]\>

Get subset of `availableKeys` needed to meet authorities in `transaction`. Implements `AuthorityProvider`

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | [`AuthorityProviderArgs`](../interfaces/ApiInterfaces.AuthorityProviderArgs.md) |

#### Returns

`Promise`<`string`[]\>

#### Implementation of

AuthorityProvider.getRequiredKeys

#### Defined in

src/eosjs-jsonrpc.ts:185

___

### get\_abi

▸ **get_abi**(`accountName`): `Promise`<[`GetAbiResult`](../interfaces/RpcInterfaces.GetAbiResult.md)\>

Raw call to `/v1/chain/get_abi`

#### Parameters

| Name | Type |
| :------ | :------ |
| `accountName` | `string` |

#### Returns

`Promise`<[`GetAbiResult`](../interfaces/RpcInterfaces.GetAbiResult.md)\>

#### Defined in

src/eosjs-jsonrpc.ts:67

___

### get\_account

▸ **get_account**(`accountName`): `Promise`<`any`\>

Raw call to `/v1/chain/get_account`

#### Parameters

| Name | Type |
| :------ | :------ |
| `accountName` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

src/eosjs-jsonrpc.ts:72

___

### get\_block

▸ **get_block**(`blockNumOrId`): `Promise`<[`GetBlockResult`](../interfaces/RpcInterfaces.GetBlockResult.md)\>

Raw call to `/v1/chain/get_block`

#### Parameters

| Name | Type |
| :------ | :------ |
| `blockNumOrId` | `string` \| `number` |

#### Returns

`Promise`<[`GetBlockResult`](../interfaces/RpcInterfaces.GetBlockResult.md)\>

#### Defined in

src/eosjs-jsonrpc.ts:82

___

### get\_block\_header\_state

▸ **get_block_header_state**(`blockNumOrId`): `Promise`<[`GetBlockHeaderStateResult`](../interfaces/RpcInterfaces.GetBlockHeaderStateResult.md)\>

Raw call to `/v1/chain/get_block_header_state`

#### Parameters

| Name | Type |
| :------ | :------ |
| `blockNumOrId` | `string` \| `number` |

#### Returns

`Promise`<[`GetBlockHeaderStateResult`](../interfaces/RpcInterfaces.GetBlockHeaderStateResult.md)\>

#### Defined in

src/eosjs-jsonrpc.ts:77

___

### get\_code

▸ **get_code**(`accountName`): `Promise`<[`GetCodeResult`](../interfaces/RpcInterfaces.GetCodeResult.md)\>

Raw call to `/v1/chain/get_code`

#### Parameters

| Name | Type |
| :------ | :------ |
| `accountName` | `string` |

#### Returns

`Promise`<[`GetCodeResult`](../interfaces/RpcInterfaces.GetCodeResult.md)\>

#### Defined in

src/eosjs-jsonrpc.ts:87

___

### get\_currency\_balance

▸ **get_currency_balance**(`code`, `account`, `symbol?`): `Promise`<`any`\>

Raw call to `/v1/chain/get_currency_balance`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `code` | `string` | `undefined` |
| `account` | `string` | `undefined` |
| `symbol` | `string` | `null` |

#### Returns

`Promise`<`any`\>

#### Defined in

src/eosjs-jsonrpc.ts:92

___

### get\_currency\_stats

▸ **get_currency_stats**(`code`, `symbol`): `Promise`<`any`\>

Raw call to `/v1/chain/get_currency_stats`

#### Parameters

| Name | Type |
| :------ | :------ |
| `code` | `string` |
| `symbol` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

src/eosjs-jsonrpc.ts:97

___

### get\_info

▸ **get_info**(): `Promise`<[`GetInfoResult`](../interfaces/RpcInterfaces.GetInfoResult.md)\>

Raw call to `/v1/chain/get_info`

#### Returns

`Promise`<[`GetInfoResult`](../interfaces/RpcInterfaces.GetInfoResult.md)\>

#### Defined in

src/eosjs-jsonrpc.ts:102

___

### get\_producer\_schedule

▸ **get_producer_schedule**(): `Promise`<`any`\>

Raw call to `/v1/chain/get_producer_schedule`

#### Returns

`Promise`<`any`\>

#### Defined in

src/eosjs-jsonrpc.ts:107

___

### get\_producers

▸ **get_producers**(`json?`, `lowerBound?`, `limit?`): `Promise`<`any`\>

Raw call to `/v1/chain/get_producers`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `json` | `boolean` | `true` |
| `lowerBound` | `string` | `''` |
| `limit` | `number` | `50` |

#### Returns

`Promise`<`any`\>

#### Defined in

src/eosjs-jsonrpc.ts:112

___

### get\_raw\_code\_and\_abi

▸ **get_raw_code_and_abi**(`accountName`): `Promise`<[`GetRawCodeAndAbiResult`](../interfaces/RpcInterfaces.GetRawCodeAndAbiResult.md)\>

Raw call to `/v1/chain/get_raw_code_and_abi`

#### Parameters

| Name | Type |
| :------ | :------ |
| `accountName` | `string` |

#### Returns

`Promise`<[`GetRawCodeAndAbiResult`](../interfaces/RpcInterfaces.GetRawCodeAndAbiResult.md)\>

#### Defined in

src/eosjs-jsonrpc.ts:117

___

### get\_scheduled\_transactions

▸ **get_scheduled_transactions**(`json?`, `lowerBound?`, `limit?`): `Promise`<`any`\>

Raw call to `/v1/chain/get_scheduled_transactions`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `json` | `boolean` | `true` |
| `lowerBound` | `string` | `''` |
| `limit` | `number` | `50` |

#### Returns

`Promise`<`any`\>

#### Defined in

src/eosjs-jsonrpc.ts:130

___

### get\_table\_by\_scope

▸ **get_table_by_scope**(`__namedParameters`): `Promise`<`any`\>

Raw call to `/v1/chain/get_table_by_scope`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `any` |

#### Returns

`Promise`<`any`\>

#### Defined in

src/eosjs-jsonrpc.ts:167

___

### get\_table\_rows

▸ **get_table_rows**(`__namedParameters`): `Promise`<`any`\>

Raw call to `/v1/chain/get_table_rows`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `any` |

#### Returns

`Promise`<`any`\>

#### Defined in

src/eosjs-jsonrpc.ts:135

___

### history\_get\_actions

▸ **history_get_actions**(`accountName`, `pos?`, `offset?`): `Promise`<`any`\>

Raw call to `/v1/history/get_actions`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `accountName` | `string` | `undefined` |
| `pos` | `number` | `null` |
| `offset` | `number` | `null` |

#### Returns

`Promise`<`any`\>

#### Defined in

src/eosjs-jsonrpc.ts:242

___

### history\_get\_controlled\_accounts

▸ **history_get_controlled_accounts**(`controllingAccount`): `Promise`<`any`\>

Raw call to `/v1/history/get_controlled_accounts`

#### Parameters

| Name | Type |
| :------ | :------ |
| `controllingAccount` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

src/eosjs-jsonrpc.ts:257

___

### history\_get\_key\_accounts

▸ **history_get_key_accounts**(`publicKey`): `Promise`<`any`\>

Raw call to `/v1/history/get_key_accounts`

#### Parameters

| Name | Type |
| :------ | :------ |
| `publicKey` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

src/eosjs-jsonrpc.ts:252

___

### history\_get\_transaction

▸ **history_get_transaction**(`id`, `blockNumHint?`): `Promise`<`any`\>

Raw call to `/v1/history/get_transaction`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `id` | `string` | `undefined` |
| `blockNumHint` | `number` | `null` |

#### Returns

`Promise`<`any`\>

#### Defined in

src/eosjs-jsonrpc.ts:247

___

### push\_transaction

▸ **push_transaction**(`__namedParameters`): `Promise`<`any`\>

Push a serialized transaction (replaced by send_transaction, but returned format has changed)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`PushTransactionArgs`](../interfaces/RpcInterfaces.PushTransactionArgs.md) |

#### Returns

`Promise`<`any`\>

#### Defined in

src/eosjs-jsonrpc.ts:193

___

### send\_transaction

▸ **send_transaction**(`__namedParameters`): `Promise`<`any`\>

Send a serialized transaction

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`PushTransactionArgs`](../interfaces/RpcInterfaces.PushTransactionArgs.md) |

#### Returns

`Promise`<`any`\>

#### Defined in

src/eosjs-jsonrpc.ts:205

___

### send\_transaction2

▸ **send_transaction2**(`__namedParameters`): `Promise`<`any`\>

Send a serialized transaction2

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`SendTransaction2Args`](../interfaces/RpcInterfaces.SendTransaction2Args.md) |

#### Returns

`Promise`<`any`\>

#### Defined in

src/eosjs-jsonrpc.ts:217
