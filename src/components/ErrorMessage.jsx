function ErrorMessage({message}){
    if(!message){
        return null;
    }

    return(
        <div className="error-message-container max-w-xs min-h-xs text-red-500">
            {message}
        </div>
    )
}

export default ErrorMessage