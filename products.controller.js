const { products } = require("./data/products.data");

exports.getProducts = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      products,
    },
  });
};

exports.getFilters = (req, res) => {
  const { idParent, idChildren } = req.query;
  console.log(idParent, idChildren);

  const productFilters = products.filter((product) => {
    const checkParent = idParent ? product.idCategoryParent === idParent : true;
    const checkChildren = idChildren
      ? product.idCategoryChildren === idChildren
      : true;
    return checkParent && checkChildren;
  });

  res.status(200).json({
    status: "success",
    data: {
      productFilters,
    },
  });
};
