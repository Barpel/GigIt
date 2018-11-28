export default {
    _toStorage,
    _fromStorage
}

function _toStorage(key,val) {
    localStorage.setItem(key, JSON.stringify(val))
}

function _fromStorage(key) {
    var val = localStorage.getItem(key)
    return JSON.parse(val)

}