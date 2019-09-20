module.exports = {
  inAscendingOrder: data => {
    let result = data.sort((a,b) => parseInt(a.id) - parseInt(b.id));
    return result;
  }
}