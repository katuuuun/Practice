class Rectangle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    calculatePerimeter1() {
        return 2 * (this.width + this.height);
    }
    calculatePerimeter2() {
    return this.width + this.height + this.width + this.height;
}
    calculateArea1() {
        return this.width * this.height;
    }
    calculateArea2() {
        return (perimeter * this.height - 2 * (this.height * this.height)) / 2;
    }
}

const rectangle = new Rectangle(4, 6);

let area = rectangle.calculateArea1();
let perimeter = rectangle.calculatePerimeter1();

console.log('1: ' + area + ' ' + perimeter);

area = rectangle.calculateArea2();
perimeter = rectangle.calculatePerimeter2();

console.log('2: ' + area + ' ' + perimeter);
