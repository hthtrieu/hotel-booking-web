import Banner from "@/components/banner/Banner"
import HotelSearchForm from "@/components/search/HotelSearchForm"
const HomePage = () => {

    return (
        <div className="flex flex-col">
            <div className="relative">
                <Banner />
                <div className="absolute top-[90%] z-10 bg-white w-[80%] left-1/2 translate-x-[-50%] rounded-lg">
                    <HotelSearchForm />
                </div>
            </div>
        </div>
    )
}

export default HomePage
