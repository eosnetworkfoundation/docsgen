[EOSIO Javascript](../index.md) / [Exports](../index.md) / [ApiInterfaces](../modules/ApiInterfaces.md) / AbiProvider

# Interface: AbiProvider

[ApiInterfaces](../modules/ApiInterfaces.md).AbiProvider

Retrieves raw ABIs for a specified accountName

## Implemented by

- [`JsonRpc`](../classes/JsonRpc.md)

## Table of contents

### Properties

- [getRawAbi](ApiInterfaces.AbiProvider.md#getrawabi)

## Properties

### getRawAbi

• **getRawAbi**: (`accountName`: `string`) => `Promise`<[`BinaryAbi`](ApiInterfaces.BinaryAbi.md)\>

#### Type declaration

▸ (`accountName`): `Promise`<[`BinaryAbi`](ApiInterfaces.BinaryAbi.md)\>

Retrieve the BinaryAbi

##### Parameters

| Name | Type |
| :------ | :------ |
| `accountName` | `string` |

##### Returns

`Promise`<[`BinaryAbi`](ApiInterfaces.BinaryAbi.md)\>

#### Defined in

src/eosjs-api-interfaces.ts:23
