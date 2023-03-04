export const createNewImageName = (a:string, b:string) => {
    return `${a}.${b.split('.')[b.split('.').length-1]}`
}
