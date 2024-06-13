console.info(lastsymbol("ABCDEFG"))
function lastsymbol (string){
    if (string.length == 0)
    {
        console.log("Строка пуста")
    }
    else
    {
        console.log("Последний символ: " + string.slice(-1))
    }
}


