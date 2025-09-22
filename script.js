$(document).ready(function () {
  // レベル1のデータ（1文字）
  const level1Data = [
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

  // レベル2のデータ（2文字）
  const level2Data = [
    { hira: "あい", roma: "AI" },
    { hira: "あお", roma: "AO" },
    { hira: "いえ", roma: "IE" },
    { hira: "うえ", roma: "UE" },
    { hira: "えい", roma: "EI" },
    { hira: "おい", roma: "OI" },
    { hira: "かお", roma: "KAO" },
    { hira: "きく", roma: "KIKU" },
    { hira: "くつ", roma: "KUTU" },
    { hira: "けい", roma: "KEI" },
    { hira: "こい", roma: "KOI" },
    { hira: "さい", roma: "SAI" },
    { hira: "しろ", roma: "SIRO" },
    { hira: "すし", roma: "SUSI" },
    { hira: "せい", roma: "SEI" },
    { hira: "そう", roma: "SOU" },
    { hira: "たい", roma: "TAI" },
    { hira: "ちい", roma: "TII" },
    { hira: "つき", roma: "TUKI" },
    { hira: "てん", roma: "TEN" },
    { hira: "とう", roma: "TOU" },
    { hira: "ない", roma: "NAI" },
    { hira: "にい", roma: "NII" },
    { hira: "ぬい", roma: "NUI" },
    { hira: "ねこ", roma: "NEKO" },
    { hira: "のう", roma: "NOU" },
    { hira: "はい", roma: "HAI" },
    { hira: "ひい", roma: "HII" },
    { hira: "ふう", roma: "HUU" },
    { hira: "へい", roma: "HEI" },
    { hira: "ほう", roma: "HOU" },
    { hira: "まい", roma: "MAI" },
    { hira: "みい", roma: "MII" },
    { hira: "むい", roma: "MUI" },
    { hira: "めい", roma: "MEI" },
    { hira: "もう", roma: "MOU" },
    { hira: "やい", roma: "YAI" },
    { hira: "ゆう", roma: "YUU" },
    { hira: "よう", roma: "YOU" },
    { hira: "らい", roma: "RAI" },
    { hira: "りい", roma: "RII" },
    { hira: "るい", roma: "RUI" },
    { hira: "れい", roma: "REI" },
    { hira: "ろう", roma: "ROU" },
    { hira: "わい", roma: "WAI" },
    { hira: "をい", roma: "WOI" },
    { hira: "んい", roma: "NNI" },
  ];

  let current,
    inputBuffer = "",
    questionCount = 0,
    correctCount = 0;

  let answered = false;
  let gameStarted = false;
  let currentLevel = 1; // 現在のレベル
  let currentData = level1Data; // 現在使用するデータ

  // タイマー関連の変数
  let gameStartTime = 0;
  let gameEndTime = 0;
  let timerInterval = null;

  const correctSound = document.getElementById("correct-sound");

  // タイマー関連の関数
  function startTimer() {
    gameStartTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000); // 1秒ごとに更新
  }

  function stopTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
    gameEndTime = Date.now();
  }

  function updateTimer() {
    const elapsed = Date.now() - gameStartTime;
    const seconds = Math.floor(elapsed / 1000);
    const timeString = `${seconds.toString().padStart(2, "0")}`;
    $("#timer-display").text(`時間: ${timeString}秒`);
  }

  function getGameTime() {
    if (gameEndTime > 0) {
      return (gameEndTime - gameStartTime) / 1000;
    }
    return (Date.now() - gameStartTime) / 1000;
  }

  function formatTime(seconds) {
    const wholeSeconds = Math.floor(seconds);
    return `${wholeSeconds}秒`;
  }

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

  // ゲームを開始する関数
  function startGame(level) {
    currentLevel = level;
    currentData = level === 1 ? level1Data : level2Data;

    $("#start-screen").hide();
    $("#game-container").show();
    $("#level-display").text(`レベル${level}`);
    $(".score-display").text(""); // 前回の時間表示をクリア
    $("#restart-btn").hide(); // リスタートボタンを非表示
    gameStarted = true;
    questionCount = 0;
    correctCount = 0;
    updateProgress();
    startTimer(); // タイマーを開始
    setNewCharacter();
  }

  // スタート画面に戻る関数
  function returnToStart() {
    $("#game-container").hide();
    $("#start-screen").show();
    $("#restart-btn").hide();
    gameStarted = false;
    questionCount = 0;
    correctCount = 0;
    answered = false;
    stopTimer(); // タイマーを停止
    $("#timer-display").text("時間: 00秒"); // タイマー表示をリセット
  }

  function setNewCharacter() {
    current = currentData[Math.floor(Math.random() * currentData.length)];
    inputBuffer = "";
    answered = false; // ← 問題切り替え時にリセット
    $(".hiragana-display").text(current.hira);
    $(".romaji-display").text(current.roma);
    $(".input-progress").text("");
    $(".message").text("");

    showCharacter("normal");
  }

  function endGame() {
    stopTimer(); // タイマーを停止
    const finalTime = getGameTime();
    $(".message").text("ゲームおわり！");
    $(".score-display").text(`かかった時間：${formatTime(finalTime)}`);
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
    let imgSrc = "images/character_normal.png";
    if (expression === "happy") imgSrc = "images/character_happy.png";
    if (expression === "sad") imgSrc = "images/character_sad.png";

    $("#character").attr("src", imgSrc);
  }

  // レベル選択ボタンのクリックイベント
  $("#level1-btn").click(function () {
    startGame(1);
  });

  $("#level2-btn").click(function () {
    startGame(2);
  });

  $(document).on("keydown", function (e) {
    if (!gameStarted) return; // ゲームが開始されていない場合は無視
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
          answered = true; // スコア重複防止
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
    returnToStart();
  });
});
