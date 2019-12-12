(function() {
  var diceTwo, sound;
  var audio = new Audio("./sound/diceroll.mp3");
  init();

  function init() {
    // var diceDOM = document.querySelector(".dice-img");
    var dice2DOM = document.querySelector(".dice-img-2");
    dice2DOM.style.display = "none";
    document.querySelector("body").addEventListener("click", handleRoll);
    // Don't roll when clicking option container
    document
      .querySelector(".option-container")
      .addEventListener("click", function(e) {
        e.stopPropagation();
      });
    useOneDice();
    sound = false;
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

    var tooltipDOM = document.querySelector(".tooltip");
    if (!diceTwo) {
      // roll animation
      diceDOM.classList.add("roll");
      // update tooltip
      tooltipDOM.innerHTML = dice;
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
      // update tooltip
      tooltipDOM.innerHTML = dice + dice2;
    }
    // play dice roll
    if (sound) {
      if (audio.paused) audio.play();
      else audio.currentTime = 0;
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

        document
          .querySelector(".option-container")
          .classList.add("move-option-container");
      }
      // Back to one dice
      else {
        useOneDice();
      }
    });

  // slider to display tooltip
  document
    .getElementById("checkbox-show-number")
    .addEventListener("change", function() {
      if (this.checked) {
        toolTip = true;
        document.querySelector(".tooltip").classList.add("show-tooltip");
      } else {
        toolTip = false;
        document.querySelector(".tooltip").classList.remove("show-tooltip");
      }
    });

  // slider to turn on sound
  document
    .getElementById("checkbox-sound")
    .addEventListener("change", function() {
      if (this.checked) {
        sound = true;
      } else {
        sound = false;
      }
    });

  function useOneDice() {
    document.querySelector(".dice-img-2").style.display = "none";
    diceTwo = false;
    document.querySelector(".dice-container").classList.remove("separate-dice");
    document
      .querySelector(".option-container")
      .classList.remove("move-option-container");
  }
})();
