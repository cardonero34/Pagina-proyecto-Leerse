import LottieModule from "lottie-react"
import PelotaEman from '../assets/dataEmanuel.json'
import { useRef } from "react"

const Lottie = LottieModule.default;

export const LootieEmanuel = () => {

  const lottieRef = useRef()

  const reproducir = () => {
    lottieRef.current.stop()
    lottieRef.current.play()
  }

  return (
    <>
      <div onClick={reproducir} >
        <Lottie
          lottieRef={lottieRef}
          animationData={PelotaEman}
          loop={false}
          autoplay={false}
          style={{ width: 800, height: 800 }}
        />
      </div>
    </>

  )
} 
