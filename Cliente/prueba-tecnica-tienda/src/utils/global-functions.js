export const transformPrice =(price)=>{
    const str = price.toString();
    return str.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

}