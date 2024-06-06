const titles = [
  "Nazwa",
  "Historia Regionu"
];

const texts = [
  "Określenie regionu używane jest w zależności od kontekstu: w odniesieniu do ziemi lubelskiej (średniowiecze), województwa lubelskiego z lat 1474–1795 lub do późniejszych województw lubelskich. Po 1999 r. instytucje samorządowe pod nazwą Lubelszczyzna określają obecne województwo lubelskie i stosują je zamiennie.\n" +
  "\n" +
  "W literaturze historycznej nazwą Lubelszczyzna określa się historyczne województwo lubelskie istniejące w latach 1474–1795[3], którego obszar różnił się od obszaru współczesnego województwa lubelskiego. Lubelszczyzna w tym ujęciu stanowi północno-wschodnią część Małopolski. Graniczy z ziemią sandomierską na zachodzie, Mazowszem na północnym zachodzie, Podlasiem (wraz z Podlasiem Południowym) na północnym wschodzie oraz Grodami Czerwieńskimi/Rusią Czerwoną na wschodzie.",
  "W 1474 r. król Kazimierz IV Jagiellończyk wydzielił z ówczesnego województwa sandomierskiego nowe – województwo lubelskie, w skład którego weszły tereny ziemi lubelskiej i ziemi łukowskiej.\n" +
  "\n" +
  "Protestantyzm na Lubelszczyźnie pojawił się dopiero w drugiej połowie XVI w., jednak ten region Polski szybko stał się jednym z najważniejszych ośrodków kalwinizmu i arianizmu aż do połowy XVII w., kiedy zwyciężyła kontrreformacja. Działała tu jedna z gmin braci polskich, której przedstawicielem był Jan Niemojewski, a ministrem zboru Marcin Czechowic.\n" +
  "\n" +
  "Po III rozbiorze w 1795 Lubelszczyzna znalazła się pod panowaniem Austrii. W 1809 region został włączony do Księstwa Warszawskiego. W 1815 znalazło się w Królestwie Polskim w zaborze rosyjskim, w 1837 Lublin został stolicą guberni lubelskiej.\n" +
  "\n" +
  "W 1801 Izabela Czartoryska założyła w Świątyni Sybilli w Puławach pierwsze polskie muzeum. W 1831 stoczono na Lubelszczyźnie kilka bitew powstania listopadowego.\n" +
  "\n" +
  "W 1877 zbudowano pierwsze połączenie kolejowe. Podczas I wojny światowej rosyjski odwrót i zajęcie regionu przez wojska niemieckie i austro-węgierskie w lecie 1915 ostatecznie zakończyło rosyjskie rządy na Lubelszczyźnie."
];

let currentIndex = 0;
let autoChangeInterval;

function updateContent() {
  document.getElementById('title-field').innerText = titles[currentIndex];
  document.getElementById('text-field').innerText = texts[currentIndex];
}

function smoothTransition() {
  const titleField = document.getElementById('title-field');
  const textField = document.getElementById('text-field');

  titleField.classList.add('hidden');
  textField.classList.add('hidden');

  setTimeout(() => {
    updateContent();
    titleField.classList.remove('hidden');
    textField.classList.remove('hidden');
  }, 1000);
}

function nextContent() {
  currentIndex = (currentIndex === texts.length - 1) ? 0 : currentIndex + 1;
  smoothTransition();
}

function prevContent() {
  currentIndex = (currentIndex === 0) ? texts.length - 1 : currentIndex - 1;
  smoothTransition();
}

document.getElementById('prev-btn').addEventListener('click', () => {
  clearInterval(autoChangeInterval);
  prevContent();
  autoChangeInterval = setInterval(nextContent, 30000);
});

document.getElementById('next-btn').addEventListener('click', () => {
  clearInterval(autoChangeInterval);
  nextContent();
  autoChangeInterval = setInterval(nextContent, 30000);
});

document.addEventListener('DOMContentLoaded', () => {
  autoChangeInterval = setInterval(nextContent, 30000);
  updateContent();
});

