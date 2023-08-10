const sentences = [
  "Cái Nết Đánh Chết Cái Đẹp",
  "Ăn Quả Nhớ Kẻ Trồng Cây",
  "Bán Anh Em Xa, Mua Láng Giềng Gần",
  "Ăn Cháo, Đá Bát",
  "Có Công Mài Sắt, Có Ngày Nên Kim",
  "Ai Ơi Bưng Bát Cơm Đầy Dẻo Thơm Một Hạt, Đắng Cay Muôn Phần",
  "Anh Đi Anh Nhớ Quê Nhà Nhớ Canh Rau Muống, Nhớ Cà Dầm Tương",
  "Chớ Thấy Sóng Cả Mà Rã Tay Chèo",
  "Cá Lớn Nuốt Cá Bé",
  "Con Hơn Cha Là Nhà Có Phúc",
  "Đói Cho Sạch, Rách Cho Thơm",
  "Ăn Một Miếng, Tiếng Để Đời",
  "Cái Áo Không Làm Nên Thầy Tu",
  "Chó Cậy Gần Nhà, Gà Cậy Gần Chuồng",
  "Ăn Cỗ Đi Trước, Lội Nước Theo Sau",
  "Bắt Cá Hai Tay",
  "Ách Giữa Đàng, Quàng Vào Cổ",
  "Dĩ Hòa Vi Quí",
  "Ăn Có Chỗ, Đỗ Có Nơi",
  "Già Néo Đứt Giây",
  "Con Gái Mười Bảy Bẻ Gẫy Sừng Trâu",
  "Con Hát Mẹ Khen Hay",
  "Dùi Đục Chấm Nước Mắm",
  "Cha Mẹ Sinh Con, Trời Sinh Tính",
  "Đầu Voi Đuôi Chuột",
  "Vợ Chồng Đầu Gối, Tay Ấp",
  "Phận Đàn Em Ăn Thèm Vác Nặng",
  "Giàu Ăn Ba Bữa, Khó Cũng Đỏ Lửa Ba Lần",
  "Vắng Đàn Ông Quạnh Nhà, Vắng Đàn Bà Quạnh Bếp",
  "Ăn Cây Nào Rào Cây Nấy",
  "Phú Quý Sinh Lễ Nghĩa",
  "Cái Răng, Cái Tóc Là Góc Con Người",
  "Chó Treo, Mèo Đậy",
  "Rượu Vào, Lời Ra",
  "Ai Giàu Ba Họ, Ai Khó Ba Đời",
];

const sentenceElement = document.getElementById("sentence");
const wordOptionsElement = document.getElementById("wordOptions");
const resultElement = document.getElementById("result");
const scoreElement = document.getElementById("currentScore");
const selectedWordsElement = document.getElementById("selectedWords");
const hiddenWordsElement = document.getElementById("hiddenWords");
const resetButton = document.getElementById("resetButton");
const randomButton = document.getElementById("randomButton");
const editButton = document.getElementById("editButton");

let correctWords = [];
let selectedWords = [];
let score = 0;

randomButton.addEventListener("click", displayRandomSentence);
resetButton.addEventListener("click", resetGame);
editButton.addEventListener("click", editWords);

displayRandomSentence();

function displayRandomSentence() {
  const randomIndex = Math.floor(Math.random() * sentences.length);
  const randomSentence = sentences[randomIndex];
  const words = randomSentence.split(" ");
  correctWords = [...words];
  selectedWords = [];

  sentenceElement.textContent = randomSentence;
  wordOptionsElement.innerHTML = "";

  const shuffledWords = shuffleArray(words);
  shuffledWords.forEach((word) => {
    const option = document.createElement("div");
    option.classList.add("word-option");
    option.textContent = word;
    option.addEventListener("click", () => selectWord(word, option));
    wordOptionsElement.appendChild(option);
  });

  resultElement.textContent = "";
  scoreElement.textContent = score;
  selectedWordsElement.innerHTML = "";
  hiddenWordsElement.innerHTML = "";
}

let newSentenceCount = 0;
let maxNewSentences = 3; // Số lần tạo câu mới tối đa

// ... (Các phần mã JavaScript khác của bạn)

// Xử lý sự kiện khi nút "Câu mới" được nhấn
document.getElementById("randomButton").addEventListener("click", function() {
  if (newSentenceCount < maxNewSentences) {
    newSentenceCount++; // Tăng biến đếm

    // Gọi hàm để tạo câu mới ở đây

    // Hiển thị thông báo số lần còn lại
    const remainingAttempts = maxNewSentences - newSentenceCount;
    alert(`Bạn còn ${remainingAttempts} lần để tạo câu mới.`);
    
    // Nếu đã sử dụng hết lượt, vô hiệu hóa nút "Câu mới"
    if (newSentenceCount === maxNewSentences) {
      document.getElementById("randomButton").disabled = true;
    }
  } else {
    alert("Bạn đã hết lượt tạo câu mới.");
  }
});


