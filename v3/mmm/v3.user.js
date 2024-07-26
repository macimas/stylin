// ==UserScript==
// @name         mmm Library
// @description  a general & config library for my v3 things
// @version      1.0-dev2

// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAG8AAABvCAYAAADixZ5gAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAE1UlEQVR4nO2d2a6jMAxAw2j+u/TLmYcRVRqyeI9d+Uh9uLcEUA7OTnqUUq6ShOTP7htI6KS8wKS8wKS8wKS8wKS8wKS8wKS8wKS8wKS8wKS8wKS8wKS8wKS8wKS8wKS8wKS8wKS8wPyFHHSd59ffR/N3soejTNawtNK+Eg6+G6VJ4fIM5c3EfRJXx2CPx15PS/51jddfHcehck0pROo8iLjRcdd5gtJDr4FhJg7y/c15Xp+PJd3I08iozwWR0TpL/znPIpN7EQQVs4q+nrDz7Kepjx0dg+EReb0MPc4TXWyt0lAfkDYdREJ7DFTc6lhMpLXHSkTpsrVJkbYC0xAaHYsRAElXRxj13NZ8RR63uOSIG0Xq43+vFylzr+sCiYNiXb/1APXzVsykHYAGCSi6X6/1fTQSIJItWpRaoqfyLPpmEuKoAqjpPERdKU2xWWekF3GUliTo2kbiNEU/Ik+jgUJNp9WB9tL5/t83pN8Lq5O+Rdz7vU0cpk9ngctZhZm4XVDEadeNLuV1QYrrPQC7i0vpKHUnrxt1GyOuFN2o40SnK3lS0RJlhISLG3naGU4tMntBT4m6O41k0elCnuSwFfchWKWnZL5Wi9SFvB6SjQupc+3sFvTYLs9jq/BmcztpyXZ5LRxx3AdhPnfn44Gq2SoPNJHKGGPlPAh11HHEQdJSuwuuIu8xpQOZ3xPCsnshFcXq8qRnwmfU8qNEHQfzyBtFDiSzIVF3HEfI1iWl6ATLk1xRpl3XYanv5446jw2UFnLkcRca/TrrUZjn99joMy02oUXmroaKx6ibLeZ11dq0pld8S4iDngMzRtoTqCqPsibGKupacV5GUzBFp3rkYVZb764jqVFXp8OeA7I0foTIuk1NokSdZD0Jnfx1U+ftKi5vdjZSqNd2Ic+yddnyfvtqXfYY3Z8LeVZ4Xh4xrvvGD5ZLeVbFZYSomwGSp94KrN5FsHx33Zu49n5W9zfdUOBGo07aMYNeX9PLbD0HkLxSvgVKRcevZaY1YHmJP1w2WBIYKS8wKS8wKS8wKS8wKS8wKS8wovN5nO0aMaM4d+fec8feYgRJrJNO3SgHm67NFG6GcB4EyiyF6NtPRUAedOAauq/YLJ3kE716ELRXdXMxrfNqWbvXq6zwPPd3oyJvtuhotTnqqn7k7J3JTeMN1QVItwjuFsaPY4/D5B12zsZzFg+Hyeqx2c5/ktNL0PoEWm9K1aXc840wq/OkZ8glM1YyU63ElaIkj9r6jIz0ZqwQtr1oQu33zaDs1s6J4PoDPVYSEXndHdeR2xGTrst8oqXrNO20LWKRhxHIPS+FX+gatLgamJaQbSHJy5iqqDyt6Jtek9hplyhyoR8txCOPKpCzNnSVQb9YZJaiODzWMhOo+TtBu7fH0nxwtg1Mr0BvVA4sPneLCzGrAO3HWb7eZSVOo0/Xw+yd9Brv00FUVtLczqTP0CwuH9cy/jFDqZ9yo2D2roL0tNDwOsrysMVhqK7CCKtB6FFmYffdHH0k7kUKFzsgrb5DX0d4w1XK9S0aR1te8bL66W7KyrDdK8JQ1y35ft4DrV8OkyblBcbVrEKCI+UFJuUFJuUFJuUFJuUFJuUFJuUFJuUFJuUFJuUFJuUFJuUFJuUFJuUFJuUFJuUFJuUF5h8jIZ3/XX866AAAAABJRU5ErkJggg==
// @namespace    https://github.com/macimas
// @author       macimas (https://macimas.github.io)

