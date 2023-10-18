import React, {useEffect, useRef} from "react";
import lang_bg from '../images/lang/lang_bg.svg'
import go_text from '../images/lang/go_text.svg'
import british from '../images/lang/british.png'
import gsap from "gsap";
import {useMediaQuery} from 'react-responsive'

function GoButton({ startForm, start, langClick}) {
    const isDesktop = useMediaQuery({minWidth: 1300})
    const isMobileTablet = useMediaQuery({ maxWidth: 1299, orientation: "portrait"})
    const tl_start_btn = useRef(null)

    useEffect(() => {
            tl_start_btn.current = gsap.timeline({paused:true})
            tl_start_btn.current.fromTo(".go_title", {y: 0, autoAlpha: 1},{y: 50, autoAlpha: 0, duration: 0.6})
            tl_start_btn.current.fromTo(".img_bg_circle", {y: 0, opacity: 1}, {y: 50, opacity: 0, duration: 0.5},"<")
            tl_start_btn.current.fromTo(".goButton", {
                top: ()=> isMobileTablet ? 'auto' : '15vh',
                bottom: ()=> isMobileTablet ? '50px' : 'auto',
                y:0, left: '50vw'},{
                top: ()=> isMobileTablet ? 'auto' : '-2vh',
                bottom: ()=> isMobileTablet ? '50px' : 'auto',
                y:0, left: '90vw', duration: 1, ease: "power4.inOut"},"<+=1")
        if (start && isDesktop) {
            tl_start_btn.current.play()
        }
        if (start && isMobileTablet) {
            gsap.to(".chat_wrap", {autoAlpha: 1, ease: 'power3.inOut'})
            gsap.to(".social_buttons_wrap", {autoAlpha: 1, ease: 'power3.inOut'})
            gsap.to(".lang_panel", {autoAlpha: 0, bottom: '-10vh', ease: 'power3.inOut'})
        }
    }, [start])

    return (
        <div className="go_button_position">
            <div className="go_button_wrap">
                <img src={lang_bg} className="img_bg_circle" alt=""/>
                <div className="logo_lang"
                     onClick={langClick}
                     style={{
                         background: `url(${british})`,
                         backgroundSize: 'contain',
                     }}></div>
                <div className="go_title" onClick={startForm}>
                    <img src={go_text} alt=""/>
                </div>
            </div>
        </div>
    );
}

export default GoButton;