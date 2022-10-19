import express from 'express'
import {getNumber,genNumber} from '../core/getNumber'
const router = express.Router()
//console.log('test')
router.post('/start', (_, res) => {
genNumber() // 用亂數產生一個猜數字的 number，存在 memory DB 
console.log(getNumber())
res.json({ msg: 'The game has started.' })
})

router.get('/guess', (req, res) => {
// 去 (memory) DB 拿答案的數字
let ans = getNumber();
if(ans === 0)
{
    genNumber()
    ans = getNumber();
}
//console.log(ans)
// 用 req.query.number 拿到前端輸入的數字
let num = req.query.number
console.log(num)
// check if NOT a num or not in range [1,100]
if(num >=1 && num<=100)
{
    let str =''
    if(num > ans) str = 'Smaller'
    else if(num < ans) str = 'Bigger'
    else str ='Equal'
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

    console.log('restart')
    genNumber();
    console.log(getNumber())
    res.status(200).send({ msg: "restart" });
})

export default router