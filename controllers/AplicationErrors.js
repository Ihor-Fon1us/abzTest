class PhotoError extends Error {
    constructor() {
        super();

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports.PhotoError = PhotoError;