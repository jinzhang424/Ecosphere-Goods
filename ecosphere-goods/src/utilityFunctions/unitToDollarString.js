export default function unitToDollarString(unitAmount) {
    const dollars = Math.floor(unitAmount / 100);
    const cents = unitAmount % 100;
    return `$${dollars}.${cents.toString().padStart(2, '0')}`
}
