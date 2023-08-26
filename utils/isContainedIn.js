export default function isContainedIn(arr, target) {	
    target.every(v => arr.includes(v));
}