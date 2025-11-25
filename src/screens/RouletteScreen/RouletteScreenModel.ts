import { Hearts } from "../../gamestate";
import { ROULLET_OPTIONS1, ROULLET_OPTIONS2, ROULLET_OPTIONS3 } from "../../constants";

export interface RouletteOption {
    id: string;
    label: string;
    buyIn: number;
    payoff: number;
    slots: number;
    total: number;
    color: string;
}

/**
 * Stores the user configurable counts for each roulette color segment.
 */
export class RouletteScreenModel {
    private selectedOption: number = -1; 

    getOptions(): RouletteOption[] {
        const lives = Hearts.get();
        if (lives === 3) return ROULLET_OPTIONS1;
        if (lives === 2) return ROULLET_OPTIONS2;
        return ROULLET_OPTIONS3;
    }

    setSelectedOption(index: number): void {
        this.selectedOption = index;
    }

    getSelectedOption(): number {
        return this.selectedOption;
    }

    /**
     * Simulates a single spin for a given bet option.
     */
    simulateByIndex(index: number): number {
        const options = this.getOptions();
        const option = options[index];

        if (!option) return -1;

        const probability = option.slots / option.total;
        const won = Math.random() < probability;

        if (won) {
            return option.payoff - option.buyIn;
        } else {
            return -option.buyIn;
        }
    }

    // Helper to get counts for the wheel view based on current options
    getCounts() {
         const options = this.getOptions();
         // Map options to colors. Assuming options align with Red/Green/Blue roughly or we just map them.
         // The options have explicit 'color' properties.
         // We need to convert "Red", "Black", "Blue" etc to our wheel colors if possible.
         // Or better, just return the raw counts to the view and let the view handle coloring?
         // The previous model returned { blue: x, green: y, red: z }.
         // Let's try to map the option's 'slots' to this structure if possible, or maybe update the view to handle generic colors.
         // For simplicity/consistency with existing view, let's map:
         // option 0 -> red count
         // option 1 -> green count
         // option 2 -> blue count
         // (This is a simplification, but the view expects these 3 keys)
         
         return {
             red: options[0]?.slots || 0,
             green: options[1]?.slots || 0,
             blue: options[2]?.slots || 0
         };
    }
    
    // Helper to get total slots for the wheel
    getTotalSlots(): number {
        const options = this.getOptions();
        return options[0].total; // All options in a set share the same total slots
    }
}
