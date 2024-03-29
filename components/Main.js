
const Main = () => {
    return (
        <>
            <h1 className="text-center mx-auto max-w-4xl font-display text-6xl font-medium tracking-tight text-slate-900 sm:text-8xl">
                <span className="relative whitespace-nowrap text-primary-500">Hearo</span>
            </h1>
            <p className="text-center mx-auto my-4 max-w-2xl text-lg tracking-tight text-slate-700">Find quiet bars, restaurants and cafes.</p>
            <div className="flex justify-center gap-x-6">
                <a className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-primary-500 text-white hover:bg-primary-400 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900"
                    href="/search">Search</a>
            </div>
        </>
    )
}

export default Main