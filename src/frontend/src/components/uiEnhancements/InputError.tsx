function InputError({ message }: { message: string | undefined }) {
    return (
        <div className="text-red-500">{message}</div>
    )
}

export default InputError