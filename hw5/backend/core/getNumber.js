var num = "0000";
var check = 10;
const getCheck = () => {
    return check;
}
const setCheck = (n)=>{
    check = n;
}
function getRandom(min,max){
    return Math.floor(Math.random()*(max-min+1))+min;
};

const setBan = new Set();
let setNo =[];
let setTurn = [];
const guessNumber = (A = 4,B = 0,prev = "0000") =>{
    if(A === 4 && B===0)
    {
        genNumber();
        setTurn=[];
        setNo =[];
        setBan.clear();
        for(var i = 0;i<4;i++)
        {
            const tmpSet = new Set();
            setNo.push(tmpSet);
        }
        return num;
    }
    if(A === 0)
    {
        for(var i = 0;i<4;i++)
        {
            setNo[i].add(prev[i]);
        }
        if(B === 0)
        {
            for(var i = 0;i<4;i++)
            {
                setBan.add(prev[i]);
            }
        }
    }
    const tmpObj = {S:{},N: 0}
    tmpObj.S = new Set();
    for(var i = 0;i<4;i++)
    {
        tmpObj.S.add(prev[i]);
    }
    tmpObj.N = A+B;
    setTurn.push(tmpObj)
    var i = 0;
    while(i<4)
    {
        let tempNum = getRandom(0,9).toString();
        if(setBan.has(tempNum))
            continue;
        if(setNo[i].has(tempNum))
            continue;
        if(i === 0)
        {
            //alert(tempNum)
            let str = num.split('')
            let str2 = ''
            for(var k = 0;k<4;k++)
            {
                if(k === i)
                    str2+= tempNum
                else
                    str2+= str[k]
            }
            //console.log(tempNum)
            num = str2;
            //console.log(num);
            i++;
            continue;
        }
        for(var j = 0; j<i; j++)
        {
            if(tempNum === num[j])
                break;
            else
            {
                if(j === i -  1)
                {
                    let str = num.split('')
                    let str2 = ''
                    for(var k = 0;k<4;k++)
                    {
                        if(k === i)
                            str2+= tempNum
                        else
                            str2+= str[k]
                    }
                    num = str2;
                    i++;
                }
            }
        }
        if(i ===4)
        {
            for(var j = 0;j < setTurn.length;j++)
            {
                let must = setTurn[j].N;
                for(var k =0;k <4;k++)
                {
                    if(setTurn[j].S.has(num[k]))
                        must--;
                }
                if(must !== 0)
                {
                    i = 0;
                    break;
                }
            }
        }
    }
    return num
}
const getNumber = () => {
    return num;
}
const genNumber = () => {
    var i = 0;
    while(i<4)
    {
        let tempNum = getRandom(0,9).toString();
        if(i === 0)
        {
            //alert(tempNum)
            let str = num.split('')
            let str2 = ''
            for(var k = 0;k<4;k++)
            {
                if(k === i)
                    str2+= tempNum
                else
                    str2+= str[k]
            }
            //console.log(tempNum)
            num = str2;
            //console.log(num);
            i++;
            continue;
        }
        for(var j = 0; j<i; j++)
        {
            if(tempNum === num[j])
                break;
            else
            {
                if(j === i -  1)
                {
                    let str = num.split('')
                    let str2 = ''
                    for(var k = 0;k<4;k++)
                    {
                        if(k === i)
                            str2+= tempNum
                        else
                            str2+= str[k]
                    }
                    num = str2;
                    i++;
                }
            }


        }
        
    }
    //console.log(num)
    //num = getRandom(1,100);
    return num;

}
export{getNumber,genNumber,guessNumber,getCheck,setCheck}