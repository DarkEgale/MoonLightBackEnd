


const response = (res, status, success, message, data = null) => {
    try {
        if (!res) {
            throw new Error("Please provide res")
        }
        if (!status) {
            throw new Error("Please provide status code")
        }
        res.status(status).json(
            {
                success: success,
                message: message,
                data: data
            }
        )
    } catch (error) {
        throw new Error(`Error during response ${error.message}`)
    }
}

export default response;