import LottieModule from "lottie-react"
import PelotaEman from '../assets/dataEmanuel.json'
import OsoEMA from '../assets/osoEMANUEL.json'
import Penguin from '../assets/penguin.json'
import { useRef } from "react"

const Lottie = LottieModule.default;

export const LootieEmanuel = () => {

  const lottieRef = useRef()
  const lottieRef2 = useRef()
  const lottieRef3 = useRef()

  const reproducir = () => {
    lottieRef.current.stop()
    lottieRef.current.play()
  }

  const play = () => {
    lottieRef2.current.stop()
    lottieRef2.current.play()
  }

  const penguinplay = () => {
    lottieRef3.current.stop()
    lottieRef3.current.play()
  }

  return (
    <>
      <div className="d-flex">
        <div onClick={reproducir} >
          <Lottie
            lottieRef={lottieRef}
            animationData={PelotaEman}
            loop={false}
            autoplay={false}
            style={{ width: 500, height: 500 }}
          />
        </div>

        <div onClick={play}>
          <Lottie
            lottieRef={lottieRef2}
            animationData={OsoEMA}
            loop={false}
            autoplay={false}
            style={{ width: 500, height: 500 }}
          />
        </div>

        <div onClick={penguinplay}>
          <Lottie
            lottieRef={lottieRef3}
            animationData={Penguin}
            loop={false}
            autoplay={false}
            style={{ width: 500, height: 500 }}
          />
        </div>
      </div>
    </>

  )
} 
