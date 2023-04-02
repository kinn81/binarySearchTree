export { sort };

function sort(arr) {
  if (arr.length < 2) return arr;
  var arrL = sort(arr.slice(0, Math.ceil(arr.length / 2)));
  var arrR = sort(arr.slice(Math.ceil(arr.length / 2)));
  let r = merge(arrL, arrR);
  return r;
}

function merge(arr1, arr2) {
  let newArray = [];
  let i = 0;
  let j = 0;

  while (true) {
    if (arr1[i] < arr2[j]) {
      newArray.push(arr1[i++]);
    } else if (arr1[i] > arr2[j]) {
      newArray.push(arr2[j++]);
    } else if (arr1[i] == arr2[j]) {
      newArray.push(arr1[i++]);
      newArray.push(arr2[j++]);
    }

    if (i > arr1.length - 1 && j <= arr2.length - 1) {
      newArray.push(...arr2.slice(j));
      return newArray;
    } else if (j > arr2.length - 1 && i <= arr1.length - 1) {
      newArray.push(...arr1.slice(i));
      return newArray;
    } else if (j > arr2.length - 1 && i > arr1.length - 1) {
      return newArray;
    }
  }
}
