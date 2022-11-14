[EOSIO Javascript](../index.md) / [Exports](../index.md) / [Serialize](../modules/Serialize.md) / Type

# Interface: Type

[Serialize](../modules/Serialize.md).Type

A type in an abi

## Table of contents

### Properties

- [aliasOfName](Serialize.Type.md#aliasofname)
- [arrayOf](Serialize.Type.md#arrayof)
- [base](Serialize.Type.md#base)
- [baseName](Serialize.Type.md#basename)
- [deserialize](Serialize.Type.md#deserialize)
- [extensionOf](Serialize.Type.md#extensionof)
- [fields](Serialize.Type.md#fields)
- [name](Serialize.Type.md#name)
- [optionalOf](Serialize.Type.md#optionalof)
- [serialize](Serialize.Type.md#serialize)

## Properties

### aliasOfName

• **aliasOfName**: `string`

Type name this is an alias of, if any

#### Defined in

src/eosjs-serialize.ts:44

___

### arrayOf

• **arrayOf**: [`Type`](Serialize.Type.md)

Type this is an array of, if any

#### Defined in

src/eosjs-serialize.ts:47

___

### base

• **base**: [`Type`](Serialize.Type.md)

Base of this type, if this is a struct

#### Defined in

src/eosjs-serialize.ts:59

___

### baseName

• **baseName**: `string`

Base name of this type, if this is a struct

#### Defined in

src/eosjs-serialize.ts:56

___

### deserialize

• **deserialize**: (`buffer`: [`SerialBuffer`](../classes/Serialize.SerialBuffer.md), `state?`: [`SerializerState`](../classes/Serialize.SerializerState.md), `allowExtensions?`: `boolean`) => `any`

#### Type declaration

▸ (`buffer`, `state?`, `allowExtensions?`): `any`

Convert data in `buffer` from binary form

##### Parameters

| Name | Type |
| :------ | :------ |
| `buffer` | [`SerialBuffer`](../classes/Serialize.SerialBuffer.md) |
| `state?` | [`SerializerState`](../classes/Serialize.SerializerState.md) |
| `allowExtensions?` | `boolean` |

##### Returns

`any`

#### Defined in

src/eosjs-serialize.ts:68

___

### extensionOf

• `Optional` **extensionOf**: [`Type`](Serialize.Type.md)

Marks binary extension fields

#### Defined in

src/eosjs-serialize.ts:53

___

### fields

• **fields**: [`Field`](Serialize.Field.md)[]

Contained fields, if this is a struct

#### Defined in

src/eosjs-serialize.ts:62

___

### name

• **name**: `string`

Type name

#### Defined in

src/eosjs-serialize.ts:41

___

### optionalOf

• **optionalOf**: [`Type`](Serialize.Type.md)

Type this is an optional of, if any

#### Defined in

src/eosjs-serialize.ts:50

___

### serialize

• **serialize**: (`buffer`: [`SerialBuffer`](../classes/Serialize.SerialBuffer.md), `data`: `any`, `state?`: [`SerializerState`](../classes/Serialize.SerializerState.md), `allowExtensions?`: `boolean`) => `void`

#### Type declaration

▸ (`buffer`, `data`, `state?`, `allowExtensions?`): `void`

Convert `data` to binary form and store in `buffer`

##### Parameters

| Name | Type |
| :------ | :------ |
| `buffer` | [`SerialBuffer`](../classes/Serialize.SerialBuffer.md) |
| `data` | `any` |
| `state?` | [`SerializerState`](../classes/Serialize.SerializerState.md) |
| `allowExtensions?` | `boolean` |

##### Returns

`void`

#### Defined in

src/eosjs-serialize.ts:65
