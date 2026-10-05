const estimateBase = {
    small: 1,
    medium: 2,
    large: 3
};

const estimateAdditions = {
    type: { residential: 0, office: 1, public: 2 },
    style: { modern: 0, japanese: 1, european: 1, original: 2 },
    detail: { basic: 0, medium: 1, high: 2 },
    interior: { structure: 0, basic: 1, high: 2 },
    addons: { landscape: 1, lighting: 2, schematic: 3, concept: 4 }
};

const labels = {
    type: { residential: "住宅 / 公寓", office: "办公 / 商业", public: "公共建筑" },
    size: { small: "小型 · 单体建筑", medium: "中型 · 建筑与周边", large: "大型 · 街区 / 综合体" },
    style: { modern: "现代简约", japanese: "日式", european: "欧式", original: "原创世界观" },
    detail: { basic: "基础精度", medium: "进阶精度", high: "高精度" },
    interior: { structure: "仅建筑结构", basic: "基础室内", high: "完整精装室内" },
    addons: {
        landscape: "景观与道路",
        lighting: "夜景灯光方案",
        schematic: "源文件与搭建说明",
        concept: "专属概念设计"
    }
};

const formatPrice = value => `${value.toLocaleString("zh-CN")} 绿宝石`;

function updateEstimate() {
    const config = {
        type: document.getElementById("buildType").value,
        size: document.getElementById("buildSize").value,
        style: document.getElementById("buildStyle").value,
        detail: document.getElementById("buildDetail").value,
        interior: document.getElementById("buildInterior").value
    };
    const checkedAddons = [...document.querySelectorAll('input[name="addon"]:checked')]
        .map(input => input.value);

    const total = estimateBase[config.size]
        + estimateAdditions.type[config.type]
        + estimateAdditions.style[config.style]
        + estimateAdditions.detail[config.detail]
        + estimateAdditions.interior[config.interior]
        + checkedAddons.reduce((sum, addon) => sum + estimateAdditions.addons[addon], 0);

    document.getElementById("estimatePrice").textContent = formatPrice(total);

    const summary = [
        labels.type[config.type],
        labels.size[config.size],
        `${labels.style[config.style]} · ${labels.detail[config.detail]}`,
        labels.interior[config.interior],
        ...checkedAddons.map(addon => labels.addons[addon])
    ];
    const summaryList = document.getElementById("estimateSummary");
    summaryList.replaceChildren(...summary.map(item => {
        const entry = document.createElement("li");
        entry.textContent = item;
        return entry;
    }));
}

let allProjects = [];

const fallbackProjects = [
    {
        title: "超级无敌公寓",
        tag: "SUPER BIG HOUSE",
        region: "europe",
        style: "modern",
        type: "residential",
        detail: "medium",
        interior: "basic",
        image: "img.jpg",
        description: "这是一段介绍",
        price: 325
    },
    {
        title: "占位",
        tag: "NONE",
        region: "europe",
        style: "modern",
        type: "residential",
        detail: "high",
        interior: "basic",
        image: "img.jpg",
        description: "bababoy",
        price: 9999999
    },
    {
        title: "占位二号",
        tag: "NONE NUMBER 2",
        region: "europe",
        style: "modern",
        type: "residential",
        detail: "high",
        interior: "high",
        image: "img.jpg",
        description: "介绍",
        price: 32768
    },
    {
        title: "市民中心",
        tag: "CITIZEN CENTER",
        region: "china",
        style: "modern",
        type: "public",
        detail: "basic",
        interior: "basic",
        image: "img.jpg",
        description: "这是一段介绍",
        price: 65536
    },
    {
        title: "核风街区",
        tag: "JAPANESE TOWN",
        region: "original",
        style: "japanese",
        type: "residential",
        detail: "medium",
        interior: "structure",
        image: "img.jpg",
        description: "这是一段介绍",
        price: 114514
    },
    {
        title: "原创未来总部",
        tag: "EIKAN ORIGINAL",
        region: "original",
        style: "original",
        type: "office",
        detail: "high",
        interior: "high",
        image: "img.jpg",
        description: "这是一段介绍",
        price: 1919810
    }
];

function renderProjects(projects) {
    const grid = document.getElementById("project-grid");
    const emptyState = document.getElementById("noExamples");
    grid.replaceChildren(...projects.map(project => {
        const card = document.createElement("article");
        card.className = `example-card ${project.region || ""}`;

        const image = document.createElement("img");
        image.src = project.image || "img.jpg";
        image.alt = `${project.title}参考效果`;
        image.loading = "lazy";

        const content = document.createElement("div");
        content.className = "example-content";

        const tag = document.createElement("span");
        tag.className = "example-tag";
        tag.textContent = project.tag;

        const title = document.createElement("h3");
        title.textContent = project.title;

        const description = document.createElement("p");
        description.textContent = project.description;

        const footer = document.createElement("div");
        footer.className = "example-card-footer";
        const meta = document.createElement("span");
        meta.textContent = `${labels.detail[project.detail] || "定制精度"} · ${labels.interior[project.interior] || "定制室内"}`;
        const price = document.createElement("strong");
        price.textContent = project.price ? `参考 ${formatPrice(project.price)}` : "按需估价";

        footer.append(meta, price);
        content.append(tag, title, description, footer);
        card.append(image, content);
        return card;
    }));
    emptyState.hidden = projects.length > 0;
}

function filterProjects() {
    const filters = {
        style: document.getElementById("styleFilter").value,
        type: document.getElementById("typeFilter").value,
        detail: document.getElementById("detailFilter").value,
        interior: document.getElementById("interiorFilter").value
    };
    const filtered = allProjects.filter(project =>
        Object.entries(filters).every(([key, value]) =>
            value === "all" || project[key] === value
        )
    );
    renderProjects(filtered);
}

document.querySelectorAll(".configurator-card select, input[name='addon']")
    .forEach(input => input.addEventListener("change", updateEstimate));

document.querySelectorAll(".example-filters select")
    .forEach(select => select.addEventListener("change", filterProjects));

updateEstimate();

const productsDataUrl = new URL("data/products.json", document.currentScript.src);

fetch(productsDataUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error(`案例数据加载失败（${response.status}）`);
        }
        return response.json();
    })
    .then(projects => {
        if (!Array.isArray(projects)) {
            throw new Error("案例数据格式无效");
        }
        allProjects = projects;
        renderProjects(allProjects);
    })
    .catch(error => {
        console.error("无法加载精选案例：", error);
        allProjects = fallbackProjects;
        renderProjects(allProjects);
        const caseStatus = document.getElementById("caseStatus");
        caseStatus.textContent = "案例数据文件暂时无法访问，当前显示内置参考案例。";
        caseStatus.hidden = false;
    });
