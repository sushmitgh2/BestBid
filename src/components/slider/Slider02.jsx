import React from 'react';
import { Link } from 'react-router-dom'
import { Navigation, Scrollbar, A11y   } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const Slider02 = props => {
    const data = props.data
    return  (
        <section className="tf-slider slider">
            <Swiper
                modules={[Navigation,  Scrollbar, A11y ]}
                    spaceBetween={0}
                    slidesPerView={1}
                    navigation
                    scrollbar={{ draggable: true }}
                >
                {
                    data.map((item, index) => (
                        <SwiperSlide key={index}>
                            <SliderItem item={item} />
                        </SwiperSlide>
                        
                    ))
                }
            </Swiper>
        </section>
    )
};

const SliderItem = props => (
    <div className="swiper-container ">
        <div className="swiper-wrapper">
            <div className="swiper-slide">
                <div className="slider-item">
                    <div className="overlay"></div>
                    <div className='container'>
                    <div className="slider-inner flex home-1 style-2">
                        <div className="slider-content">
                            <h1 className="heading">{props.item.title}</h1>
                            <p className="sub-heading">{props.item.description}</p>
                            
                        </div>
                        <div className="slider-img flex">
                            <div className="img-left">
                                <div className="img-1"><img src={props.item.img1}
                                        alt="BestBid" /></div>
                                <div className="img-2"><img src={props.item.img2}
                                        alt="BestBid" /></div>
                            </div>
                            <div className="img-right">
                                <img src={props.item.img3} alt="BestBid" />
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
)

export default Slider02;
