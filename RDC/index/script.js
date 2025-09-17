"use strict";

//下划组件
const headerDiv = document.querySelector(".header-div");
const pElements = document.querySelectorAll(".header-div p");
const underline = document.querySelector(".underline");

//定义容器悬停
let isHovering = false;

//启动下划线
headerDiv.addEventListener("mouseenter", () => {
  isHovering = true;
});

//关闭下划线
headerDiv.addEventListener("mouseleave", () => {
  isHovering = false;
  underline.style.width = "0";
});

//显示下划线
pElements.forEach((p) => {
  p.addEventListener("mouseenter", () => {
    if (!isHovering) return;

    // 计算百分比位置
    const relativeLeft = (p.offsetLeft / headerDiv.offsetWidth) * 100;
    const width = (p.offsetWidth / headerDiv.offsetWidth) * 100;

    // 设置下划线
    underline.style.left = `${relativeLeft}%`;
    underline.style.width = `${width}%`;
  });
});

//搜索器
const triggerBtn = document.querySelector("#search-button");
const searchContainer = document.querySelector("#search-container");
const overlay = document.querySelector("#overlay");

// 切换搜索界面
function toggleSearch() {
  searchContainer.classList.toggle("search-active");
  overlay.classList.toggle("overlay-active");

  // 自动聚焦输入框
  if (searchContainer.classList.contains("search-active")) {
    document.querySelector(".search-input").focus();
  }
}

// 事件监听
overlay.addEventListener("click", toggleSearch);
triggerBtn.addEventListener("click", toggleSearch);

// ESC键关闭功能
document.addEventListener("keydown", function (e) {
  if (
    e.key === "Escape" &&
    searchContainer.classList.contains("search-active")
  ) {
    toggleSearch();
  }
});

//轮播组件
class Progress {
  constructor(container) {
    this.container = container;
    this.shows = [...container.querySelectorAll(".show")];
    this.progress = container.querySelector(".progressbar");
    this.controls = container.querySelectorAll(".control");

    //设置轮播时间和标记
    this.time = 5000;
    this.timer = null;
    this.counter = 0;

    //设置轮播条属性
    this.progressUnitWidth = 100 / this.shows.length;
    this.progress.style.width = `${this.progressUnitWidth}%`;

    //启动程序
    this.showImage();
    this.start();
    this.updateProgress();

    //按钮事件监听
    this.controls[0].addEventListener("click", () => {
      this.prevImage();
    });
    this.controls[1].addEventListener("click", () => {
      this.nextImage();
    });
  }

  //更新轮播条位置
  updateProgress() {
    const position = this.counter * this.progressUnitWidth;
    this.progress.style.left = `${position}%`;
  }

  //启动计时器
  start() {
    if (this.timer) return;

    this.timer = setTimeout(() => {
      this.stop();
      this.nextImage();
      this.start();
    }, this.time);
  }

  //停止计时器
  stop() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  //展示图片
  showImage() {
    this.shows[this.counter].classList.add("active");
  }

  //切换图片
  nextImage() {
    this.shows[this.counter].classList.remove("active");

    if (this.counter === this.shows.length - 1) {
      this.counter = 0;
    } else {
      this.counter++;
    }

    this.shows[this.counter].classList.add("active");
    this.updateProgress();
  }

  //图片跳转
  toImage(index) {
    this.stop();

    this.shows[this.counter].classList.remove("active");
    this.counter = index;
    this.shows[this.counter].classList.add("active");

    this.updateProgress();
    this.start();
  }

  //上一个图片
  prevImage() {
    let index = this.counter === 0 ? this.shows.length - 1 : this.counter - 1;
    this.toImage(index);
  }

  //下一个图片
  nextImage() {
    let index = this.counter === this.shows.length - 1 ? 0 : this.counter + 1;
    this.toImage(index);
  }
}

//启动轮播
const container = document.querySelector(".section-1");
new Progress(container);

//实现容器图片偏移
const categories = document.querySelectorAll(".category");

//绑定事件
categories.forEach((category) => {
  category.addEventListener("mouseenter", function () {
    const img = this.querySelector("img");
    if (img) {
      img.style.transform = "skew(20deg) translateX(1.2rem)";
    }
  });

  category.addEventListener("mouseleave", function () {
    const img = this.querySelector("img");
    if (img) {
      img.style.transform = "skew(20deg)";
    }
  });
});

