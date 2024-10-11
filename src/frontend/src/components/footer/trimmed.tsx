function TrimmedFooter() {
    return <footer className="px-10 mt-auto py-10">
        <div className="flex justify-center">
            <p className="text-sm text-slate-600">© {new Date().getFullYear()} Daatelli. All rights reserved.</p>
        </div>
    </footer>
}

export default TrimmedFooter