import React from 'react';



function MouseLight({ children }: any) {
    const focusLight = document.querySelector(".light") as HTMLDivElement;
        function lightMoving() {
            if(focusLight){
            let focusX = `50px`
            let focusY = `50px`
            focusLight.style.background = `radial-gradient(
            circle 900px at ${focusX} ${focusY},
            rgba(0, 0, 0, 0.01) 0%,
            rgba(0, 0, 0, 0.5) 70%,
            rgba(0, 0, 0, 0.96) 100%)`
            }
        }
        lightMoving();
    return (
        <div className="light">
        {children}
        </div>
    );

}

export default MouseLight;