class ValidationError extends Error{
    constructor(fails) {
        super();
        this.message = "Validation error"
        this.statusCode = 422;
        this.fails = fails;

        Error.captureStackTrace(this, this.constructor);
    }
}

class UserNotFoundError extends Error{
    constructor() {
        super();
        this.message = "The user with the requested identifier does not exist";
        this.statusCode = 404;
        this.fails = {
            "user_id": [ "User not found" ]
        };
    }
}

class TokenError extends Error{
    constructor() {
        super();
        this.statusCode = 401;
        this.message = "The token expired.";
    }
}

class PageNotFoundError extends Error{
    constructor() {
        super();
        this.statusCode = 404;
        this.message = "Page not found.";
    }
}

class PositionsNotFoundError extends Error{
    constructor() {
        super();
        this.statusCode = 422;
        this.message = "Positions not found";
        
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = {
    ValidationError,
    UserNotFoundError,
    TokenError,
    PageNotFoundError,
    PositionsNotFoundError,
}

