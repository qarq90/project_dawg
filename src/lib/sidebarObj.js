import {StarIcon} from "../../public/icon/StarIcon";
import {FireIcon} from "../../public/icon/FireIcon";
import {UpcomingIcon} from "../../public/icon/UpcomingIcon";
import {CalendarIcon} from "../../public/icon/CalendarIcon";
import {TrophyIcon} from "../../public/icon/TrophyIcon";
import {CrownIcon} from "../../public/icon/CrownIcon";
import {BarChartIcon} from "../../public/icon/BarChartIcon";
import {WindowsIcon} from "../../public/icon/WindowsIcon";
import {PlaystationIcon} from "../../public/icon/PlaystationIcon";
import {XBoxIcon} from "../../public/icon/XBoxIcon";
import {NintendoIcon} from "../../public/icon/NintendoIcon";
import {AndroidIcon} from "../../public/icon/AndroidIcon";
import {AppleIcon} from "../../public/icon/AppleIcon";

export const sidebarNewReleases = [
    {
        label: 'Last 30 days',
        icon: <StarIcon/>,
        path: '/pages/releases/latest',
    },
    {
        label: 'Trending',
        icon: <FireIcon/>,
        path: '/pages/releases/trending',
    },
    {
        label: 'Upcoming',
        icon: <UpcomingIcon/>,
        path: '/pages/releases/upcoming',
    },
    {
        label: 'Release Calendar',
        icon: <CalendarIcon/>,
        path: '/pages/releases/calendar',
    },
]

export const sidebarTop = [
    {
        label: 'Best of the year',
        icon: <TrophyIcon/>,
        path: '/pages/top/year',
    },
    {
        label: 'Popular in 2024',
        icon: <BarChartIcon/>,
        path: '/pages/top/popular',
    },
    {
        label: 'All time top 250',
        icon: <CrownIcon/>,
        path: '/pages/top/allTime',
    },
]

export const sidebarPlatforms = [
    {
        label: 'PC',
        icon: <WindowsIcon/>,
        path: '/pages/platforms/pc',
    },
    {
        label: 'Playstation',
        icon: <PlaystationIcon/>,
        path: '/pages/platforms/playstation',
    },
    {
        label: 'XBox',
        icon: <XBoxIcon/>,
        path: '/pages/platforms/xbox',
    },
    {
        label: 'Nintendo',
        icon: <NintendoIcon/>,
        path: '/pages/platforms/nintendo',
    },
    {
        label: 'Android',
        icon: <AndroidIcon/>,
        path: '/pages/platforms/android',
    },
    {
        label: 'IOS',
        icon: <AppleIcon/>,
        path: '/pages/platforms/apple',
    },
]