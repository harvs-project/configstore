import test from 'ava';
import Configstore from './index.js';

const configstorePath = new Configstore('configstore-test').path;

test.beforeEach(t => {
	t.context.config = new Configstore('configstore-test');
});

test('.set() and .get()', t => {
	const {config} = t.context;
	config.set('foo', 'bar');
	config.set('baz.boo', true);
	t.is(config.get('foo'), 'bar');
	t.is(config.get('baz.boo'), true);
});

test('.set() with object and .get()', t => {
	const {config} = t.context;
	config.set({
		foo1: 'bar1',
		foo2: 'bar2',
		baz: {
			boo: 'foo',
			foo: {
				bar: 'baz'
			}
		}
	});
	t.is(config.get('foo1'), 'bar1');
	t.is(config.get('foo2'), 'bar2');
	t.deepEqual(config.get('baz'), {
		boo: 'foo',
		foo: {
			bar: 'baz'
		}
	});
	t.is(config.get('baz.boo'), 'foo');
	t.deepEqual(config.get('baz.foo'), {bar: 'baz'});
	t.is(config.get('baz.foo.bar'), 'baz');
});


test('.has()', t => {
	const {config} = t.context;
	config.set('foo', '🦄');
	config.set('baz.boo', '🦄');
	t.true(config.has('foo'));
	t.true(config.has('baz.boo'));
	t.false(config.has('missing'));
});

test('.delete()', t => {
	const {config} = t.context;
	config.set('foo', 'bar');
	config.set('baz.boo', true);
	config.set('baz.foo.bar', 'baz');
	config.delete('foo');
	t.not(config.get('foo'), 'bar');
	config.delete('baz.boo');
	t.not(config.get('baz.boo'), true);
	config.delete('baz.foo');
	t.not(config.get('baz.foo'), {bar: 'baz'});
	config.set('foo.bar.baz', {awesome: 'icecream'});
	config.set('foo.bar.zoo', {awesome: 'redpanda'});
	config.delete('foo.bar.baz');
	t.is(config.get('foo.bar.zoo.awesome'), 'redpanda');
});

test('.clear()', t => {
	const {config} = t.context;
	config.set('foo', 'bar');
	config.set('foo1', 'bar1');
	config.set('baz.boo', true);
	config.clear();
	t.is(config.size, 0);
});

test('.all', t => {
	const {config} = t.context;
	config.set('foo', 'bar');
	config.set('baz.boo', true);
	t.is(config.all.foo, 'bar');
	t.deepEqual(config.all.baz, {boo: true});
});

test('.size', t => {
	const {config} = t.context;
	config.set('foo', 'bar');
	t.is(config.size, 1);
});

test('use default value', t => {
	const config = new Configstore('configstore-test', {foo: 'bar'});
	t.is(config.get('foo'), 'bar');
});

test('ensure `.all` is always an object', t => {
	t.notThrows(() => {
		t.context.config.get('foo');
	});
});
