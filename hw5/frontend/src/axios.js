import axios from 'axios'
const instance =
axios.create({ baseURL: 'http://localhost:4000/api/guess' })

const startGame = async () => {
  try {
    const { data: { msg } } = await instance.post('/start')
    return msg
  }   
  catch (error) {
    //alert('Error: "xx" is not a valid number (1 - 100)')
    if(error == "AxiosError: Network Error")
    {
        alert('server not response')
        return 'server not response'
    }
    else
        alert('Error')
    }
}
const startGame2 = async () => {
    try {
      const { data: { msg } } = await instance.post('/start2')
      return msg
    }   
    catch (error) {
      //alert('Error: "xx" is not a valid number (1 - 100)')
      if(error == "AxiosError: Network Error")
      {
          alert('server not response')
          return 'server not response'
      }
      else
          alert('Error')
      }
  }
const guess = async (number,turn) => {
    try {
        //alert('/guess' +'?number='+number)
        const { data: { msg } } = await instance.get('/guess' +'?number='+ number+'&turn='+turn)
        //alert('/guess' +'?'+number)
        return msg
    }
    catch (error) {
        //alert('Error: "xx" is not a valid number (1 - 100)')
        if(error == "AxiosError: Network Error")
        {
            alert('server not response')
            return 'server not response'
        }
        else if(error == "AxiosError: Request failed with status code 500")
        {
            alert('You may disconnect server during playing,redirect to start menu')
            return 'toStart'
        }
        else
        {
            //alert(error)
            alert('Error: '+number+' is not a valid number (four different digit)')
            return 'input error'
        }
            
    }
}
const guess2 = async (number) => {
    try {
        //alert('/guess' +'?number='+number)
        const { data: { msg } } = await instance.get('/guess2' +'?number='+ number)
        //alert('/guess' +'?'+number)
        return msg
    }
    catch (error) {
        //alert('Error: "xx" is not a valid number (1 - 100)')
        if(error == "AxiosError: Network Error")
        {
            alert('server not response')
            return 'server not response'
        }
        else
        {
            alert('Error: '+number+' is not a valid number (four different digit)')
            return 'input error'
        }
            
    }
}
const restart = async() =>{
    try {
        const { data: { msg } } = await instance.post('/restart')
        //alert('r')
        return msg
    }   
    catch (error) {
    //alert('Error: "xx" is not a valid number (1 - 100)')
    if(error == "AxiosError: Network Error")
    {
        alert('server not response')
        return 'server not response'
    }
    else
        alert('Error')
    }
}
export { startGame, guess, restart ,startGame2,guess2}