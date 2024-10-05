import React from 'react'
import { Suspense } from 'react'
import Banner from "@/components/banner/Banner"
import HotelSearchForm from "@/components/search/HotelSearchForm"

// This component passed as a fallback to the Suspense boundary
// will be rendered in place of the search bar in the initial HTML.
// When the value is available during React hydration the fallback
// will be replaced with the `<HotelSearchForm>` component.
function SearchBarFallback() {
    return <>placeholder</>
}

const page = () => {
    return (
        <Suspense fallback={<SearchBarFallback />}>
            <div className="flex flex-col">
                <div className="relative">
                    <Banner />
                    <div className="absolute top-[90%] z-10 bg-white w-[80%] left-1/2 translate-x-[-50%] rounded-lg">
                        <HotelSearchForm />
                    </div>
                </div>
            </div>
        </Suspense>
    )
}

export default page
