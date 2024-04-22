import styledSkeleton from '@/styles/ui/skeletons.module.css'

export const Skeleton = () => {
    return (
        <div className={styledSkeleton.skeletonContainer}>
            <div className={styledSkeleton.skeletonItem}>
                <div className={styledSkeleton.skeletonImage}></div>
                <div className={styledSkeleton.skeletonIcon}></div>
                <div className={styledSkeleton.skeletonText}></div>
                <div className={styledSkeleton.skeletonText}></div>
                <div className={styledSkeleton.skeletonText}></div>
            </div>
            <div className={styledSkeleton.skeletonItem}>
                <div className={styledSkeleton.skeletonImage}></div>
                <div className={styledSkeleton.skeletonIcon}></div>
                <div className={styledSkeleton.skeletonText}></div>
                <div className={styledSkeleton.skeletonText}></div>
                <div className={styledSkeleton.skeletonText}></div>
            </div>
            <div className={styledSkeleton.skeletonItem}>
                <div className={styledSkeleton.skeletonImage}></div>
                <div className={styledSkeleton.skeletonIcon}></div>
                <div className={styledSkeleton.skeletonText}></div>
                <div className={styledSkeleton.skeletonText}></div>
                <div className={styledSkeleton.skeletonText}></div>
            </div>
            <div className={styledSkeleton.skeletonItem}>
                <div className={styledSkeleton.skeletonImage}></div>
                <div className={styledSkeleton.skeletonIcon}></div>
                <div className={styledSkeleton.skeletonText}></div>
                <div className={styledSkeleton.skeletonText}></div>
                <div className={styledSkeleton.skeletonText}></div>
            </div>
        </div>
    )
}