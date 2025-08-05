class ApiResponse {
  constructor(data, message = 'Success', statusCode) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.success = statusCode < 400; //return boolean
  }
}

export { ApiResponse };
