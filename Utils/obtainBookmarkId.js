export const obtainBookmarkId = (arr) => {

    let locationId= []
    for (let index = 0; index < arr.length; index++) {
    locationId.push(arr[index].LocationId)   
}
    return locationId
}