import "./breadcrumb.sass"

export const Breadcrumb = ({items, onItemClick} ) => {
    
    return (
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                {
                    items && items.map(i => (
                        <li className="breadcrumb-item">
                            <button className="breadcrumb-link" onClick={e =>{ onItemClick(i)}}>{i.name}</button>
                            <span className="breadcrumb-separator"> › </span>
                        </li>
                    ))
                }

            </ol>
        </nav>
    )
}