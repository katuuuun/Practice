let object = { Month: "June" };
const catching = (object, value) => {
    try {
        if (value in object) {
            return object[value];
        }
        else {
            throw new Error('Undefined property');
        }
    } catch (err) {
        console.error('Error:', err.message);
    }
}
console.info(catching(object, "Month"));
console.info(catching(object, "Day"));