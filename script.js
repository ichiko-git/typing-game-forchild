$(document).ready(function () {
  const data = [
    { hira: "あ", roma: "A" },
    { hira: "い", roma: "I" },
    { hira: "う", roma: "U" },
    { hira: "え", roma: "E" },
    { hira: "お", roma: "O" },
    { hira: "か", roma: "KA" },
    { hira: "き", roma: "KI" },
    { hira: "く", roma: "KU" },
    { hira: "け", roma: "KE" },
    { hira: "こ", roma: "KO" },
    { hira: "さ", roma: "SA" },
    { hira: "し", roma: "SI" },
    { hira: "す", roma: "SU" },
    { hira: "せ", roma: "SE" },
    { hira: "そ", roma: "SO" },
    { hira: "た", roma: "TA" },
    { hira: "ち", roma: "TI" },
    { hira: "つ", roma: "TU" },
    { hira: "て", roma: "TE" },
    { hira: "と", roma: "TO" },
    { hira: "な", roma: "NA" },
    { hira: "に", roma: "NI" },
    { hira: "ぬ", roma: "NU" },
    { hira: "ね", roma: "NE" },
    { hira: "の", roma: "NO" },
    { hira: "は", roma: "HA" },
    { hira: "ひ", roma: "HI" },
    { hira: "ふ", roma: "HU" },
    { hira: "へ", roma: "HE" },
    { hira: "ほ", roma: "HO" },
    { hira: "ま", roma: "MA" },
    { hira: "み", roma: "MI" },
    { hira: "む", roma: "MU" },
    { hira: "め", roma: "ME" },
    { hira: "も", roma: "MO" },
    { hira: "や", roma: "YA" },
    { hira: "ゆ", roma: "YU" },
    { hira: "よ", roma: "YO" },
    { hira: "ら", roma: "RA" },
    { hira: "り", roma: "RI" },
    { hira: "る", roma: "RU" },
    { hira: "れ", roma: "RE" },
    { hira: "ろ", roma: "RO" },
    { hira: "わ", roma: "WA" },
    { hira: "を", roma: "WO" },
    { hira: "ん", roma: "NN" },
  ];

  let current,
    inputBuffer = "",
    questionCount = 0,
    correctCount = 0;

  let answered = false;

  const correctSound = document.getElementById("correct-sound");

  // プログレスバーを更新する関数
  function updateProgress() {
    const progress = (questionCount / 10) * 100;
    const questionNumber = questionCount + 1;
    $(".progress-fill").css("width", progress + "%");
    if (questionNumber <= 10) {
      $(".progress-text").text(`問題 ${questionNumber} / 10`);
    } else {
      // 更新しない
    }
  }

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
    updateProgress(); // プログレスバーを更新
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

      // 入力バッファを大文字に変換して比較
      const inputBufferUpper = inputBuffer.toUpperCase();

      if (current.roma.startsWith(inputBufferUpper)) {
        if (inputBufferUpper === current.roma) {
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
    updateProgress(); // プログレスバーをリセット
    setNewCharacter();
  });

  setNewCharacter();
});
