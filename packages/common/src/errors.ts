export class ForbiddenError extends Error {
	constructor(message: string = 'Forbidden.') {
		super(message)
		this.name = ErrorCode.ForbiddenError
		Object.setPrototypeOf(this, ForbiddenError.prototype)
	}
}

export class ValidationError extends Error {
	constructor(message: string = 'Input contains invalid data.') {
		super(message)
		this.name = ErrorCode.ValidationError
		Object.setPrototypeOf(this, ValidationError.prototype)
	}
}

export class PreConditionError extends Error {
	constructor(message: string = 'Pre-condition failed.') {
		super(message)
		this.name = ErrorCode.PreConditionError
		Object.setPrototypeOf(this, PreConditionError.prototype)
	}
}

export class NotFoundError extends Error {
	constructor(message: string = 'Not Found.') {
		super(message)
		this.name = ErrorCode.NotFoundError
		Object.setPrototypeOf(this, NotFoundError.prototype)
	}
}

export class ConflictError extends Error {
	constructor(message: string = 'Conflict.') {
		super(message)
		this.name = ErrorCode.ConflictError
		Object.setPrototypeOf(this, ConflictError.prototype)
	}
}

export class ServerError extends Error {
	constructor(message: string = 'Server error.') {
		super(message)
		this.name = ErrorCode.ServerError
		Object.setPrototypeOf(this, ServerError.prototype)
	}
}

export enum ErrorCode {
	ForbiddenError = 'ForbiddenError',
	ValidationError = 'ValidationError',
	PreConditionError = 'PreConditionError',
	NotFoundError = 'NotFoundError',
	ConflictError = 'ConflictError',
	ServerError = 'ServerError'
}