function selectWord(selectedWord, selectedWordElement) {
  const wordCount = selectedWords.filter(
    (word) => word === selectedWord
  ).length;

  if (wordCount < 10) {
    selectedWords.push(selectedWord);
    displaySelectedWords();
    selectedWordElement.classList.add("chosen");
    selectedWordElement.style.pointerEvents = "none";
    selectedWordElement.removeEventListener("mousedown", () =>
      selectWord(selectedWord, selectedWordElement)
    );
    selectedWordElement.addEventListener("mousedown", () =>
      unselectWord(selectedWord, selectedWordElement)
    );
    checkSentence();
  }
}

// ...

function unselectWord(selectedWord, selectedWordElement) {
  const index = selectedWords.indexOf(selectedWord);
  if (index !== -1) {
    selectedWords.splice(index, 1);
    displaySelectedWords();
    selectedWordElement.classList.remove("chosen");
    selectedWordElement.style.pointerEvents = "auto";
    selectedWordElement.removeEventListener("mousedown", () =>
      unselectWord(selectedWord, selectedWordElement)
    );
    selectedWordElement.addEventListener("mousedown", () =>
      selectWord(selectedWord, selectedWordElement)
    );
    const wordOptions = document.querySelectorAll(".word-option");
    wordOptions.forEach((option) => {
      if (option.textContent === selectedWord) {
        option.style.display = "block";
        option.style.pointerEvents = "auto";
        option.classList.remove("chosen");
        option.removeEventListener("mousedown", () =>
          unselectWord(selectedWord, option)
        );
        option.addEventListener("mousedown", () =>
          selectWord(selectedWord, option)
        );
      }
    });
  }
}

function displaySelectedWords() {
  selectedWordsElement.innerHTML = ""; // Xóa nội dung cũ
  selectedWords.forEach((word) => {
    const wordButton = document.createElement("button");
    wordButton.textContent = word;
    wordButton.classList.add("selected-word-btn", "btn", "btn-secondary");
    wordButton.addEventListener("click", () => unselectWord(word, wordButton));
    selectedWordsElement.appendChild(wordButton);
  });
}

function checkSentence() {
  const selectedSentence = selectedWords.join(" ");
  if (sentences.includes(selectedSentence)) {
    resultElement.textContent = "Chính xác! Điểm số tăng thêm 10 điểm.";
    score += 10;
    scoreElement.textContent = score;

    const hiddenWords = document.querySelectorAll(".hidden-word");
    hiddenWords.forEach((word) => {
      word.style.display = "none";
    });

    setTimeout(displayRandomSentence, 1000);
  } else if (selectedWords.length === correctWords.length) {
    resultElement.textContent = "Sai rồi. Bạn bị trừ 10 điểm.";
    score -= 10; // Trừ 10 điểm
    scoreElement.textContent = score;

    const wordOptions = document.querySelectorAll(".word-option");
    wordOptions.forEach((option) => {
      option.style.pointerEvents = "none"; // Ngăn người dùng nhấn vào từ
    });

    setTimeout(() => {
      resultElement.textContent = "";
      selectedWords = [];
      selectedWordsElement.innerHTML = "";
      wordOptions.forEach((option) => {
        option.style.display = "block";
        option.style.pointerEvents = "auto"; // Cho phép người dùng nhấn vào từ
        option.classList.remove("chosen"); // Bỏ class "chosen"
      });
    }, 2000); // Đợi 2 giây trước khi xóa thông báo và cho phép chọn từ lại
  }
}
let highScore = 0;
function resetGame() {
  selectedWords = [];
  selectedWordsElement.innerHTML = "";
  const wordOptions = document.querySelectorAll(".word-option");
  wordOptions.forEach((option) => {
    option.style.display = "block";
    option.style.pointerEvents = "auto";
    option.classList.remove("chosen");
  });
  if (score > highScore) {
    highScore = score;
  }

  // Hiển thị điểm cao nhất trên màn hình
  document.getElementById("highScoreDisplay").textContent = highScore;

  resultElement.textContent = "";
 
  score = 0;
  newSentenceCount = 0;

  scoreElement.textContent = score;
  displayRandomSentence();
}

function editWords() {
  selectedWords = [];
  selectedWordsElement.innerHTML = "";

  const wordOptions = document.querySelectorAll(".word-option");
  wordOptions.forEach((option) => {
    option.style.display = "block";
    option.style.pointerEvents = "auto"; // Cho phép người dùng nhấn vào từ
    option.classList.remove("chosen"); // Bỏ class "chosen"
  });
}

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const clearSelectionButton = document.getElementById("clearSelectionButton");
clearSelectionButton.addEventListener("click", clearSelection);

function clearSelection() {
  selectedWords = [];
  selectedWordsElement.innerHTML = "";
  const wordOptions = document.querySelectorAll(".word-option");
  wordOptions.forEach((option) => {
    option.style.display = "block";
    option.style.pointerEvents = "auto";
    option.classList.remove("chosen");
  });
}
