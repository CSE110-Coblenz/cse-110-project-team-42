export class TryAgainScreenModel {
  private message: string;


  constructor(message: string) {
	  this.message = message;

  }

  getMessage(): string {
	return this.message;
  }

  updateMessage(newMessage: string): void {
	this.message = newMessage;
  }
}
