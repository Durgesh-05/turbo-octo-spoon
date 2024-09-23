export class ApiError {
  private status: number;
  private message: string;
  private success: boolean;
  constructor(message: string, status: number) {
    this.status = status;
    this.message = message;
    this.success = status < 400;
  }
}
