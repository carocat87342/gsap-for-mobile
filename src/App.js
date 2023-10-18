import React, {useEffect} from "react";
import './App.scss';
import IntroDesktop from "./components/IntroDesktop";
import IntroMobile from "./components/IntroMobile";
import {useMediaQuery} from 'react-responsive'
import IntroTabletPortrait from "./components/IntroTabletPortrait";
import IntroTabletLandscape from "./components/IntroTabletLandscape";
import SocialButtons from "./components/SocialButtons";
import Chat from "./components/Chat";
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import {gsap} from "gsap";

function App() {
    

    const Desktop = ({children}) => {
        console.log('desktop')
        const isDesktop = useMediaQuery({minWidth: 1300})
        return isDesktop ? children : null
    }
    const TabletPortrait = ({children}) => {
        console.log('TabletPortrait')
        const isTablet = useMediaQuery({minWidth: 768, maxWidth: 1299, orientation: "portrait"})
        return isTablet ? children : null
    }
    const TabletLandscape = ({children}) => {
        console.log('TabletLandscape')
        const isTablet = useMediaQuery({minWidth: 768, maxWidth: 1299, orientation: "landscape"})
        return isTablet ? children : null
    }

    const Mobile = ({children}) => {
        console.log('Mobile')
        const isMobile = useMediaQuery({maxWidth: 767})
        return isMobile ? children : null
    }

    return (
            <div className="App">
                <Desktop>
                    <IntroDesktop/>
                    <div className="appears">
                        <SocialButtons/>
                        <Chat/>
                    </div>
                </Desktop>

                <TabletPortrait>
                    <IntroTabletPortrait/>
                </TabletPortrait>

                <TabletLandscape>
                    <IntroTabletLandscape/>
                    <div className="appears">
                        <Chat/>
                        <SocialButtons/>
                    </div>
                </TabletLandscape>

                <Mobile>
                    <IntroMobile/>
                    <div className="appears">
                        <Chat/>
                        <SocialButtons/>
                    </div>
                </Mobile>
            </div>
    );
}

export default App;