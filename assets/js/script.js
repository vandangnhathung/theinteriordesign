const attraction = 0.2;
const fraction = 0.05;

function magneticButton(options) {
    const settings = {
        target: document.querySelectorAll('.magnetic-section'), // DOM element
        class: 'magnetizing',
        attraction: 0.6, // 1 is weak, 0 is strong
        distance: 100, // magnetic area around element
        fraction: 0.1,
        onEnter: function (data) {
        },
        onExit: function (data) {
        },
        onUpdate: function (data) {
        },
        ...options,
    };

    let isEnter = false;

    //lerp
    // const lerp = (start, end, fraction) => {
    //     return start * (1 - fraction) + end * fraction;
    // }
    // //animation for button
    // const animationButton = (target, endX, endY) => {
    //     //only run if deltaX and deltaY > 0.0001
    //     if (Math.abs(target.x) > 0.0001 && Math.abs(target.y) > 0.0001) {
    //         target.target.style.transform = `translate(${target.x}px, ${target.y}px)`;
    //     }
    //     target.x = lerp(target.x, endX, settings.fraction);
    //     target.y = lerp(target.y, endY, settings.fraction);
    // }
    //Distance from mouse and get coordinator
    // const generalCoordinator = (target, mouseX, mouseY) => {
    //     const centerX = target.offsetLeft + target.offsetWidth / 2;
    //     const centerY = target.offsetTop + target.offsetHeight / 2;
    //     const pointX = mouseX - centerX;
    //     const pointY = mouseY - centerY;
    //     const deltaX = Math.floor(centerX - mouseX) * -1 * settings.attraction;
    //     const deltaY = Math.floor(centerY - mouseY) * -1 * settings.attraction;
    //     const distance = Math.floor(Math.sqrt(Math.pow(pointX, 2) + Math.pow(pointY, 2)));
    //     return {deltaY, deltaX, distance};
    // }

    //processing
    function magnetize(target, e, index) {
        const mouseX = e.offsetX;
        const mouseY = e.offsetY;

        const data = generalCoordinator(target.target, mouseX, mouseY);
        if (data.distance < settings.distance) {
            // Update css whenever user hover onto element
            animationButton(target, data.deltaX, data.deltaY);
            if (!isEnter) {
                isEnter = true;
                target.target.classList.add(settings.class);
                settings.onEnter(data);
            }
            settings.onUpdate(data);
        } else {
            // Update css whenever user hover onto element
            animationButton(target, 0, 0);
            if (isEnter) {
                isEnter = false;
                target.target.classList.remove(settings.class);
                settings.onExit(data);
            }
        }
    }

    // exit
    if (!settings.target.length) return;

    const items = [];
    settings.target.forEach((item) => {
        items.push({target: item, x: 0, y: 0});
    });
    const magneticButtonFn = function (e) {
        settings.target.forEach((item, index) => {
            magnetize(items[index], e, index);
        });
    }


    // on mouse move
    // window.addEventListener('mousemove', magneticButtonFn)
}

// init
magneticButton({
    distance: document.querySelector(".item").offsetHeight,
    // fraction: 0.15,
    onEnter: function (data) {
        //gsap.to(data.target, {scale: 1.2});
        // console.log(data);
    },
    onExit: function (data) {
        //gsap.to(data.target, {scale: 1});
        // console.log(data);
    },
    onUpdate: function (data) {
        // console.log(data);
    }
});

// console.log(document.querySelector(".item").offsetHeight)

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
        // console.log("m ",ouseYIndex: mouseYIndex)
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

