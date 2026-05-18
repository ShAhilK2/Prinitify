import { HttpStatusCodeType } from "../config/http.config";

import { HTTPSTATUS } from "../config/http.config";

export const ErrorCodes = {
  ERR_INTERNAL: "INTERNAL_SERVER_ERROR",
  ERR_BAD_REQUEST: "BAD_REQUEST",
  ERR_UNAUTHORIZED: "UNAUTHORIZED",
  ERR_FORBIDDEN: "FORBIDDEN",
  ERR_NOT_FOUND: "NOT_FOUND",
  ERR_VALIDATION: "VALIDATION_ERROR",
} as const;

export type ErrorCodeType = (typeof ErrorCodes)[keyof typeof ErrorCodes];

export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: HttpStatusCodeType = HTTPSTATUS.INTERNAL_SERVER_ERROR,
    public errorCode: ErrorCodeType = ErrorCodes.ERR_INTERNAL,
  ) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }
}

export class InternalServerException extends AppError {
  constructor(message: string = "Internal Server Error") {
    super(message, HTTPSTATUS.INTERNAL_SERVER_ERROR, ErrorCodes.ERR_INTERNAL);
  }
}

export class BadRequestException extends AppError {
  constructor(message: string = "Bad Request") {
    super(message, HTTPSTATUS.BAD_REQUEST, ErrorCodes.ERR_BAD_REQUEST);
  }
}

export class UnauthorizedException extends AppError {
  constructor(message: string = "Unauthorized") {
    super(message, HTTPSTATUS.UNAUTHORIZED, ErrorCodes.ERR_UNAUTHORIZED);
  }
}

export class ForbiddenException extends AppError {
  constructor(message: string = "Forbidden") {
    super(message, HTTPSTATUS.FORBIDDEN, ErrorCodes.ERR_FORBIDDEN);
  }
}

export class NotFoundException extends AppError {
  constructor(message: string = "Not Found") {
    super(message, HTTPSTATUS.NOT_FOUND, ErrorCodes.ERR_NOT_FOUND);
  }
}

export class ValidationException extends AppError {
  constructor(message: string = "Validation Error") {
    super(message, HTTPSTATUS.BAD_REQUEST, ErrorCodes.ERR_VALIDATION);
  }
}
