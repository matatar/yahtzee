export default function  findDuplicates(arry) {
    return arry.filter((item, index) => arry.indexOf(item) !== index)
} 