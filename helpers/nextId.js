const nextId = (list) => {
  const maxId = list[list.length - 1].id;
  return maxId + 1;
}

module.exports = nextId;