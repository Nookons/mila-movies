import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";
import {FAVORITE_MOVIES, HOME_ROUTE, SIGN_IN_ROUTE, SINGLE_MOVIE, WATCH_LATER_MOVIES} from "./utils/const";
import Single from "./pages/Movie/Single";
import Favorite from "./pages/Favorite/Favorite";
import WatchLater from "./pages/WatchLater/WatchLater";


interface Route {
    path: string;
    Component: React.ComponentType<any>;
    label?: string;
}

type PublicRoutes = Route[];

// routes for users
export const publicRoutes: PublicRoutes = [
    {
        path: HOME_ROUTE,
        Component: Home,
    },
    {
        path: SIGN_IN_ROUTE,
        Component: SignIn,
    },
    {
        path: SINGLE_MOVIE,
        Component: Single,
    },
    {
        path: FAVORITE_MOVIES,
        Component: Favorite,
    },
    {
        path: WATCH_LATER_MOVIES,
        Component: WatchLater,
    },
];