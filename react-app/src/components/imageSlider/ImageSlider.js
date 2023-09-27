import { useState } from "react"


const ImageSlider= ({slides}) => {

    // console.log(slides, '--------test---------')
    // let slidesdb = slides.replace(/'/g, '"')
    // console.log(slidesdb, '----------db----------')
    const [currentIndex, setCurrentIndex] = useState(0)

    const sliderStyles = {
        height: '100%',
        position: 'relative'
    }

    // let variable = slides[currentIndex].url
    // console.log(variable, '-------var----------')

    const slideStyles = {
        width: '100%',
        height: '100%',
        borderRadius: '10px',
        backgroundPosition: 'center',
        backgroundSize:'cover',
        backgroundImage: `url(${slides[currentIndex].url})`
        // backgroundImage: `url("${variable}")`
    }

    const leftArrow = {
        position: 'absolute',
        top: '50%',
        transform: 'translate(0, -50%)',
        left: "32px",
        fontSize: '40px',
        color: '#fff',
        zIndex: 1,
        cursor: 'pointer'
    };

    const rightArrow = {
        position: 'absolute',
        top: '50%',
        transform: 'translate(0, -50%)',
        right: "32px",
        fontSize: '40px',
        color: '#fff',
        zIndex: 1,
        cursor: 'pointer'
    };

    const dotContainer = {
        display: 'flex',
        justifyContent: 'center',
    };

    const dotStyles = {
        margin: '2px 3px',
        cursor: 'pointer',
        fontSize: '15px'
    }

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex)
    };

    const goToNext = () => {
        const isLastSlide = currentIndex === slides.length - 1
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex)
    };

    const goToIndex = (slideIndex) => {
        setCurrentIndex(slideIndex);
    }

    return(
        <div style={sliderStyles}>
            <div style={leftArrow} onClick={goToPrevious}>
                <i className="fa-solid fa-chevron-left fa-lg"></i>
            </div>
            <div style={rightArrow} onClick={goToNext}>
                <i className="fa-solid fa-chevron-right fa-lg"></i>
            </div>
            <div style={slideStyles}></div>
            <div style={dotContainer}>
                {slides.map((slide, slideIndex) =>(
                    <div key={slideIndex} style={dotStyles}
                    onClick={() => goToIndex(slideIndex)}>
                        <i class="fa-solid fa-circle fa-sm"></i>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ImageSlider
