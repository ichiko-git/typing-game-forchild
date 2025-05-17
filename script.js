$(document).ready(function () {
  const data = [
    { hira: "あ", roma: "a" },
    { hira: "い", roma: "i" },
    { hira: "う", roma: "u" },
    { hira: "え", roma: "e" },
    { hira: "お", roma: "o" },
    { hira: "か", roma: "ka" },
    { hira: "き", roma: "ki" },
    { hira: "く", roma: "ku" },
    { hira: "け", roma: "ke" },
    { hira: "こ", roma: "ko" },
    { hira: "さ", roma: "sa" },
    { hira: "し", roma: "si" },
    { hira: "す", roma: "su" },
    { hira: "せ", roma: "se" },
    { hira: "そ", roma: "so" },
    { hira: "た", roma: "ta" },
    { hira: "ち", roma: "ti" },
    { hira: "つ", roma: "tu" },
    { hira: "て", roma: "te" },
    { hira: "と", roma: "to" },
    { hira: "な", roma: "na" },
    { hira: "に", roma: "ni" },
    { hira: "ぬ", roma: "nu" },
    { hira: "ね", roma: "ne" },
    { hira: "の", roma: "no" },
  ];

  let current,
    inputBuffer = "",
    questionCount = 0,
    correctCount = 0;

  let answered = false;

  const correctSound = document.getElementById("correct-sound");

  function setNewCharacter() {
    current = data[Math.floor(Math.random() * data.length)];
    inputBuffer = "";
    answered = false; // ← 問題切り替え時にリセット
    $(".hiragana-display").text(current.hira);
    $(".romaji-display").text(current.roma);
    $(".input-progress").text("");
    $(".message").text("");

    showCharacter("normal");
  }

  function endGame() {
    $(".message").text("ゲームおわり！");
    $(".score-display").text(`スコア：${correctCount} / 10`);
    $("#restart-btn").show();
  }

  function nextQuestion() {
    questionCount++;
    if (questionCount >= 10) {
      endGame();
    } else {
      setNewCharacter();
    }
  }

  function playCorrectSound() {
    correctSound.pause();
    correctSound.currentTime = 0;
    correctSound.play().catch((e) => {
      console.error("音が再生できませんでした:", e);
    });
  }

  function showCharacter(expression) {
    let imgSrc = "character_normal.png";
    if (expression === "happy") imgSrc = "character_happy.png";
    if (expression === "sad") imgSrc = "character_sad.png";

    $("#character").attr("src", imgSrc);
  }

  $(document).on("keydown", function (e) {
    if ($("#restart-btn").is(":visible")) return;
    if (answered) return; // すでに正解したら無視

    const key = e.key.toLowerCase();
    if (key.length === 1 && /[a-z]/.test(key)) {
      inputBuffer += key;
      $(".input-progress").text(inputBuffer);

      if (current.roma.startsWith(inputBuffer)) {
        if (inputBuffer === current.roma) {
          $(".message").text("すごい！できたね！");
          playCorrectSound();
          showCharacter("happy");
          correctCount++;
          answered = true; // スコア重複防止！
          setTimeout(nextQuestion, 1000);
        }
      } else {
        $(".message").text("もういっかい！");
        showCharacter("sad");
        inputBuffer = "";
        $(".input-progress").text("");
      }
    }
  });

  $("#restart-btn").click(function () {
    questionCount = 0;
    correctCount = 0;
    $("#restart-btn").hide();
    $(".score-display").text("");
    setNewCharacter();
  });

  setNewCharacter();
});
