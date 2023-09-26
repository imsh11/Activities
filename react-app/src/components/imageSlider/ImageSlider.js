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
    return(
        <div style={sliderStyles}>
            <div><i class="fa-solid fa-chevron-left fa-lg"></i></div>
            <div style={slideStyles}></div>
        </div>
    )
}

export default ImageSlider
