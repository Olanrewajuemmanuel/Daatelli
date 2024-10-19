function InputError({ message }: { message: string | undefined }) {
    return (
        <div className="text-sm text-red-600 my-2">{message}</div>
    )
}

export default InputError