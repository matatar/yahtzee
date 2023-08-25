export default function falsyToZero (value)  {
    let result = Number(value);
    if(Number.isNaN(result)){
      result = 0;
    }
  
    return result;
  }
