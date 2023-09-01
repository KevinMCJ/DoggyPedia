// ? Error semantico del usuario.
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
    this.statusCode = 422;
  }
}

// ? Not found.
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "ErrorNotFound";
    this.statusCode = 404;
  }
}

// ? Conflicto con el recurso valido enviado.
class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.name = "ConflictError";
    this.statusCode = 409;
  }
}

// ? Service Unavailable: No se pudo manejar la solicitud a terceros.
class ServiceError extends Error {
  constructor(message) {
    super(message);
    this.name = "ServiceError";
    this.statusCode = 503;
  }
}

module.exports = { ValidationError, NotFoundError, ConflictError, ServiceError };
