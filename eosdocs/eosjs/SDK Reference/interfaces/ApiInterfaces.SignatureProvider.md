[EOSIO Javascript](../index.md) / [Exports](../index.md) / [ApiInterfaces](../modules/ApiInterfaces.md) / SignatureProvider

# Interface: SignatureProvider

[ApiInterfaces](../modules/ApiInterfaces.md).SignatureProvider

Signs transactions

## Table of contents

### Properties

- [getAvailableKeys](ApiInterfaces.SignatureProvider.md#getavailablekeys)
- [sign](ApiInterfaces.SignatureProvider.md#sign)

## Properties

### getAvailableKeys

• **getAvailableKeys**: () => `Promise`<`string`[]\>

#### Type declaration

▸ (): `Promise`<`string`[]\>

Public keys associated with the private keys that the `SignatureProvider` holds

##### Returns

`Promise`<`string`[]\>

#### Defined in

src/eosjs-api-interfaces.ts:65

___

### sign

• **sign**: (`args`: [`SignatureProviderArgs`](ApiInterfaces.SignatureProviderArgs.md)) => `Promise`<[`PushTransactionArgs`](RpcInterfaces.PushTransactionArgs.md)\>

#### Type declaration

▸ (`args`): `Promise`<[`PushTransactionArgs`](RpcInterfaces.PushTransactionArgs.md)\>

Sign a transaction

##### Parameters

| Name | Type |
| :------ | :------ |
| `args` | [`SignatureProviderArgs`](ApiInterfaces.SignatureProviderArgs.md) |

##### Returns

`Promise`<[`PushTransactionArgs`](RpcInterfaces.PushTransactionArgs.md)\>

#### Defined in

src/eosjs-api-interfaces.ts:68