// @match        https://www.youtube.com/*
// @grant        none

// @run-at       document-body
// ==/UserScript==

const mmm = {};
const bakend = window.bakend;

mmm.mmm = ["[%cm%cm%cm%c]", "color: #00f", "", "color: #f00", ""];

if (!document.querySelector(".spitfire-body-container.v3")) {
	console.log(...mmm.mmm, "v3 not initialized, will not init mmm");
	return;
} else {
	console.log(...mmm.mmm, "i see v3, will proceed to init");
}

mmm.wait_warmly = () => {
	alert("[unimplemented]\nmacimas do their best and are now developing. Please watch warmly until it is ready.");
}

mmm.or_if = (conditions) => {
	if (!Array.isArray(conditions)) throw "Not an array of conditions";
	return (conditions.includes(true));
}

mmm.and_if = (conditions) => {
	if (!Array.isArray(conditions)) throw "Not an array of conditions";
	return (!conditions.includes(false));
}

mmm.attribute_if = (value) => {
	const conditions = [
		(typeof value == "undefined"),
		(typeof value == "string"),
		(typeof value == "boolean" && value),
		(typeof value == "function" && value())
	];

	return (mmm.or_if(conditions));
}

mmm.download_uri = (data) => {
	const a = document.createElement("a");

	if (!data.type) data.type = "text/json";

	a.href = `data:${data.type},${encodeURI(data.uri)}`;
	a.download = data.filename;
	a.click();

	a.remove();
}

mmm.v3_db = (function(){
	const v3_internal_db = bakend.updateVorDatabase.__LOCALDB_REFERENCE;
	const db = v3_internal_db.localdb;
	const it = {};
	it.db = db;

	const remap = [
		["save", "LocalDataBase updating..."],
		["reset", "Reseting LocalDataBase..."],
		["load", "Loading LocalDataBase..."],
		["configure", "Configuring LocalDataBase..."],
		["check_integrity", "LocalDataBase check integrity started."],
		// ["idk1", "function(e,t){var n=e.db_name;if(!n)return!1;"],
		// ["idk2", 'function(e,t){for(var n=(e=e||"").split(".")']
	];

	for (const [_, value] of Object.entries(v3_internal_db)) {
		for (const [key, pattern] of remap) {
			if (!value.toString().includes(pattern)) continue;
			it[key] = value;
		}
	}

	it.yt_get = (setting) => {
		if (!setting) return db.config.db.yt;
		return db.config.db.yt[setting];
	}

	it.yt_set = (settings) => {
		if (!settings) return null;
		db.config.db.yt = { ...db.config.db.yt, ...settings };
		it.save();
		return true;
	}

	it.mmm_get = (config) => {
		if (!db.config.db.mmm || !config) return null;
		return db.config.db.mmm[config];
	}

	it.mmm_set = (config, settings) => {
		console.log(config, settings);
		if (!db.config.db.mmm) db.config.db.mmm = {};
		if (!it.mmm_get(config)) db.config.db.mmm[config] = {};
		if (!settings) return null;
		db.config.db.mmm[config] = {
			...db.config.db.mmm[config],
			...settings
		}
		it.save();
		return true;
	}

	it.lang_get = (lang) => {
		if (!lang) return db.uimsg.db;
		return db.uimsg.db[lang];
	}

	it.lang_create = (lang, uimsgs) => {
		if (!lang) return null;
		db.uimsg.db[lang] = (uimsgs)
			? uimsgs
			: db.uimsg.db.en;
		it.save();
		return db.uimsg.db[lang];
	}

	it.lang_remove = (lang) => {
		const data = it.lang_get(lang);
		if (!data) return null;
		delete db.uimsg.db[lang];
		it.save();
		return true;
	}

	it.uimsg_get = (lang, uimsg) => {
		const data = it.lang_get(lang);
		if (!data) return null;
		return data[uimsg];
	}

	it.uimsg_set = (lang, uimsgs, options = {}) => {
		const data = it.lang_get(lang);
		if (!data) return null;
		for (const uimsg in uimsgs) {
			const msg = uimsgs[uimsg];
			if (options.skip_if_present && data[uimsg]) continue;
			data[uimsg] = msg;
		}
		it.save();
		return true;
	}
	return it;
})();

