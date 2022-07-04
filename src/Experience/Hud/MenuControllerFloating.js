import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);

export default class MenuController {
  constructor() {
    this.menu = document.getElementById("menu_component");
    this.menuBackground = document.getElementById("menu-background");
    this.menuButton_container = document.getElementById("menuButton_container");
    this.menuButton = document.getElementById("menuButton");
    this.closeButton = document.getElementById("closeButton");
    this.menuList = document.getElementById("menu_list");
    menu_list;
    this.menuItem1 = document.getElementById("menuItem1");
    this.menuItem2 = document.getElementById("menuItem2");
    this.menuItem3 = document.getElementById("menuItem3");
    this.menuItem4 = document.getElementById("menuItem4");
    this.menuItem5 = document.getElementById("menuItem5");
    this.menuItems = [
      this.menuItem1,
      this.menuItem2,
      this.menuItem3,
      this.menuItem4,
      this.menuItem5,
    ];
    this.mouseX = 0;
    this.mouseY = 0;
    this.pos = { x: 0, y: 0 };
    this.speed = 0.1;

    this.menuIsActive = true;

    this.setUpInicialPositions();
    this.setupAnimatedButtonsEvents(this.menuButton, "menuButton");
    this.setupAnimatedButtonsEvents(this.closeButton, "menuButton");
    this.menuItems.forEach((item) => {
      this.setupAnimatedButtonsEvents(item, "");
    });
    this.scrollController();
  }

  setUpInicialPositions() {
    gsap.timeline().set(this.menu, { display: "none" });
    this.menuItems.forEach((item) => {
      gsap.set(item, { x: "-100%" });
    });
    gsap.set(this.menuButton, {});
    gsap.set(this.menuBackground, { x: "-100%" });
    gsap.set(this.closeButton, { x: "100%" });
  }
  setupAnimatedButtonsEvents(objective, type) {
    let itemsAreActive = false;

    objective.addEventListener("mousemove", (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;

      if (type == "") {
        if (this.menuIsActive) {
          this.followingCursorAnimation(objective);
        }
      } else {
        console.log("este es un elemento de boton");
        this.followingCursorAnimation(objective);
      }
    });
    objective.addEventListener("mouseleave", () => {
      if (type == "") {
        if (this.menuIsActive) {
          gsap.to(objective, { x: 0 });
          gsap.to(objective, { y: 0 });
        }
      } else {
        console.log("este es un elemento de boton");
        gsap.to(objective, { x: 0 });
        gsap.to(objective, { y: 0 });
      }
    });
    objective.addEventListener("click", (e) => {
      if (e.target.id == "menuButton") {
        this.openMenu();
        this.menuIsActive = true;
      } else if (e.target.id == "closeButton") {
        this.closeMenu();
        this.menuIsActive = false;
      }
    });
  }
  followingCursorAnimation(objective) {
    gsap.to(objective, {
      x:
        this.mouseX -
        objective.getBoundingClientRect().left -
        objective.offsetWidth / 2,
    });
    gsap.to(objective, {
      y:
        this.mouseY -
        objective.getBoundingClientRect().top -
        objective.offsetHeight / 2,
    });
  }
  openMenu() {
    this.menuButtonIsActive = false;
    gsap.to(this.menuButton, { x: "-100%", opacity: "0" });
    gsap
      .timeline()
      .set(this.menu, { display: "flex" })
      .to(this.menuBackground, { x: 0, ease: "Power4.easeOut", duration: 1 })
      .to(this.menuItems, {
        x: 0,
        stagger: 0.1,
        ease: "Power4.easeOut",
        duration: 1,
      })
      .to(this.closeButton, { x: 0, opacity: 1 });
  }
  closeMenu() {
    this.menuButtonIsActive = true;
    let menuItems = this.menuItems;
    let menuBackground = this.menuBackground;
    let closeButton = this.closeButton;
    gsap
      .timeline()

      .to(this.closeButton, { x: "100%", opacity: "0" })
      .to(this.menuItems, {
        x: window.innerWidth,
        stagger: 0.1,
        ease: "Power4.easeOut",
        duration: 1,
      })
      .to(this.menuBackground, {
        x: "100%",
        ease: "Power4.easeOut",
        duration: 1,
      })
      .to(this.menuButton, { x: 0, opacity: 1 })
      .add(function () {
        menuItems.forEach((item) => {
          gsap.set(item, { x: "-100%" });
        });

        gsap.set(menuBackground, { x: "-100%" });
        gsap.set(closeButton, { x: "100%" });
      })
      .set(this.menu, { display: "none" });
  }
  scrollController() {
    this.menuItem1.addEventListener("click", () => {
      gsap.to(window, { duration: 1, scrollTo: { y: "#header" } });
      this.closeMenu();
      this.menuIsActive = false;
    });
    this.menuItem2.addEventListener("click", () => {
      gsap.to(window, { duration: 1, scrollTo: { y: "#aboutMe" } });
      this.closeMenu();
      this.menuIsActive = false;
    });
    this.menuItem3.addEventListener("click", () => {
      gsap.to(window, { duration: 1, scrollTo: { y: "#mySkills" } });
      this.closeMenu();
      this.menuIsActive = false;
    });
    this.menuItem4.addEventListener("click", () => {
      gsap.to(window, { duration: 1, scrollTo: { y: "#myProjects" } });
      this.closeMenu();
      this.menuIsActive = false;
    });
    this.menuItem5.addEventListener("click", () => {
      gsap.to(window, { duration: 1, scrollTo: { y: "#contactMe" } });
      this.closeMenu();
      this.menuIsActive = false;
    });
  }
  update() {
    //const dt = 1.0 - Math.pow(1.0 - this.speed, gsap.ticker.deltaRatio());
    //this.pos.x += (this.mouseX - this.pos.x) * dt;
    //this.pos.y += (this.mouseY - this.pos.y) * dt;
    //if (this.isOverMenu && this.menuButtonIsActive) {
    //this.xSet(this.pos.x - this.menuButton.offsetWidth / 2);
    /*this.ySet(
        this.pos.y -
          this.originButtonMenu.top -
          this.menuButton.offsetHeight / 2
      );*/
    //}
  }
}
