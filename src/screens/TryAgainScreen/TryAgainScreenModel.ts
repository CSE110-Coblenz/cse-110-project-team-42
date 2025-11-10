export class TryAgainScreenModel {
  private hearts: number;
  private message: string;


  constructor(message: string, hearts: number) {
    this.hearts = hearts;
	  this.message = message;

  }

  getMessage(): string {
	return this.message;
  }

  getHearts(): number {
    return this.hearts;
  }

  updateMessage(newMessage: string): void {
	this.message = newMessage;
  }

  updateHearts(newHearts: number): void {
    this.hearts = Math.max(0, newHearts);
  }
}
