[EOSIO Javascript](../index.md) / [Exports](../index.md) / [ApiInterfaces](../modules/ApiInterfaces.md) / AuthorityProvider

# Interface: AuthorityProvider

[ApiInterfaces](../modules/ApiInterfaces.md).AuthorityProvider

Get subset of `availableKeys` needed to meet authorities in `transaction`

## Implemented by

- [`JsonRpc`](../classes/JsonRpc.md)

## Table of contents

### Properties

- [getRequiredKeys](ApiInterfaces.AuthorityProvider.md#getrequiredkeys)

## Properties

### getRequiredKeys

• **getRequiredKeys**: (`args`: [`AuthorityProviderArgs`](ApiInterfaces.AuthorityProviderArgs.md)) => `Promise`<`string`[]\>

#### Type declaration

▸ (`args`): `Promise`<`string`[]\>

Get subset of `availableKeys` needed to meet authorities in `transaction`

##### Parameters

| Name | Type |
| :------ | :------ |
| `args` | [`AuthorityProviderArgs`](ApiInterfaces.AuthorityProviderArgs.md) |

##### Returns

`Promise`<`string`[]\>

#### Defined in

src/eosjs-api-interfaces.ts:17
