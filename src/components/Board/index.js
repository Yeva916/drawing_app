// import styles from './index.module.css'
import { MENU_ITEMS } from "@/constants";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionItemClick } from "@/slice/menuSlice";
const Board = () => {
  const dispatch = useDispatch();

  const canvasRef = useRef(null);
  const shouldDraw = useRef(false);
  const drawHistory = useRef([]);
  const historyPointer = useRef(null);
  // const color = useSelector((state)=>state.toolbox.color)
  const { activeMenuItem, actionMenuItem } = useSelector((state) => state.menu);
  const { color, size } = useSelector((state) => state.toolbox[activeMenuItem]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (actionMenuItem === MENU_ITEMS.DOWNLOAD) {
      
      const URL = canvas.toDataURL();
      const a = document.createElement("a");
      a.href = URL;
      a.download = "to_me.jpg";
      a.click();
      dispatch(actionItemClick(null));
    } else if (actionMenuItem === MENU_ITEMS.UNDO) {
      console.log(actionMenuItem);
      if (drawHistory.current.length >= 0) {
        // console.log('hello')
        // if (historyPointer.current < 0) {
        //   return;
        // }
        const imageData = drawHistory.current[historyPointer.current-1];
        context.putImageData(imageData, 0, 0);
        if(historyPointer.current>1){
            
            historyPointer.current--;
        }
        
        dispatch(actionItemClick(null));
      }
    }else if(actionMenuItem===MENU_ITEMS.REDO){
        if(drawHistory.current.length>0){
            // if(historyPointer.current>=drawHistory.current.length-1){
            //     return
            // }
            const imageData = drawHistory.current[historyPointer.current+1];
            context.putImageData(imageData, 0, 0);
            if(historyPointer.current<drawHistory.current.length-2){
                console.log(historyPointer)
                historyPointer.current++;
            }
           
            dispatch(actionItemClick(null));
        }
    }
  }, [actionMenuItem, dispatch]);
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;

    const context = canvas.getContext("2d");
    const changeConfig = () => {
      console.log(color, size);
      context.strokeStyle = color;
      context.lineWidth = size;
    };
    changeConfig();
  }, [color, size]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleMouseDown = (e) => {
      // console.log('mosedowm')
      shouldDraw.current = true;
      beginPath(e.clientX, e.clientY);
      // context.beginPath()
      // context.moveTo(e.clientX,e.clientY)
    };
    const handleMouseUp = (e) => {
      // console.log('mouseup')
      shouldDraw.current = false;
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      drawHistory.current.push(imageData);
      historyPointer.current = drawHistory.current.length - 1;
    };
    const handleMouseMove = (e) => {
      // console.log('mousemove')

      if (!shouldDraw.current) return;

      drawLine(e.clientX, e.clientY);
    };

    const beginPath = (x, y) => {
      context.beginPath();
      context.moveTo(x, y);
    };
    const drawLine = (x, y) => {
      context.lineTo(x, y);
      context.stroke();
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);
    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);
  return <canvas ref={canvasRef}></canvas>;
};
export default Board;
