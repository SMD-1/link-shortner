function shortify(bigLink) {
  const numChar = `12345abcdefghijklmnopqrstuvwxyz67890ABCDEFGHIJKLMNOPQRSTUVWXYZ`;
  let shortLink = "";
  for (let i = 0; i < 7; i++) {
    let randNum = Math.ceil(Math.random() * numChar.length - 1);
    shortLink += numChar[randNum];
  }
  return shortLink;
}

module.exports = shortify;
