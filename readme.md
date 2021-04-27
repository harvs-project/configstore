**This is a fork. You can find the original source code in https://github.com/yeoman/configstore**

# piconfigstore

> Easily load and persist config

## Install

```
$ npm install @harvs-project/piconfigstore
```

## Usage

```js
import Configstore from '@harvs-project/piconfigstore';

const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

// Create a Configstore instance.
const config = new Configstore(packageJson.name, {foo: 'bar'});

console.log(config.get('foo'));
//=> 'bar'

config.set('awesome', true);
console.log(config.get('awesome'));
//=> true

// Use dot-notation to access nested properties.
config.set('bar.baz', true);
console.log(config.get('bar'));
//=> {baz: true}

config.delete('awesome');
console.log(config.get('awesome'));
//=> undefined
```

## API

### Configstore(packageName, defaults?)

Returns a new instance.

#### packageName

Type: `string`

Name of your package.

#### defaults

Type: `object`

Default config.

### Instance

You can use [dot-notation](https://github.com/sindresorhus/dot-prop) in a `key` to access nested properties.

### .set(key, value)

Set an item.

### .set(object)

Set multiple items at once.

### .get(key)

Get an item.

### .has(key)

Check if an item exists.

### .delete(key)

Delete an item.

### .clear()

Delete all items.

### .size

Get the item count.

### .path

Get the path to the config file. Can be used to show the user where the config file is located or even better open it for them.

### .all

Get all the config as an object or replace the current config with an object:

```js
config.all = {
	hello: 'world'
};
```
