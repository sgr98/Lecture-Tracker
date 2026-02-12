export class View {
	constructor(moduleName) {
		this._moduleName = moduleName;
	}

	generateHTML() {}
}

export class ListView extends View {
	constructor(moduleName) {
		super(moduleName);
	}

	get items() {
		return this._items;
	}

	set items(items) {
		this._items = items;
	}

	generateHTML() {}

	addItemHTML() {}

	editItemHTML() {}

	deleteItemHTML() {}
}