//实现容器图片放大
class BannerHover {
  constructor(banner) {
    this.banner = banner;
    this.background = this.banner.querySelector(".background");
    this.img = this.banner.querySelector("img");

    // 绑定事件
    this.background.addEventListener(
      "mouseenter",
      this.handleMouseEnter.bind(this)
    );
    this.background.addEventListener(
      "mouseleave",
      this.handleMouseLeave.bind(this)
    );
  }

  //放大图片
  handleMouseEnter() {
    this.img.classList.add("zoom");
  }

  //缩小图片
  handleMouseLeave() {
    this.img.classList.remove("zoom");
  }
}

const banner1 = document.querySelector("#banner1");
const banner2 = document.querySelector("#banner2");
const banner3 = document.querySelector("#banner3");
const banner4 = document.querySelector("#banner4");
const banner5 = document.querySelector("#banner5");

new BannerHover(banner1);
new BannerHover(banner2);
new BannerHover(banner3);
new BannerHover(banner4);
new BannerHover(banner5);

//界面切换
const links = document.querySelectorAll(".topic a");
const banners = document.querySelectorAll(".banner");

//绑定事件
links.forEach((link, index) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    //切换显示
    links.forEach((link) => link.classList.remove("now"));
    link.classList.add("now");

    //切换显示
    banners.forEach((banner) => banner.classList.add("hidden"));
    banners[index].classList.remove("hidden");
  });
});

//图片滑动
class changeImge {
  constructor(banner) {
    this.banner = banner;
    this.list = this.banner.querySelector(".product-list");
    this.Pbutton = this.banner.querySelector(".prev-btn");
    this.Nbutton = this.banner.querySelector(".next-btn");

    //上一个图片
    this.Pbutton.addEventListener("click", () => {
      this.list.scrollLeft -=
        31.7 * parseFloat(getComputedStyle(document.documentElement).fontSize);
    });

    //下一个图片
    this.Nbutton.addEventListener("click", () => {
      this.list.scrollLeft +=
        31.7 * parseFloat(getComputedStyle(document.documentElement).fontSize);
    });
  }
}

new changeImge(banner1);
new changeImge(banner2);
new changeImge(banner3);
new changeImge(banner4);
new changeImge(banner5);

//切换图片
class ProductSlider {
  constructor(container) {
    this.prevBtn = document.querySelector(".prev-show");
    this.nextBtn = document.querySelector(".next-show");

    //上一个图片
    this.prevBtn.addEventListener("click", () => {
      container.scrollLeft -=
        87 * parseFloat(getComputedStyle(document.documentElement).fontSize);
    });

    //下一个图片
    this.nextBtn.addEventListener("click", () => {
      container.scrollLeft +=
        87 * parseFloat(getComputedStyle(document.documentElement).fontSize);
    });
  }
}

const shows1 = document.querySelector("#shows-1");
const shows2 = document.querySelector("#shows-2");
const shows3 = document.querySelector("#shows-3");

new ProductSlider(shows1);
new ProductSlider(shows2);
new ProductSlider(shows3);

//切换图片
class Innovations {
  constructor(containerAll) {
    this.container = containerAll.querySelector(".innovations");
    this.prevBtn = document.querySelector(".prev-innovation");
    this.nextBtn = document.querySelector(".next-innovation");

    //下一个图片
    this.prevBtn.addEventListener("click", () => {
      this.container.scrollLeft -=
        76 * parseFloat(getComputedStyle(document.documentElement).fontSize);
    });

    //上一个图片
    this.nextBtn.addEventListener("click", () => {
      this.container.scrollLeft +=
        76 * parseFloat(getComputedStyle(document.documentElement).fontSize);
    });
  }
}

const section5 = document.querySelector(".section-5");

new Innovations(section5);

//补充蓝色购物车
const containers = document.querySelectorAll(".product-item");
const projeShows = document.querySelectorAll(".product-show");
const discouns = document.querySelectorAll(".discoun-item");

