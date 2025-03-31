
const Tab = function ({
    tabsClass = 'js-tabs',
    tabButtonClass = 'js-tab-button',
    tabPanelClass = 'js-tab-panel',
}) {
    const tabContainerElem = document.querySelector(`.${tabsClass}`);

    if (!tabContainerElem) return;

    const activeClass = 'active';
    const tabContentAttribute = 'data-tab-target';

    const tabButtons = tabContainerElem.querySelectorAll(`.${tabButtonClass}`);
    const tabPanels = tabContainerElem.querySelectorAll(`.${tabPanelClass}`);

    if (!tabButtons.length || !tabPanels.length) return;

    function init() {
        defaultActive();
        tabContainerElem.addEventListener('click', _handleClickTabButton);
        return this;
    }

    function defaultActive(tabIndex) {
        if (!tabIndex || tabIndex > tabButtons.length - 1) tabIndex = 0;

        const clickedBtn = tabButtons[tabIndex];
        const targetTabPanelId = clickedBtn.getAttribute(tabContentAttribute);

        if (!targetTabPanelId) return;

        _removeAllActiveClass();
        _addActiveClass(clickedBtn, targetTabPanelId);
    }

    function _handleClickTabButton(event) {
        const clickedBtn = event.target.closest(`.${tabButtonClass}`);
        if (!clickedBtn) return;

        const targetTabPanelId = clickedBtn.getAttribute(tabContentAttribute);
        if (!targetTabPanelId) return;

        _removeAllActiveClass();
        _addActiveClass(clickedBtn, targetTabPanelId);
    }

    function _addActiveClass(clickedBtn, targetTabPanelId) {
        clickedBtn.classList.add(activeClass);

        const targetTabPanel = tabContainerElem.querySelector(targetTabPanelId);

        if (!targetTabPanel) return;

        targetTabPanel.classList.add(activeClass);
    }

    function _removeAllActiveClass() {
        tabButtons.forEach((btn) => {
            btn.classList.remove(activeClass);
        });

        tabPanels.forEach((panel) => {
            panel.classList.remove(activeClass);
        });
    }

    return {
        init,
        defaultActive,
    };
};
const tab1 = Tab({
    tabsClass: 'js-tabs-align-center',
}).init();

