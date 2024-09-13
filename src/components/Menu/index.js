// import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil , faEraser, faArrowRotateRight,faArrowRotateLeft,faFileArrowDown} from '@fortawesome/free-solid-svg-icons'
// import { byPrefixAndName } from '@awesome.me/kit-KIT_CODE/icons'
import cx  from 'classnames'
import styles from './index.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { MENU_ITEMS } from '@/constants'
import { menuItemClick,actionItemClick } from '@/slice/menuSlice'
// import classNames from 'classnames'




const Menu= ()=>{
    const dispatch = useDispatch()
    const activeMenuItem = useSelector((state)=>state.menu.activeMenuItem)
    const handleMenuClick = (itemName)=>{

        dispatch(menuItemClick(itemName))
    }
    const handleActionClick=(itemName)=>{
        dispatch(actionItemClick(itemName))
    }
    return (
        <>
        {/* <script src="https://kit.fontawesome.com/39ea6875ce.js" crossorigin="anonymous"></script> */}
    <div className={styles.menuContainer}>
        <div className={cx(styles.iconWrapper,{[styles.active]:activeMenuItem===MENU_ITEMS.PENCIL})} onClick={()=>handleMenuClick(MENU_ITEMS.PENCIL)} id='PENCIL'>
        <FontAwesomeIcon icon={faPencil} className={styles.icon} />
        </div>
        <div className={cx(styles.iconWrapper,{[styles.active]:activeMenuItem===MENU_ITEMS.ERASER})} onClick={()=>handleMenuClick(MENU_ITEMS.ERASER)} id='ERASER'>
        <FontAwesomeIcon icon={faEraser} className={styles.icon} />
        </div>
        <div className={styles.iconWrapper}><FontAwesomeIcon icon={faArrowRotateRight} className={styles.icon} onClick={()=>handleActionClick(MENU_ITEMS.REDO)} /></div>
        <div className={styles.iconWrapper}><FontAwesomeIcon icon={faArrowRotateLeft} className={styles.icon} onClick={()=>handleActionClick(MENU_ITEMS.UNDO)}/></div>
        <div className={styles.iconWrapper}><FontAwesomeIcon icon={faFileArrowDown} className={styles.icon} onClick={()=>handleActionClick(MENU_ITEMS.DOWNLOAD)}/></div>
    </div>
    </>)
}

export default Menu