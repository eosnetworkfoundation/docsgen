[EOSIO Javascript](../index.md) / [Exports](../index.md) / [Serialize](../modules/Serialize.md) / SerialBuffer

# Class: SerialBuffer

[Serialize](../modules/Serialize.md).SerialBuffer

Serialize and deserialize data

## Table of contents

### Constructors

- [constructor](Serialize.SerialBuffer.md#constructor)

### Properties

- [array](Serialize.SerialBuffer.md#array)
- [length](Serialize.SerialBuffer.md#length)
- [readPos](Serialize.SerialBuffer.md#readpos)
- [textDecoder](Serialize.SerialBuffer.md#textdecoder)
- [textEncoder](Serialize.SerialBuffer.md#textencoder)

### Methods

- [asUint8Array](Serialize.SerialBuffer.md#asuint8array)
- [get](Serialize.SerialBuffer.md#get)
- [getAsset](Serialize.SerialBuffer.md#getasset)
- [getBytes](Serialize.SerialBuffer.md#getbytes)
- [getFloat32](Serialize.SerialBuffer.md#getfloat32)
- [getFloat64](Serialize.SerialBuffer.md#getfloat64)
- [getName](Serialize.SerialBuffer.md#getname)
- [getPrivateKey](Serialize.SerialBuffer.md#getprivatekey)
- [getPublicKey](Serialize.SerialBuffer.md#getpublickey)
- [getSignature](Serialize.SerialBuffer.md#getsignature)
- [getString](Serialize.SerialBuffer.md#getstring)
- [getSymbol](Serialize.SerialBuffer.md#getsymbol)
- [getSymbolCode](Serialize.SerialBuffer.md#getsymbolcode)
- [getUint16](Serialize.SerialBuffer.md#getuint16)
- [getUint32](Serialize.SerialBuffer.md#getuint32)
- [getUint64AsNumber](Serialize.SerialBuffer.md#getuint64asnumber)
- [getUint8Array](Serialize.SerialBuffer.md#getuint8array)
- [getVarint32](Serialize.SerialBuffer.md#getvarint32)
- [getVaruint32](Serialize.SerialBuffer.md#getvaruint32)
- [haveReadData](Serialize.SerialBuffer.md#havereaddata)
- [push](Serialize.SerialBuffer.md#push)
- [pushArray](Serialize.SerialBuffer.md#pusharray)
- [pushAsset](Serialize.SerialBuffer.md#pushasset)
- [pushBytes](Serialize.SerialBuffer.md#pushbytes)
- [pushFloat32](Serialize.SerialBuffer.md#pushfloat32)
- [pushFloat64](Serialize.SerialBuffer.md#pushfloat64)
- [pushName](Serialize.SerialBuffer.md#pushname)
- [pushNumberAsUint64](Serialize.SerialBuffer.md#pushnumberasuint64)
- [pushPrivateKey](Serialize.SerialBuffer.md#pushprivatekey)
- [pushPublicKey](Serialize.SerialBuffer.md#pushpublickey)
- [pushSignature](Serialize.SerialBuffer.md#pushsignature)
- [pushString](Serialize.SerialBuffer.md#pushstring)
- [pushSymbol](Serialize.SerialBuffer.md#pushsymbol)
- [pushSymbolCode](Serialize.SerialBuffer.md#pushsymbolcode)
- [pushUint16](Serialize.SerialBuffer.md#pushuint16)
- [pushUint32](Serialize.SerialBuffer.md#pushuint32)
- [pushUint8ArrayChecked](Serialize.SerialBuffer.md#pushuint8arraychecked)
- [pushVarint32](Serialize.SerialBuffer.md#pushvarint32)
- [pushVaruint32](Serialize.SerialBuffer.md#pushvaruint32)
- [reserve](Serialize.SerialBuffer.md#reserve)
- [restartRead](Serialize.SerialBuffer.md#restartread)
- [skip](Serialize.SerialBuffer.md#skip)

## Constructors

### constructor

• **new SerialBuffer**(`__namedParameters?`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `__namedParameters` | `Object` | * `array`: `null` if serializing, or binary data to deserialize    * `textEncoder`: `TextEncoder` instance to use. Pass in `null` if running in a browser    * `textDecoder`: `TextDecider` instance to use. Pass in `null` if running in a browser |
| `__namedParameters.array?` | `Uint8Array` | - |
| `__namedParameters.textDecoder?` | `TextDecoder` | - |
| `__namedParameters.textEncoder?` | `TextEncoder` | - |

#### Defined in

src/eosjs-serialize.ts:126

## Properties

### array

• **array**: `Uint8Array`

Data in serialized (binary) form

#### Defined in

src/eosjs-serialize.ts:112

___

### length

• **length**: `number`

Amount of valid data in `array`

#### Defined in

src/eosjs-serialize.ts:109

___

### readPos

• **readPos**: `number` = `0`

Current position while reading (deserializing)

#### Defined in

src/eosjs-serialize.ts:115

___

### textDecoder

• **textDecoder**: `TextDecoder`

#### Defined in

src/eosjs-serialize.ts:118

___

### textEncoder

• **textEncoder**: `TextEncoder`

#### Defined in

src/eosjs-serialize.ts:117

## Methods

### asUint8Array

▸ **asUint8Array**(): `Uint8Array`

Return data with excess storage trimmed away

#### Returns

`Uint8Array`

#### Defined in

src/eosjs-serialize.ts:159

___

### get

▸ **get**(): `number`

Get a single byte

#### Returns

`number`

#### Defined in

src/eosjs-serialize.ts:176

___

### getAsset

▸ **getAsset**(): `string`

Get an asset

#### Returns

`string`

#### Defined in

src/eosjs-serialize.ts:480

___

### getBytes

▸ **getBytes**(): `Uint8Array`

Get length-prefixed binary data

#### Returns

`Uint8Array`

#### Defined in

src/eosjs-serialize.ts:380

___

### getFloat32

▸ **getFloat32**(): `number`

Get a `float32`

#### Returns

`number`

#### Defined in

src/eosjs-serialize.ts:302

___

### getFloat64

▸ **getFloat64**(): `number`

Get a `float64`

#### Returns

`number`

#### Defined in

src/eosjs-serialize.ts:312

___

### getName

▸ **getName**(): `string`

Get a `name`

#### Returns

`string`

#### Defined in

src/eosjs-serialize.ts:348

___

### getPrivateKey

▸ **getPrivateKey**(): `string`

Get a private key

#### Returns

`string`

#### Defined in

src/eosjs-serialize.ts:520

___

### getPublicKey

▸ **getPublicKey**(): `string`

Get a public key

#### Returns

`string`

#### Defined in

src/eosjs-serialize.ts:498

___

### getSignature

▸ **getSignature**(): `string`

Get a signature

#### Returns

`string`

#### Defined in

src/eosjs-serialize.ts:534

___

### getString

▸ **getString**(): `string`

Get a string

#### Returns

`string`

#### Defined in

src/eosjs-serialize.ts:390

___

### getSymbol

▸ **getSymbol**(): `Object`

Get a `symbol`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `precision` | `number` |

#### Defined in

src/eosjs-serialize.ts:431

___

### getSymbolCode

▸ **getSymbolCode**(): `string`

Get a `symbol_code`. Unlike `symbol`, `symbol_code` doesn't include a precision.

#### Returns

`string`

#### Defined in

src/eosjs-serialize.ts:408

___

### getUint16

▸ **getUint16**(): `number`

Get a `uint16`

#### Returns

`number`

#### Defined in

src/eosjs-serialize.ts:215

___

### getUint32

▸ **getUint32**(): `number`

Get a `uint32`

#### Returns

`number`

#### Defined in

src/eosjs-serialize.ts:228

___

### getUint64AsNumber

▸ **getUint64AsNumber**(): `number`

Get a `uint64` as a `number`. *Caution*: `number` only has 53 bits of precision; some values will change.
`numeric.binaryToDecimal(serialBuffer.getUint8Array(8))` recommended instead

#### Returns

`number`

#### Defined in

src/eosjs-serialize.ts:247

___

### getUint8Array

▸ **getUint8Array**(`len`): `Uint8Array`

Get `len` bytes

#### Parameters

| Name | Type |
| :------ | :------ |
| `len` | `number` |

#### Returns

`Uint8Array`

#### Defined in

src/eosjs-serialize.ts:192

___

### getVarint32

▸ **getVarint32**(): `number`

Get a `varint32`

#### Returns

`number`

#### Defined in

src/eosjs-serialize.ts:287

___

### getVaruint32

▸ **getVaruint32**(): `number`

Get a `varuint32`

#### Returns

`number`

#### Defined in

src/eosjs-serialize.ts:267

___

### haveReadData

▸ **haveReadData**(): `boolean`

Is there data available to read?

#### Returns

`boolean`

#### Defined in

src/eosjs-serialize.ts:149

___

### push

▸ **push**(...`v`): `void`

Append bytes

#### Parameters

| Name | Type |
| :------ | :------ |
| `...v` | `number`[] |

#### Returns

`void`

#### Defined in

src/eosjs-serialize.ts:171

___

### pushArray

▸ **pushArray**(`v`): `void`

Append bytes

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `Uint8Array` \| `number`[] |

#### Returns

`void`

#### Defined in

src/eosjs-serialize.ts:164

___

### pushAsset

▸ **pushAsset**(`s`): `void`

Append an asset

#### Parameters

| Name | Type |
| :------ | :------ |
| `s` | `string` |

#### Returns

`void`

#### Defined in

src/eosjs-serialize.ts:445

___

### pushBytes

▸ **pushBytes**(`v`): `void`

Append length-prefixed binary data

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `Uint8Array` \| `number`[] |

#### Returns

`void`

#### Defined in

src/eosjs-serialize.ts:374

___

### pushFloat32

▸ **pushFloat32**(`v`): `void`

Append a `float32`

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `number` |

#### Returns

`void`

#### Defined in

src/eosjs-serialize.ts:297

___

### pushFloat64

▸ **pushFloat64**(`v`): `void`

Append a `float64`

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `number` |

#### Returns

`void`

#### Defined in

src/eosjs-serialize.ts:307

___

### pushName

▸ **pushName**(`s`): `void`

Append a `name`

#### Parameters

| Name | Type |
| :------ | :------ |
| `s` | `string` |

#### Returns

`void`

#### Defined in

src/eosjs-serialize.ts:317

___

### pushNumberAsUint64

▸ **pushNumberAsUint64**(`v`): `void`

Append a `uint64`. *Caution*: `number` only has 53 bits of precision

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `number` |

#### Returns

`void`

#### Defined in

src/eosjs-serialize.ts:238

___

### pushPrivateKey

▸ **pushPrivateKey**(`s`): `void`

Append a private key

#### Parameters

| Name | Type |
| :------ | :------ |
| `s` | `string` |

#### Returns

`void`

#### Defined in

src/eosjs-serialize.ts:513

___

### pushPublicKey

▸ **pushPublicKey**(`s`): `void`

Append a public key

#### Parameters

| Name | Type |
| :------ | :------ |
| `s` | `string` |

#### Returns

`void`

#### Defined in

src/eosjs-serialize.ts:491

___

### pushSignature

▸ **pushSignature**(`s`): `void`

Append a signature

#### Parameters

| Name | Type |
| :------ | :------ |
| `s` | `string` |

#### Returns

`void`

#### Defined in

src/eosjs-serialize.ts:527

___

### pushString

▸ **pushString**(`v`): `void`

Append a string

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `string` |

#### Returns

`void`

#### Defined in

src/eosjs-serialize.ts:385

___

### pushSymbol

▸ **pushSymbol**(`__namedParameters`): `void`

Append a `symbol`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.name` | `string` |
| `__namedParameters.precision` | `number` |

#### Returns

`void`

#### Defined in

src/eosjs-serialize.ts:421

___

### pushSymbolCode

▸ **pushSymbolCode**(`name`): `void`

Append a `symbol_code`. Unlike `symbol`, `symbol_code` doesn't include a precision.

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`void`

#### Defined in

src/eosjs-serialize.ts:395

___

### pushUint16

▸ **pushUint16**(`v`): `void`

Append a `uint16`

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `number` |

#### Returns

`void`

#### Defined in

src/eosjs-serialize.ts:210

___

### pushUint32

▸ **pushUint32**(`v`): `void`

Append a `uint32`

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `number` |

#### Returns

`void`

#### Defined in

src/eosjs-serialize.ts:223

___

### pushUint8ArrayChecked

▸ **pushUint8ArrayChecked**(`v`, `len`): `void`

Append bytes in `v`. Throws if `len` doesn't match `v.length`

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `Uint8Array` |
| `len` | `number` |

#### Returns

`void`

#### Defined in

src/eosjs-serialize.ts:184

___

### pushVarint32

▸ **pushVarint32**(`v`): `void`

Append a `varint32`

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `number` |

#### Returns

`void`

#### Defined in

src/eosjs-serialize.ts:282

___

### pushVaruint32

▸ **pushVaruint32**(`v`): `void`

Append a `varuint32`

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `number` |

#### Returns

`void`

#### Defined in

src/eosjs-serialize.ts:254

___

### reserve

▸ **reserve**(`size`): `void`

Resize `array` if needed to have at least `size` bytes free

#### Parameters

| Name | Type |
| :------ | :------ |
| `size` | `number` |

#### Returns

`void`

#### Defined in

src/eosjs-serialize.ts:135

___

### restartRead

▸ **restartRead**(): `void`

Restart reading from the beginning

#### Returns

`void`

#### Defined in

src/eosjs-serialize.ts:154

___

### skip

▸ **skip**(`len`): `void`

Skip `len` bytes

#### Parameters

| Name | Type |
| :------ | :------ |
| `len` | `number` |

#### Returns

`void`

#### Defined in

src/eosjs-serialize.ts:202
