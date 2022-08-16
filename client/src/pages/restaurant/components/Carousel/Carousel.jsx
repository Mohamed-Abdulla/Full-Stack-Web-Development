import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import breakfast from "../../../../assets/images/shutterstock_1154073754(1).png";
import lunch from "../../../../assets/images/shutterstock_351721442@2x.png";

const ImgSlider = ({ thumb }) => {
  return (
    <Carousel showThumbs={false} dynamicHeight={true}>
      <img src={breakfast} className="cImg" />
      <img src={thumb} className="cImg" />
      <img src={lunch} className="cImg" />
    </Carousel>
  );
};

export default ImgSlider;
