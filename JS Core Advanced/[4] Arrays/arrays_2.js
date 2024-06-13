console.info(halfsum([1,2,3,4,5,6,7,8,9,10,11]))

function halfsum(array){
    let i = Math.floor(array.length / 2); sum = 0;
    array.forEach(function (elem){
        if (i == 0)
        {
            return
        }
        sum += elem
        i--
    })
    console.log(sum)
}