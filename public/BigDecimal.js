class BigDecimal {
  constructor(value) {
    this.value = value;
  }

  plus(other) {
    if (other instanceof BigDecimal)
      return new BigDecimal(+this.value + +other.value);
    throw new Error("Invalid BigDecimal");
  }

  minus(other) {
    if (other instanceof BigDecimal)
      return new BigDecimal(+this.value - other.value);
    throw new Error("Invalid BigDecimal");
  }

  multiply(other) {
    if (other instanceof BigDecimal)
      return new BigDecimal(+this.value * other.value);
    throw new Error("Invalid BigDecimal");
  }

  divide(other) {
    if (other instanceof BigDecimal)
      return new BigDecimal(+this.value / other.value);
    throw new Error("Invalid BigDecimal");
  }

  power(other) {
    if (other instanceof BigDecimal)
      return new BigDecimal(this.value ** other.value);
    throw new Error("Invalid BigDecimal");
  }

  abs() {
    return new BigDecimal(Math.abs(this.value));
  }

  negate() {
    return new BigDecimal(-Math.abs(this.value));
  }

  movePointLeft(n) {
    return new BigDecimal(this.value * 10 ** -n);
  }

  movePointRight(n) {
    return new BigDecimal(this.value * 10 ** n);
  }

  precision() {
    return String(this.value).split(".")[1].length;
  }

  remainder(divisor) {
    return new BigDecimal(this.value % divisor);
  }
}

const a = new BigDecimal("1");
const b = new BigDecimal("2");

console.log(a.plus(b).negate());
