import "./breadcrumb.sass"

export const Bredcrumb = (items) => {

    console.log(items,"ITEMS");
    
    return (
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                {
                    items.items && items.items.map(i => (
                        <li className="breadcrumb-item">
                            <a href="/" className="breadcrumb-link">{i.name}</a>
                            <span className="breadcrumb-separator"> › </span>
                        </li>
                    ))
                }

            </ol>
        </nav>
    )
}