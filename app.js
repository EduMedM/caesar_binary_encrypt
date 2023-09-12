const btns = document.querySelectorAll(".tab-btn");
const about = document.querySelector(".about");
const articles = document.querySelectorAll(".content");

const k_value = document.getElementById("k_value");
const textEncrypt = document.getElementById("text_to_encrypt");
const form_e = document.getElementById("form_e");

const k_value_d = document.getElementById("k_value_d");
const textDecrypt = document.getElementById("text_to_decrypt");
const form_d = document.getElementById("form_d");

const divEncryptMessage = document.getElementById("div_encrypt");
const divDecryptMessage = document.getElementById("div_decrypt");
let currentElement = null;

const dictionary = {
  a: 0,
  b: 1,
  c: 2,
  d: 3,
  e: 4,
  f: 5,
  g: 6,
  h: 7,
  i: 8,
  j: 9,
  k: 10,
  l: 11,
  m: 12,
  n: 13,
  ñ: 14,
  o: 15,
  p: 16,
  q: 17,
  r: 18,
  s: 19,
  t: 20,
  u: 21,
  v: 22,
  w: 23,
  x: 24,
  y: 25,
  z: 26,
  " ": 27,
};

about.addEventListener("click", function (e) {
  const id = e.target.dataset.id;
  if (id) {
    btns.forEach(function (btn) {
      btn.classList.remove("active");
      //e.target.classList.add("active");
    });
    articles.forEach(function (article) {
      article.classList.remove("active");
    });
    const element = document.getElementById(id);
    element.classList.add("active");
  }
});

form_e.addEventListener("submit", (e) => {
  e.preventDefault();
  k = k_value.value;
  const k_n = parseInt(k, 10);

  if (!Number.isInteger(Number(k))) {
    alert("Por favor, ingrese un número entero válido para 'k'.");
    return;
  }

  const textEncrypted = encrypt(textEncrypt.value, k_n);
  console.log(textEncrypted);
  showMessage(textEncrypted, "Mensaje Encriptado");
});

form_d.addEventListener("submit", (e) => {
  e.preventDefault();

  k = k_value_d.value;
  const k_n = parseInt(k, 10);

  if (!Number.isInteger(Number(k))) {
    alert("Por favor, ingrese un número entero válido para 'k'.");
    return;
  }

  const textDecrypted = decrypt(textDecrypt.value, k_n);
  console.log("Estamos desencriptando");
  console.log(textDecrypted);
  showMessage(textDecrypted, "Mensaje Desencriptado");
});

function showMessage(message, processType) {
  if (currentElement) {
    currentElement.remove();
  }
  const element = document.createElement("article");
  element.classList.add("about-content");
  element.classList.add("msg-article");

  element.innerHTML = `<div class="msg-div"><h4>${processType}</h4>
  <p class="title">${message}</p></div>`;

  if (processType === "Mensaje Encriptado") {
    divEncryptMessage.appendChild(element);
    console.log(element);
  } else {
    divDecryptMessage.appendChild(element);
    console.log(element);
  }

  currentElement = element;
  console.log(element);
}

function encrypt(word, k) {
  const binaryValues = word
    .split("")
    .map((letter) => dictionary[letter.toLowerCase()])
    .filter((binaryValues) => binaryValues !== undefined)
    .map((binaryValues) => (binaryValues + k) % 28)
    .map((binaryValues) => binaryValues.toString(2));

  const message = binaryValues.join(" ");

  return message;
}

function decrypt(messageEncrypted, k) {
  const valuesEncrypted = messageEncrypted
    .split(" ")
    .map((binario) => parseInt(binario, 2));

  console.log("Binario a valores decimales: " + valuesEncrypted);

  const valuesDecrypted = valuesEncrypted.map(
    (value) => (((value - k) % 28) + 28) % 28
  );

  const message = valuesDecrypted
    .map((value) => {
      for (const letter in dictionary) {
        if (dictionary[letter] === value) {
          return letter;
        }
      }
    })
    .join("");

  return message;
}
