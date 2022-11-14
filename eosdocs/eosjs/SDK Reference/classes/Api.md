[EOSIO Javascript](../index.md) / [Exports](../index.md) / Api

# Class: Api

## Table of contents

### Constructors

- [constructor](Api.md#constructor)

### Properties

- [abiProvider](Api.md#abiprovider)
- [abiTypes](Api.md#abitypes)
- [authorityProvider](Api.md#authorityprovider)
- [cachedAbis](Api.md#cachedabis)
- [chainId](Api.md#chainid)
- [contracts](Api.md#contracts)
- [rpc](Api.md#rpc)
- [signatureProvider](Api.md#signatureprovider)
- [textDecoder](Api.md#textdecoder)
- [textEncoder](Api.md#textencoder)
- [transactionTypes](Api.md#transactiontypes)

### Methods

- [deserialize](Api.md#deserialize)
- [deserializeActions](Api.md#deserializeactions)
- [deserializeTransaction](Api.md#deserializetransaction)
- [deserializeTransactionWithActions](Api.md#deserializetransactionwithactions)
- [getAbi](Api.md#getabi)
- [getCachedAbi](Api.md#getcachedabi)
- [getContract](Api.md#getcontract)
- [getTransactionAbis](Api.md#gettransactionabis)
- [pushSignedTransaction](Api.md#pushsignedtransaction)
- [rawAbiToJson](Api.md#rawabitojson)
- [sendSignedTransaction](Api.md#sendsignedtransaction)
- [sendSignedTransaction2](Api.md#sendsignedtransaction2)
- [serialize](Api.md#serialize)
- [serializeActions](Api.md#serializeactions)
- [serializeContextFreeData](Api.md#serializecontextfreedata)
- [serializeTransaction](Api.md#serializetransaction)
- [transact](Api.md#transact)

## Constructors

### constructor

• **new Api**(`args`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `args` | `Object` | * `rpc`: Issues RPC calls    * `authorityProvider`: Get public keys needed to meet authorities in a transaction    * `abiProvider`: Supplies ABIs in raw form (binary)    * `signatureProvider`: Signs transactions    * `chainId`: Identifies chain    * `textEncoder`: `TextEncoder` instance to use. Pass in `null` if running in a browser    * `textDecoder`: `TextDecoder` instance to use. Pass in `null` if running in a browser |
| `args.abiProvider?` | [`AbiProvider`](../interfaces/ApiInterfaces.AbiProvider.md) | - |
| `args.authorityProvider?` | [`AuthorityProvider`](../interfaces/ApiInterfaces.AuthorityProvider.md) | - |
| `args.chainId?` | `string` | - |
| `args.rpc` | [`JsonRpc`](JsonRpc.md) | - |
| `args.signatureProvider` | [`SignatureProvider`](../interfaces/ApiInterfaces.SignatureProvider.md) | - |
| `args.textDecoder?` | `TextDecoder` | - |
| `args.textEncoder?` | `TextEncoder` | - |

#### Defined in

src/eosjs-api.ts:64

## Properties

### abiProvider

• **abiProvider**: [`AbiProvider`](../interfaces/ApiInterfaces.AbiProvider.md)

Supplies ABIs in raw form (binary)

#### Defined in

src/eosjs-api.ts:25

___

### abiTypes

• **abiTypes**: `Map`<`string`, [`Type`](../interfaces/Serialize.Type.md)\>

Converts abi files between binary and structured form (`abi.abi.json`)

#### Defined in

src/eosjs-api.ts:37

___

### authorityProvider

• **authorityProvider**: [`AuthorityProvider`](../interfaces/ApiInterfaces.AuthorityProvider.md)

Get subset of `availableKeys` needed to meet authorities in a `transaction`

#### Defined in

src/eosjs-api.ts:22

___

### cachedAbis

• **cachedAbis**: `Map`<`string`, [`CachedAbi`](../interfaces/ApiInterfaces.CachedAbi.md)\>

Fetched abis

#### Defined in

src/eosjs-api.ts:46

___

### chainId

• **chainId**: `string`

Identifies chain

#### Defined in

src/eosjs-api.ts:31

___

### contracts

• **contracts**: `Map`<`string`, [`Contract`](../interfaces/Serialize.Contract.md)\>

Holds information needed to serialize contract actions

#### Defined in

src/eosjs-api.ts:43

___

### rpc

• **rpc**: [`JsonRpc`](JsonRpc.md)

Issues RPC calls

#### Defined in

src/eosjs-api.ts:19

___

### signatureProvider

• **signatureProvider**: [`SignatureProvider`](../interfaces/ApiInterfaces.SignatureProvider.md)

Signs transactions

#### Defined in

src/eosjs-api.ts:28

___

### textDecoder

• **textDecoder**: `TextDecoder`

#### Defined in

src/eosjs-api.ts:34

___

### textEncoder

• **textEncoder**: `TextEncoder`

#### Defined in

src/eosjs-api.ts:33

___

### transactionTypes

• **transactionTypes**: `Map`<`string`, [`Type`](../interfaces/Serialize.Type.md)\>

Converts transactions between binary and structured form (`transaction.abi.json`)

#### Defined in

src/eosjs-api.ts:40

## Methods

### deserialize

▸ **deserialize**(`buffer`, `type`): `any`

Convert data in `buffer` to structured form. `type` must be a built-in abi type or in `transaction.abi.json`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `buffer` | [`SerialBuffer`](Serialize.SerialBuffer.md) |
| `type` | `string` |

#### Returns

`any`

#### Defined in

src/eosjs-api.ts:162

___

### deserializeActions

▸ **deserializeActions**(`actions`): `Promise`<[`Action`](../interfaces/Serialize.Action.md)[]\>

Convert actions from hex

#### Parameters

| Name | Type |
| :------ | :------ |
| `actions` | [`Action`](../interfaces/Serialize.Action.md)[] |

#### Returns

`Promise`<[`Action`](../interfaces/Serialize.Action.md)[]\>

#### Defined in

src/eosjs-api.ts:211

___

### deserializeTransaction

▸ **deserializeTransaction**(`transaction`): `any`

Convert a transaction from binary. Leaves actions in hex.

#### Parameters

| Name | Type |
| :------ | :------ |
| `transaction` | `Uint8Array` |

#### Returns

`any`

#### Defined in

src/eosjs-api.ts:195

___

### deserializeTransactionWithActions

▸ **deserializeTransactionWithActions**(`transaction`): `Promise`<`any`\>

Convert a transaction from binary. Also deserializes actions.

#### Parameters

| Name | Type |
| :------ | :------ |
| `transaction` | `string` \| `Uint8Array` |

#### Returns

`Promise`<`any`\>

#### Defined in

src/eosjs-api.ts:220

___

### getAbi

▸ **getAbi**(`accountName`, `reload?`): `Promise`<[`Abi`](../interfaces/RpcInterfaces.Abi.md)\>

Get abi in structured form. Fetch when needed.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `accountName` | `string` | `undefined` |
| `reload` | `boolean` | `false` |

#### Returns

`Promise`<[`Abi`](../interfaces/RpcInterfaces.Abi.md)\>

#### Defined in

src/eosjs-api.ts:124

___

### getCachedAbi

▸ **getCachedAbi**(`accountName`, `reload?`): `Promise`<[`CachedAbi`](../interfaces/ApiInterfaces.CachedAbi.md)\>

Get abi in both binary and structured forms. Fetch when needed.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `accountName` | `string` | `undefined` |
| `reload` | `boolean` | `false` |

#### Returns

`Promise`<[`CachedAbi`](../interfaces/ApiInterfaces.CachedAbi.md)\>

#### Defined in

src/eosjs-api.ts:103

___

### getContract

▸ **getContract**(`accountName`, `reload?`): `Promise`<[`Contract`](../interfaces/Serialize.Contract.md)\>

Get data needed to serialize actions in a contract

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `accountName` | `string` | `undefined` |
| `reload` | `boolean` | `false` |

#### Returns

`Promise`<[`Contract`](../interfaces/Serialize.Contract.md)\>

#### Defined in

src/eosjs-api.ts:141

___

### getTransactionAbis

▸ **getTransactionAbis**(`transaction`, `reload?`): `Promise`<[`BinaryAbi`](../interfaces/ApiInterfaces.BinaryAbi.md)[]\>

Get abis needed by a transaction

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `transaction` | `any` | `undefined` |
| `reload` | `boolean` | `false` |

#### Returns

`Promise`<[`BinaryAbi`](../interfaces/ApiInterfaces.BinaryAbi.md)[]\>

#### Defined in

src/eosjs-api.ts:129

___

### pushSignedTransaction

▸ **pushSignedTransaction**(`__namedParameters`): `Promise`<`any`\>

Broadcast a signed transaction using push_transaction RPC

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`PushTransactionArgs`](../interfaces/RpcInterfaces.PushTransactionArgs.md) |

#### Returns

`Promise`<`any`\>

#### Defined in

src/eosjs-api.ts:365

___

### rawAbiToJson

▸ **rawAbiToJson**(`rawAbi`): [`Abi`](../interfaces/RpcInterfaces.Abi.md)

Decodes an abi as Uint8Array into json.

#### Parameters

| Name | Type |
| :------ | :------ |
| `rawAbi` | `Uint8Array` |

#### Returns

[`Abi`](../interfaces/RpcInterfaces.Abi.md)

#### Defined in

src/eosjs-api.ts:89

___

### sendSignedTransaction

▸ **sendSignedTransaction**(`__namedParameters`): `Promise`<`any`\>

Broadcast a signed transaction using send_transaction RPC

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`PushTransactionArgs`](../interfaces/RpcInterfaces.PushTransactionArgs.md) |

#### Returns

`Promise`<`any`\>

#### Defined in

src/eosjs-api.ts:376

___

### sendSignedTransaction2

▸ **sendSignedTransaction2**(`__namedParameters`): `Promise`<`any`\>

Broadcast a signed transaction using send_transaction2 RPC

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`SendTransaction2Args`](../interfaces/RpcInterfaces.SendTransaction2Args.md) |

#### Returns

`Promise`<`any`\>

#### Defined in

src/eosjs-api.ts:387

___

### serialize

▸ **serialize**(`buffer`, `type`, `value`): `void`

Convert `value` to binary form. `type` must be a built-in abi type or in `transaction.abi.json`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `buffer` | [`SerialBuffer`](Serialize.SerialBuffer.md) |
| `type` | `string` |
| `value` | `any` |

#### Returns

`void`

#### Defined in

src/eosjs-api.ts:157

___

### serializeActions

▸ **serializeActions**(`actions`): `Promise`<[`SerializedAction`](../interfaces/Serialize.SerializedAction.md)[]\>

Convert actions to hex

#### Parameters

| Name | Type |
| :------ | :------ |
| `actions` | [`Action`](../interfaces/Serialize.Action.md)[] |

#### Returns

`Promise`<[`SerializedAction`](../interfaces/Serialize.SerializedAction.md)[]\>

#### Defined in

src/eosjs-api.ts:202

___

### serializeContextFreeData

▸ **serializeContextFreeData**(`contextFreeData`): `Uint8Array`

Serialize context-free data

#### Parameters

| Name | Type |
| :------ | :------ |
| `contextFreeData` | `Uint8Array`[] |

#### Returns

`Uint8Array`

#### Defined in

src/eosjs-api.ts:182

___

### serializeTransaction

▸ **serializeTransaction**(`transaction`): `Uint8Array`

Convert a transaction to binary

#### Parameters

| Name | Type |
| :------ | :------ |
| `transaction` | `any` |

#### Returns

`Uint8Array`

#### Defined in

src/eosjs-api.ts:167

___

### transact

▸ **transact**(`transaction`, `__namedParameters?`): `Promise`<`any`\>

Create and optionally broadcast a transaction.

Named Parameters:
   * `broadcast`: broadcast this transaction?
   * `sign`: sign this transaction?
   * `useOldRPC`: use old RPC push_transaction, rather than new RPC send_transaction?
   * `useOldSendRPC`: use old RPC /v1/chain/send_transaction, rather than new RPC /v1/chain/send_transaction2?
   * `returnFailureTrace`: return partial traces on failed transactions?
   * `retryTrxNumBlocks`: request node to retry transaction until in a block of given height, blocking call?
   * `retryIrreversible`: request node to retry transaction until it is irreversible or expires, blocking call?
   * If both `blocksBehind` and `expireSeconds` are present,
     then fetch the block which is `blocksBehind` behind head block,
     use it as a reference for TAPoS, and expire the transaction `expireSeconds` after that block's time.

#### Parameters

| Name | Type |
| :------ | :------ |
| `transaction` | `any` |
| `__namedParameters` | `Object` |
| `__namedParameters.blocksBehind?` | `number` |
| `__namedParameters.broadcast?` | `boolean` |
| `__namedParameters.expireSeconds?` | `number` |
| `__namedParameters.retryIrreversible?` | `boolean` |
| `__namedParameters.retryTrxNumBlocks?` | `number` |
| `__namedParameters.returnFailureTrace?` | `boolean` |
| `__namedParameters.sign?` | `boolean` |
| `__namedParameters.useOldRPC?` | `boolean` |
| `__namedParameters.useOldSendRPC?` | `boolean` |

#### Returns

`Promise`<`any`\>

node response if `broadcast`, `{signatures, serializedTransaction}` if `!broadcast`

#### Defined in

src/eosjs-api.ts:248
