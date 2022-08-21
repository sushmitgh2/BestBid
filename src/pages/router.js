import Home02 from "./Home02";
import Explore02 from './Explore02'
import ItemDetails from './ItemDetails'
import ConnectWallet from './ConnectWallet'
import CreateItem from './CreateItem'

const routes = [
    { path: '/', component: <Home02 />},
    { path: '/explore-02', component: <Explore02 />},
    { path: '/item-details', component: <ItemDetails />},
    { path: '/connect-wallet', component: <ConnectWallet />},
    { path: '/create-item', component: <CreateItem />},
]

export default routes;