import LottieModule from "lottie-react"
import osaManuela from '../assets/osaManuela.json'
import PenguinM from '../assets/penguinM.json'
import { useRef } from "react";
import '../stylesheets/OsoManuela.css'

const Lottie = LottieModule.default;

export const OsoManuela = () => {

    const lottieRef = useRef()
    const lottieRef2 = useRef()

    const reproducir = () => {
        lottieRef.current.stop()
        lottieRef.current.play()
    }

     const reproducir2 = () => {
        lottieRef2.current.stop()
        lottieRef2.current.play()
    }

     return (
    <>

      {/* <div onClick={reproducir}>

        <Lottie
          lottieRef={lottieRef}
          animationData={osaManuela}
          loop={false}
          autoplay={false}
          
          style={{ width: 500, height: 500 }}
        />
      </div>

      <div onClick={reproducir2}>

        <Lottie
          lottieRef={lottieRef2}
          animationData={PenguinM}
          loop={false}
          autoplay={false}
          
          style={{ width: 500, height: 500 }}
        />
      </div> */}

      <div className="screen" >
        <img className="fondo" 
        src="../src/assets/svg/ilustracionpolar_Mesa de trabajo 1.jpg" alt="" />

       <img className="nube" src="../src/assets/svg/nube 1.svg"  alt="" /> 
      </div>

      
    </>
    )
}
