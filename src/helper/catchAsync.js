function catchAsync(fn) {
    return function(...args) {
        Promise.resolve(fn(...args)).catch((err) => console.log(err));
    }
}

module.exports = catchAsync;