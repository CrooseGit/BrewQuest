const Navbar = () => {
    return (
        // component wrap
        <div>
            {/* nav template */}
            <nav className="navbar navbar-expand">

                {/* branding plus home page link */}
                <a className="navbar-brand " href="#">BrewQuest</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="collapse navbar-collapse" id="navbarSupportedContent">

                {/* create new quiz button */}
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <a className="nav-link active " aria-current="page" href="#">Create</a>
                    </li>
                </ul>

                {/* search for existing quiz button */}
                <form className="d-flex" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
                
                </div>

            </nav>
        </div>
    )
}

export default Navbar;