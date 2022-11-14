[EOSIO Javascript](../index.md) / [Exports](../index.md) / RpcError

# Class: RpcError

Holds detailed error information

## Hierarchy

- `Error`

  ↳ **`RpcError`**

## Table of contents

### Constructors

- [constructor](RpcError.md#constructor)

### Properties

- [json](RpcError.md#json)
- [message](RpcError.md#message)
- [name](RpcError.md#name)
- [stack](RpcError.md#stack)
- [prepareStackTrace](RpcError.md#preparestacktrace)
- [stackTraceLimit](RpcError.md#stacktracelimit)

### Methods

- [captureStackTrace](RpcError.md#capturestacktrace)

## Constructors

### constructor

• **new RpcError**(`json`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | `any` |

#### Overrides

Error.constructor

#### Defined in

src/eosjs-rpcerror.ts:11

## Properties

### json

• **json**: `any`

Detailed error information

#### Defined in

src/eosjs-rpcerror.ts:9

___

### message

• **message**: `string`

#### Inherited from

Error.message

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1041

___

### name

• **name**: `string`

#### Inherited from

Error.name

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1040

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

Error.stack

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1042

___

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

#### Type declaration

▸ (`err`, `stackTraces`): `any`

Optional override for formatting stack traces

**`See`**

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

##### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` |
| `stackTraces` | `CallSite`[] |

##### Returns

`any`

#### Inherited from

Error.prepareStackTrace

#### Defined in

node_modules/@types/node/ts4.8/globals.d.ts:11

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

Error.stackTraceLimit

#### Defined in

node_modules/@types/node/ts4.8/globals.d.ts:13

## Methods

### captureStackTrace

▸ `Static` **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

Create .stack property on a target object

#### Parameters

| Name | Type |
| :------ | :------ |
| `targetObject` | `object` |
| `constructorOpt?` | `Function` |

#### Returns

`void`

#### Inherited from

Error.captureStackTrace

#### Defined in

node_modules/@types/node/ts4.8/globals.d.ts:4
