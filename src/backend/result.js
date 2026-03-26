import { handler } from "../utils/handler.js";

export class Result {
	constructor(success, error, statusCode, value) {
		this.success = success;
		this.error = error;
		this.statusCode = statusCode;
		this.value = value;
		Object.freeze(this);
	}

	static success(value, statusCode) {
		return new Result(true, null, statusCode, value);
	}

	static fail(error, statusCode, errorValue = null) {
		handler.error(error);
		return new Result(false, error, statusCode, errorValue);
	}

	getValueOrThrow() {
		if (!this.success) {
			throw new Error(this.error);
		}
		return this.value;
	}

	// 1. Map: Transform the value IF successful
	map(fn) {
		if (!this.success) {
			return this;
		}
		return Result.success(fn(this.value));
	}

	// 2. Chain (Bind): Run another Result-returning function IF successful
	chain(fn) {
		if (!this.success) {
			return this;
		}
		return fn(this.value);
	}

	// 3. OnFailure: Run a side-effect (like logging) only on failure
	onFailure(fn) {
		if (!this.success) {
			fn(this.error);
		}
		return this;
	}
}
