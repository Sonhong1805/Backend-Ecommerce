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
  const { slug } = req.query; // localhost:3100/categories/filters?slug=1
  const objCategory = categories.find((category) => {
    if (category.slug !== slug) {
      return category.children.some((child) => child.slug === slug);
    }
    return category.slug === slug;
  });
  const { id } = objCategory;
  const filtersCategory = filters.find((item) => item.categoryId === id);

  res.status(200).json({
    status: "success",
    data: filtersCategory,
  });
};
