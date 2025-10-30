import { Results } from "./Results";

const game1Results = "\
	RESULTS\n\n\n\n\
	🔴Red ➡️ -$406\n\
	🟢Green ➡️ +$545\n\
	🔵Blue ➡️ -$120.8\n\
	\n\
	Your choice of green won!\
	"

new Results({
  containerId: "container",
  resultText: game1Results,
  hearts: 3,
});

