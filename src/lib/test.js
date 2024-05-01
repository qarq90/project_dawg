const getDates = () => {
    const now = new Date();
    const startMonth = new Date(now.getFullYear(), months.indexOf(2), 1);
    const startDate = startMonth.toISOString().split('T')[0];
    const endMonth = new Date(now.getFullYear(), months.indexOf(2), 30);
    const endDate = endMonth.toISOString().split('T')[0];
    console.log(startDate + endDate);
    return `${startDate},${endDate}`
}
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

getDates()