mmm.v3_uimsg = (function(){
	const db = mmm.v3_db;
	const lang = document.documentElement.lang;
	let placeholders = {};

	const it = (uimsg, return_null) => {
		const data = db.lang_get(lang);
		if (!uimsg) return data;

		if (!data || !data[uimsg]) {
			if (placeholders[uimsg]) {
				return placeholders[uimsg];
			}

			return (return_null) ? null : uimsg;
		}

		return data[uimsg];
	}

	function transformUimsgs(uimsgs, options) {
		for (const uimsg in uimsgs) {
			let msg = uimsgs[uimsg];
			if (Array.isArray(msg)) {
				uimsgs[uimsg] = msg.join("\n");
			}
		}

		return uimsgs;
	}

	it.set = (options, uimsgs) => {
		const data = db.lang_get(lang);
		if (!data || !uimsgs) return null;

		uimsgs = transformUimsgs(uimsgs);

		if (options.placeholder) {
			placeholders = { ...placeholders, ...uimsgs }
			return;
		}

		db.uimsg_set(lang, uimsgs, options);
		db.save();
	}

	return it;
})();

let css_manager_count = 1;

// TODO: declassify as mmm.css
mmm.css_manager = class {
	constructor() {
		this.registry = [];
		this.style = mmm.htemplate([
			["style", {
				id: `mmm-${css_manager_count++}`,
				type: "text/css",
				className: "v3 mmm"
			}]
		]);

		document.documentElement.append(this.style);
	}

	add(data, css) {
		this.registry.push({
			css,
			...data
		})
	}

	build() {
		let css = "";

		for (const data of this.registry) {
			if (!mmm.attribute_if(data.if)) continue;

			css += [
				"/*",
				`// id: ${data.id}`,
				"*/"
			].join("\n");

			css += (typeof data.css == "function")
				? data.css()
				: data.css;

			css += "\n";
		}

		return css;
	}

	update() {
		this.style.innerHTML = this.build();
		return this.style;
	}
}

mmm.htemplate = (layout) => {
	let node_count = 0;

	function createNode(tag, attributes = {}, layout = []) {
		if (!mmm.attribute_if(attributes?.if)) return;

		if (typeof tag != "string") throw TypeError("tag must be a string");
		if (typeof attributes != "object" || Array.isArray(attributes)) throw TypeError("attributes must be an object {}");
		if (typeof layout != "undefined" && !Array.isArray(layout)) throw TypeError("layout must be an array []");

		const node = document.createElement(tag);

		for (const attribute in attributes) {
			const value = attributes[attribute];

			if (attribute == "if") {
				continue;
			}

			if (attribute == "it") {
				value(node);
				continue;
			}

			node[attribute] = value;
		}

		if (layout) {
			node.append(...createNodes(layout));
		}

		node_count++;

		return node;
	}

	function createNodes(layout) {
		const nodes = [];

		for (const item of layout) {
			if (typeof item == "string" || item instanceof Node) {
				nodes.push(item);
			}

			if (!Array.isArray(item)) continue;

			const node = createNode(...item);
			if (node) nodes.push(node);
		}

		return nodes;
	}

	const nodes = createNodes(layout);
	const result = (nodes.length == 1)
		? nodes[0] || null
		: nodes;

	//console.log(`created ${node_count} nodes`, nodes, layout);

	return result;
}

mmm.hplate = {};

