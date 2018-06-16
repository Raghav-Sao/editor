export const getTramsfromStyle = num => {
  if (!num) return {}
  const key = Object.keys(num);
  const transfromObj = {}
  let result = "";
  key.forEach(i => {
    transfromObj[i] = true;
    switch(i){
      case 'rotate': {
       result = result.concat("rotate("+ num[i] +  "deg)" + " ");
      }
      case 'translateX': {
       result = result.concat("translateX("+ num[i] +  "px)" + " ");
      }
    }
  });
  return {result, transfromObj};
}