//绑定事件
containers.forEach((container) => {
  const blueSquare = document.createElement("div");
  blueSquare.classList.add("blue-square");

  //添加购物车样式
  blueSquare.innerHTML = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="white"
    class="size-6"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
    />
  </svg>
`;

  //添加购物车
  container.appendChild(blueSquare);

  container.addEventListener("mouseenter", () => {
    blueSquare.style.display = "flex";
  });

  container.addEventListener("mouseleave", () => {
    blueSquare.style.display = "none";
  });
});

//绑定事件
projeShows.forEach((container) => {
  const blueSquare = document.createElement("div");
  blueSquare.classList.add("blue-square");

  //添加购物车样式
  blueSquare.innerHTML = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="white"
    class="size-6"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
    />
  </svg>
`;

  //添加购物车
  container.appendChild(blueSquare);

  container.addEventListener("mouseenter", () => {
    blueSquare.style.display = "flex";
  });

  container.addEventListener("mouseleave", () => {
    blueSquare.style.display = "none";
  });
});

//绑定事件
discouns.forEach((container) => {
  const blueSquare = document.createElement("div");
  blueSquare.classList.add("blue-square");

  //添加购物车样式
  blueSquare.innerHTML = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="white"
    class="size-6"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
    />
  </svg>
`;

  //添加购物车
  container.appendChild(blueSquare);

  container.addEventListener("mouseenter", () => {
    blueSquare.style.display = "flex";
  });

  container.addEventListener("mouseleave", () => {
    blueSquare.style.display = "none";
  });
});

//切换页面
const navLinks = document.querySelectorAll(".category-nav a");
const section4R = document.querySelectorAll(".section-4-r");
const productShows = document.querySelectorAll(".product-shows");

navLinks.forEach((link, index) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    navLinks.forEach((link) => link.classList.remove("active"));
    link.classList.add("active");

    section4R.forEach((section) => section.classList.add("hidden"));
    productShows.forEach((product) => product.classList.add("hidden"));

    section4R[index].classList.remove("hidden");
    productShows[index].classList.remove("hidden");
  });
});

//自适应屏幕大小
class FontSizeAdjuster {
  constructor() {
    // 设计基准配置
    this.designWidth = 1684;
    this.designFontSize = 62.5;
    this.minFontSize = 25;
    this.maxFontSize = 150;

    // 初始化
    this.adjustFontSize();

    //重新计算
    window.addEventListener(
      "resize",
      this.debounce(() => {
        this.adjustFontSize();
      }, 100)
    );
  }

  //自适应屏幕大小
  adjustFontSize() {
    const currentWidth = window.innerWidth;

    // 动态计算
    let newFontSize = (currentWidth / this.designWidth) * this.designFontSize;

    // 应用限制范围
    newFontSize = Math.max(newFontSize, this.minFontSize);
    newFontSize = Math.min(newFontSize, this.maxFontSize);

    document.documentElement.style.fontSize = `${newFontSize}%`;
  }

  //重置计时器
  debounce(func, wait) {
    let timeout;
    return () => {
      clearTimeout(timeout);
      timeout = setTimeout(func, wait);
    };
  }
}

// 初始化实例
new FontSizeAdjuster();

//返回顶部按钮
document.addEventListener("DOMContentLoaded", () => {
  const backToTopBtn = document.querySelector(".back-to-top");
  const triggerDistance = 1440; // 触发显示的距离(px)

  // 滚动事件监听
  window.addEventListener("scroll", () => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;

    if (scrollTop > triggerDistance) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  });

  // 点击返回顶部
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});

// 获取元素
const indexContainer = document.querySelector(".index");
const memberContainer = document.querySelector(".member");
const indexButton = document.getElementById("index-button");
const memberButton = document.getElementById("member-button");

// 切换显示的函数
function showIndex() {
  indexContainer.classList.remove("hidden");
  memberContainer.classList.add("hidden");
  indexButton.classList.add("active-button");
  memberButton.classList.remove("active-button");
}

function showMember() {
  indexContainer.classList.add("hidden");
  memberContainer.classList.remove("hidden");
  indexButton.classList.remove("active-button");
  memberButton.classList.add("active-button");
}

// 绑定点击事件
indexButton.addEventListener("click", showIndex);
memberButton.addEventListener("click", showMember);

// 默认显示运动分类
showIndex();
