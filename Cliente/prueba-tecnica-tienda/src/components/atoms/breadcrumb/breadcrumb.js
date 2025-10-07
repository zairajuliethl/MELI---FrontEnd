import "./breadcrumb.sass"

export const Bredcrumb = (items) => {

    console.log(items,"ITEMS");
    
    return (
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                {/* {
                    items.items.map(i => (
                        <li>
                            <a href="/">{i.name}</a>
                        </li>
                    ))
                } */}

            </ol>
        </nav>
    )
}