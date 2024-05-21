/* eslint-disable no-undef */
$('.small-product-slider').slick({
    arrows: false,
    dots: false,
    autoplay: true,
    infinite: true,
    slidesToShow: 4,
    rows: 2,
    prevArrow: '<button type="button" class="slick-prev"><i class="icofont icofont-long-arrow-left"></i></button>',
    nextArrow: '<button type="button" class="slick-next"><i class="icofont icofont-long-arrow-right"></i></button>',
    responsive: [
        {
            breakpoint: 1199,
            settings: {
                slidesToShow: 3,
            }
        },
        {
            breakpoint: 991,
            settings: {
                slidesToShow: 2,
            }
        },
        {
            breakpoint: 767,
            settings: {
                autoplay: true,
                slidesToShow: 2,
                arrows: false,
            }
        },
        {
            breakpoint: 479,
            settings: {
                autoplay: true,
                slidesToShow: 1,
                arrows: false,
            }
        }
    ]
});
    
$('.best-deal-slider, .deal-product-slider').slick({
    arrows: false,
    dots: false,
    autoplay: true,
    infinite: true,
    slidesToShow: 1,
    prevArrow: '<button type="button" class="slick-prev"><i class="icofont icofont-long-arrow-left"></i></button>',
    nextArrow: '<button type="button" class="slick-next"><i class="icofont icofont-long-arrow-right"></i></button>',
});