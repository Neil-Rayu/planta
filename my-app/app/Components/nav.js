import "./nav-module.css";

export default function nav(props) {
    return ( 
        <nav id="--nav-main">
            <div id="--nav-left">
                <ul id="--nav-list">
                    <li>
                        <a href="/">Wild Lands</a>
                    </li>
                    <li>
                        <button className="--nav-buttons" id="--nav-microscope">Microscope</button>
                    </li>
                    <li>
                        <p>Season: {props.season}</p>
                    </li>
                </ul>
            </div>
            <div id="--nav-right">
                <ul id="--nav-list">
                    <li>
                        <p id="--nav-photoSol">PhotoSol: {props.photoSol}</p>
                    </li>
                    <li>
                        <button className="--nav-buttons" id="--nav-shop">Shop</button>
                    </li>
                    <li>
                        <button className="--nav-buttons" id="--nav-signIn">Sign In</button>
                    </li>
                </ul>
            </div>
        </nav>
    )
}