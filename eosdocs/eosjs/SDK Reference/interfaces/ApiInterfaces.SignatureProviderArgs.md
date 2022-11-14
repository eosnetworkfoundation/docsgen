[EOSIO Javascript](../index.md) / [Exports](../index.md) / [ApiInterfaces](../modules/ApiInterfaces.md) / SignatureProviderArgs

# Interface: SignatureProviderArgs

[ApiInterfaces](../modules/ApiInterfaces.md).SignatureProviderArgs

Arguments to `sign`

## Table of contents

### Properties

- [abis](ApiInterfaces.SignatureProviderArgs.md#abis)
- [chainId](ApiInterfaces.SignatureProviderArgs.md#chainid)
- [requiredKeys](ApiInterfaces.SignatureProviderArgs.md#requiredkeys)
- [serializedContextFreeData](ApiInterfaces.SignatureProviderArgs.md#serializedcontextfreedata)
- [serializedTransaction](ApiInterfaces.SignatureProviderArgs.md#serializedtransaction)

## Properties

### abis

• **abis**: [`BinaryAbi`](ApiInterfaces.BinaryAbi.md)[]

ABIs for all contracts with actions included in `serializedTransaction`

#### Defined in

src/eosjs-api-interfaces.ts:59

___

### chainId

• **chainId**: `string`

Chain transaction is for

#### Defined in

src/eosjs-api-interfaces.ts:47

___

### requiredKeys

• **requiredKeys**: `string`[]

Public keys associated with the private keys needed to sign the transaction

#### Defined in

src/eosjs-api-interfaces.ts:50

___

### serializedContextFreeData

• `Optional` **serializedContextFreeData**: `Uint8Array`

Context-free data to sign

#### Defined in

src/eosjs-api-interfaces.ts:56

___

### serializedTransaction

• **serializedTransaction**: `Uint8Array`

Transaction to sign

#### Defined in

src/eosjs-api-interfaces.ts:53
