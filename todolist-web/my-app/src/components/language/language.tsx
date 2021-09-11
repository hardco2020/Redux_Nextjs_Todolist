import { Button, Menu, MenuItem, ListItemIcon, Avatar } from '@material-ui/core'
import { Language } from '@material-ui/icons'
import i18next from 'i18next'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import chFlag from '../../assets/ch.png'
import enFlag from '../../assets/en.jpeg'
import jaFlag from '../../assets/japan.png'

const languages = [
    {
      code:"zh",
      name:"中文",
      country_code:'zh-TW',
      icon: chFlag
    },
    {
      code:"en",
      name:"English",
      country_code:'en',
      icon: enFlag
    },
    {
      code:"ja",
      name:"日本",
      country_code:'ja',
      icon: jaFlag
    }
  ]
const  LanguageOption :React.FC = ()=> {
    const { t } = useTranslation();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
    setAnchorEl(null);
    };
    const switchLan = (code:string)=>{
    i18next.changeLanguage(code)
    setAnchorEl(null);
    }
    return (
        <>
            <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
            startIcon={<Language/>}
          >
            {t('switch_language')}
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            { languages.map((l)=>(
             <MenuItem onClick={()=>switchLan(l.code)}>
             <ListItemIcon>
             <Avatar src={l.icon} />
           </ListItemIcon>
            {l.name}
         </MenuItem> 
            ))}
            
          </Menu>
        </>
    )
}

export default LanguageOption;