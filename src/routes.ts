import Home from "./pages/Home/Home";
import {
    FAVORITE_MOVIES,
    HOME_ROUTE, SIGN_IN,
    SIGN_IN_ROUTE, SINGLE_ACTOR,
    SINGLE_MOVIE,
    WATCH_LATER_MOVIES,
    WATCHED_MOVIES
} from "./utils/const";
import Single from "./pages/Movie/Single";
import Favorite from "./pages/Favorite/Favorite";
import WatchLater from "./pages/WatchLater/WatchLater";
import Watched from "./pages/Watched/Watched";
import SingleActor from "./pages/Actor/SingleActor";
import Login from "./pages/User/SignIn/Login";


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
    {
        path: WATCHED_MOVIES,
        Component: Watched,
    },
    {
        path: SINGLE_ACTOR,
        Component: SingleActor,
    },
    {
        path: SIGN_IN,
        Component: Login,
    },
];