import React from 'react'
import MaxWidthWrapper from '@/components/common/MaxWidthWrapper'
const layout = ({
    children,
}: {
    children: React.ReactNode
}) => {
    return (
        <div>
            <MaxWidthWrapper>
                {children}
            </MaxWidthWrapper>
        </div>
    )
}

export default layout
