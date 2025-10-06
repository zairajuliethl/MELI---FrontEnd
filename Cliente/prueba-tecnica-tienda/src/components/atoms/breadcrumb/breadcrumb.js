import "./breadcrumb.sass"

export const Bredcrumb = () => {
    return (
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li><a href="/">Inicio</a></li>
                <li><a href="/productos">Productos</a></li>
                <li><a href="/productos/electronicos">Electrónicos</a></li>
                <li>Televisores</li>
            </ol>
        </nav>
    )
}