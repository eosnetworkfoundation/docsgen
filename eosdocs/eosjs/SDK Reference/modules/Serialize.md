[EOSIO Javascript](../index.md) / [Exports](../index.md) / Serialize

# Namespace: Serialize

## Table of contents

### Classes

- [SerialBuffer](../classes/Serialize.SerialBuffer.md)
- [SerializerState](../classes/Serialize.SerializerState.md)

### Interfaces

- [Action](../interfaces/Serialize.Action.md)
- [Authorization](../interfaces/Serialize.Authorization.md)
- [Contract](../interfaces/Serialize.Contract.md)
- [Field](../interfaces/Serialize.Field.md)
- [SerializedAction](../interfaces/Serialize.SerializedAction.md)
- [SerializerOptions](../interfaces/Serialize.SerializerOptions.md)
- [Symbol](../interfaces/Serialize.Symbol.md)
- [Type](../interfaces/Serialize.Type.md)

### Functions

- [arrayToHex](Serialize.md#arraytohex)
- [blockTimestampToDate](Serialize.md#blocktimestamptodate)
- [createInitialTypes](Serialize.md#createinitialtypes)
- [dateToBlockTimestamp](Serialize.md#datetoblocktimestamp)
- [dateToTimePoint](Serialize.md#datetotimepoint)
- [dateToTimePointSec](Serialize.md#datetotimepointsec)
- [deserializeAction](Serialize.md#deserializeaction)
- [deserializeActionData](Serialize.md#deserializeactiondata)
- [getType](Serialize.md#gettype)
- [getTypesFromAbi](Serialize.md#gettypesfromabi)
- [hexToUint8Array](Serialize.md#hextouint8array)
- [serializeAction](Serialize.md#serializeaction)
- [serializeActionData](Serialize.md#serializeactiondata)
- [stringToSymbol](Serialize.md#stringtosymbol)
- [supportedAbiVersion](Serialize.md#supportedabiversion)
- [symbolToString](Serialize.md#symboltostring)
- [timePointSecToDate](Serialize.md#timepointsectodate)
- [timePointToDate](Serialize.md#timepointtodate)
- [transactionHeader](Serialize.md#transactionheader)

## Functions

### arrayToHex

▸ **arrayToHex**(`data`): `string`

Convert binary data to hex

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Uint8Array` |

#### Returns

`string`

#### Defined in

src/eosjs-serialize.ts:614

___

### blockTimestampToDate

▸ **blockTimestampToDate**(`slot`): `string`

Convert `block_timestamp_type` (half-seconds since a different epoch) to to date in ISO format

#### Parameters

| Name | Type |
| :------ | :------ |
| `slot` | `number` |

#### Returns

`string`

#### Defined in

src/eosjs-serialize.ts:591

___

### createInitialTypes

▸ **createInitialTypes**(): `Map`<`string`, [`Type`](../interfaces/Serialize.Type.md)\>

Create the set of types built-in to the abi format

#### Returns

`Map`<`string`, [`Type`](../interfaces/Serialize.Type.md)\>

#### Defined in

src/eosjs-serialize.ts:798

___

### dateToBlockTimestamp

▸ **dateToBlockTimestamp**(`date`): `number`

Convert date in ISO format to `block_timestamp_type` (half-seconds since a different epoch)

#### Parameters

| Name | Type |
| :------ | :------ |
| `date` | `string` |

#### Returns

`number`

#### Defined in

src/eosjs-serialize.ts:586

___

### dateToTimePoint

▸ **dateToTimePoint**(`date`): `number`

Convert date in ISO format to `time_point` (miliseconds since epoch)

#### Parameters

| Name | Type |
| :------ | :------ |
| `date` | `string` |

#### Returns

`number`

#### Defined in

src/eosjs-serialize.ts:564

___

### dateToTimePointSec

▸ **dateToTimePointSec**(`date`): `number`

Convert date in ISO format to `time_point_sec` (seconds since epoch)

#### Parameters

| Name | Type |
| :------ | :------ |
| `date` | `string` |

#### Returns

`number`

#### Defined in

src/eosjs-serialize.ts:575

___

### deserializeAction

▸ **deserializeAction**(`contract`, `account`, `name`, `authorization`, `data`, `textEncoder`, `textDecoder`): [`Action`](../interfaces/Serialize.Action.md)

Deserialize action. If `data` is a `string`, then it's assumed to be in hex.

#### Parameters

| Name | Type |
| :------ | :------ |
| `contract` | [`Contract`](../interfaces/Serialize.Contract.md) |
| `account` | `string` |
| `name` | `string` |
| `authorization` | [`Authorization`](../interfaces/Serialize.Authorization.md)[] |
| `data` | `string` \| `Uint8Array` \| `number`[] |
| `textEncoder` | `TextEncoder` |
| `textDecoder` | `TextDecoder` |

#### Returns

[`Action`](../interfaces/Serialize.Action.md)

#### Defined in

src/eosjs-serialize.ts:1133

___

### deserializeActionData

▸ **deserializeActionData**(`contract`, `account`, `name`, `data`, `textEncoder`, `textDecoder`): `any`

Deserialize action data. If `data` is a `string`, then it's assumed to be in hex.

#### Parameters

| Name | Type |
| :------ | :------ |
| `contract` | [`Contract`](../interfaces/Serialize.Contract.md) |
| `account` | `string` |
| `name` | `string` |
| `data` | `string` \| `Uint8Array` \| `number`[] |
| `textEncoder` | `TextEncoder` |
| `textDecoder` | `TextDecoder` |

#### Returns

`any`

#### Defined in

src/eosjs-serialize.ts:1117

___

### getType

▸ **getType**(`types`, `name`): [`Type`](../interfaces/Serialize.Type.md)

Get type from `types`

#### Parameters

| Name | Type |
| :------ | :------ |
| `types` | `Map`<`string`, [`Type`](../interfaces/Serialize.Type.md)\> |
| `name` | `string` |

#### Returns

[`Type`](../interfaces/Serialize.Type.md)

#### Defined in

src/eosjs-serialize.ts:996

___

### getTypesFromAbi

▸ **getTypesFromAbi**(`initialTypes`, `abi`): `Map`<`string`, [`Type`](../interfaces/Serialize.Type.md)\>

Get types from abi

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `initialTypes` | `Map`<`string`, [`Type`](../interfaces/Serialize.Type.md)\> | Set of types to build on.     In most cases, it's best to fill this from a fresh call to `getTypesFromAbi()`. |
| `abi` | [`Abi`](../interfaces/RpcInterfaces.Abi.md) | - |

#### Returns

`Map`<`string`, [`Type`](../interfaces/Serialize.Type.md)\>

#### Defined in

src/eosjs-serialize.ts:1036

___

### hexToUint8Array

▸ **hexToUint8Array**(`hex`): `Uint8Array`

Convert hex to binary data

#### Parameters

| Name | Type |
| :------ | :------ |
| `hex` | `string` |

#### Returns

`Uint8Array`

#### Defined in

src/eosjs-serialize.ts:623

___

### serializeAction

▸ **serializeAction**(`contract`, `account`, `name`, `authorization`, `data`, `textEncoder`, `textDecoder`): [`SerializedAction`](../interfaces/Serialize.SerializedAction.md)

Return action in serialized form

#### Parameters

| Name | Type |
| :------ | :------ |
| `contract` | [`Contract`](../interfaces/Serialize.Contract.md) |
| `account` | `string` |
| `name` | `string` |
| `authorization` | [`Authorization`](../interfaces/Serialize.Authorization.md)[] |
| `data` | `any` |
| `textEncoder` | `TextEncoder` |
| `textDecoder` | `TextDecoder` |

#### Returns

[`SerializedAction`](../interfaces/Serialize.SerializedAction.md)

#### Defined in

src/eosjs-serialize.ts:1105

___

### serializeActionData

▸ **serializeActionData**(`contract`, `account`, `name`, `data`, `textEncoder`, `textDecoder`): `string`

Convert action data to serialized form (hex)

#### Parameters

| Name | Type |
| :------ | :------ |
| `contract` | [`Contract`](../interfaces/Serialize.Contract.md) |
| `account` | `string` |
| `name` | `string` |
| `data` | `any` |
| `textEncoder` | `TextEncoder` |
| `textDecoder` | `TextDecoder` |

#### Returns

`string`

#### Defined in

src/eosjs-serialize.ts:1093

___

### stringToSymbol

▸ **stringToSymbol**(`s`): `Object`

Convert `string` to `Symbol`. format: `precision,NAME`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `s` | `string` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `precision` | `number` |

#### Defined in

src/eosjs-serialize.ts:597

___

### supportedAbiVersion

▸ **supportedAbiVersion**(`version`): `boolean`

Is this a supported ABI version?

#### Parameters

| Name | Type |
| :------ | :------ |
| `version` | `string` |

#### Returns

`boolean`

#### Defined in

src/eosjs-serialize.ts:551

___

### symbolToString

▸ **symbolToString**(`__namedParameters`): `string`

Convert `Symbol` to `string`. format: `precision,NAME`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.name` | `string` |
| `__namedParameters.precision` | `number` |

#### Returns

`string`

#### Defined in

src/eosjs-serialize.ts:609

___

### timePointSecToDate

▸ **timePointSecToDate**(`sec`): `string`

Convert `time_point_sec` (seconds since epoch) to to date in ISO format

#### Parameters

| Name | Type |
| :------ | :------ |
| `sec` | `number` |

#### Returns

`string`

#### Defined in

src/eosjs-serialize.ts:580

___

### timePointToDate

▸ **timePointToDate**(`us`): `string`

Convert `time_point` (miliseconds since epoch) to date in ISO format

#### Parameters

| Name | Type |
| :------ | :------ |
| `us` | `number` |

#### Returns

`string`

#### Defined in

src/eosjs-serialize.ts:569

___

### transactionHeader

▸ **transactionHeader**(`refBlock`, `expireSeconds`): `Object`

TAPoS: Return transaction fields which reference `refBlock` and expire `expireSeconds` after `timestamp`

#### Parameters

| Name | Type |
| :------ | :------ |
| `refBlock` | [`BlockTaposInfo`](../interfaces/RpcInterfaces.BlockTaposInfo.md) |
| `expireSeconds` | `number` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `expiration` | `string` |
| `ref_block_num` | `number` |
| `ref_block_prefix` | `number` |

#### Defined in

src/eosjs-serialize.ts:1081
