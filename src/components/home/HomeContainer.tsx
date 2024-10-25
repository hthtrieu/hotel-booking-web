"use client";
import React from "react";
import Image from "next/image";
import img from "@/assets/images/autumn-image.png";
import imgDana from "@/assets/images/danang.png";
import imgHCM from "@/assets/images/ho-chi-minh.png";
import imgHaNoi from "@/assets/images/ha-noi.png";
import imgHA from "@/assets/images/hoi-an.png";
import imgHue from "@/assets/images/hue.png";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const cities = [
  { img: imgDana, name: "Da Nang City" },
  { img: imgHCM, name: "Ho Chi Minh City" },
  { img: imgHaNoi, name: "Hanoi City" },
  { img: imgHue, name: "Thua Thien Hue Province" },
  { img: imgHA, name: "Quang Nam Province" },
];

const HomeContainer = () => {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const getHotelInCity = (city: string) => {
    alert(city);
  };

  return (
    <div className="flex flex-col">
      <Dialog fullWidth={true} open={open} onClose={handleClose}>
        <DialogTitle>Holiday Promotions</DialogTitle>
        <DialogContent>
          <img src="https://www.vodafone.co.uk/newscentre/app/uploads/2019/04/holiday-plane-roaming-1440.jpg" />

          <DialogContentText className="text-center font-bold text-info mt-2">
            Currently, there are no promotions available
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="warning" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <div className="py-5">
        <div className="mb-5">
          <div className="text-lg font-bold mb-5">
            Special Promotions for You
          </div>
          <div className="flex flex-col lg:flex-row justify-between gap-4">
            <div className="w-full">
              <Image
                src={img}
                alt="Autumn background"
                className="rounded-md object-contain w-full h-full"
              />
            </div>
            <div className="w-full lg:w-4/12 flex flex-col justify-center text-justify gap-2">
              Enjoy a 20% discount on all bookings in October.Don&apos;t miss
              the chance to relax and enjoy autumn at our hotel.
              <Button
                variant="outlined"
                className="w-fit"
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(true);
                }}
              >
                View Details
              </Button>
            </div>
          </div>
        </div>

        <div className="mb-5">
          <div className="text-lg font-bold mb-5">Trending Destinations</div>
          <div className="w-full">
            <div className={`grid grid-cols-12 gap-4`}>
              {cities.map((cityItem, index) => (
                <div
                  key={index}
                  onClick={() => getHotelInCity(cityItem.name)}
                  className={`cursor-pointer relative rounded-md overflow-hidden h-72 ${
                    index < 2 ? "col-span-6" : "col-span-4"
                  }`}
                >
                  <span className="absolute top-2 left-5 text-white font-medium">
                    {cityItem.name}
                  </span>
                  <Image
                    src={cityItem.img}
                    alt={cityItem.name}
                    className="w-full h-full object-cover"
                    width={400} // Width of the image
                    height={400} // Height of the image
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeContainer;
