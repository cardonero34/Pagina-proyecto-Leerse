import LottieModule from "lottie-react"
import osaManuela from '../assets/osaManuela.json'
import { useRef } from "react";

const Lottie = LottieModule.default;

export const OsoManuela = () => {

    const lottieRef = useRef()

    const reproducir = () => {
        lottieRef.current.stop()
        lottieRef.current.play()
    }

     return (
    <>
      <div onClick={reproducir}>

        <Lottie
          lottieRef={lottieRef}
          animationData={osaManuela}
          loop={false}
          autoplay={false}
          
          style={{ width: 500, height: 500 }}
        />
      </div>
    </>
    )
}
