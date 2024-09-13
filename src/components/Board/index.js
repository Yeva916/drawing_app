// import styles from './index.module.css'
import { useEffect, useLayoutEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
const Board = () => {
    const canvasRef = useRef(null)
    const shouldDraw = useRef(false)
    // const color = useSelector((state)=>state.toolbox.color)
    const activeMenuItem = useSelector((state)=>state.menu.activeMenuItem)
    const {color,size} =useSelector((state)=>state.toolbox[activeMenuItem])
    useEffect(()=>{
        if(!canvasRef.current) return
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        const changeConfig=()=>{
            console.log(color,size)
            context.strokeStyle = color
            context.lineWidth=size
        }
        changeConfig()

    },[color,size])
    
    useLayoutEffect(()=>{
        
        if(!canvasRef.current) return
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        const handleMouseDown=(e)=>{
            // console.log('mosedowm')
            shouldDraw.current=true
            beginPath(e.clientX,e.clientY)
            // context.beginPath()
            // context.moveTo(e.clientX,e.clientY)
        }
        const handleMouseUp=(e)=>{
            // console.log('mouseup')
            shouldDraw.current = false
            
        }
        const handleMouseMove=(e)=>{
            // console.log('mousemove')
           
            if(!shouldDraw.current) return
            drawLine(e.clientX,e.clientY)
            // context.lineTo(e.clientX,e.clientY)
            // context.stroke()
        }

        const beginPath=(x,y)=>{
            context.beginPath()
            context.moveTo(x,y)
        }
        const drawLine=(x,y)=>{
            context.lineTo(x,y)
            context.stroke()
        }

        canvas.addEventListener('mousedown',handleMouseDown)
        canvas.addEventListener('mousemove',handleMouseMove)
        canvas.addEventListener('mouseup',handleMouseUp)
        return ()=>{
            canvas.removeEventListener('mousedown',handleMouseDown)
            canvas.removeEventListener('mousemove',handleMouseMove)
            canvas.removeEventListener('mouseup',handleMouseUp)
    }},[])
    return (
        <canvas ref={canvasRef}></canvas>
    )
}
export default Board