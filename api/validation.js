module.exports = app =>{
    function existsOrError(value, msg){
        if(!value) throw msg
        if(Array.isArray(value) && value.length === 0) throw msg
        if(typeof value === 'string' && !value.trim()) throw msg
    }
    
    function notExistsOrError(value, msg){
        try{
            existsOrError(value, msg)
        }catch{
            return
        }
        throw msg
    }
    
    function equalsOrError(valorA, valorB, msg){
        if(valorA !== valorB) throw msg
    }

    return {existsOrError, notExistsOrError, equalsOrError}
}