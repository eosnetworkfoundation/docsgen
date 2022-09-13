function parse() {
  let property_file_name;

  process.argv.forEach(function (val, index, array) {
      var arg = val.split("=");
      if (arg.length > 0) {
          if (arg[0] === 'env') {
              property_file_name = './env/' + arg[1] + '.properties';
          }
      }
  });

  return property_file_name;
}

module.exports = {
	parse
};
