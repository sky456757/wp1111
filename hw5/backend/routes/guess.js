import express from 'express'
import {getNumber,genNumber,guessNumber,getCheck,setCheck} from '../core/getNumber'
const router = express.Router()

//console.log('test')
router.post('/start', (_, res) => {
genNumber() // 用亂數產生一個猜數字的 number，存在 memory DB 
setCheck(10)
console.log(getNumber())
res.json({ msg: 'The game has started.' })
})
router.post('/start2', (_, res) => {
    //1genNumber() // 用亂數產生一個猜數字的 number，存在 memory DB 
    //console.log(getNumber())
    res.json({ msg: 'The game has started.' })
})

router.get('/guess', (req, res) => {
// 去 (memory) DB 拿答案的數字
let ans = getNumber();
if(ans === '0000')
{
    genNumber()
    ans = getNumber();
}
//console.log(ans)
// 用 req.query.number 拿到前端輸入的數字
let num = req.query.number
let turn = req.query.turn
//console.log(num[0])
const ansSet = new Set();
for(var i = 0;i<4;i++)
{
    ansSet.add(ans[i]);
}
const mySet = new Set();
if(num.length === 4)
{
    for(var i = 0;i<4;i++)
    {
        if(parseInt(num[i]) >= 0 && parseInt(num[i]) <= 9)
            mySet.add(num[i]);
    }
}

// check if NOT a num or not in range [1,100]
if(mySet.size === 4)
{
    let str = '';
    let A = 0;
    let B = 0;
    if(num === ans) str ='Equal'
    else
    {
        for(var i = 0;i<4;i++)
        {
            if(mySet.has(ans[i]))
                B++;
        }
        for(var i = 0;i<4;i++)
        {
            if(ans[i] === num[i])
            {
                
                A++;
                B--;
            }
        }
        str = A + "A"+B+"B"
        if(turn === '1')
            str = getNumber();
    }
    if(turn != getCheck())
    {
        res.status(500).send({ msg: 'You may disconnect server during playing,redirect to start menu' });
        return;
    }
    setCheck(turn-1)
    //console.log(turn)
    //console.log(getCheck())

    /*
    if(num > ans) str = 'Smaller'
    else if(num < ans) str = 'Bigger'
    else str ='Equal'*/
    //console.log('t')
    res.status(200).send({ msg: str });
}
else res.status(406).send({ msg: 'Not a legal number.' });
// 如果有問題 =>
// res.status(406).send({ msg: 'Not a legal number.' }) 
// 如果沒有問題，回傳 status

}
)
router.get('/guess2', (req, res) => {
    // 去 (memory) DB 拿答案的數字
    let ans = req.query.number
    //console.log(num[0])
    const mySet = new Set();
    if(ans.length === 4)
    {
        for(var i = 0;i<4;i++)
        {
            if(parseInt(ans[i]) >= 0 && parseInt(ans[i]) <= 9)
                mySet.add(ans[i]);
        }
    }
    
    // check if NOT a num or not in range [1,100]
    if(mySet.size === 4)
    {
        let turn = 10;
        let str = ["The Answer is " +ans];
        let prevA = 4;
        let prevB = 0;
        while(turn--)
        {
            let A = 0;
            let B = 0;
            guessNumber(prevA,prevB,getNumber())
            let tempAns = getNumber();
            const cpuSet = new Set();
            for(var i = 0;i<4;i++)
            {
                cpuSet.add(tempAns[i]);
            }
            for(var i = 0;i<4;i++)
            {
                if(cpuSet.has(ans[i]))
                    B++;
            }
            for(var i = 0;i<4;i++)
            {
                if(ans[i] === tempAns[i])
                {
                        
                    A++;
                    B--;
                }
            }
            prevA =A;
            prevB =B;
            if(tempAns === ans) 
            {
                str.push(10-turn+": Cpu guess " + tempAns + " -> " +A + "A"+B+"B")
                str.push("Cpu win")
                break;
            }
            else
            {
                str.push(10-turn+": Cpu guess " + tempAns + " -> " +A + "A"+B+"B")
                if(turn === 0)
                    str.push("You win")
            }
        }
    
        /*
        if(num > ans) str = 'Smaller'
        else if(num < ans) str = 'Bigger'
        else str ='Equal'*/
        //console.log('t')
        res.status(200).send({ msg: str });
    }
    else res.status(406).send({ msg: 'Not a legal number.' });
    // 如果有問題 =>
    // res.status(406).send({ msg: 'Not a legal number.' }) 
    // 如果沒有問題，回傳 status
    
    }
    )

router.post('/restart', (_, res) => {

    //console.log('restart')
    genNumber();
    setCheck(10)
    console.log(getNumber())
    res.status(200).send({ msg: "restart" });
})

export default router