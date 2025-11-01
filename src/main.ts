import { Results } from "./Results";
import { TryAgain } from "./TryAgain";

const containerId = "container";

function showTryAgain() {
  // clear previous Konva stage
  document.getElementById(containerId)!.innerHTML = "";

  new TryAgain({
    containerId,
    hearts: 3,
    onRestart: () => alert("Restart clicked!"),
  });
}

function showResults() {
  const game1Results =
    "RESULTS\n\n\n\n" +
    "🔴Red ➡️ -$406\n" +
    "🟢Green ➡️ +$545\n" +
    "🔵Blue ➡️ -$120.8\n\n" +
    "Your choice of green won!";

  // clear container before drawing results
  document.getElementById(containerId)!.innerHTML = "";

  new Results({
    containerId,
    resultText: game1Results,
    hearts: 3,
    onProceed: () => {
      console.log("Proceed clicked — moving to Try Again screen");
      showTryAgain();
    },
  });
}

// Start by showing the Results page
showResults();
