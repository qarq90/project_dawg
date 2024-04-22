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
import {ActionIcon} from "../../public/icon/ActionIcon";
import {StrategyIcon} from "../../public/icon/StrategyIcon";
import {RPGIcon} from "../../public/icon/RPGIcon";
import {ShooterIcon} from "../../public/icon/ShooterIcon";
import {AdventureIcon} from "../../public/icon/AdventureIcon";
import {PuzzleIcon} from "../../public/icon/PuzzleIcon";
import {RacingIcon} from "../../public/icon/RacingIcon";
import {SportsIcon} from "../../public/icon/SportsIcon";
import {ControllerIcon} from "../../public/icon/ControllerIcon";
import {DownloadIcon} from "../../public/icon/DownloadIcon";
import {DirectoryIcon} from "../../public/icon/DirectoryIcon";
import {GenreIcon} from "../../public/icon/GenreIcon";
import {UserIcon} from "../../public/icon/UserIcon";
import {HashtagIcon} from "../../public/icon/HashtagIcon";
import {DevelopersIcon} from "../../public/icon/DevelopersIcon";
import {PublisherIcon} from "../../public/icon/PublisherIcon";

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

export const sidebarBrowse = [
    {
        label: 'Platforms',
        icon: <ControllerIcon/>,
        path: '/pages/browse/platforms',
    },
    {
        label: 'Stores',
        icon: <DownloadIcon/>,
        path: '/pages/browse/stores',
    },
    {
        label: 'Collections',
        icon: <DirectoryIcon/>,
        path: '/pages/browse/collections',
    },
    {
        label: 'Genres',
        icon: <GenreIcon/>,
        path: '/pages/browse/genres',
    },
    {
        label: 'Creators',
        icon: <UserIcon/>,
        path: '/pages/browse/creators',
    },
    {
        label: 'Tags',
        icon: <HashtagIcon/>,
        path: '/pages/browse/tags',
    },
    {
        label: 'Developers',
        icon: <DevelopersIcon/>,
        path: '/pages/browse/developers',
    },
    {
        label: 'Publishers',
        icon: <PublisherIcon/>,
        path: '/pages/browse/publishers',
    },
]

export const sidebarGenres = [
    {
        label: 'Action',
        icon: <ActionIcon/>,
        path: '/pages/genres/action',
    },
    {
        label: 'Strategy',
        icon: <StrategyIcon/>,
        path: '/pages/genres/strategy',
    },
    {
        label: 'RPG',
        icon: <RPGIcon/>,
        path: '/pages/genres/rpg',
    },
    {
        label: 'Shooter',
        icon: <ShooterIcon/>,
        path: '/pages/genres/shooter',
    },
    {
        label: 'Adventure',
        icon: <AdventureIcon/>,
        path: '/pages/genres/adventure',
    },
    {
        label: 'Puzzle',
        icon: <PuzzleIcon/>,
        path: '/pages/genres/puzzle',
    },
    {
        label: 'Racing',
        icon: <RacingIcon/>,
        path: '/pages/genres/racing',
    },
    {
        label: 'Sports',
        icon: <SportsIcon/>,
        path: '/pages/genres/sports',
    },
]
