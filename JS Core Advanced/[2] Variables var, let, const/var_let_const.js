/* Попробуйте объявить переменную с тем же
именем дважды, используя var, let и const.
Какие переменные позволяют повторное
объявление, а какие нет? */

// Позволяет
﻿var a = 10;
var a = 20; 

// Не позволяет
let secondVariable = 10;
let secondVariable = 20; 

// Не позволяет
const thirdVariable = 10;
const thirdVariable = 20;
