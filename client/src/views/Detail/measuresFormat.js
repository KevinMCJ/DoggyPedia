const measuresFormat = (weight, height) => {
  let measures = {
    weightFormat: "Unknown",
    heightFormat: "Unknown",
  };

  if (weight) {
    measures.weightFormat =
      weight.length === 1
        ? `Average of ${weight[0]} Pounds`
        : `From ${weight[0]} to ${weight[1]} Pounds`;
  }

  if (height) {
    measures.heightFormat =
      height.length === 1
        ? `Average of ${height[0]} Inches`
        : `From ${height[0]} to ${height[1]} Inches`;
  }

  return measures;
};

export default measuresFormat;
