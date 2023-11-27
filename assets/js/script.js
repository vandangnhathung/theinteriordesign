const attraction = 0.2;
const fraction = 0.05;

const wrapperItem = document.querySelector(".list-items");
console.log("wrapperItem.offsetTop: ", wrapperItem.offsetTop)
document.querySelectorAll(".item").forEach((el, i) => {
    const magneticSection = el.querySelector('.magnetic-section');

    const target = {target: magneticSection, x: 0, y: 0}


    //lerp
    const lerp = (start, end, fraction) => {
        return start * (1 - fraction) + end * fraction;
    }

    //animation for button
    const animationButton = (target, endX, endY) => {
        //only run if deltaX and deltaY > 0.0001
        if (Math.abs(target.x) > 0.0001 && Math.abs(target.y) > 0.0001) {
            target.target.style.transform = `translate(${target.x}px, ${target.y}px)`;
        }
        // console.log("target.y: ", target.y)
        target.x = lerp(target.x, endX, fraction);
        target.y = lerp(target.y, endY, fraction);
    }

    const generalCoordinator = (target, mouseX, mouseY, i) => {
        // console.log("el.offsetTop: ", el.offsetTop)
        const mouseYIndex = el.offsetTop - wrapperItem.offsetTop + mouseY;
        const centerX = target.offsetLeft + target.offsetWidth / 2;
        const centerY = target.offsetTop + target.offsetHeight / 2;
        const pointX = mouseX - centerX;
        const pointY = mouseY - centerY;
        // console.log("centerY: ", centerY, "mouseYIndex: ", mouseYIndex, i + 1)
        const deltaX = Math.floor(centerX - mouseX) * -1 * attraction;
        const deltaY = Math.floor(centerY - mouseYIndex) * -1 * attraction;
        const distance = Math.floor(Math.sqrt(Math.pow(pointX, 2) + Math.pow(pointY, 2)));

        // console.log(deltaX, deltaY)
        return {deltaY, deltaX, distance};
    }


    let isEnter = false;


    // execute event
    window.addEventListener("mousemove", (e) => {
        const mouseY = Math.max(e.clientY - el.offsetTop, 0);
        const mouseX = e.pageX;

        const targetArea = el.offsetHeight;

        // console.log("mouseY: ", mouseY, "targetArea", targetArea)
        // console.log("mouseX: ", mouseX, "mouseY: ", mouseY);

        // Enter to the magnetic section
        const data = generalCoordinator(target.target, mouseX, mouseY, i);

        console.log(data.deltaY)
        if (mouseY > 0 && mouseY <= targetArea) {
            // console.log("offsetTop", el.offsetTop)
            // console.log("1", mouseY)
            animationButton(target, data.deltaX, data.deltaY)
        } else {
            // console.log("0", mouseY)
            animationButton(target, 0, 0);
        }
    })
})

