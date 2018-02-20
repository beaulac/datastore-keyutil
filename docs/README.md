


#  KeyUtil

## Index

### Constructors

* [constructor](#constructor)


### Properties

* [KEY_SYMBOL](#key_symbol)
* [base64ParentUIDFor](#base64parentuidfor)
* [base64UidFor](#base64uidfor)
* [keyToUid](#keytouid)
* [mapToBase64ParentUIDs](#maptobase64parentuids)
* [mapToBase64UIDs](#maptobase64uids)
* [mapToIDs](#maptoids)
* [mapToIdentifiers](#maptoidentifiers)
* [mapToKeys](#maptokeys)
* [mapToNames](#maptonames)
* [mapToParentIDs](#maptoparentids)
* [mapToParentIdentifiers](#maptoparentidentifiers)
* [mapToParentKeys](#maptoparentkeys)
* [mapToParentNames](#maptoparentnames)
* [mapToParentUIDs](#maptoparentuids)
* [mapToUIDs](#maptouids)
* [parentUidFor](#parentuidfor)
* [uidFor](#uidfor)


### Methods

* [allocateKeys](#allocatekeys)
* [base64UidToKey](#base64uidtokey)
* [buildKey](#buildkey)
* [buildMixedKey](#buildmixedkey)
* [buildNamedKey](#buildnamedkey)
* [coerceKeylikeToKey](#coercekeyliketokey)
* [extractKey](#extractkey)
* [extractParentKey](#extractparentkey)
* [hasId](#hasid)
* [hasName](#hasname)
* [haveSameKey](#havesamekey)
* [idOf](#idof)
* [identifierOf](#identifierof)
* [indexById](#indexbyid)
* [nameOf](#nameof)
* [parentIdOf](#parentidof)
* [parentIdentifierOf](#parentidentifierof)
* [parentNameOf](#parentnameof)
* [setKey](#setkey)
* [uidToKey](#uidtokey)



---
## Constructors
<a id="constructor"></a>


### ⊕ **new KeyUtil**(datastore: *`Datastore`*, options?: *`Partial`.<`KeyUtilOptions`>*): [KeyUtil]()


*Defined in [KeyUtil.ts:20](https://github.com/beaulac/datastore-keyutil/blob/598ad63/src/KeyUtil.ts#L20)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| datastore | `Datastore`   |  - |
| options | `Partial`.<`KeyUtilOptions`>   |  - |





**Returns:** [KeyUtil]()

---


## Properties
<a id="key_symbol"></a>

###  KEY_SYMBOL

**●  KEY_SYMBOL**:  *`symbol`*  =  this.datastore.KEY

*Defined in [KeyUtil.ts:16](https://github.com/beaulac/datastore-keyutil/blob/598ad63/src/KeyUtil.ts#L16)*





___

<a id="base64parentuidfor"></a>

###  base64ParentUIDFor

**●  base64ParentUIDFor**:  *`function`*  =  base64ify(this.parentUidFor)

*Defined in [KeyUtil.ts:178](https://github.com/beaulac/datastore-keyutil/blob/598ad63/src/KeyUtil.ts#L178)*


#### Type declaration
►(entity: *`E`*): `string`



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| entity | `E`   |  - |





**Returns:** `string`






___

<a id="base64uidfor"></a>

###  base64UidFor

**●  base64UidFor**:  *`function`*  =  base64ify(this.uidFor)

*Defined in [KeyUtil.ts:176](https://github.com/beaulac/datastore-keyutil/blob/598ad63/src/KeyUtil.ts#L176)*



Base64 UIDs for passing around in URLs

#### Type declaration
►(entity: *`E`*): `string`



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| entity | `E`   |  - |





**Returns:** `string`






___

<a id="keytouid"></a>

###  keyToUid

**●  keyToUid**:  *`keyToUID`*  =  keyToUID

*Defined in [KeyUtil.ts:171](https://github.com/beaulac/datastore-keyutil/blob/598ad63/src/KeyUtil.ts#L171)*





___

<a id="maptobase64parentuids"></a>

###  mapToBase64ParentUIDs

**●  mapToBase64ParentUIDs**:  *`function`*  =  pluralize(this.base64ParentUIDFor)

*Defined in [KeyUtil.ts:179](https://github.com/beaulac/datastore-keyutil/blob/598ad63/src/KeyUtil.ts#L179)*


#### Type declaration
►(es: *`E`[]*): `U`[]



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| es | `E`[]   |  - |





**Returns:** `U`[]






___

<a id="maptobase64uids"></a>

###  mapToBase64UIDs

**●  mapToBase64UIDs**:  *`function`*  =  pluralize(this.base64UidFor)

*Defined in [KeyUtil.ts:177](https://github.com/beaulac/datastore-keyutil/blob/598ad63/src/KeyUtil.ts#L177)*


#### Type declaration
►(es: *`E`[]*): `U`[]



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| es | `E`[]   |  - |





**Returns:** `U`[]






___

<a id="maptoids"></a>

###  mapToIDs

**●  mapToIDs**:  *`function`*  =  pluralize(this.idOf)

*Defined in [KeyUtil.ts:133](https://github.com/beaulac/datastore-keyutil/blob/598ad63/src/KeyUtil.ts#L133)*


#### Type declaration
►(es: *`E`[]*): `U`[]



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| es | `E`[]   |  - |





**Returns:** `U`[]






___

<a id="maptoidentifiers"></a>

###  mapToIdentifiers

**●  mapToIdentifiers**:  *`function`*  =  pluralize(this.identifierOf)

*Defined in [KeyUtil.ts:154](https://github.com/beaulac/datastore-keyutil/blob/598ad63/src/KeyUtil.ts#L154)*


#### Type declaration
►(es: *`E`[]*): `U`[]



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| es | `E`[]   |  - |





**Returns:** `U`[]






___

<a id="maptokeys"></a>

###  mapToKeys

**●  mapToKeys**:  *`function`*  =  pluralize(this.extractKey)

*Defined in [KeyUtil.ts:122](https://github.com/beaulac/datastore-keyutil/blob/598ad63/src/KeyUtil.ts#L122)*


#### Type declaration
►(es: *`E`[]*): `U`[]



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| es | `E`[]   |  - |





**Returns:** `U`[]






___

<a id="maptonames"></a>

###  mapToNames

**●  mapToNames**:  *`function`*  =  pluralize(this.nameOf)

*Defined in [KeyUtil.ts:143](https://github.com/beaulac/datastore-keyutil/blob/598ad63/src/KeyUtil.ts#L143)*


#### Type declaration
►(es: *`E`[]*): `U`[]



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| es | `E`[]   |  - |





**Returns:** `U`[]






___

<a id="maptoparentids"></a>

###  mapToParentIDs

**●  mapToParentIDs**:  *`function`*  =  pluralize(this.parentIdOf)

*Defined in [KeyUtil.ts:136](https://github.com/beaulac/datastore-keyutil/blob/598ad63/src/KeyUtil.ts#L136)*


#### Type declaration
►(es: *`E`[]*): `U`[]



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| es | `E`[]   |  - |





**Returns:** `U`[]






___

<a id="maptoparentidentifiers"></a>

###  mapToParentIdentifiers

**●  mapToParentIdentifiers**:  *`function`*  =  pluralize(this.identifierOf)

*Defined in [KeyUtil.ts:158](https://github.com/beaulac/datastore-keyutil/blob/598ad63/src/KeyUtil.ts#L158)*


#### Type declaration
►(es: *`E`[]*): `U`[]



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| es | `E`[]   |  - |





**Returns:** `U`[]






___

<a id="maptoparentkeys"></a>

###  mapToParentKeys

**●  mapToParentKeys**:  *`function`*  =  pluralize(this.extractParentKey)

*Defined in [KeyUtil.ts:126](https://github.com/beaulac/datastore-keyutil/blob/598ad63/src/KeyUtil.ts#L126)*


#### Type declaration
►(es: *`E`[]*): `U`[]



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| es | `E`[]   |  - |





**Returns:** `U`[]






___

<a id="maptoparentnames"></a>

###  mapToParentNames

**●  mapToParentNames**:  *`function`*  =  pluralize(this.nameOf)

*Defined in [KeyUtil.ts:147](https://github.com/beaulac/datastore-keyutil/blob/598ad63/src/KeyUtil.ts#L147)*


#### Type declaration
►(es: *`E`[]*): `U`[]



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| es | `E`[]   |  - |





**Returns:** `U`[]






___

<a id="maptoparentuids"></a>

###  mapToParentUIDs

**●  mapToParentUIDs**:  *`function`*  =  pluralize(this.parentUidFor)

*Defined in [KeyUtil.ts:168](https://github.com/beaulac/datastore-keyutil/blob/598ad63/src/KeyUtil.ts#L168)*


#### Type declaration
►(es: *`E`[]*): `U`[]



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| es | `E`[]   |  - |





**Returns:** `U`[]






___

<a id="maptouids"></a>

###  mapToUIDs

**●  mapToUIDs**:  *`function`*  =  pluralize(this.uidFor)

*Defined in [KeyUtil.ts:165](https://github.com/beaulac/datastore-keyutil/blob/598ad63/src/KeyUtil.ts#L165)*


#### Type declaration
►(es: *`E`[]*): `U`[]



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| es | `E`[]   |  - |





**Returns:** `U`[]






___

<a id="parentuidfor"></a>

###  parentUidFor

**●  parentUidFor**:  *`function`*  =  uidify(this.extractParentKey)

*Defined in [KeyUtil.ts:167](https://github.com/beaulac/datastore-keyutil/blob/598ad63/src/KeyUtil.ts#L167)*


#### Type declaration
►(entity: *`E`*): `string`



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| entity | `E`   |  - |





**Returns:** `string`






___

<a id="uidfor"></a>

###  uidFor

**●  uidFor**:  *`function`*  =  uidify(this.extractKey)

*Defined in [KeyUtil.ts:164](https://github.com/beaulac/datastore-keyutil/blob/598ad63/src/KeyUtil.ts#L164)*



UIDs for string representations of keys

#### Type declaration
►(entity: *`E`*): `string`



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| entity | `E`   |  - |





**Returns:** `string`






___


## Methods
<a id="allocatekeys"></a>

###  allocateKeys

► **allocateKeys**(keyPath: *`Entity.DatastoreKeyPath`⎮`DatastoreKeylike`*, count?: *`number`*): `Promise`.<`Entity.DatastoreKey`⎮`Entity.DatastoreKey`[]>



*Defined in [KeyUtil.ts:98](https://github.com/beaulac/datastore-keyutil/blob/598ad63/src/KeyUtil.ts#L98)*



**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| keyPath | `Entity.DatastoreKeyPath`⎮`DatastoreKeylike`  | - |   - |
| count | `number`  | 1 |   - |





**Returns:** `Promise`.<`Entity.DatastoreKey`⎮`Entity.DatastoreKey`[]>





___

<a id="base64uidtokey"></a>

###  base64UidToKey

► **base64UidToKey**(base64UID: *`string`*): `DatastoreKey`



*Defined in [KeyUtil.ts:181](https://github.com/beaulac/datastore-keyutil/blob/598ad63/src/KeyUtil.ts#L181)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| base64UID | `string`   |  - |





**Returns:** `DatastoreKey`





___

<a id="buildkey"></a>

###  buildKey

► **buildKey**(keyPath: *`Entity.DatastoreKeyPath`*): `DatastoreKey`



*Defined in [KeyUtil.ts:70](https://github.com/beaulac/datastore-keyutil/blob/598ad63/src/KeyUtil.ts#L70)*



Builds NUMERIC keys (keys with IDs, not names). Named keys should be created with [buildNamedKey](#buildnamedkey).


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| keyPath | `Entity.DatastoreKeyPath`   |  Has form [ Kind, ID, Kind, ID, ... ] |





**Returns:** `DatastoreKey`







___

<a id="buildmixedkey"></a>

###  buildMixedKey

► **buildMixedKey**(keyPath: *`Entity.DatastoreKeyPath`*): `DatastoreKey`



*Defined in [KeyUtil.ts:56](https://github.com/beaulac/datastore-keyutil/blob/598ad63/src/KeyUtil.ts#L56)*



Builds MIXED keys (keys with IDs OR names).


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| keyPath | `Entity.DatastoreKeyPath`   |  Has form [ Kind, Identifier, Kind, Identifier, ... ] |





**Returns:** `DatastoreKey`







___

<a id="buildnamedkey"></a>

###  buildNamedKey

► **buildNamedKey**(keyPath: *`Entity.DatastoreKeyPath`*): `DatastoreKey`



*Defined in [KeyUtil.ts:83](https://github.com/beaulac/datastore-keyutil/blob/598ad63/src/KeyUtil.ts#L83)*



Builds NAMED keys (keys with names, not IDs). Numeric keys should be created with [buildKey](#buildkey)


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| keyPath | `Entity.DatastoreKeyPath`   |  Has form [ Kind, Name, Kind, Name, ... ] |





**Returns:** `DatastoreKey`







___

<a id="coercekeyliketokey"></a>

###  coerceKeylikeToKey

► **coerceKeylikeToKey**(keylike: *`DatastoreKeylike`*): `DatastoreKey`



*Defined in [KeyUtil.ts:95](https://github.com/beaulac/datastore-keyutil/blob/598ad63/src/KeyUtil.ts#L95)*



Coerces any object (e.g. deserialized from Key JSON) to actual instance of {@link DatastoreKey}. REQUIRES that the object have a valid 'path' property.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| keylike | `DatastoreKeylike`   |  - |





**Returns:** `DatastoreKey`







___

<a id="extractkey"></a>

###  extractKey

► **extractKey**(entity: *`DatastoreKeyExtractable`*): `DatastoreKey`



*Defined in [KeyUtil.ts:121](https://github.com/beaulac/datastore-keyutil/blob/598ad63/src/KeyUtil.ts#L121)*



On GCDS entities, the key is hidden away as a symbol property. The symbol itself is non-global, and only available on the datastore object.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| entity | `DatastoreKeyExtractable`   |  - |





**Returns:** `DatastoreKey`







___

<a id="extractparentkey"></a>

###  extractParentKey

► **extractParentKey**(entity: *`DatastoreKeyExtractable`*): `DatastoreKey`



*Defined in [KeyUtil.ts:125](https://github.com/beaulac/datastore-keyutil/blob/598ad63/src/KeyUtil.ts#L125)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| entity | `DatastoreKeyExtractable`   |  - |





**Returns:** `DatastoreKey`





___

<a id="hasid"></a>

###  hasId

► **hasId**(entity: *`DatastoreKeyExtractable`*, id: *`string`*): `boolean`



*Defined in [KeyUtil.ts:191](https://github.com/beaulac/datastore-keyutil/blob/598ad63/src/KeyUtil.ts#L191)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| entity | `DatastoreKeyExtractable`   |  - |
| id | `string`   |  - |





**Returns:** `boolean`





___

<a id="hasname"></a>

###  hasName

► **hasName**(entity: *`DatastoreKeyExtractable`*, name: *`string`*): `boolean`



*Defined in [KeyUtil.ts:192](https://github.com/beaulac/datastore-keyutil/blob/598ad63/src/KeyUtil.ts#L192)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| entity | `DatastoreKeyExtractable`   |  - |
| name | `string`   |  - |





**Returns:** `boolean`





___

<a id="havesamekey"></a>

###  haveSameKey

► **haveSameKey**(entity: *`DatastoreKeyExtractable`*, other: *`DatastoreKeyExtractable`*): `boolean`



*Defined in [KeyUtil.ts:186](https://github.com/beaulac/datastore-keyutil/blob/598ad63/src/KeyUtil.ts#L186)*



Key predicates


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| entity | `DatastoreKeyExtractable`   |  - |
| other | `DatastoreKeyExtractable`   |  - |





**Returns:** `boolean`





___

<a id="idof"></a>

###  idOf

► **idOf**(entity: *`DatastoreKeyExtractable`*): `string`



*Defined in [KeyUtil.ts:129](https://github.com/beaulac/datastore-keyutil/blob/598ad63/src/KeyUtil.ts#L129)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| entity | `DatastoreKeyExtractable`   |  - |





**Returns:** `string`





___

<a id="identifierof"></a>

###  identifierOf

► **identifierOf**(entity: *`DatastoreKeyExtractable`*): `undefined`⎮`string`



*Defined in [KeyUtil.ts:150](https://github.com/beaulac/datastore-keyutil/blob/598ad63/src/KeyUtil.ts#L150)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| entity | `DatastoreKeyExtractable`   |  - |





**Returns:** `undefined`⎮`string`





___

<a id="indexbyid"></a>

###  indexById

► **indexById**E(entity: *`E`⎮`E`[]*): [`string`,`E`]⎮`Array`.<[`string`,`E`]>



*Defined in [KeyUtil.ts:195](https://github.com/beaulac/datastore-keyutil/blob/598ad63/src/KeyUtil.ts#L195)*



**Type parameters:**

#### E :  `DatastoreKeyExtractable`
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| entity | `E`⎮`E`[]   |  - |





**Returns:** [`string`,`E`]⎮`Array`.<[`string`,`E`]>





___

<a id="nameof"></a>

###  nameOf

► **nameOf**(entity: *`DatastoreKeyExtractable`*): `string`



*Defined in [KeyUtil.ts:139](https://github.com/beaulac/datastore-keyutil/blob/598ad63/src/KeyUtil.ts#L139)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| entity | `DatastoreKeyExtractable`   |  - |





**Returns:** `string`





___

<a id="parentidof"></a>

###  parentIdOf

► **parentIdOf**(entity: *`DatastoreKeyExtractable`*): `string`



*Defined in [KeyUtil.ts:135](https://github.com/beaulac/datastore-keyutil/blob/598ad63/src/KeyUtil.ts#L135)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| entity | `DatastoreKeyExtractable`   |  - |





**Returns:** `string`





___

<a id="parentidentifierof"></a>

###  parentIdentifierOf

► **parentIdentifierOf**(entity: *`DatastoreKeyExtractable`*): `undefined`⎮`string`



*Defined in [KeyUtil.ts:157](https://github.com/beaulac/datastore-keyutil/blob/598ad63/src/KeyUtil.ts#L157)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| entity | `DatastoreKeyExtractable`   |  - |





**Returns:** `undefined`⎮`string`





___

<a id="parentnameof"></a>

###  parentNameOf

► **parentNameOf**(entity: *`DatastoreKeyExtractable`*): `string`



*Defined in [KeyUtil.ts:146](https://github.com/beaulac/datastore-keyutil/blob/598ad63/src/KeyUtil.ts#L146)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| entity | `DatastoreKeyExtractable`   |  - |





**Returns:** `string`





___

<a id="setkey"></a>

###  setKey

► **setKey**T(entity: *`T`*, key: *`Entity.DatastoreKey`*): `T`



*Defined in [KeyUtil.ts:38](https://github.com/beaulac/datastore-keyutil/blob/598ad63/src/KeyUtil.ts#L38)*



**Type parameters:**

#### T 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| entity | `T`   |  - |
| key | `Entity.DatastoreKey`   |  - |





**Returns:** `T`





___

<a id="uidtokey"></a>

###  uidToKey

► **uidToKey**(uid: *`string`*): `DatastoreKey`



*Defined in [KeyUtil.ts:170](https://github.com/beaulac/datastore-keyutil/blob/598ad63/src/KeyUtil.ts#L170)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| uid | `string`   |  - |





**Returns:** `DatastoreKey`





___


