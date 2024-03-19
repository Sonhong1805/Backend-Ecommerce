const { categories, filters } = require("./data/categories.data");
const nextId = require("./helpers/nextId");

exports.getCategories = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      categories,
    },
  });
};

exports.getFilters = (req, res) => {
  const { parent } = req.query; // localhost:3100/categories/filters?parent=1
  console.log(parent);

  res.status(200).json({
    status: "success",
    data: {
      filters,
    },
  });
};
