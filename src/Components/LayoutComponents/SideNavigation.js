import { Box, Typography } from '@mui/material';
import styles from '../assets/css/styles.module.css';
import { NavLink } from 'react-router-dom';
import { ConfirmationNumberOutlined, DevicesOtherOutlined, PieChartOutlineOutlined } from '@mui/icons-material';
// D:\Project\React Projects\technobrainfrontendapplication\src\Components\assets\css\styles.module.css
const SideNavigation = () => {
    return ( 
        <Box className={styles.sideNavigationContainer}>

            <div className={styles.teamContainer}>
                <div className={styles.teamLogo}></div>
                <div className={styles.teamInformation}>
                    <Typography variant='h6' className={`${styles.sideNavText}`}>SEManTEX</Typography>
                    <Typography variant='caption' className={`${styles.sideNavText}`}>39 members</Typography>
                </div>
            </div>

            {/* Side navigation menu container */}
            <div className={styles.menuContainer}>

                {/* team management */}
                    <div className={`${styles.teamManagement} ${styles.menuGroupContainer}`}>
                        <Typography className={styles.sideNavGroupTitle} variant='caption' color="secondary">Team management</Typography>
                        <div className={styles.menuItemContainer}>
                            <NavLink to='team_management' className={styles.menuItem} color='secondary'><Typography color="secondary" className={styles.menuItemContent}> <DevicesOtherOutlined/> Team management</Typography></NavLink>
                        </div>
                    </div>

                    {/* device management */}
                    <div className={`${styles.deviceManagement} ${styles.menuGroupContainer}`}>
                        <Typography className={styles.sideNavGroupTitle} variant='caption' color="secondary">Device management</Typography>
                        <div className={styles.menuItemContainer}>
                            <NavLink to='device_management' className={styles.menuItem}>  <Typography color="secondary" className={styles.menuItemContent}><DevicesOtherOutlined/> Device management</Typography></NavLink>
                            <NavLink to='tickets' className={styles.menuItem} > <Typography color="secondary" className={styles.menuItemContent}><ConfirmationNumberOutlined/> Tickets</Typography></NavLink>
                        </div>
                    </div>

                    {/* Data and reporting */}
                    <div className={`${styles.dataAndAnalytics} ${styles.menuGroupContainer}`}>
                        <Typography className={styles.sideNavGroupTitle} variant='caption' color="secondary">Data and reporting</Typography>
                        <div className={styles.menuItemContainer}>
                            <NavLink to='data_analytics' className={styles.menuItem}><Typography color="secondary" className={styles.menuItemContent}><PieChartOutlineOutlined/>Team data</Typography></NavLink>
                        </div>
                    </div> 
            </div>
        </Box>
     );
}
 
export default SideNavigation;