mmm.hplate.button = (text, type = "default", attributes) => (
	["button", {
		className: `jfk-button goog-inline-block jfk-button-${type}`,
		...attributes
	}, [
		["span", {
			className: "jfk-button-text",
			innerText: text
		}]
	]]
);

mmm.hplate.select_simple = (value, _options) => (
	["span", {
		className: "mmm-select-wrapper"
	}, [
		["select", {
			className: "yt-uix-form-input-text"
		}, (function(){
			const options = [];

			for (const [value, key] of Object.entries(_options)) {
				options.push(
					["option", {
						innerText: key,
						value: value
					}]
				);
			}

			return options;
		})()]
	]]
);

mmm.hplate.vdbg_expander = (data, content) => (
	["div", {
		className: "internal-config-section yt-uix-expander yt-uix-expander-collapsed"
	}, [
		["div", {
			className: "internal-config-section-title yt-uix-expander-head",
			innerText: data.label
		}],
		["div", {
			className: "content"
		}, content]
	]]
);

mmm.hplate.vdbg_setting = (data, layout) => (
	["div", {
		className: "internal-setting uimsg-setting"
	}, [
		["div", {
			className: "uimsg-item"
		}, [
			["div", {
				className: "title",
				innerText: data.label
			}],
			["span", {
				className: "create-playlist"
			}, [
				["div", {
					className: "playlist-create-form-playlist-name"
				}, [
					["span", {
						className: "yt-uix-form-input-container new-playlist-title"
					}, layout]
				]]
			]]
		]]
	]]
);

/*
	TODO: rewrite config system
	it's incredibly fucked lol
*/

mmm.configs = {};

mmm.config_setting_types = {};

mmm.config_setting_types.toggle = (config, data) => {
	const hplate = (
		["div", {
			className: "internal-setting"
		}, [
			["span", {
				className: "yt-uix-form-input-checkbox-container"
			}, [
				["input", {
					type: "checkbox",
					className: "yt-uix-form-input-checkbox",
					checked: config.db[data.id],
					it: (it) => {
						it.oninput = () => config.set(data.id, it.checked);
					}
				}],
				["span", {
					className: "yt-uix-form-input-checkbox-element"
				}]
			]],
			"\n\n",
			data.label
		]]
	);

	return ({
		hplate,
		is_setting: true
	});
}

mmm.config_setting_types.text = (config, data) => {
	const hplate = mmm.hplate.vdbg_setting({
		label: data.label
	}, [
		["input", {
			className: "yt-uix-form-input-text",
			value: config.db[data.id],
			it: (it) => {
				it.oninput = () => config.set(data.id, it.value);
			}
		}]
	])

	return ({
		hplate,
		is_setting: true
	});
}

// mmm.config_setting_types.color = (config, data) => {
// 	const hplate = [
// 		["span", [
// 			["input", {
// 				type: "color",
// 				value: data.value,
// 				it: (it) => {
// 					it.oninput = () => config.set(data.id, it.value);
// 				}
// 			}]
// 		]]
// 	];

// 	return ({
// 		hplate,
// 		needs_id: true
// 	});
// }

// mmm.config_setting_types.range = (config, data) => {
// 	const hplate = [
// 		["span", [
// 			["input", {
// 				type: "range",
// 				value: data.value,
// 				it: (it) => {
// 					it.oninput = () => config.set(data.id, it.value);
// 				}
// 			}]
// 		]]
// 	];

// 	return ({
// 		hplate,
// 		needs_id: true
// 	});
// }

// mmm.config_setting_types.select = (config, data) => {
// 	const options = [];

// 	for (const [key, value] of Object.entries(data.options)) {
// 		options.push(
// 			["option", {
// 				value,
// 				innerText: key
// 			}]
// 		);
// 	}

// 	const hplate = [
// 		["span", {
// 			value: data.value,
// 			it: (it) => {
// 				it.oninput = () => config.set(data.id, it.value);
// 			}
// 		}, [
// 			...options
// 		]]
// 	];

// 	return ({
// 		hplate,
// 		needs_id: true
// 	});
// }

