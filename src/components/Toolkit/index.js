import { useDispatch, useSelector } from 'react-redux'
import styles from './index.module.css'
import { COLORS, MENU_ITEMS } from '@/constants'
import { useEffect } from 'react'
import { changeColor,changeBrushSize } from '@/slice/toolboxSlice'
import cx from 'classnames'
import { socket } from '@/client'
const Toolkit = () => {
    const dispatch = useDispatch()
    const activeMenuItem = useSelector((state) => state.menu.activeMenuItem)
    const showStrokeToolOption = activeMenuItem === MENU_ITEMS.PENCIL
    const showBrushToolOption = activeMenuItem === MENU_ITEMS.ERASER || activeMenuItem === MENU_ITEMS.PENCIL
    const {color,size} = useSelector((state)=>state.toolbox[activeMenuItem])
    const handleColorChange =(color)=>{
       
      dispatch(changeColor({item:activeMenuItem,color}))
      socket.emit('changeConfig',{color:color,size})
    }
    const handleBrushsize=(event)=>{
        // console.log(color)
        dispatch(changeBrushSize({item:activeMenuItem,size:event.target.value}))
        socket.emit('changeConfig',{color,size:event.target.value})
    }
    return (
        <div className={styles.toolboxContainer}>
            {showStrokeToolOption && <div className={styles.toolItem}>

                <h4 className={styles.toolText}>Stroke Color</h4>
                <div className={styles.itemContainer}>
                    <div className={cx(styles.colorBox,{[styles.active]:color===COLORS.BLACK})} style={{ backgroundColor: COLORS.BLACK }} onClick={()=>handleColorChange(COLORS.BLACK)}></div>
                    <div className={cx(styles.colorBox,{[styles.active]:color===COLORS.RED})} style={{ backgroundColor: COLORS.RED }} onClick={()=>handleColorChange(COLORS.RED)}></div>
                    <div className={cx(styles.colorBox,{[styles.active]:color===COLORS.YELLOW})} style={{ backgroundColor: COLORS.YELLOW }} onClick={()=>handleColorChange(COLORS.YELLOW)}></div>
                    <div className={cx(styles.colorBox,{[styles.active]:color===COLORS.GREEN})} style={{ backgroundColor: COLORS.GREEN }} onClick={()=>handleColorChange(COLORS.GREEN)}></div>
                    <div className={cx(styles.colorBox,{[styles.active]:color===COLORS.WHITE})} style={{ backgroundColor: COLORS.WHITE }} onClick={()=>handleColorChange(COLORS.WHITE)}></div>
                    <div className={cx(styles.colorBox,{[styles.active]:color===COLORS.ORANGE})} style={{ backgroundColor: COLORS.ORANGE }} onClick={()=>handleColorChange(COLORS.ORANGE)}></div>

                </div>


            </div>}
            {showBrushToolOption && <div className={styles.toolItem}>
                <h4 className={styles.toolText} >Brush size</h4>
                <div>
                    <input type="range" min={1} max={10} defaultValue={5} step={1} onChange={handleBrushsize}  />
                </div>

            </div>}

        </div>
    )
}

export default Toolkit