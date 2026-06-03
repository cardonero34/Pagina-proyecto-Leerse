import LottieModule from "lottie-react";
import dataManuela from '../assets/dataManuela.json'
import { useRef } from "react";

const Lottie = LottieModule.default;

export const LootieManuela = () => {

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
          animationData={dataManuela}
          loop={false}
          autoplay={false}
          
          style={{ width: 500, height: 500 }}
        />
      </div>
    </>
  )
}