mmm.config = (info, layout) => {
	const it = {};
	const callbacks = {};
	const db = mmm.v3_db.mmm_get(info.id) || {};

	it.callbacks = callbacks;
	it.db = db;

	it.layout = layout;
	it.hplate = [];

	console.log(it, info);

	function runCallbacks(key, args) {
		for (const callback of callbacks[key]) {
			callback(...args);
		}
	}

	it.get = (key) => {
		return db[key];
	}

	it.set = (key, value) => {
		if (typeof value == "undefined") throw "missing value";
		if (typeof db[key] == "undefined") throw `"${key}" does not exist`;

		db[key] = value;
		mmm.v3_db.mmm_set(info.id, { [key]: value });

		if (callbacks["*"]) runCallbacks("*", [key, value]);
		if (callbacks[key]) runCallbacks(key, [value]);
	}

	it.on = (key, callback) => {
		if (typeof callback != "function") throw "callback is not function";
		if (!callbacks[key]) callbacks[key] = [];

		callbacks[key].push(callback);
	}

	it.off = () => {
		throw "unimplemented";
	}

	function recurse(_layout) {
		for (const [type, data, layout] of _layout) {
			const callback = mmm.config_setting_types[type];

			if (!callback) {
				console.warn(`"${data?.id}" has invalid type "${type}". skipping`);
				continue;
			}

			data.label = info.id + "." + data.id;

			if (db[data.id] == undefined) {
				db[data.id] = data.value;
			}

			const thing = callback(it, data);

			if (!thing.is_setting) {
				it.hplate.push(thing.hplate);
				continue;
			}

			if (thing.is_setting && !data.id) {
				throw `${type} requires id`;
			}

			it.hplate.push(thing.hplate);
			it.hplate.push(
				["div", {
					className: "internal-setting-description",
					innerText: (Array.isArray(data.info))
						? data.info.join("\n")
						: data.info || "No description."
				}]
			);

			if (layout) recurse(layout);
		}
	}

	recurse(layout);

	mmm.configs[info.id] = it;
	console.log("created config", info.id, it);

	return it;
}

const vdbg = document.querySelector("#vor_debugger_container");
const vdbg_config = vdbg.querySelector(".smartadd:nth-child(2) .smartadd_content");

mmm.register_config = (register) => {
	new MutationObserver((_, observer) => {
		if (vdbg_config.classList.contains("append_config")) return;
		observer.disconnect();

		const vdbg_config_list = vdbg_config.querySelector(".internal-config.goog-scrollbar");
		const list = vdbg_config_list.querySelector(".internal-config-multiple-sections") || vdbg_config_list;

		list.append(mmm.htemplate([
			mmm.hplate.vdbg_expander({ label: register.name }, register.use.hplate)
		]));
	}).observe(vdbg, { subtree: true, attributes: true });
}

// const config = mmm.config({
// 	id: "mmm",
// 	GM_info
// }, [
// 	["toggle", {
// 		id: "enable_debug",
// 		label: "Enable debug",
// 		value: true
// 	}],
// 	["info", [
// 		"This is just a test. Yep!"
// 	]],
// 	["separator"],
// 	["toggle", {
// 		id: "toggle_test",
// 		value: true
// 	}],
// 	["toggle", {
// 		id: "requires_test",
// 		value: true,
// 		requires: ["toggle_test"]
// 	}],
// 	["toggle", {
// 		id: "needs_reload_test",
// 		value: true,
// 		needs_reload: true
// 	}],
// 	["text", {
// 		id: "text_test",
// 		value: "Hello world!",
// 		min: 0,
// 		max: 20
// 	}],
// 	["select", {
// 		id: "select_test",
// 		value: "item_1",
// 		options: {
// 			item_1: "Item 1",
// 			item_2: "Item 2",
// 			item_3: "Item 3"
// 		}
// 	}]
// ]);

// mmm.register_config({
// 	id: "mmm",
// 	name: "mmm Library",
// 	use: config
// });

mmm.ok = true;
window.mmm = mmm;
console.log(...mmm.mmm, "i am here :)");