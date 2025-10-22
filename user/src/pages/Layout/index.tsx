import "./index.scss"
import { NavLink, Outlet } from "react-router-dom"

const options = [
    {
        label: 'Home',
        key: '/'
    },
    {
        label: 'Login',
        key: '/login'
    },
    {
        label: 'Explore',
        key: '/explore'
    }

]
const GeekLayout = () => {

    return (
        <div className="layout">

            <div className="nav">
                <div className="nav-items">
                    <div className="logo">
                        logo
                    </div>

                    <div className="search">
                        search
                    </div>

                    <div className="options">
                        {
                            options.map((item) => {
                                return (<NavLink key={item.key} to={item.key}>
                                    {item.label}
                                </NavLink>)
                            })
                        }
                        post etc
                    </div>

                    <div className="icon">
                        icon
                    </div>
                </div>

            </div>

                <Outlet />
       
        </div>
    )

}

export default GeekLayout