(function () {
  var diceTwo, sound;
  var audio;

  init();

  // returns true when browsed by mobile device
  function mobileCheck() {
    var check = false;
    (function (a) {
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
          a
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          a.substr(0, 4)
        )
      )
        check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
  }

  function init() {
    // Add fastclick on body
    if ("addEventListener" in document) {
      document.addEventListener(
        "DOMContentLoaded",
        function () {
          FastClick.attach(document.body);
        },
        false
      );
    }
    // var diceDOM = document.querySelector(".dice-img");
    var dice2DOM = document.querySelector(".dice-img-2");
    dice2DOM.style.display = "none";
    document.querySelector("body").addEventListener("click", handleRoll);
    // Don't roll when clicking option container
    document
      .querySelector(".option-container")
      .addEventListener("click", function (e) {
        e.stopPropagation();
      });
    useOneDice();
    sound = false;
    // Roll on pressing spacebar
    document.addEventListener("keyup", function (e) {
      if (e.keyCode === 32 || e.which === 32) {
        handleRoll();
      }
    });
    // Change tooltip msg for mobile
    if (mobileCheck()) {
      document.querySelector(".tooltip-2").innerHTML = "tap anywhere to roll!";
    }

    audio = new Audio("./sound/diceroll.mp3");
  }

  function getRandomInt(min, max) {
    // Create byte array and fill with 1 random number
    var byteArray = new Uint8Array(1);
    var cryptoObj = window.crypto || window.msCrypto;
    cryptoObj.getRandomValues(byteArray);
    var range = max - min + 1;
    var max_range = 256;
    if (byteArray[0] >= Math.floor(max_range / range) * range)
      return getRandomInt(min, max);
    return min + (byteArray[0] % range);
  }

  function handleRoll() {
    var diceDOM = document.querySelector(".dice-img");

    // Remove animation
    diceDOM.classList.remove("roll");
    void diceDOM.offsetWidth; // used to restart animation

    // get rand# btwn 1 - 6
    var dice = getRandomInt(1, 6);
    // var dice = Math.floor(Math.random() * 6) + 1;

    // display dice with rand generated#
    diceDOM.style.display = "block";
    diceDOM.src = "./img/" + dice + ".png";

    var tooltipDOM = document.querySelector(".tooltip");
    if (!diceTwo) {
      // roll animation
      diceDOM.classList.add("roll");
      // update tooltip
      tooltipDOM.innerHTML = dice + "!";
    }
    // Playing with 2 dices
    else {
      var dice2DOM = document.querySelector(".dice-img-2");
      dice2DOM.classList.remove("roll");
      void dice2DOM.offsetWidth;

      var dice2 = getRandomInt(1, 6);
      // var dice2 = Math.floor(Math.random() * 6) + 1;

      dice2DOM.style.display = "block";
      dice2DOM.src = "./img/" + dice2 + ".png";

      if (dice === 6 || dice2 === 6) prevRollSix = true;
      else prevRollSix = false;
      // roll animation
      diceDOM.classList.add("roll");
      dice2DOM.classList.add("roll");
      // update tooltip
      tooltipDOM.innerHTML = dice + dice2 + "!";
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
    .addEventListener("change", function () {
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
      // Removes focus
      document.getElementById("checkbox-two-dice").blur();
    });

  // slider to display tooltip
  document
    .getElementById("checkbox-show-number")
    .addEventListener("change", function () {
      if (this.checked) {
        toolTip = true;
        document.querySelector(".tooltip").classList.add("show-tooltip");
      } else {
        toolTip = false;
        document.querySelector(".tooltip").classList.remove("show-tooltip");
      }
      document.getElementById("checkbox-show-number").blur();
    });

  // slider to turn on sound
  document
    .getElementById("checkbox-sound")
    .addEventListener("change", function () {
      if (this.checked) {
        sound = true;
      } else {
        sound = false;
      }
      document.getElementById("checkbox-sound").blur();
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
