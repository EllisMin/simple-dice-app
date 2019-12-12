(function() {
  var diceTwo, sound, toolTip;

  init();

  function init() {
    var diceDOM = document.querySelector(".dice-img");
    var dice2DOM = document.querySelector(".dice-img-2");
    dice2DOM.style.display = "none";
    document.querySelector(".btn-roll").addEventListener("click", handleRoll);
    useOneDice();
  }

  function handleRoll() {
    var diceDOM = document.querySelector(".dice-img");

    // Remove animation
    diceDOM.classList.remove("roll");
    void diceDOM.offsetWidth; // used to restart animation

    // get rand# btwn 1 - 6
    var dice = Math.floor(Math.random() * 6) + 1;

    // display dice with rand generated#
    diceDOM.style.display = "block";
    diceDOM.src = "./img/" + dice + ".png";

    if (!diceTwo) {
      if (dice === 6) prevRollSix = true;
      else prevRollSix = false;
      // roll animation
      diceDOM.classList.add("roll");
    }
    // Playing with 2 dices
    else {
      var dice2DOM = document.querySelector(".dice-img-2");
      dice2DOM.classList.remove("roll");
      void dice2DOM.offsetWidth;

      var dice2 = Math.floor(Math.random() * 6) + 1;
      dice2DOM.style.display = "block";
      dice2DOM.src = "./img/" + dice2 + ".png";

      if (dice === 6 || dice2 === 6) prevRollSix = true;
      else prevRollSix = false;
      // roll animation
      diceDOM.classList.add("roll");
      dice2DOM.classList.add("roll");
    }
  }

  // slider to use 2 dices
  document
    .getElementById("checkbox-two-dice")
    .addEventListener("change", function() {
      // Add a dice
      if (this.checked) {
        diceTwo = true;
        document.querySelector(".dice-img-2").src = "./img/7.png";
        document.querySelector(".dice-img").style.display = "block";
        document.querySelector(".dice-img-2").style.display = "block";
        document
          .querySelector(".dice-container")
          .classList.add("separate-dice");
      }
      // Back to one dice
      else {
        useOneDice();
      }
    });

  function useOneDice() {
    document.querySelector(".dice-img-2").style.display = "none";
    diceTwo = false;
    document.querySelector(".dice-container").classList.remove("separate-dice");
  }
})();
