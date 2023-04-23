function skipTags(node) {
  const skipTags = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];
  return skipTags.includes(node.nodeName);
}

function highlightWord(word) {
  if (word.includes(' ')) {
    const [firstPart, secondPart] = word.split(' ');
    return `<b>${firstPart}</b> ${secondPart}`;
  }
  if (!/^[a-zA-Z]+$/.test(word)) {
    // If word contains non-alphabetical characters, split it into two parts
    const [leadingChars, wordChars] = word.split(/([a-zA-Z]+)/);
    return (leadingChars || '') +
      '<b>' + (wordChars || '').slice(0, 3) + '</b>' + (wordChars || '').slice(3);
  }
  if (word.length < 2) {
    // If word is less than 2 characters, don't apply any changes
    return word;
  }
  if (word.length === 2) {
    return '<b>' + word.slice(0, 1) + '</b>' + word.slice(1);
  }
  if (word.length === 3 || word.length === 4) {
    return '<b>' + word.slice(0, 2) + '</b>' + word.slice(2);
  }
  if (word.length > 8 && word.length <= 10) {
    return '<b>' + word.slice(0, 4) + '</b>' + word.slice(4);
  }
  if (word.length > 10) {
    return '<b>' + word.slice(0, 5) + '</b>' + word.slice(5);
  }
  return '<b>' + word.slice(0, 3) + '</b>' + word.slice(3);
}



function highlightWordsInParagraph(paragraph) {
  const words = paragraph.textContent.split(/\s+/);
  const highlightedWords = words.map(highlightWord);
  paragraph.innerHTML = highlightedWords.join(' ');
}

function highlightWordsInBody() {
  const paragraphs = Array.from(document.getElementsByTagName('p'));
  const nonHeadingParagraphs = paragraphs.filter(paragraph => !skipTags(paragraph));
  nonHeadingParagraphs.forEach(highlightWordsInParagraph);
}

window.onload = function () {
  highlightWordsInBody();
};
