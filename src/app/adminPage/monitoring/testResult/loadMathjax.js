export default function loadMathjax() {
    return (
        <>
            <Script src='https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js'
                strategy='beforeInteractive' />
            <div id="your-script-element-id">
            </div>
        </>
    )
}