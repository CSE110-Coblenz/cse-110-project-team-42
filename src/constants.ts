// Stage dimensions
export const STAGE_WIDTH = 800;
export const STAGE_HEIGHT = 600;

export const GAME1RESULTSTEXT =
	"RESULTS\n\n\n\n\
	🔴Red ➡️ {0}\n\
	🟢Green ➡️ {1}\n\
	🔵Blue ➡️ {2}\n\n\
	Your choice of green won!";



export const ROULLET_OPTIONS1 = [
  { 
    id: "r1_opt1", 
    label: "$1 Buy in\n+$10 Payoff", 
    buyIn: 1, 
    payoff: 10, 
    slots: 1, 
    total: 10, 
	color: "Red"
  },
  { 
    id: "r1_opt2", 
    label: "$1 Buy in\n+$2 Payoff", 
    buyIn: 1, 
    payoff: 2, 
    slots: 3, 
    total: 10,
	color: "Black"
  },
  { 
    id: "r1_opt3", 
    label: "$1 Buy in\n+$0.5 Payoff", 
    buyIn: 1, 
    payoff: 0.5, 
    slots: 6, 
    total: 10,
	color: "Blue"
  },
];


export const ROULLET_OPTIONS2 = [
  {
    id: "r2_opt1",
    label: "$1 Buy in\n+$6 Payoff",
    buyIn: 1,
    payoff: 6,
    slots: 2,
    total: 12,
    color: "Yellow"
  },
  {
    id: "r2_opt2",
    label: "$1 Buy in\n+$1.5 Payoff",
    buyIn: 1,
    payoff: 1.5,
    slots: 4,
    total: 12,
    color: "Blue"
  },
  {
    id: "r2_opt3",
    label: "$1 Buy in\n+$0.5 Payoff",
    buyIn: 1,
    payoff: 0.5,
    slots: 6,
    total: 12,
    color: "Brown"
  }
];

export const ROULLET_OPTIONS3 = [
  {
    id: "r3_opt1",
    label: "$1 Buy in\n+$8 Payoff",
    buyIn: 1,
    payoff: 8,
    slots: 1,
    total: 8,
    color: "Orange"
  },
  {
    id: "r3_opt2",
    label: "$1 Buy in\n+$1.5 Payoff",
    buyIn: 1,
    payoff: 1.5,
    slots: 3,
    total: 8,
    color: "Green"
  },
  {
    id: "r3_opt3",
    label: "$1 Buy in\n+$0.6 Payoff",
    buyIn: 1,
    payoff: 0.6,
    slots: 4,
    total: 8,
    color: "REd"
  }
];