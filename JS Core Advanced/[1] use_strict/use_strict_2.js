/* Напишите функцию, которая принимает
массив и значение, и возвращает true, если
это значение присутствует в массиве, и false,
если нет. Используйте строгий режим. */

'use strict'

function arraycheck(array, value, bool)
{
    array.forEach(function(elem){
        if (elem === value) {
            bool = true
        }
    })
    return bool
}

console.log(arraycheck([1,2,3,4,5], 3, false))

