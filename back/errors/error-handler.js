let errorHandler = (e, request, response, next) => {
    // e = my Server error --> IT HAS AN ENUM INSIDE (!!) called errorType
    console.error("[DBG] ERRoR , ", e);
    
    if (e.errorType?.isShowStackTrace){
        console.error(e);
    }

    response.status(e.errorType.httpCode).json({error: e.errorType.message});
}

module.exports = errorHandler;