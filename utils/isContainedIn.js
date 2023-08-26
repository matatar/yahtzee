export default function isContainedIn(arr, target) {	
    return target.every(v => arr.includes(v));
}