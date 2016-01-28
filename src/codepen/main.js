var words = [
	['piec, wypalać', 'backen', 'buk', 'hat gebacken'],
	['zaczynać', 'beginnen', 'buk', 'hat gebacken'],
	['uchronić, kryć', 'bergen', 'barg', 'hat geborgen'],
	['oferować', 'bieten', 'bot', 'hat geboten'],
	['wiązać, łączyć', 'binden', 'band', 'hat gebunden'],
	['prosić', 'bitten', 'bat', 'hat gebeten'],
	['zostawać', 'bleiben', 'blieb', 'ist geblieben'],
	['piec, smażyć', 'braten', 'briet', 'hat gebraten'],
	['łamać, kruszyć', 'brechen', 'brach', 'hat gebrochen'],
	['palić się, płonąć', 'brennen', 'brannte', 'hat gebrannt'],
	['przynosić', 'bringen', 'brachte', 'hat gebracht'],
	['myśleć', 'denken', 'dachte', 'hat gedacht'],
	['móc (mieć pozwolenie)', 'dürfen', 'durfte', 'hat gedurft'],
	['polecać, rekomendować', 'empfehlen', 'empfahl', 'hat empfohlen'],
	['decydować', 'entscheiden', 'entschied', 'hat entschieden'],
	['jeść', 'essen', 'aß', 'hat gegessen'],
	['jechać, zawieźć', 'fahren', 'fuhr', 'ist/hat gefahren'],
	['upadać, spadać', 'fallen', 'fiel', 'ist gefallen'],
	['łapać', 'fangen', 'fing', 'hat gefangen'],
	['znajdować', 'finden', 'fand', 'hat gefunden'],
	['latać', 'fliegen', 'flog', 'ist geflogen'],
	['płynąć, cieknąć', 'fließen', 'floß', 'ist geflossen'],
	['rodzić', 'gebären', 'gebar', 'hat geboren'],
	['dawać', 'geben', 'gab', 'hat gegeben'],
	['chodzić', 'gehen', 'ging', 'ist gegangen'],
	['udawać się, powieść się', 'gelingen', 'gelang', 'ist gelungen'],
	['spożywać', 'genießen', 'genoß', 'hat genossen'],
	['stać się dziać się', 'geschehen', 'geschah', 'ist geschehen'],
	['wygrywać', 'gewinnen', 'gewann', 'hat gewonnen'],
	['nalewać, lać', 'gießen', 'goß', 'hat gegossen'],
	['wyrównywać', 'gleichen', 'glich', 'hat geglichen'],
	['ślizgać się, szybować', 'gleiten', 'glitt', 'ist geglitten'],
	['łapać, ujmować', 'greifen', 'griff', 'hat gegriffen'],
	['mieć', 'haben', 'hatte', 'hat gehabt'],
	['trzymać', 'halten', 'hielt', 'hat gehalten'],
	['podnosić', 'heben', 'hob', 'hat gehobem'],
	['nazywać się', 'heißen', 'hieß', 'hat geheißen'],
	['pomagać', 'helfen', 'half', 'hat geholfen'],
	['znać', 'kennen', 'kannte', 'hat gekannt'],
	['przychodzić', 'kommen', 'kam', 'ist gekommen'],
	['móc, umieć', 'können', 'konnte', 'hat gekonnt'],
	['ładować', 'laden', 'lud', 'hat geladen'],
	['pozwalać', 'lassen', 'ließ', 'hat gelassen'],
	['biegać, pędzić', 'laufen', 'lief', 'ist gelaufen'],
	['cierpieć', 'leiden', 'litt', 'hat gelitten'],
	['pożyczać', 'leihen', 'lieh', 'hat geliehen'],
	['czytać', 'lesen', 'las', 'hat gelesen'],
	],
	answer =  document.getElementById('answer'),
	word = document.getElementById('word'),
	active = Math.floor(Math.random() * words.length),
	[round, correctAnsw] = [0, 0];

/*
		['grać', 'spielen', 'spielte', 'gespielt'],
		['mieszkać', 'wohnen', 'wohnte', 'gewohnt'],
		['malować', 'malen', 'malte', 'gemalt'],
		['płakać', 'weinen', 'weinte', 'geweint'],
		['pytać', 'fragen', 'fragte', 'gefragt'],
		['robić', 'machen', 'machte', 'gemacht'],
		['ćwiczyć', 'üben', 'übte', 'geübt'],
		['parkować', 'parken', 'parkte', 'geparkt'],
		['śmiać się', 'lachen' , 'lachte', 'gelacht'],
		['słuchać', 'hören', 'hörte' , 'gehört'],
		['fotografować', 'fotografieren', 'fotografierte', 'gefotografiert'],
		['zamawiać', 'bestellen', 'bestellte', 'gebestellt'],
		['żyć', 'leben', 'lebte', 'gelebt'],
		['czyścić', 'putzen', 'putzte', 'geputzt'],
		['szukać', 'suchen', 'suchte', 'gesucht'],
		['budować', 'bauen', 'baute', 'gebaut'],
		['pokazywać', 'zeigen', 'zeigte', 'zeigt'],
		['wybierać', 'wählen', 'wählte', 'gewählt'],
		['wręczać', 'schenken', 'schenkte', 'geschenkt'],
		['kochać', 'lieben', 'liebte', 'geliebt'],
		['produkować', 'produzieren', 'produzierte', 'geproduziert'],
		['odbierać', 'apholen', 'holte ap', 'apgeholt'],
		['obchodzić, świętować', 'feiern', 'feiernte', 'gefeiernt'],
		['zarabiać', 'verdienen', 'verdiente', 'geverdient']

*/

words.map((elem) => elem[4] = 0);

function next() {
  let li = document.createElement('li'),
  old = active;

  while (words[active][4] > 5 || active == old) {
    console.log(words[active][4]);active = Math.floor(Math.random() * words.length);
  }

  li.innerHTML = words[active][0];
  word.insertBefore(li, word.firstChild);
}

function show(correct) {
  answer.value = '';
  let li = document.createElement('li'),
  color;

  round++;
  if (correct) {
    correctAnsw++;
    words[active][4]++;
    color = '#2da';
  }else {
    words[active][4] = 0;
    color = '#c22';
  }

  let str = '';
  for (let i = 0; i++ < words[active].length - 1;)
  str += `${words[active][i - 1]} - `;
  word.firstChild.style.background = color;
  word.firstChild.innerHTML = str;
  document.getElementById('score').innerHTML = `${correctAnsw}/${round}`;
  document.getElementById('percent').innerHTML = `${Math.round(correctAnsw * 100 / round)}%`;
  next();
}

next();
answer.onkeydown = (key) => {
  if (key.which == 13) {
    console.log(answer.value);
    answer.value.toLowerCase() == words[active][1].replace('ü', 'u').replace('ß', 's').replace('ä', 'a').replace('ö', 'o') ? show(true) : show(false);
  }
};
