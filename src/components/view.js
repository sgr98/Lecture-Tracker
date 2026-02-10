export class View {
	constructor(moduleName) {
		this._moduleName = moduleName;
	}

	generateHTML() {}
}

export class ListView extends View {
	constructor(moduleName, items) {
		super(moduleName);
		this._items = items;
	}

	get items() {
		return this._items;
	}

	set items(items) {
		this._items = items;
	}

	generateHTML() {}

	addItem() {}

	modifyItem() {}

	deleteItem() {}
}
