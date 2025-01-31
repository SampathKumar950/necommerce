import { Swiper, SwiperSlide } from 'swiper/react';
import { sliderData } from '../constants/data';
import { EffectFade, Autoplay } from 'swiper';
import 'swiper/css/effect-fade';
import 'swiper/css';


// const HeroSlider = () => {

//   return (
//     <Swiper
//       modules={[EffectFade, Autoplay]}
//       effect={'fade'}
//       loop={true}
//       autoplay={{
//         delay: 3000,
//         disableOnInteraction: false,
//       }}
//       className="heroSlider relative h-[600px] lg:h-[860px] overflow-hidden"
//     >
//       {
//         sliderData.map(({ id, title, bg, btnNext }) =>
//           <SwiperSlide className='h-full relative flex justify-center items-center' key={id}>

//             <div className='z-20 text-white text-center max-w-[920px]'>
//               <div className='uppercase font-tertiary tracking-[6px] mb-5'>Just Enjoy & Relax</div>
//               <h1 className='font-primary text-[32px] uppercase tracking-[2px] max-w-[920px] lg:text-[68px] leading-tight mb-6'>
//                 {title}
//               </h1>
//               <button className='btn btn-lg btn-primary mx-auto'>{btnNext}</button>
        
//             </div>

//             <div className='absolute inset-0'>
//               <img className='object-cover h-full w-full' src={bg} alt="logo" />
//             </div>

//             <div className='absolute inset-0 bg-black/70' />
//           </SwiperSlide>
//         )
//       }
//     </Swiper>
//   )
// };


const HeroSlider = () => {
  return (
    <div className="relative">
      <Swiper
        modules={[EffectFade, Autoplay]}
        effect="fade"
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        className="heroSlider h-[600px] lg:h-[860px] relative overflow-hidden"
      >
        {sliderData.map(({ id, title, bg, btnNext }) => (
          <SwiperSlide
            className="relative flex justify-center items-center h-full"
            key={id}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                className="object-cover h-full w-full"
                src={bg}
                alt="Slide Background"
              />
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/70" />

            {/* Text Content */}
            <div className="relative z-10 text-white text-center px-4">
              <div className="uppercase font-tertiary tracking-[6px] mb-5">
                Just Enjoy & Relax
              </div>
              <h1 className="font-primary text-[32px] uppercase tracking-[2px] lg:text-[68px] leading-tight mb-6">
                {title}
              </h1>
              <button className="btn btn-lg btn-primary">{btnNext}</button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};


export default HeroSlider;
