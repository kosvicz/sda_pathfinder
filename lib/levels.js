const levels = [
  "Friend",
  "Companion",
  "Explorer",
  "Ranger",
  "Voyager",
  "Guide"
];

exports.getLevel = () => {
  let idx = Math.floor(Math.random()*levels.length);
  return levels[idx];
};
