/**
 * @function getQueryVariable
 *
 * @description 获取url参数
 *
 * @param {string} variable
 * @return {string}
 */
function getQueryVariable(variable: string): string {
  var query = window.location.search.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return '';
}

export default { getQueryVariable };
