import { Hearts } from "../../hearts";
import { RESULTS_TEMPLATES, type ResultsData } from "./ResultsScreenConstants";

/**
 * ResultsScreenModel
 * Stores and manages the data for the Results screen.
 */
export class ResultsScreenModel {
	private message: string;
	private hearts: number;
	private resultsData?: ResultsData;

	constructor(message: string, hearts: number) {
		this.message = message;
		this.hearts = hearts;
	}

	/**
	 * Set results data and generate the formatted message based on current game.
	 */
	setResultsData(data: ResultsData): void {
		this.resultsData = data;
		const currentGame = Hearts.getCurrentGame();
		const template = RESULTS_TEMPLATES[currentGame] || RESULTS_TEMPLATES[1];
		
		// Format profits
		// Keep numeric profits and format with three decimal places
		const [rNum, gNum, bNum] = data.profits;
		const red = rNum.toFixed(3);
		const green = gNum.toFixed(3);
		const blue = bNum.toFixed(3);

		// Determine winner by numeric comparison
		const optionEmojis = ["🔴Red", "🟢Green", "🔵Blue"];
		const maxIndex = [rNum, gNum, bNum].indexOf(Math.max(rNum, gNum, bNum));
		let winnerMessage = "";
		if (data.selectedOption === maxIndex) {
			winnerMessage = `Your choice of ${optionEmojis[data.selectedOption]} won!`;
		} else {
			winnerMessage = `You lost! ${optionEmojis[maxIndex]} won!`;
		}
		
		// Replace placeholders
		this.message = template
			.replace("{0}", red)
			.replace("{1}", green)
			.replace("{2}", blue)
			.replace("{winnerMessage}", winnerMessage);
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

