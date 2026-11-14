
const players = Array.from(
  document.querySelectorAll(".player")
);

const playersArea = document.querySelector(".players");

// ライフの増減
players.forEach(player => {
  const number = player.querySelector(".life-number");
  const plus = player.querySelector(".plus");
  const minus = player.querySelector(".minus");

  plus.addEventListener("click", () => {
    number.textContent = Number(number.textContent) + 1;
  });

  minus.addEventListener("click", () => {
    number.textContent = Number(number.textContent) - 1;
  });
});

// ターン順をランダムに決める
document.getElementById("turn-order").addEventListener("click", () => {
  const shuffled = [...players];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // 時計回り：左上 → 右上 → 右下 → 左下
  const positions = [
    [1, 1],
    [2, 1],
    [2, 2],
    [1, 2]
  ];

  shuffled.forEach((player, index) => {
    const [row, column] = positions[index];

    player.style.gridRow = row;
    player.style.gridColumn = column;

    let order = player.querySelector(".turn-number");

    if (!order) {
      order = document.createElement("div");
      order.className = "turn-number";
      player.prepend(order);
    }

    order.textContent = "TURN " + (index + 1);
  });
});

// リセット
document.getElementById("reset").addEventListener("click", () => {
  players.forEach(player => {
    player.querySelector(".life-number").textContent = "40";

    const order = player.querySelector(".turn-number");
    if (order) order.remove();

    player.style.gridRow = "";
    player.style.gridColumn = "";
  });
});

