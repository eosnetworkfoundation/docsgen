[EOSIO Javascript](../index.md) / [Exports](../index.md) / Numeric

# Namespace: Numeric

## Table of contents

### Enumerations

- [KeyType](../enums/Numeric.KeyType.md)

### Interfaces

- [Key](../interfaces/Numeric.Key.md)

### Variables

- [privateKeyDataSize](Numeric.md#privatekeydatasize)
- [publicKeyDataSize](Numeric.md#publickeydatasize)
- [signatureDataSize](Numeric.md#signaturedatasize)

### Functions

- [base58ToBinary](Numeric.md#base58tobinary)
- [base64ToBinary](Numeric.md#base64tobinary)
- [binaryToBase58](Numeric.md#binarytobase58)
- [binaryToDecimal](Numeric.md#binarytodecimal)
- [convertLegacyPublicKey](Numeric.md#convertlegacypublickey)
- [convertLegacyPublicKeys](Numeric.md#convertlegacypublickeys)
- [decimalToBinary](Numeric.md#decimaltobinary)
- [isNegative](Numeric.md#isnegative)
- [negate](Numeric.md#negate)
- [privateKeyToLegacyString](Numeric.md#privatekeytolegacystring)
- [privateKeyToString](Numeric.md#privatekeytostring)
- [publicKeyToLegacyString](Numeric.md#publickeytolegacystring)
- [publicKeyToString](Numeric.md#publickeytostring)
- [signatureToString](Numeric.md#signaturetostring)
- [signedBinaryToDecimal](Numeric.md#signedbinarytodecimal)
- [signedDecimalToBinary](Numeric.md#signeddecimaltobinary)
- [stringToPrivateKey](Numeric.md#stringtoprivatekey)
- [stringToPublicKey](Numeric.md#stringtopublickey)
- [stringToSignature](Numeric.md#stringtosignature)

## Variables

### privateKeyDataSize

• `Const` **privateKeyDataSize**: ``32``

Private key data size, excluding type field

#### Defined in

src/eosjs-numeric.ts:273

___

### publicKeyDataSize

• `Const` **publicKeyDataSize**: ``33``

Public key data size, excluding type field

#### Defined in

src/eosjs-numeric.ts:270

___

### signatureDataSize

• `Const` **signatureDataSize**: ``65``

Signature data size, excluding type field

#### Defined in

src/eosjs-numeric.ts:276

## Functions

### base58ToBinary

▸ **base58ToBinary**(`size`, `s`): `Uint8Array`

Convert an unsigned base-58 number in `s` to a bignum

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `size` | `number` | bignum size (bytes) |
| `s` | `string` | - |

#### Returns

`Uint8Array`

#### Defined in

src/eosjs-numeric.ts:173

___

### base64ToBinary

▸ **base64ToBinary**(`s`): `Uint8Array`

Convert an unsigned base-64 number in `s` to a bignum

#### Parameters

| Name | Type |
| :------ | :------ |
| `s` | `string` |

#### Returns

`Uint8Array`

#### Defined in

src/eosjs-numeric.ts:227

___

### binaryToBase58

▸ **binaryToBase58**(`bignum`, `minDigits?`): `string`

Convert `bignum` to a base-58 number

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `bignum` | `Uint8Array` | `undefined` | - |
| `minDigits` | `number` | `1` | 0-pad result to this many digits |

#### Returns

`string`

#### Defined in

src/eosjs-numeric.ts:201

___

### binaryToDecimal

▸ **binaryToDecimal**(`bignum`, `minDigits?`): `string`

Convert `bignum` to an unsigned decimal number

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `bignum` | `Uint8Array` | `undefined` | - |
| `minDigits` | `number` | `1` | 0-pad result to this many digits |

#### Returns

`string`

#### Defined in

src/eosjs-numeric.ts:109

___

### convertLegacyPublicKey

▸ **convertLegacyPublicKey**(`s`): `string`

If a key is in the legacy format (`EOS` prefix), then convert it to the new format (`PUB_K1_`).
Leaves other formats untouched

#### Parameters

| Name | Type |
| :------ | :------ |
| `s` | `string` |

#### Returns

`string`

#### Defined in

src/eosjs-numeric.ts:373

___

### convertLegacyPublicKeys

▸ **convertLegacyPublicKeys**(`keys`): `string`[]

If a key is in the legacy format (`EOS` prefix), then convert it to the new format (`PUB_K1_`).
Leaves other formats untouched

#### Parameters

| Name | Type |
| :------ | :------ |
| `keys` | `string`[] |

#### Returns

`string`[]

#### Defined in

src/eosjs-numeric.ts:383

___

### decimalToBinary

▸ **decimalToBinary**(`size`, `s`): `Uint8Array`

Convert an unsigned decimal number in `s` to a bignum

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `size` | `number` | bignum size (bytes) |
| `s` | `string` | - |

#### Returns

`Uint8Array`

#### Defined in

src/eosjs-numeric.ts:62

___

### isNegative

▸ **isNegative**(`bignum`): `boolean`

Is `bignum` a negative number?

#### Parameters

| Name | Type |
| :------ | :------ |
| `bignum` | `Uint8Array` |

#### Returns

`boolean`

#### Defined in

src/eosjs-numeric.ts:43

___

### negate

▸ **negate**(`bignum`): `void`

Negate `bignum`

#### Parameters

| Name | Type |
| :------ | :------ |
| `bignum` | `Uint8Array` |

#### Returns

`void`

#### Defined in

src/eosjs-numeric.ts:48

___

### privateKeyToLegacyString

▸ **privateKeyToLegacyString**(`key`): `string`

Convert private `key` to legacy string (base-58) form

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | [`Key`](../interfaces/Numeric.Key.md) |

#### Returns

`string`

#### Defined in

src/eosjs-numeric.ts:413

___

### privateKeyToString

▸ **privateKeyToString**(`key`): `string`

Convert `key` to string (base-58) form

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | [`Key`](../interfaces/Numeric.Key.md) |

#### Returns

`string`

#### Defined in

src/eosjs-numeric.ts:440

___

### publicKeyToLegacyString

▸ **publicKeyToLegacyString**(`key`): `string`

Convert public `key` to legacy string (base-58) form

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | [`Key`](../interfaces/Numeric.Key.md) |

#### Returns

`string`

#### Defined in

src/eosjs-numeric.ts:347

___

### publicKeyToString

▸ **publicKeyToString**(`key`): `string`

Convert `key` to string (base-58) form

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | [`Key`](../interfaces/Numeric.Key.md) |

#### Returns

`string`

#### Defined in

src/eosjs-numeric.ts:358

___

### signatureToString

▸ **signatureToString**(`signature`): `string`

Convert `signature` to string (base-58) form

#### Parameters

| Name | Type |
| :------ | :------ |
| `signature` | [`Key`](../interfaces/Numeric.Key.md) |

#### Returns

`string`

#### Defined in

src/eosjs-numeric.ts:467

___

### signedBinaryToDecimal

▸ **signedBinaryToDecimal**(`bignum`, `minDigits?`): `string`

Convert `bignum` to a signed decimal number

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `bignum` | `Uint8Array` | `undefined` | - |
| `minDigits` | `number` | `1` | 0-pad result to this many digits |

#### Returns

`string`

#### Defined in

src/eosjs-numeric.ts:132

___

### signedDecimalToBinary

▸ **signedDecimalToBinary**(`size`, `s`): `Uint8Array`

Convert a signed decimal number in `s` to a bignum

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `size` | `number` | bignum size (bytes) |
| `s` | `string` | - |

#### Returns

`Uint8Array`

#### Defined in

src/eosjs-numeric.ts:87

___

### stringToPrivateKey

▸ **stringToPrivateKey**(`s`): [`Key`](../interfaces/Numeric.Key.md)

Convert key in `s` to binary form

#### Parameters

| Name | Type |
| :------ | :------ |
| `s` | `string` |

#### Returns

[`Key`](../interfaces/Numeric.Key.md)

#### Defined in

src/eosjs-numeric.ts:388

___

### stringToPublicKey

▸ **stringToPublicKey**(`s`): [`Key`](../interfaces/Numeric.Key.md)

Convert key in `s` to binary form

#### Parameters

| Name | Type |
| :------ | :------ |
| `s` | `string` |

#### Returns

[`Key`](../interfaces/Numeric.Key.md)

#### Defined in

src/eosjs-numeric.ts:319

___

### stringToSignature

▸ **stringToSignature**(`s`): [`Key`](../interfaces/Numeric.Key.md)

Convert key in `s` to binary form

#### Parameters

| Name | Type |
| :------ | :------ |
| `s` | `string` |

#### Returns

[`Key`](../interfaces/Numeric.Key.md)

#### Defined in

src/eosjs-numeric.ts:451
