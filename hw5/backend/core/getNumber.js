let num = 0;
function getRandom(min,max){
    return Math.floor(Math.random()*(max-min+1))+min;
};
const getNumber = () => {
    return num;
}
const genNumber = () => {
    num = getRandom(1,100);
    return num;

}
export{getNumber,genNumber}