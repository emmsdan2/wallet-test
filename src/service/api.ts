export const getProductLists = async ()=>{
    const res = await fetch('/db.json');
    console.log('got here')
    return await res.json()
}
