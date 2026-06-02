import { LootieManuela } from "./components/LootieManuela";
import dataManuela from '../assets/dataManuela.json'
import groovyWalk from "./groovyWalk.json";

export const LootieManuela = () => {
  return (
    <div>
        <Lottie
        animationData={dataManuela}
        loop={true}
        style={{ width:500 , height:500 }}
        />
    </div>
  )
}
