function createElem({ template, attributes = {} }) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = template.trim();
    const elem = tempDiv.firstChild;

    Object.keys(attributes).forEach(attr => {
        elem[attr] = attributes[attr];
    });

    return elem;
}

function createCardElem({
    title = 'Card-Title',
    description = 'Card-Description',
    locationType = 'Remote',
    type = 'Full-time',
    salary = 1000,
    thumbnail = '',
}) {
    const cardHTML = `
        <div>
            <div class="card card-job">
                <div class="card-header gap-4">
                    <div class="card-logo">
                        <img src="${thumbnail}" alt="Logo">
                    </div>
                    <div class="card-title">
                        <h2 class="display-2 card-title-content">${title}</h2>
                        <p class="text-primary extra-small">Up to ${Math.round(salary)}$</p>
                    </div>
                    <i class="fa-solid fa-bookmark fs-4"></i>
                </div>
                <div class=" divider-line m-0"></div>
                <div class="card-body gap-2">
                    <div class="d-flex gap-4 text-neutral-7">
                        <span><i class="fa-solid fa-laptop-file fs-4"></i> ${locationType}</span>
                        <span><i class="fa-regular fa-clock fs-4"></i> ${type}</span>
                    </div>
                    <p class="card-body-description">${description}</p>
                </div>
            </div>
        </div>
    `;

    return createElem({ template: cardHTML });
}

function createSkeletonCard() {
    const cardHTML = `
        <div>
            <div class="card card-job">
                <div class="card-header gap-4">
                    <div class="card-logo skeleton"></div>
                    <div class="card-title">
                        <div class="skeleton-line"></div>
                        <div class="skeleton-line"></div>
                    </div>
                </div>
                <div class="line line-dashed-x2 line-neutral-5 my-5"></div>
                <div class="card-body gap-2">
                    <div class="d-flex gap-4">
                        <div class="skeleton-line w-25"></div>
                        <div class="skeleton-line w-25"></div>
                    </div>
                    <div class="skeleton-line-2"></div>
                </div>
            </div>
        </div>
    `;

    return createElem({ template: cardHTML });
}

function createBlogElem({

    title = 'Blog-Title',
    content = 'Blog-Content',
    field = 'Blog-Field',
    imgUrl = '',
    createdAt,
}) {
    const date = new Date(createdAt);
    const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const elemHTML = `
        <div class="card card-blog gap-4 pb-3 mb-3">
            <div class="card-badge">${field}</div>
            <img
                src="${imgUrl}"
                alt="Blog 1"
                class="card-img-top"
            />
            <div class="card-body px-4 py-1 gap-3">
                <div class="d-flex flex-column gap-3 me-18">
                    <h2 class="display-2">
                        ${title}
                    </h2>
                    <p class="body-1 text-neutral-7 ellipsis-2">
                        ${content}
                    </p>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="small-headline text-neutral-6">
                        ${formattedDate}
                    </div>
                    <div class="small-headline text-primary cursor-pointer">
                        Read More &#9658;
                    </div>
                </div>
            </div>
        </div>
    `;

    return createElem({ template: elemHTML });
}

function createSkeletonBlogElem() {
    const elemHTML = `
        <div class="card card-blog gap-4 pb-3">
            <div class="card-badge skeleton"></div>
            <div class="card-img-top skeleton"></div>
            <div class="card-body px-4 py-1 gap-3">
                <div class="d-flex flex-column gap-3 me-18">
                    <h2 class="display-2 skeleton-line-2"></h2>
                    <p class="body-1 text-neutral-7 ellipsis-2 skeleton-line-2"></p>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="small-headline text-neutral-6 skeleton-line w-25"></div>
                </div>
            </div>
        </div>
    `;

    return createElem({ template: elemHTML });
}

function createOptionElem({ title = 'Option-Title', value = 'Option-Value' }) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = title;
    return option;
}


export {
    createCardElem,
    createSkeletonCard,
    createBlogElem,
    createSkeletonBlogElem,
    createOptionElem,
};
