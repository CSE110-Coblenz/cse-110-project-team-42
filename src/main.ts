import { Results } from "./Results";

const game1Results = "\
	RESULTS\n\n\n\n\
	🔴Red ➡️ -$406\n\
	🟢Green ➡️ +$545\n\
	🔵Blue ➡️ -$120.8\n\
	\n\
	Your choice of green won!"

const game2Results = "\
	RESULTS\n\n\n\n\
	$5 Buy in:                    $3 Buy in:                    $10 Buy in:\n\
	EV = +0.77                    EV = +1.15                    EV = +2.69\n\
	1000 trials = +$7700     1000 trials = +$11500     1000 trials = +$26900"

new Results({
  containerId: "container",
  resultText: game2Results,
  hearts: 3,
  onProceed: () => alert("clicked"),
});

