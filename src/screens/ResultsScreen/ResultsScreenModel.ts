/**
 * ResultsScreenModel
 * Stores and manages the data for the Results screen.
 */
export class ResultsScreenModel {
	private message: string;
	private hearts: number;

	constructor(message: string, hearts: number) {
		this.message = message;
		this.hearts = hearts;
	}

	getMessage(): string {
		return this.message;
	}

	getHearts(): number {
		return this.hearts;
	}

	setMessage(newMessage: string): void {
		this.message = newMessage;
	}

	setHearts(newHearts: number): void {
		this.hearts = newHearts;
	}
}

