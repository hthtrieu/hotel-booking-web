import Banner from "@/components/banner/Banner"
import HotelSearchForm from "@/components/search/HotelSearchForm"
const HomePage = () => {

    return (
        <div className="flex flex-col">
            <div className="relative">
                <Banner />
                <div className="md:absolute md:top-[90%] md:z-10 bg-white w-full md:w-[80%] md:left-1/2 md:translate-x-[-50%] rounded-lg">
                    <HotelSearchForm />
                </div>
            </div>
        </div>
    )
}

export default HomePage
