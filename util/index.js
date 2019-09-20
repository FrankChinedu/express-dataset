const calcTime = date => new Date(date).getTime()

module.exports = {
  inAscendingOrder: data => {
    let result = data.sort((a,b) => parseInt(a.id) - parseInt(b.id));
    return result;
  },
  inDescendingOrder: data => {
    let result = data.sort((a,b) => parseInt(b.num_of_event) - parseInt(a.num_of_event));
    return result;
  },
  inAlphabeticalOrder: data => {
    const result = data.sort((a, b) => {
      return a.login.localeCompare(b.login)
    });
    return result;
 },
 orderByNumberOfEvents: data => {
  const d = data;
  const actorEvents = [];
  let count = 1;
  
  for(let i =0; i < d.length; i++) {
    if(d.length - 1 == i) {
      d[i].num_of_event = count
      actorEvents.push(d[i])
      break;
    }
    if(d[i].login === d[i+1].login) {
      count++
    } else {
      d[i].num_of_event = count
      actorEvents.push(d[i])
      count = 1;
    }
  }
  return actorEvents;
 },
 orderByComplexity: data => {
  const result = data.sort((a,b) => {
    const a1 = parseInt(a.num_of_event) 
    const b1 = parseInt(b.num_of_event)
  
    if (a1 === b1) {
      const a1time = calcTime(a.createdAt)
      const b1time = calcTime(b.createdAt)
  
      if(a1time === a1time) {
        return a.login.localeCompare(b.login)
      }
      return b1time - a1time;
    }
    return b1 - a1
  });
  return result;
 }
}