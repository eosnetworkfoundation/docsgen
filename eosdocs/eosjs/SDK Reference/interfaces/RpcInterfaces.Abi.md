[EOSIO Javascript](../index.md) / [Exports](../index.md) / [RpcInterfaces](../modules/RpcInterfaces.md) / Abi

# Interface: Abi

[RpcInterfaces](../modules/RpcInterfaces.md).Abi

Structured format for abis

## Table of contents

### Properties

- [abi\_extensions](RpcInterfaces.Abi.md#abi_extensions)
- [actions](RpcInterfaces.Abi.md#actions)
- [error\_messages](RpcInterfaces.Abi.md#error_messages)
- [ricardian\_clauses](RpcInterfaces.Abi.md#ricardian_clauses)
- [structs](RpcInterfaces.Abi.md#structs)
- [tables](RpcInterfaces.Abi.md#tables)
- [types](RpcInterfaces.Abi.md#types)
- [variants](RpcInterfaces.Abi.md#variants)
- [version](RpcInterfaces.Abi.md#version)

## Properties

### abi\_extensions

• **abi\_extensions**: { `tag`: `number` ; `value`: `string`  }[]

#### Defined in

src/eosjs-rpc-interfaces.ts:12

___

### actions

• **actions**: { `name`: `string` ; `ricardian_contract`: `string` ; `type`: `string`  }[]

#### Defined in

src/eosjs-rpc-interfaces.ts:8

___

### error\_messages

• **error\_messages**: { `error_code`: `string` ; `error_msg`: `string`  }[]

#### Defined in

src/eosjs-rpc-interfaces.ts:11

___

### ricardian\_clauses

• **ricardian\_clauses**: { `body`: `string` ; `id`: `string`  }[]

#### Defined in

src/eosjs-rpc-interfaces.ts:10

___

### structs

• **structs**: { `base`: `string` ; `fields`: { `name`: `string` ; `type`: `string`  }[] ; `name`: `string`  }[]

#### Defined in

src/eosjs-rpc-interfaces.ts:7

___

### tables

• **tables**: { `index_type`: `string` ; `key_names`: `string`[] ; `key_types`: `string`[] ; `name`: `string` ; `type`: `string`  }[]

#### Defined in

src/eosjs-rpc-interfaces.ts:9

___

### types

• **types**: { `new_type_name`: `string` ; `type`: `string`  }[]

#### Defined in

src/eosjs-rpc-interfaces.ts:6

___

### variants

• `Optional` **variants**: { `name`: `string` ; `types`: `string`[]  }[]

#### Defined in

src/eosjs-rpc-interfaces.ts:13

___

### version

• **version**: `string`

#### Defined in

src/eosjs-rpc-interfaces.ts:5
